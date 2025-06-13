// resources/js/Pages/Chat/Index.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import TextInput from '../../Components/TextInput';
import PrimaryButton from '../../Components/PrimaryButton';
import axios from 'axios';
import ProjectLayout from '../../Layouts/ProjectLayout';

// A little helper to make our bot's responses look better by respecting newlines and formatting.
const FormattedBotMessage = ({ text }) => {
    return <div className="whitespace-pre-wrap">{text}</div>;
};

export default function ChatIndex({ auth }) {
    // Initial message from the bot when the page loads.
    const initialMessage = {
        sender: 'bot',
        text: "Hello! How can I help you with your project today?",
    };

    const [messages, setMessages] = useState([initialMessage]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setInput('');

        try {
            const response = await axios.post(route('chat.ask'), { prompt: input });
            const botMessage = { sender: 'bot', text: response.data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { sender: 'bot', text: 'Sorry, my circuits are a bit fuzzy. Please try again later.' };
            setMessages(prev => [...prev, errorMessage]);
            console.error("Chat Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProjectLayout
            user={auth.user}
            // Let's remove the default header to give the chat more space. The page title is enough.
        >
            <Head title="AI Assistant" />

            {/* Custom scrollbar styles to match the dark theme */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    border: 3px solid transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }
            `}</style>

            {/* Main container - No more padding, let the chat window define the space */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
                {/* 
                  The Chat Window
                  - Dark, semi-transparent background to feel integrated.
                  - A subtle border to give it definition.
                  - Taller height to be the main focus.
                */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl flex flex-col h-[85vh] mt-6">

                    {/* Message Display Area - with our custom scrollbar */}
                    <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-lg shadow-md ${
                                        msg.sender === 'user'
                                            ? 'bg-blue-600 text-white' // User bubble: bright and clear
                                            : 'bg-slate-800 text-gray-200 border border-slate-700' // Bot bubble: dark, integrated
                                    }`}
                                >
                                    {msg.sender === 'bot' ? <FormattedBotMessage text={msg.text} /> : msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 
                      Input Form
                      - No harsh top border.
                      - Darker input field to match.
                    */}
                    <div className="p-4 border-t border-slate-700/50">
                        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                            <TextInput
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask something..."
                                className="flex-1 bg-slate-800/50 border-slate-600 focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
                                disabled={isLoading}
                                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey ? handleSubmit(e) : null}
                            />
                            <PrimaryButton type="submit" disabled={isLoading}>
                                {isLoading ? 'Thinking...' : 'Send'}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
}
