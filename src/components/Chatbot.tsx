import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Static FAQ Data ───────────────────────────────────────── */
const FAQ_DATA = [
    {
        question: 'How can I join as a volunteer?',
        answer: 'You can join as a volunteer by contacting us through the Contact page or emailing us at connect@arunyaedu.org.',
    },
    {
        question: 'How can I contact the foundation?',
        answer: 'You can contact us through our Contact page or email us at connect@arunyaedu.org.',
    },
    {
        question: 'What does Arunya Foundation do?',
        answer: 'Arunya Foundation works toward spreading education and creating opportunities for underprivileged communities.',
    },
    {
        question: 'Who can become a volunteer?',
        answer: 'Anyone passionate about education, social impact, and helping communities can join as a volunteer.',
    },
    {
        question: 'Is there any registration fee for volunteering?',
        answer: 'No, volunteering with Arunya Foundation is completely free.',
    },
    {
        question: 'What programs does the foundation run?',
        answer: 'Arunya Foundation organizes educational and community support initiatives for underprivileged children and communities.',
    },
    {
        question: 'How can I support the foundation?',
        answer: 'You can support the foundation by volunteering, spreading awareness, and participating in community initiatives.',
    },
    {
        question: 'Where is the foundation located?',
        answer: 'Please contact us through email or the Contact page for location and collaboration details.',
    },
];

/* ── Types ──────────────────────────────────────────────────── */
interface ChatMessage {
    id: string;
    role: 'user' | 'bot';
    text: string;
    timestamp: Date;
}

/* ── Static FAQ matcher ────────────────────────────────────── */
function findAnswer(query: string): string {
    const q = query.toLowerCase().trim();

    // Direct keyword matching with scoring
    let bestMatch: typeof FAQ_DATA[0] | null = null;
    let bestScore = 0;

    for (const faq of FAQ_DATA) {
        const faqQ = faq.question.toLowerCase();
        const faqWords = faqQ.split(/\s+/);
        const queryWords = q.split(/\s+/);

        // Check for exact question match
        if (q === faqQ || q === faqQ.replace('?', '')) {
            return faq.answer;
        }

        // Score based on matching words
        let score = 0;
        for (const word of queryWords) {
            if (word.length > 2 && faqWords.some(fw => fw.includes(word) || word.includes(fw))) {
                score++;
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestMatch = faq;
        }
    }

    if (bestMatch && bestScore >= 2) {
        return bestMatch.answer;
    }

    // Keyword-based fallback
    if (q.includes('volunteer') || q.includes('join')) {
        return FAQ_DATA[0].answer;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
        return FAQ_DATA[1].answer;
    }
    if (q.includes('what') && (q.includes('do') || q.includes('about') || q.includes('arunya'))) {
        return FAQ_DATA[2].answer;
    }
    if (q.includes('who') && q.includes('volunteer')) {
        return FAQ_DATA[3].answer;
    }
    if (q.includes('fee') || q.includes('cost') || q.includes('free') || q.includes('charge')) {
        return FAQ_DATA[4].answer;
    }
    if (q.includes('program') || q.includes('initiative') || q.includes('class')) {
        return FAQ_DATA[5].answer;
    }
    if (q.includes('support') || q.includes('help') || q.includes('contribute')) {
        return FAQ_DATA[6].answer;
    }
    if (q.includes('where') || q.includes('location') || q.includes('address')) {
        return FAQ_DATA[7].answer;
    }

    return "I'm sorry, I don't have information about that. You can reach us at connect@arunyaedu.org or visit our Contact page for more help. 🙏";
}

/* ── Component ──────────────────────────────────────────────── */
export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);
    const [hasBeenOpened, setHasBeenOpened] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /* Auto-scroll */
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    /* Focus input when opened */
    useEffect(() => {
        if (isOpen) {
            setHasBeenOpened(true);
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    /* ── Send handler ─────────────────────────────────────────── */
    const handleSend = (text?: string) => {
        const msg = (text || input).trim();
        if (!msg) return;

        setShowWelcome(false);
        setInput('');

        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            text: msg,
            timestamp: new Date(),
        };

        const answer = findAnswer(msg);

        const botMsg: ChatMessage = {
            id: `bot-${Date.now()}`,
            role: 'bot',
            text: answer,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg, botMsg]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setShowWelcome(true);
    };

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
                    >
                        {/* ── Header ── */}
                        <div className="chatbot-header">
                            <div className="chatbot-header-left">
                                <div className="chatbot-avatar">
                                    <img src="/logo.png" alt="Arunya" className="chatbot-avatar-img" />
                                    <span className="chatbot-status-dot" />
                                </div>
                                <div>
                                    <h3 className="chatbot-title">Arunya FAQ</h3>
                                    <span className="chatbot-subtitle">
                                        Ask us anything
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
                        <div className="chatbot-body">
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
                                    <p>Tap a question below or type your own to get started.</p>

                                    <div className="chatbot-quick-actions">
                                        {FAQ_DATA.slice(0, 4).map((faq, i) => (
                                            <button
                                                key={i}
                                                className="chatbot-chip"
                                                onClick={() => handleSend(faq.question)}
                                            >
                                                {faq.question}
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
                                        <span>{msg.text}</span>
                                        <span className="chatbot-time">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Quick reply suggestions after a bot response */}
                            {messages.length > 0 && messages[messages.length - 1]?.role === 'bot' && (
                                <motion.div
                                    className="chatbot-quick-reply-row"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    {FAQ_DATA.slice(4, 7).map((faq, i) => (
                                        <button
                                            key={i}
                                            className="chatbot-chip chatbot-chip--small"
                                            onClick={() => handleSend(faq.question)}
                                        >
                                            {faq.question}
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
                                    placeholder="Type your question..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoComplete="off"
                                />
                                <motion.button
                                    className="chatbot-send-btn"
                                    onClick={() => handleSend()}
                                    disabled={!input.trim()}
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
                                Arunya Foundation FAQ
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
