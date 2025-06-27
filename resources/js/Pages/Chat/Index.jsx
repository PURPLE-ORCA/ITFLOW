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
                ul: ({ node, ...props }) => <ul className="list-disc list-inside text-blue-100" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-blue-100" {...props} />,
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0 text-blue-100" {...props} />,
            }}
        >
            {text}
        </ReactMarkdown>
    );
};

const TypingIndicator = () => (
    <div className="flex items-end justify-start animate-message-slide-in">
        <div className="electric-message-container bot-message">
            <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                    <div className="electric-dot dot-1"></div>
                    <div className="electric-dot dot-2"></div>
                    <div className="electric-dot dot-3"></div>
                </div>
                <span className="text-sm text-blue-200 font-medium electric-text">L'assistant génère une réponse...</span>
            </div>
        </div>
    </div>
);

const FloatingParticles = () => (
    <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
    </div>
);

export default function ChatIndex({ auth, messages }) {
    const initialMessage = {
        id: 'init-0',
        sender: 'bot',
        text: "Bonjour ! Je suis votre Assistant Électrique IA. Comment puis-je illuminer votre journée ?",
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
            <Head title="Assistant Électrique IA" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:wght@300;400;500;600;700&display=swap');

                :root {
                    /* Electric palette */
                    --electric-blue: #0066ff;
                    --deep-blue: #003d99;
                    --light-blue: #3399ff;
                    --blue-glow: rgba(0, 102, 255, 0.4);
                    --blue-transparent: rgba(0, 102, 255, 0.1);
                    --blue-glass: rgba(0, 102, 255, 0.05);

                    --electric-yellow: #ffcc00;
                    --bright-yellow: #ffdd33;
                    --golden-yellow: #ffaa00;
                    --yellow-glow: rgba(255, 204, 0, 0.5);
                    --yellow-transparent: rgba(255, 204, 0, 0.15);

                    --glass-primary: rgba(255, 255, 255, 0.08);
                    --glass-secondary: rgba(255, 255, 255, 0.03);
                    --backdrop-strong: blur(25px);
                    --backdrop-light: blur(15px);

                    /* Animations */
                    --bounce-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    --smooth-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }

                * {
                    font-family: 'Exo 2', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                .electric-title {
                    font-family: 'Orbitron', monospace;
                    font-weight: 700;
                }

                /* Electric header */
                .electric-header {
                    background: linear-gradient(135deg,
                        var(--deep-blue) 0%,
                        var(--electric-blue) 50%,
                        var(--light-blue) 100%);
                    border-radius: 20px 20px 0 0;
                    position: relative;
                    overflow: hidden;
                }

                .electric-header::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent);
                    animation: shine 3s infinite;
                }

                @keyframes shine {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }

                .electric-logo {
                    background: linear-gradient(135deg, var(--electric-yellow), var(--golden-yellow));
                    border-radius: 15px;
                    padding: 12px;
                    box-shadow:
                        0 0 20px var(--yellow-glow),
                        inset 0 2px 10px rgba(255, 255, 255, 0.3);
                    position: relative;
                }

                .electric-logo::before {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    right: 2px;
                    height: 50%;
                    background: linear-gradient(180deg,
                        rgba(255, 255, 255, 0.4),
                        transparent);
                    border-radius: 10px 10px 0 0;
                }

                /* Electric messages */
                .electric-message-container {
                    padding: 16px 20px;
                    border-radius: 20px;
                    position: relative;
                    backdrop-filter: var(--backdrop-light);
                    transition: all 0.3s var(--smooth-ease);
                    max-width: 600px;
                }

                .electric-message-container:hover {
                    transform: translateY(-2px);
                }

                .user-message {
                    background: linear-gradient(135deg,
                        var(--electric-yellow) 0%,
                        var(--bright-yellow) 100%);
                    color: #1a1a1a;
                    box-shadow:
                        0 8px 25px var(--yellow-glow),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    border: 1px solid var(--golden-yellow);
                }

                .user-message::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: -10px;
                    width: 0;
                    height: 0;
                    border: 10px solid transparent;
                    border-left-color: var(--bright-yellow);
                    transform: translateY(-50%);
                }

                .bot-message {
                    background: linear-gradient(135deg,
                        var(--glass-primary) 0%,
                        var(--blue-glass) 100%);
                    border: 1px solid var(--blue-transparent);
                    color: #e0f2fe;
                    box-shadow:
                        0 8px 25px var(--blue-glow),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }

                .bot-message::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: -10px;
                    width: 0;
                    height: 0;
                    border: 10px solid transparent;
                    border-right-color: var(--blue-glass);
                    transform: translateY(-50%);
                }

                /* Electric avatars */
                .electric-avatar {
                    width: 45px;
                    height: 45px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    transition: all 0.3s var(--bounce-elastic);
                }

                .electric-avatar:hover {
                    transform: scale(1.1) rotate(5deg);
                }

                .avatar-bot {
                    background: linear-gradient(135deg, var(--electric-blue), var(--light-blue));
                    box-shadow:
                        0 0 20px var(--blue-glow),
                        inset 0 2px 10px rgba(255, 255, 255, 0.2);
                }

                .avatar-user {
                    background: linear-gradient(135deg, var(--electric-yellow), var(--golden-yellow));
                    box-shadow:
                        0 0 20px var(--yellow-glow),
                        inset 0 2px 10px rgba(255, 255, 255, 0.3);
                }

                /* Electric typing indicator */
                .electric-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    animation: electric-bounce 1.4s infinite ease-in-out;
                }

                .dot-1 {
                    background: var(--electric-yellow);
                    box-shadow: 0 0 10px var(--yellow-glow);
                    animation-delay: 0s;
                }

                .dot-2 {
                    background: var(--electric-blue);
                    box-shadow: 0 0 10px var(--blue-glow);
                    animation-delay: 0.2s;
                }

                .dot-3 {
                    background: var(--electric-yellow);
                    box-shadow: 0 0 10px var(--yellow-glow);
                    animation-delay: 0.4s;
                }

                .electric-text {
                    text-shadow: 0 0 10px var(--blue-glow);
                }

                /* Electric buttons */
                .electric-button {
                    padding: 12px 20px;
                    border-radius: 15px;
                    font-weight: 600;
                    transition: all 0.3s var(--bounce-elastic);
                    border: none;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .electric-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg,
                        transparent,
                        rgba(255, 255, 255, 0.3),
                        transparent);
                    transition: left 0.5s;
                }

                .electric-button:hover::before {
                    left: 100%;
                }

                .electric-button:hover {
                    transform: translateY(-2px) scale(1.05);
                }

                .electric-button:active {
                    transform: translateY(0) scale(0.98);
                }

                .button-primary {
                    background: linear-gradient(135deg, var(--electric-blue), var(--light-blue));
                    color: white;
                    box-shadow:
                        0 6px 20px var(--blue-glow),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }

                .button-primary:hover {
                    box-shadow:
                        0 8px 25px var(--blue-glow),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }

                .button-secondary {
                    background: var(--glass-primary);
                    border: 1px solid var(--blue-transparent);
                    color: var(--electric-blue);
                    backdrop-filter: var(--backdrop-light);
                }

                .button-secondary:hover {
                    background: var(--blue-transparent);
                    border-color: var(--electric-blue);
                    color: var(--light-blue);
                }

                /* Electric input */
                .electric-input {
                    background: var(--glass-primary);
                    border: 2px solid var(--blue-transparent);
                    border-radius: 15px;
                    padding: 14px 18px;
                    color: #e0f2fe;
                    transition: all 0.3s var(--smooth-ease);
                    backdrop-filter: var(--backdrop-light);
                    resize: none;
                    font-size: 16px;
                }

                .electric-input::placeholder {
                    color: #64b5f6;
                }

                .electric-input:focus {
                    outline: none;
                    border-color: var(--electric-blue);
                    box-shadow:
                        0 0 0 3px var(--blue-transparent),
                        0 0 20px var(--blue-glow);
                    background: var(--blue-glass);
                }

                /* Attachment zone */
                .attachment-zone {
                    background: var(--yellow-transparent);
                    border: 2px dashed var(--electric-yellow);
                    border-radius: 12px;
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    backdrop-filter: var(--backdrop-light);
                }

                /* Floating input zone */
                .floating-input-zone {
                    background: var(--glass-primary);
                    backdrop-filter: var(--backdrop-strong);
                    border-top: 1px solid var(--blue-transparent);
                    border-radius: 0 0 25px 25px;
                    position: relative;
                }

                .floating-input-zone::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg,
                        transparent,
                        var(--electric-blue),
                        var(--electric-yellow),
                        var(--electric-blue),
                        transparent);
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .electric-message-container {
                        padding: 12px 16px;
                        max-width: 280px;
                    }

                    .electric-avatar {
                        width: 35px;
                        height: 35px;
                    }

                    .electric-button {
                        padding: 10px 16px;
                    }
                }

                /* Reduced motion preferences */
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }

                    .floating-particles {
                        display: none;
                    }
                }
            `}</style>

            <div className="electric-background">
                <FloatingParticles />

                {/* Electric header */}
                <div className="electric-header">
                    <div className="max-w-6xl mx-auto px-6 py-6">
                        <div className="flex items-center space-x-4">
                            <div className="electric-logo animate-electric-pulse">
                                <svg className="w-7 h-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white electric-title animate-neon-glow">
                                    Assistant Électrique IA
                                </h1>
                                <p className="text-sm text-blue-200 mt-1 font-medium">
                                    Alimenté par l'énergie pure de l'intelligence artificielle
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
                    {/* Main electric container */}
                    <div className="electric-container h-[80vh] flex flex-col animate-electric-pulse">

                        {/* Messages area */}
                        <div className="flex-1 p-8 overflow-y-auto electric-scrollbar space-y-8">
                            {chatHistory.map((msg, index) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} ${
                                        msg.sender === 'user' ? 'animate-message-slide-right' : 'animate-message-slide-in'
                                    }`}
                                >
                                    <div className="flex items-end space-x-4">
                                        {msg.sender === 'bot' && (
                                            <div className="electric-avatar avatar-bot">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}

                                        <div className={`electric-message-container ${
                                            msg.sender === 'user' ? 'user-message' : 'bot-message'
                                        }`}>
                                            {msg.file_path && msg.mime_type?.startsWith('image/') && (
                                                <div className="mb-4">
                                                    <img
                                                        src={`/storage/${msg.file_path}`}
                                                        className="rounded-xl max-w-xs shadow-lg border border-white/20"
                                                        alt={msg.file_name}
                                                    />
                                                </div>
                                            )}

                                            {msg.file_path && !msg.mime_type?.startsWith('image/') && (
                                                <div className="mb-4">
                                                    <a
                                                        href={`/storage/${msg.file_path}`}
                                                        target="_blank"
                                                        className="inline-flex items-center space-x-2 text-yellow-300 hover:text-yellow-200 transition-colors duration-200 font-medium"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span>Télécharger {msg.file_name}</span>
                                                    </a>
                                                </div>
                                            )}

                                            {msg.text && (
                                                <div className="prose prose-invert max-w-none">
                                                    {msg.sender === 'bot' ? <FormattedBotMessage text={msg.text} /> : msg.text}
                                                </div>
                                            )}
                                        </div>

                                        {msg.sender === 'user' && (
                                            <div className="electric-avatar avatar-user">
                                                <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {processing && <TypingIndicator />}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Floating input zone */}
                        <div className="floating-input-zone p-8">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {data.attachment && (
                                    <div className="attachment-zone">
                                        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                        <span className="text-sm text-yellow-200 flex-1 font-medium">
                                            Fichier joint : {data.attachment.name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setData('attachment', null)}
                                            className="text-red-400 hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-red-500/20"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}

                                <div className="flex items-end space-x-4">
                                    {/* Electric file button */}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        disabled={processing}
                                        className="electric-button button-secondary"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                    </button>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={(e) => setData('attachment', e.target.files[0])}
                                        disabled={processing}
                                    />

                                    {/* Electric text area */}
                                    <div className="flex-1 relative">
                                        <textarea
                                            value={data.prompt}
                                            onChange={(e) => setData('prompt', e.target.value)}
                                            placeholder="Écrivez votre message électrisant..."
                                            disabled={processing}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSubmit(e);
                                                }
                                            }}
                                            className="electric-input w-full min-h-[60px] max-h-32"
                                            rows="1"
                                        />
                                    </div>

                                    {/* Electric send button */}
                                    <button
                                        type="submit"
                                        disabled={processing || (!data.prompt && !data.attachment)}
                                        className="electric-button button-primary min-w-[60px] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
}