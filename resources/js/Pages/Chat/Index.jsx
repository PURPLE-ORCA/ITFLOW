// resources/js/Pages/Chat/Index.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '../../Components/TextInput';
import PrimaryButton from '../../Components/PrimaryButton';
import axios from 'axios'; // Keep axios for now, might be needed for other things or removed later
import ProjectLayout from '../../Layouts/ProjectLayout';

// A little helper to make our bot's responses look better by respecting newlines and formatting.
const FormattedBotMessage = ({ text }) => {
    return <div className="whitespace-pre-wrap">{text}</div>;
};

export default function ChatIndex({ auth, messages }) { // Add messages prop
    // Initial message from the bot when the page loads.
    const initialMessage = {
        sender: 'bot',
        text: "Hello! How can I help you with your project today?",
    };

    // const [file, setFile] = useState(null); // This state is no longer needed, use data.attachment
    const fileInputRef = useRef(null); // New ref for file input

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Use messages from props, and append initial message if no history
    const [chatHistory, setChatHistory] = useState(messages.length > 0 ? messages : [initialMessage]);

    useEffect(() => {
        setChatHistory(messages); // Update chat history when new messages come from props
        scrollToBottom();
    }, [messages]);

    // The new handleSubmit function will use Inertia's router, which is built for this.
    const { data, setData, post, processing, errors, reset } = useForm({
        prompt: '',
        attachment: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.prompt && !data.attachment) return;

        post(route('chat.ask'), {
            onSuccess: () => {
                reset('prompt', 'attachment'); // Clear form on success
                // No need to manually update messages state here, Inertia will re-render with new props
            },
        });
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
{chatHistory.map((msg) => ( // change index to msg.id for a stable key
    <div key={msg.id} className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div
            className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-lg shadow-md ${
                msg.sender === 'user'
                    ? 'bg-blue-600 text-white' // User bubble: bright and clear
                    : 'bg-slate-800 text-gray-200 border border-slate-700' // Bot bubble: dark, integrated
            }`}
        >
            {/* If there's a file, display it */}
            {msg.file_path && msg.mime_type?.startsWith('image/') && (
                <img src={`/storage/${msg.file_path}`} className="rounded-lg mb-2 max-w-xs" alt={msg.file_name} />
            )}
            {msg.file_path && !msg.mime_type?.startsWith('image/') && (
                <a href={`/storage/${msg.file_path}`} target="_blank" className="text-blue-400 hover:underline">Download {msg.file_name}</a>
            )}

            {/* THIS IS THE FIX: Just use msg.text now */}
            {msg.text && (
                msg.sender === 'bot' 
                    ? <FormattedBotMessage text={msg.text} /> 
                    : msg.text
            )}
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
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            {/* File Preview */}
                            {data.attachment && (
                                <div className="p-2 mb-2 bg-slate-700/50 rounded-md text-sm text-gray-300">
                                    Attached: {data.attachment.name}
                                </div>
                            )}

                            <div className="flex items-center space-x-2">
                                {/* Paperclip Icon to trigger file input */}
                                <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 text-gray-400 hover:text-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.75c-1.136 0-2.2-.383-3.084-1.025l-3.86-2.574a1.125 1.125 0 0 1-.442-1.185c.074-.27.208-.515.37-.708.232-.266.531-.46.87-.555.328-.092.676-.092 1.004 0L9.75 9.75m.376-9.75V7.5h-1.5m0 0-.69.389m7.5 0a1.125 1.125 0 0 1 1.185.442l3.86 2.574c.884.642 1.399 1.668 1.399 2.75 0 1.083-.515 2.109-1.399 2.75l-3.86 2.574a1.125 1.125 0 0 1-1.185.442h-.142c-.27-.074-.515-.208-.708-.37a1.125 1.125 0 0 1-.555-.87c-.092-.328-.092-.676 0-1.004l1.292-2.584m7.5-6.75h-1.5m0 0v-1.5m0 1.5-.389-.69M7.5 12.75h-1.5m0 0v-1.5m0 1.5.389-.69m0 6.75h-1.5m0 0v-1.5m0 1.5.389-.69m-3.75 0 .69.389m1.5 0a1.125 1.125 0 0 1 .442 1.185l-2.574 3.86c-.642.884-1.668 1.399-2.75 1.399-1.083 0-2.109-.515-2.75-1.399l-2.574-3.86a1.125 1.125 0 0 1-.442-1.185V6.75m4.5 0h-1.5m0 0V5.25m0 1.5-.69-.389Z" />
                                    </svg>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={(e) => setData('attachment', e.target.files[0])}
                                />

                                <TextInput
                                    type="text"
                                    value={data.prompt}
                                    onChange={(e) => setData('prompt', e.target.value)}
                                    placeholder="Ask something..."
                                    className="flex-1 bg-slate-800/50 border-slate-600 focus:ring-yellow-500 focus:border-yellow-500 text-gray-200"
                                    disabled={processing}
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey ? handleSubmit(e) : null}
                                />
                                <PrimaryButton type="submit" disabled={processing}>
                                    {processing ? '...' : 'Send'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
}
