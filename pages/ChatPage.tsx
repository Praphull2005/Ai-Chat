
import React, { useState, useCallback } from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/chat/Sidebar';
import { ChatView } from '../components/chat/ChatView';
import { Conversation, Message, MessageSender } from '../types';
import { getStreamingChatResponse } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';


const ChatPage: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);
    const { user, updateCredits } = useAuth();

    const createNewChat = () => {
        const newConversation: Conversation = {
            id: `conv-${Date.now()}`,
            title: 'New Chat',
            messages: [],
            createdAt: new Date().toISOString(),
        };
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newConversation.id);
    };

    const activeConversation = conversations.find(c => c.id === activeConversationId);

    const handleSendMessage = useCallback(async (content: string) => {
        if (!activeConversationId || isSending) return;
        
        if (user && user.credits < 1) {
             alert("You have insufficient credits to send a message.");
             return;
        }

        setIsSending(true);

        const userMessage: Message = {
            id: `msg-${Date.now()}`,
            sender: MessageSender.USER,
            content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const assistantMessage: Message = {
            id: `msg-${Date.now() + 1}`,
            sender: MessageSender.ASSISTANT,
            content: '',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        
        const updatedMessages = [...(activeConversation?.messages || []), userMessage, assistantMessage];

        setConversations(prev => prev.map(c =>
            c.id === activeConversationId
                ? { ...c, messages: updatedMessages, title: c.messages.length === 0 ? content.substring(0, 25) : c.title }
                : c
        ));
        
        const newCreditCount = (user?.credits ?? 0) - 1;
        updateCredits(newCreditCount);

        await getStreamingChatResponse(
            updatedMessages.slice(0, -1),
            (chunk) => {
                setConversations(prev => prev.map(c => {
                    if (c.id !== activeConversationId) return c;
                    const lastMsg = c.messages[c.messages.length - 1];
                    if (lastMsg && lastMsg.sender === MessageSender.ASSISTANT) {
                        const updatedLastMsg = { ...lastMsg, content: chunk };
                        return { ...c, messages: [...c.messages.slice(0, -1), updatedLastMsg] };
                    }
                    return c;
                }));
            }
        );

        setIsSending(false);

    }, [activeConversationId, activeConversation, isSending, user, updateCredits]);

    return (
        <div className="flex w-full h-screen bg-white">
            <Sidebar conversations={conversations} activeConversationId={activeConversationId} setActiveConversationId={setActiveConversationId} onNewChat={createNewChat} />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    <ChatView 
                        conversation={activeConversation} 
                        onSendMessage={handleSendMessage}
                        isSending={isSending}
                    />
                </main>
            </div>
        </div>
    );
};

export default ChatPage;
