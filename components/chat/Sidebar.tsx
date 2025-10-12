import React, { useState } from 'react';
import { Conversation } from '../../types';
import { ChevronLeftIcon, MessageSquareIcon, PlusIcon } from '../shared/Icons';

interface SidebarProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    setActiveConversationId: (id: string) => void;
    onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    onNewChat 
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    
    if (isCollapsed) {
        return (
            <aside className="flex flex-col w-16 bg-gray-50 border-r border-gray-200">
                <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
                    <button 
                        onClick={toggleSidebar}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Expand sidebar"
                    >
                        <ChevronLeftIcon className="w-5 h-5 transform rotate-180" />
                    </button>
                </div>
                <div className="p-2">
                    <button 
                        onClick={onNewChat}
                        className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        title="New Chat"
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </div>
                <nav className="flex-1 px-2 pb-4 space-y-2 overflow-y-auto">
                    {conversations.map(conv => (
                        <button
                            key={conv.id}
                            onClick={() => setActiveConversationId(conv.id)}
                            className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                                activeConversationId === conv.id 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'hover:bg-gray-100 text-gray-700'
                            } transition-colors`}
                            title={conv.title}
                        >
                            <MessageSquareIcon className="w-4 h-4" />
                        </button>
                    ))}
                </nav>
            </aside>
        );
    }

    return (
        <aside className="flex flex-col w-72 bg-gray-50 border-r border-gray-200 transition-all duration-300">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
                </div>
                <button 
                    onClick={toggleSidebar}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    title="Collapse sidebar"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="p-4">
                <button 
                    onClick={onNewChat} 
                    className="flex items-center justify-center w-full px-4 py-2 space-x-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <PlusIcon className="w-5 h-5"/>
                    <span>New Chat</span>
                </button>
            </div>
            <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
                {conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <MessageSquareIcon className="w-12 h-12 mb-2" />
                        <p className="text-sm">No conversations yet</p>
                    </div>
                ) : (
                    conversations.map(conv => (
                        <button 
                            key={conv.id} 
                            onClick={() => setActiveConversationId(conv.id)}
                            className={`flex flex-col w-full p-3 rounded-lg text-left ${
                                activeConversationId === conv.id 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'hover:bg-gray-100 text-gray-700'
                            } transition-colors`}
                        >
                            <p className="font-medium text-sm truncate">{conv.title}</p>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                                {conv.messages.length > 0 ? conv.messages[0].content : '...'}
                            </p>
                            <p className="text-xs text-gray-400 mt-2 self-start">
                                {new Date(conv.createdAt).toLocaleDateString()}
                            </p>
                        </button>
                    ))
                )}
            </nav>
        </aside>
    );
};