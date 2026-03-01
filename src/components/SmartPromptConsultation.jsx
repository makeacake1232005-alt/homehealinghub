import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../contexts/LanguageContext'
import './SmartPromptConsultation.css'

export default function SmartPromptConsultation({ onComplete }) {
    const [input, setInput] = useState('')
    const [suggestion, setSuggestion] = useState(null)
    const [phase, setPhase] = useState('input')
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', intensity: 'Moderate' })
    const inputRef = useRef(null)
    const { t } = useLang()

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

        const found = t.suggestions.find(s => s.keywords.some(k => val.includes(k)))
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
            <div className="smart-bg-wrapper">
                <img src="/spa-banner.png" alt="Spa Background" className="smart-bg-image" />
                <div className="smart-bg-overlay" />
                <div className="ambient-ray ray-1" />
                <div className="ambient-ray ray-2" />
                <div className="ambient-ray ray-3" />
            </div>

            {/* Floating nature particles */}
            <div className="smart-particles">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="smart-particle"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${10 + Math.random() * 80}%`,
                            width: `${3 + Math.random() * 5}px`,
                            height: `${3 + Math.random() * 5}px`,
                        }}
                        animate={{
                            y: [0, -30 - Math.random() * 40, 0],
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {phase === 'input' && (
                    <motion.div
                        key="input-phase"
                        className="smart-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Decorative icon above input */}
                        <motion.div
                            className="input-icon-decor"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring' }}
                        >
                            🌿
                        </motion.div>

                        <div className="smart-input-wrapper">
                            <input
                                ref={inputRef}
                                type="text"
                                className="smart-giant-input"
                                placeholder={t.inputPlaceholder}
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
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    onClick={() => handleSelect(suggestion.text)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="suggestion-text">{suggestion.text}</span>
                                    <span className="suggestion-hint">{t.suggestionHint}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

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

                {phase === 'form' && (
                    <motion.div
                        key="form-phase"
                        className="smart-dashboard"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="dashboard-header">
                            <h2>{t.healingPath}: <span>{input}</span></h2>
                        </div>

                        <div className="dashboard-content no-chat">
                            <div className="smart-form-section-wrapper standalone-form">
                                <img src="/meditation.png" alt="Meditation" className="form-bg-img" />
                                <div className="smart-form-section">
                                    <h3>{t.reservationTitle}</h3>
                                    <form onSubmit={handleSubmitForm} className="smart-form">
                                        <div className="form-group-modern">
                                            <input type="text" id="sf-name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder=" " />
                                            <label htmlFor="sf-name">{t.labelName}</label>
                                        </div>
                                        <div className="form-group-modern">
                                            <input type="tel" id="sf-phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder=" " />
                                            <label htmlFor="sf-phone">{t.labelPhone}</label>
                                        </div>
                                        <div className="form-group-modern">
                                            <input type="email" id="sf-email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder=" " />
                                            <label htmlFor="sf-email">{t.labelEmail}</label>
                                        </div>
                                        <div className="form-group-modern select-modern">
                                            <select id="sf-intensity" value={formData.intensity} onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}>
                                                <option value="Mild">{t.intensityMild}</option>
                                                <option value="Moderate">{t.intensityModerate}</option>
                                                <option value="Severe">{t.intensitySevere}</option>
                                            </select>
                                        </div>
                                        <motion.button
                                            type="submit"
                                            className="smart-submit-btn"
                                            whileHover={{ scale: 1.02, boxShadow: '0 20px 50px rgba(92, 122, 61, 0.4)' }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {t.submitBtn}
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
