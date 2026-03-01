import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './SmartPromptConsultation.css'

const SUGGESTIONS = [
    { keywords: ['v', 'va', 'vai', 'gáy', 'cổ'], text: 'Đau mỏi vai gáy?', id: 'vai-gay' },
    { keywords: ['m', 'ng', 'ngủ', 'mất', 'khó'], text: 'Mất ngủ kéo dài?', id: 'mat-ngu' },
    { keywords: ['s', 'st', 'căng', 'thẳng', 'stress'], text: 'Stress ngập đầu?', id: 'stress' },
    { keywords: ['l', 'ư', 'lưng', 'đau'], text: 'Đau nhức thắt lưng?', id: 'that-lung' },
]

export default function SmartPromptConsultation({ onComplete }) {
    const [input, setInput] = useState('')
    const [suggestion, setSuggestion] = useState(null)
    const [phase, setPhase] = useState('input') // 'input' | 'epic' | 'form'

    // Form and Chat state
    const [chatMessages, setChatMessages] = useState([])
    const [chatInput, setChatInput] = useState('')
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', intensity: 'Vừa' })

    const inputRef = useRef(null)
    const chatEndRef = useRef(null)

    useEffect(() => {
        if (phase === 'input') {
            setTimeout(() => inputRef.current?.focus(), 500)
        }
    }, [phase])

    useEffect(() => {
        if (phase === 'form' && chatMessages.length === 0) {
            const topic = input || (suggestion && suggestion.text?.replace('?', '')) || 'sức khỏe'
            setChatMessages([
                { sender: 'bot', text: `Chào bạn, tôi rất hiểu cảm giác khi bị ${topic}. Tôi là trợ lý AI của Home Healing Hub. Bạn muốn chia sẻ thêm gì với tôi không? Hoặc hãy hoàn thành form bên cạnh để nhận phác đồ trị liệu riêng nhé.` }
            ])
        }
    }, [phase])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatMessages])

    const handleInputChange = (e) => {
        const val = e.target.value.toLowerCase()
        setInput(e.target.value)

        if (!val.trim()) {
            setSuggestion(null)
            return
        }

        const found = SUGGESTIONS.find(s => s.keywords.some(k => val.includes(k)))
        if (found) {
            setSuggestion(found)
        } else {
            setSuggestion({ text: e.target.value + '?', id: 'custom' })
        }
    }

    const handleSelect = (text) => {
        setInput(text.replace('?', ''))
        setPhase('epic')
        setTimeout(() => setPhase('form'), 1500)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && suggestion) {
            handleSelect(suggestion.text)
        } else if (e.key === 'Enter' && input.trim()) {
            handleSelect(input)
        }
    }

    const handleSendChat = (e) => {
        e.preventDefault()
        if (!chatInput.trim()) return

        const newMsg = chatInput.trim()
        setChatMessages(prev => [...prev, { sender: 'user', text: newMsg }])
        setChatInput('')

        // Fake bot reply
        setTimeout(() => {
            setChatMessages(prev => [...prev, { sender: 'bot', text: 'Lắng nghe bạn. Tôi đã ghi nhận thêm chi tiết này vào hồ sơ của bạn. Hãy hoàn thiện thông tin bên phải để chúng ta bắt đầu nhé.' }])
        }, 1200)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.phone) return;

        onComplete({
            name: formData.name,
            condition: input,
            messages: chatMessages.filter(m => m.sender === 'user').map(m => m.text),
            formData: formData
        })
    }

    return (
        <div className="smart-consultation">
            {/* BACKGROUND IMAGES FOR LIGHT THEME */}
            <div className="smart-bg-wrapper">
                <img src="/spa-banner.png" alt="Spa Background" className="smart-bg-image" />
                <div className="smart-bg-overlay" />
            </div>

            <AnimatePresence mode="wait">
                {/* PHASE 1: THANH TÀNG HÌNH */}
                {phase === 'input' && (
                    <motion.div
                        key="input-phase"
                        className="smart-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="smart-input-wrapper">
                            <input
                                ref={inputRef}
                                type="text"
                                className="smart-giant-input"
                                placeholder="Bạn đang thấy khó chịu ở đâu?"
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                            />
                            <div className="smart-input-glow" />
                        </div>

                        <AnimatePresence>
                            {suggestion && (
                                <motion.div
                                    className="smart-suggestion"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onClick={() => handleSelect(suggestion.text)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="suggestion-text">{suggestion.text}</span>
                                    <span className="suggestion-hint">↵ Nhấn Enter hoặc Chạm</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* PHASE 2: EPIC TRANSITION */}
                {phase === 'epic' && (
                    <motion.div
                        key="epic-phase"
                        className="smart-breathing-phase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="smart-orb"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 5, 20], opacity: [1, 0.8, 0] }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                        >
                            <div className="orb-center" />
                        </motion.div>
                    </motion.div>
                )}

                {/* PHASE 3: CHAT BOX & FORM */}
                {phase === 'form' && (
                    <motion.div
                        key="form-phase"
                        className="smart-dashboard"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="dashboard-header">
                            <h2>Thiết kế Lộ Trình: <span>{input}</span></h2>
                        </div>

                        <div className="dashboard-content">
                            {/* Left: Chat Box */}
                            <div className="smart-chatbox-wrapper">
                                <img src="/essential-oils.png" alt="Oils" className="chat-bg-img" />
                                <div className="smart-chatbox">
                                    <div className="chat-messages">
                                        {chatMessages.map((msg, idx) => (
                                            <motion.div
                                                key={idx}
                                                className={`chat-bubble-wrap ${msg.sender}`}
                                                initial={{ opacity: 0, x: msg.sender === 'bot' ? -20 : 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                            >
                                                <div className="chat-bubble">
                                                    {msg.text}
                                                </div>
                                            </motion.div>
                                        ))}
                                        <div ref={chatEndRef} />
                                    </div>
                                    <form className="chat-input-area" onSubmit={handleSendChat}>
                                        <input
                                            type="text"
                                            placeholder="Trò chuyện với trợ lý Healing..."
                                            value={chatInput}
                                            onChange={(e) => setChatInput(e.target.value)}
                                        />
                                        <button type="submit" className="chat-send-btn">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Right: Full Form */}
                            <div className="smart-form-section-wrapper">
                                <img src="/meditation.png" alt="Meditation" className="form-bg-img" />
                                <div className="smart-form-section">
                                    <h3>Thông tin Đặt lịch</h3>
                                    <form onSubmit={handleSubmitForm} className="smart-form">
                                        <div className="form-group-modern">
                                            <input type="text" id="sf-name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder=" " />
                                            <label htmlFor="sf-name">Họ và Tên</label>
                                        </div>
                                        <div className="form-group-modern">
                                            <input type="tel" id="sf-phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder=" " />
                                            <label htmlFor="sf-phone">Số Điện Thoại</label>
                                        </div>
                                        <div className="form-group-modern">
                                            <input type="email" id="sf-email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder=" " />
                                            <label htmlFor="sf-email">Email (tùy chọn)</label>
                                        </div>
                                        <div className="form-group-modern select-modern">
                                            <select id="sf-intensity" value={formData.intensity} onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}>
                                                <option value="Nhẹ">Mức độ: Nhẹ (Thi thoảng đau)</option>
                                                <option value="Vừa">Mức độ: Vừa (Ảnh hưởng sinh hoạt)</option>
                                                <option value="Sâu">Mức độ: Nặng (Đau âm ỉ kéo dài)</option>
                                            </select>
                                        </div>
                                        <motion.button
                                            type="submit"
                                            className="smart-submit-btn"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Hoàn tất & Nhận Phác Đồ
                                        </motion.button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
