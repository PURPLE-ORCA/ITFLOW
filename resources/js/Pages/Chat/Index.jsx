import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '../../Components/TextInput';
import PrimaryButton from '../../Components/PrimaryButton';
import ProjectLayout from '../../Layouts/ProjectLayout';
import ReactMarkdown from 'react-markdown'; 

const FormattedBotMessage = ({ text }) => {
    return (
        <ReactMarkdown
            components={{
                ul: ({ node, ...props }) => <ul className="list-disc list-inside" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside" {...props} />,
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
            }}
        >
            {text}
        </ReactMarkdown>
    );
};

const TypingIndicator = () => (
    <div className="flex items-end justify-start">
        <div className="max-w-xl lg:max-w-2xl px-4 py-3 rounded-lg shadow-md bg-slate-800 text-gray-200 border border-slate-700">
            <div className="flex items-center justify-center space-x-1">
                <span className="typing-dot"></span>
                <span className="typing-dot" style={{ animationDelay: '0.2s' }}></span>
                <span className="typing-dot" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    </div>
);


export default function ChatIndex({ auth, messages }) {
    const initialMessage = {
      id: 'init-0',
      sender: 'bot',
      text: "Hello! How can I help you with your project today?",
    };

    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    const { data, setData, post, processing, errors, reset } = useForm({
        prompt: '',
        attachment: null,
    });
    
    const chatHistory = messages.length > 0 ? messages : [initialMessage];

    useEffect(() => {
        scrollToBottom();
    }, [messages, processing]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.prompt && !data.attachment) return;

        post(route('chat.ask'), {
            onSuccess: () => {
                reset('prompt', 'attachment');
            },
            preserveScroll: true,
            progress: false, 
        });
    };

    return (
        <ProjectLayout user={auth.user}>
            <Head title="AI Assistant" />

            <style>{`
                /* ... your custom-scrollbar styles are fine ... */
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.1); border-radius: 20px; border: 3px solid transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(255, 255, 255, 0.2); }

                /* --- 4. ADD CSS FOR THE TYPING INDICATOR --- */
                @keyframes typing-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                .typing-dot {
                    width: 8px;
                    height: 8px;
                    background-color: #cbd5e1; /* slate-300 */
                    border-radius: 50%;
                    animation: typing-pulse 1.5s infinite ease-in-out;
                }
            `}</style>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl flex flex-col h-[85vh] mt-6">
                    <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
                        {chatHistory.map((msg) => (
                            <div key={msg.id} className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-lg shadow-md ${
                                        msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-200 border border-slate-700'
                                    }`}
                                >
                                    {msg.file_path && msg.mime_type?.startsWith('image/') && (
                                        <img src={`/storage/${msg.file_path}`} className="rounded-lg mb-2 max-w-xs" alt={msg.file_name} />
                                    )}
                                    {msg.file_path && !msg.mime_type?.startsWith('image/') && (
                                        <a href={`/storage/${msg.file_path}`} target="_blank" className="block mb-2 text-blue-400 hover:underline">Download {msg.file_name}</a>
                                    )}
                                    {msg.text && (msg.sender === 'bot' ? <FormattedBotMessage text={msg.text} /> : msg.text)}
                                </div>
                            </div>
                        ))}
                        
                        {processing && <TypingIndicator />}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-slate-700/50">
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            {data.attachment && (
                                <div className="p-2 mb-2 bg-slate-700/50 rounded-md text-sm text-gray-300">
                                    Attached: {data.attachment.name}
                                </div>
                            )}
                            <div className="flex items-center space-x-2">
                                <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 text-gray-400 hover:text-gray-200" disabled={processing}>
                                    {/* ... your svg ... */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.75c-1.136 0-2.2-.383-3.084-1.025l-3.86-2.574a1.125 1.125 0 0 1-.442-1.185c.074-.27.208-.515.37-.708.232-.266.531-.46.87-.555.328-.092.676-.092 1.004 0L9.75 9.75m.376-9.75V7.5h-1.5m0 0-.69.389m7.5 0a1.125 1.125 0 0 1 1.185.442l3.86 2.574c.884.642 1.399 1.668 1.399 2.75 0 1.083-.515 2.109-1.399 2.75l-3.86 2.574a1.125 1.125 0 0 1-1.185.442h-.142c-.27-.074-.515-.208-.708-.37a1.125 1.125 0 0 1-.555-.87c-.092-.328-.092-.676 0-1.004l1.292-2.584m7.5-6.75h-1.5m0 0v-1.5m0 1.5-.389-.69M7.5 12.75h-1.5m0 0v-1.5m0 1.5.389-.69m0 6.75h-1.5m0 0v-1.5m0 1.5.389-.69m-3.75 0 .69.389m1.5 0a1.125 1.125 0 0 1 .442 1.185l-2.574 3.86c-.642.884-1.668 1.399-2.75 1.399-1.083 0-2.109-.515-2.75-1.399l-2.574-3.86a1.125 1.125 0 0 1-.442-1.185V6.75m4.5 0h-1.5m0 0V5.25m0 1.5-.69-.389Z" /></svg>
                                </button>
                                <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setData('attachment', e.target.files[0])} disabled={processing} />
                                <TextInput type="text" value={data.prompt} onChange={(e) => setData('prompt', e.target.value)} placeholder="Ask something..." className="flex-1 bg-slate-800/50 border-slate-600 focus:ring-yellow-500 focus:border-yellow-500 text-gray-200" disabled={processing} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey ? handleSubmit(e) : null} />
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
