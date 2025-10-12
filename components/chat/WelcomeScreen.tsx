import React from 'react';
import { MessageSquareTextIcon, FileCodeIcon, BrainCircuitIcon, PlaneIcon } from '../shared/Icons';

interface WelcomeScreenProps {
    onPromptClick: (prompt: string) => void;
}

const examplePrompts = [
    { text: 'Explain quantum computing in simple terms', icon: <BrainCircuitIcon className="w-5 h-5 mr-3" /> },
    { text: 'Write a Python function to sort a list', icon: <FileCodeIcon className="w-5 h-5 mr-3" /> },
    { text: 'What are the benefits of meditation?', icon: <MessageSquareTextIcon className="w-5 h-5 mr-3" /> },
    { text: 'Help me plan a weekend trip to Paris', icon: <PlaneIcon className="w-5 h-5 mr-3" /> },
];

const GeminiLogoIcon = ({ className = "w-16 h-16" }) => (
    <div className={`${className} flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-500 to-purple-500 rounded-full`}>
        <span className="text-white font-bold text-2xl">✦</span>
    </div>
);

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPromptClick }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <GeminiLogoIcon className="w-20 h-20 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Welcome to Ai- Chat</h1>
            <h1 className="text-2xl font-bold text-gray-800">Click New to start a conversation</h1>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">Start a conversation with Ai-Chat. Ask questions, get help with tasks, or explore ideas together.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 w-full max-w-2xl">
                {examplePrompts.map((prompt, index) => (
                    <button key={index} onClick={() => onPromptClick(prompt.text)}
                        className="flex items-center p-4 text-left bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                        {prompt.icon}
                        <span className="text-sm font-medium text-gray-700">{prompt.text}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};