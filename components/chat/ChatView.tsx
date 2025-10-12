
import React, { useEffect, useRef } from 'react';
import { Conversation, Message, MessageSender } from '../../types';
import { MessageInput } from './MessageInput';
import { WelcomeScreen } from './WelcomeScreen';
import { UserIcon, BotIcon } from '../shared/Icons';

interface ChatViewProps {
    conversation: Conversation | undefined;
    onSendMessage: (content: string) => void;
    isSending: boolean;
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === MessageSender.USER;
    
    return (
        <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
           {!isUser && (
                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white flex-shrink-0">
                    <BotIcon className="w-5 h-5" />
                </div>
            )}
            <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                    <span className="font-semibold">{isUser ? 'You' : 'AI Assistant'}</span>
                    <span>{message.timestamp}</span>
                </div>
                <div className={`max-w-xl p-4 rounded-2xl ${isUser ? 'bg-gray-100 text-gray-800 rounded-br-none' : 'bg-blue-50 text-gray-800 rounded-bl-none'}`}>
                   <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
            </div>
             {isUser && (
                 <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full text-gray-600 flex-shrink-0">
                    <UserIcon className="w-5 h-5" />
                </div>
            )}
        </div>
    );
};

export const ChatView: React.FC<ChatViewProps> = ({ conversation, onSendMessage, isSending }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [conversation?.messages]);

    if (!conversation) {
        return <WelcomeScreen onPromptClick={onSendMessage}/>;
    }

    return (
        <div className="relative flex flex-col h-full">
           <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {conversation.messages.length > 0 ? (
                    conversation.messages.map((msg, index) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))
                ) : (
                    <WelcomeScreen onPromptClick={onSendMessage} />
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-6 bg-white border-t border-gray-200">
                <MessageInput onSendMessage={onSendMessage} isSending={isSending}/>
            </div>
        </div>
    );
};
