import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from '../shared/Icons';

interface MessageInputProps {
    onSendMessage: (content: string) => void;
    isSending: boolean;
}

const MAX_CHAR = 2000;

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isSending }) => {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [input]);

    const handleSend = () => {
        if (input.trim() && !isSending) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className={`relative border rounded-xl transition-all duration-200 ${
                isFocused 
                    ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' 
                    : 'border-gray-300 hover:border-gray-400'
            }`}>
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Ask me anything..."
                    rows={1}
                    maxLength={MAX_CHAR}
                    className="w-full p-4 pr-12 text-sm text-gray-800 bg-transparent border-none rounded-xl focus:outline-none focus:ring-0 resize-none max-h-48"
                    disabled={isSending}
                />
                <button
                    onClick={handleSend}
                    disabled={isSending || !input.trim()}
                    className="absolute bottom-3 right-3 p-2 text-white bg-blue-500 rounded-full disabled:bg-gray-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    <SendIcon className="w-4 h-4" />
                </button>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{input.length}/{MAX_CHAR}</span>
            </div>
        </div>
    );
};