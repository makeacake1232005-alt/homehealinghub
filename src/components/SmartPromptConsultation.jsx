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

    // Form state
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', intensity: 'Vừa' })

    const inputRef = useRef(null)

    useEffect(() => {
        if (phase === 'input') {
            setTimeout(() => inputRef.current?.focus(), 500)
        }
    }, [phase])

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

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.phone) return;

        onComplete({
            name: formData.name,
            condition: input,
            messages: [],
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

                        <div className="dashboard-content no-chat">
                            {/* Full Form Centered */}
                            <div className="smart-form-section-wrapper standalone-form">
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
