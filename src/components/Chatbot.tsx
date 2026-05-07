import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { sendMessage, resetChat, isConfigured } from '../lib/gemini';

/* ── Types ──────────────────────────────────────────────────── */
interface ChatMessage {
    id: string;
    role: 'user' | 'bot';
    text: string;
    timestamp: Date;
}

/* ── Quick suggestion chips ─────────────────────────────────── */
const QUICK_ACTIONS = [
    { label: '💖 How can I donate?', message: 'How can I donate to Arunya Foundation?' },
    { label: '🤝 Become a volunteer', message: 'I want to volunteer with Arunya Foundation' },
    { label: '📚 Our programs', message: 'What programs does Arunya Foundation offer?' },
    { label: '📞 Contact us', message: 'How can I contact Arunya Foundation?' },
    { label: '👶 Sponsor a child', message: 'How can I sponsor a child through Arunya Foundation?' },
    { label: '🎯 NGO mission', message: 'What is the mission of Arunya Foundation?' },
];

/* ── Markdown-lite renderer ─────────────────────────────────── */
function renderMarkdown(text: string): string {
    return text
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Bullet points
        .replace(/^[•\-\*]\s+(.+)/gm, '<li>$1</li>')
        // Wrap consecutive <li> in <ul>
        .replace(/(<li>.*?<\/li>\n?)+/gs, (match) => `<ul>${match}</ul>`)
        // Headings
        .replace(/^###\s+(.+)/gm, '<h4>$1</h4>')
        .replace(/^##\s+(.+)/gm, '<h3>$1</h3>')
        // Line breaks
        .replace(/\n/g, '<br/>');
}

/* ── Component ──────────────────────────────────────────────── */
export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [hasBeenOpened, setHasBeenOpened] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();

    /* Auto-scroll */
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, scrollToBottom]);

    /* Focus input when opened */
    useEffect(() => {
        if (isOpen) {
            setHasBeenOpened(true);
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    /* ── Send handler ─────────────────────────────────────────── */
    const handleSend = async (text?: string) => {
        const msg = (text || input).trim();
        if (!msg || isLoading) return;

        setShowWelcome(false);
        setInput('');

        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            text: msg,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const response = await sendMessage(msg);
            const botMsg: ChatMessage = {
                id: `bot-${Date.now()}`,
                role: 'bot',
                text: response,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMsg]);
        } catch {
            const errorMsg: ChatMessage = {
                id: `err-${Date.now()}`,
                role: 'bot',
                text: "Sorry, I couldn't process your request. Please try again! 🙏",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleNewChat = () => {
        resetChat();
        setMessages([]);
        setShowWelcome(true);
    };

    const configured = isConfigured();

    /* ── Render ────────────────────────────────────────────────── */
    return (
        <>
            {/* ═══════════ Floating Action Button ═══════════ */}
            <motion.button
                id="chatbot-fab"
                className={`chatbot-fab ${!hasBeenOpened ? 'chatbot-fab--pulse' : ''}`}
                onClick={() => setIsOpen(v => !v)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </motion.svg>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                <circle cx="9" cy="10" r="1" fill="currentColor" />
                                <circle cx="12" cy="10" r="1" fill="currentColor" />
                                <circle cx="15" cy="10" r="1" fill="currentColor" />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Badge hint */}
                {!hasBeenOpened && !isOpen && (
                    <span className="chatbot-fab-badge">💬</span>
                )}
            </motion.button>

            {/* ═══════════ Chat Panel ═══════════ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-panel"
                        initial={{ opacity: 0, y: 30, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.92 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        drag
                        dragControls={dragControls}
                        dragMomentum={false}
                        dragElastic={0.1}
                        dragConstraints={{
                            top: -300,
                            left: -600,
                            right: 100,
                            bottom: 100,
                        }}
                    >
                        {/* ── Header (drag handle) ── */}
                        <div
                            className="chatbot-header"
                            onPointerDown={(e) => dragControls.start(e)}
                            style={{ cursor: 'grab' }}
                        >
                            <div className="chatbot-header-left">
                                <div className="chatbot-avatar">
                                    <img src="/logo.png" alt="Arunya" className="chatbot-avatar-img" />
                                    <span className="chatbot-status-dot" />
                                </div>
                                <div>
                                    <h3 className="chatbot-title">Arunya Assistant</h3>
                                    <span className="chatbot-subtitle">
                                        {isLoading ? (
                                            <span className="chatbot-typing-label">
                                                <span className="chatbot-typing-dot-inline" />
                                                <span className="chatbot-typing-dot-inline" />
                                                <span className="chatbot-typing-dot-inline" />
                                                <span style={{ marginLeft: 4 }}>Typing</span>
                                            </span>
                                        ) : 'Online • Ask me anything'}
                                    </span>
                                </div>
                            </div>
                            <div className="chatbot-header-actions">
                                <button
                                    className="chatbot-icon-btn"
                                    onClick={handleNewChat}
                                    title="New conversation"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M1 4v6h6" />
                                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                                    </svg>
                                </button>
                                <button
                                    className="chatbot-icon-btn"
                                    onClick={() => setIsOpen(false)}
                                    title="Close chat"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* ── Body ── */}
                        <div className="chatbot-body" ref={chatBodyRef}>
                            {/* Welcome screen */}
                            {showWelcome && messages.length === 0 && (
                                <motion.div
                                    className="chatbot-welcome"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <div className="chatbot-welcome-icon">🌟</div>
                                    <h4>Welcome to Arunya Foundation!</h4>
                                    <p>I'm here to help you learn about our mission, programs, and how you can make a difference.</p>

                                    {!configured && (
                                        <div className="chatbot-config-notice">
                                            <span>⚙️</span>
                                            <span>Gemini API key needed. Add <code>VITE_GEMINI_API_KEY</code> to your <code>.env</code> file.</span>
                                        </div>
                                    )}

                                    <div className="chatbot-quick-actions">
                                        {QUICK_ACTIONS.map((action) => (
                                            <button
                                                key={action.label}
                                                className="chatbot-chip"
                                                onClick={() => handleSend(action.message)}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Messages */}
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={msg.id}
                                    className={`chatbot-msg ${msg.role}`}
                                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: i * 0.03, duration: 0.3 }}
                                >
                                    {msg.role === 'bot' && (
                                        <div className="chatbot-msg-avatar">
                                            <img src="/logo.png" alt="A" />
                                        </div>
                                    )}
                                    <div className={`chatbot-bubble ${msg.role}`}>
                                        {msg.role === 'bot' ? (
                                            <div
                                                className="chatbot-md"
                                                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                                            />
                                        ) : (
                                            <span>{msg.text}</span>
                                        )}
                                        <span className="chatbot-time">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isLoading && (
                                <motion.div
                                    className="chatbot-msg bot"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="chatbot-msg-avatar">
                                        <img src="/logo.png" alt="A" />
                                    </div>
                                    <div className="chatbot-bubble bot">
                                        <div className="chatbot-typing">
                                            <span className="typing-dot" />
                                            <span className="typing-dot" />
                                            <span className="typing-dot" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Quick reply suggestions after a bot response */}
                            {messages.length > 0 && !isLoading && messages[messages.length - 1]?.role === 'bot' && (
                                <motion.div
                                    className="chatbot-quick-reply-row"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    {QUICK_ACTIONS.slice(0, 3).map((action) => (
                                        <button
                                            key={action.label}
                                            className="chatbot-chip chatbot-chip--small"
                                            onClick={() => handleSend(action.message)}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* ── Footer / Input ── */}
                        <div className="chatbot-footer">
                            <div className="chatbot-input-row">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="chatbot-input"
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isLoading}
                                    autoComplete="off"
                                />
                                <motion.button
                                    className="chatbot-send-btn"
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isLoading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </motion.button>
                            </div>
                            <div className="chatbot-powered-by">
                                Powered by Arunya Foundation AI
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
