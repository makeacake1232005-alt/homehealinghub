import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../contexts/LanguageContext'
import './SmartPromptConsultation.css'

// Advanced NLP-like scoring engine
function analyzeCondition(text) {
    if (!text || !text.trim()) return { key: 'default', score: 0, matched: [] }
    const c = text.toLowerCase()

    const groups = {
        'energy-reset': {
            keywords: [
                'pain', 'shoulder', 'neck', 'back', 'sore', 'stiff', 'headache', 'head',
                'muscle', 'joint', 'ache', 'hurt', 'cramp', 'spine', 'knee', 'leg', 'arm',
                'body pain', 'chronic', 'inflammation', 'sciatica', 'posture', 'hip',
                'đau', 'vai', 'gáy', 'lưng', 'cổ', 'nhức', 'mỏi', 'cơ', 'khớp', 'đầu',
                'đau đầu', 'đau vai', 'đau lưng', 'đau cổ', 'co cứng', 'tê', 'buốt',
                'viêm', 'xương', 'gối', 'chân', 'tay', 'cột sống', 'thoái hóa'
            ]
        },
        'jetlag-recovery': {
            keywords: [
                'sleep', 'insomnia', 'tired', 'fatigue', 'exhausted', 'jetlag', 'jet lag',
                'drowsy', 'restless', 'cannot sleep', 'cant sleep', 'no energy', 'weak',
                'groggy', 'lethargic', 'yawn', 'sluggish', 'drained', 'worn out',
                'ngủ', 'mất ngủ', 'mệt', 'kiệt', 'uể oải', 'buồn ngủ', 'thiếu ngủ',
                'khó ngủ', 'không ngủ được', 'mệt mỏi', 'hết sức', 'yếu', 'ngáp',
                'trằn trọc', 'thao thức', 'suy nhược', 'bay xa', 'lệch múi giờ'
            ]
        },
        'silent-healing': {
            keywords: [
                'stress', 'tension', 'heavy', 'burnout', 'anxiety', 'overwhelm', 'overload',
                'mental', 'pressure', 'worry', 'nervous', 'panic', 'depressed', 'sad',
                'angry', 'frustrated', 'upset', 'overthink', 'fear', 'restless mind',
                'căng', 'căng thẳng', 'nặng', 'lo', 'áp lực', 'quá tải', 'stress',
                'lo âu', 'sợ', 'buồn', 'chán', 'bực', 'giận', 'tức', 'nghĩ nhiều',
                'hoảng', 'trầm cảm', 'kiệt sức tinh thần', 'bất an', 'nặng đầu'
            ]
        },
        'couple-healing': {
            keywords: [
                'couple', 'partner', 'together', 'romantic', 'relationship', 'love',
                'anniversary', 'date', 'wife', 'husband', 'girlfriend', 'boyfriend',
                'honeymoon', 'wedding', 'valentine', 'duo', 'pairs', 'two people',
                'cặp', 'đôi', 'tình', 'yêu', 'lãng mạn', 'kỷ niệm', 'vợ', 'chồng',
                'bạn gái', 'bạn trai', 'tuần trăng mật', 'valentine', 'hẹn hò'
            ]
        }
    }

    let bestKey = 'default'
    let bestScore = 0
    let bestMatched = []

    for (const [key, group] of Object.entries(groups)) {
        let score = 0
        let matched = []
        for (const kw of group.keywords) {
            if (c.includes(kw)) {
                score += kw.length > 3 ? 2 : 1
                if (!matched.includes(kw)) matched.push(kw)
            }
        }
        if (score > bestScore) {
            bestScore = score
            bestKey = key
            bestMatched = matched
        }
    }

    return { key: bestKey, score: bestScore, matched: bestMatched }
}

const QUICK_OPTIONS_EN = [
    { icon: '🦴', label: 'Body Pain', sub: 'Back, neck, shoulder...', value: 'I have pain in my body, back and neck' },
    { icon: '😴', label: 'Sleep Issues', sub: 'Insomnia, fatigue...', value: 'I have trouble sleeping and feel exhausted' },
    { icon: '🧠', label: 'Stress & Anxiety', sub: 'Mental overload...', value: 'I feel heavy stress and mental burnout' },
    { icon: '💑', label: 'Couple Therapy', sub: 'For two people...', value: 'We are a couple looking for romantic healing together' },
]

const QUICK_OPTIONS_VI = [
    { icon: '🦴', label: 'Đau Nhức Cơ Thể', sub: 'Lưng, cổ, vai gáy...', value: 'Tôi bị đau nhức lưng cổ vai gáy' },
    { icon: '😴', label: 'Rối Loạn Giấc Ngủ', sub: 'Mất ngủ, mệt mỏi...', value: 'Tôi mất ngủ và mệt mỏi kiệt sức' },
    { icon: '🧠', label: 'Căng Thẳng', sub: 'Stress, lo âu...', value: 'Tôi căng thẳng stress nặng đầu' },
    { icon: '💑', label: 'Liệu Pháp Đôi', sub: 'Cho hai người...', value: 'Chúng tôi là cặp đôi muốn trải nghiệm trị liệu lãng mạn' },
]

export default function SmartPromptConsultation({ onComplete }) {
    const [input, setInput] = useState('')
    const [phase, setPhase] = useState('input')
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', intensity: 'Moderate' })
    const [analysis, setAnalysis] = useState(null)
    const inputRef = useRef(null)
    const { t, lang } = useLang()

    const quickOptions = lang === 'vi' ? QUICK_OPTIONS_VI : QUICK_OPTIONS_EN

    useEffect(() => {
        if (phase === 'input') {
            setTimeout(() => inputRef.current?.focus(), 500)
        }
    }, [phase])

    const handleProceed = (text) => {
        const finalText = text || input
        if (!finalText.trim()) return
        setInput(finalText)
        const result = analyzeCondition(finalText)
        setAnalysis(result)
        setPhase('epic')
        setTimeout(() => setPhase('form'), 1800)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            handleProceed(input)
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.phone) return
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
                <img src="/spa-banner.png" alt="" className="smart-bg-image" />
                <div className="smart-bg-overlay" />
                <div className="ambient-ray ray-1" />
                <div className="ambient-ray ray-2" />
                <div className="ambient-ray ray-3" />
            </div>

            <div className="smart-particles">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="smart-particle"
                        style={{
                            left: `${15 + Math.random() * 70}%`,
                            top: `${15 + Math.random() * 70}%`,
                            width: `${3 + Math.random() * 4}px`,
                            height: `${3 + Math.random() * 4}px`,
                        }}
                        animate={{
                            y: [0, -25 - Math.random() * 30, 0],
                            opacity: [0.15, 0.45, 0.15],
                            scale: [1, 1.4, 1],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 4,
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
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="input-header"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                        >
                            <span className="input-step-badge">
                                {lang === 'vi' ? 'Bước 1 / 2' : 'Step 1 of 2'}
                            </span>
                            <h2 className="input-title">
                                {lang === 'vi' ? 'Bạn đang gặp vấn đề gì?' : 'What are you experiencing?'}
                            </h2>
                            <p className="input-subtitle">
                                {lang === 'vi'
                                    ? 'Mô tả chi tiết triệu chứng hoặc chọn nhanh bên dưới'
                                    : 'Describe your symptoms in detail or pick a quick option below'}
                            </p>
                        </motion.div>

                        <motion.div
                            className="smart-input-wrapper"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <div className="input-field-container">
                                <textarea
                                    ref={inputRef}
                                    className="smart-textarea"
                                    placeholder={t.inputPlaceholder}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    rows={3}
                                    autoComplete="off"
                                />
                                <motion.button
                                    className="input-send-btn"
                                    onClick={() => handleProceed(input)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={!input.trim()}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="quick-options-section"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <p className="quick-label">
                                {lang === 'vi' ? 'Hoặc chọn nhanh:' : 'Or quick select:'}
                            </p>
                            <div className="quick-options-grid">
                                {quickOptions.map((opt, i) => (
                                    <motion.button
                                        key={i}
                                        className="quick-option-card"
                                        onClick={() => handleProceed(opt.value)}
                                        whileHover={{ scale: 1.03, y: -4 }}
                                        whileTap={{ scale: 0.97 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 + i * 0.1 }}
                                    >
                                        <span className="quick-icon">{opt.icon}</span>
                                        <span className="quick-text">
                                            <strong>{opt.label}</strong>
                                            <small>{opt.sub}</small>
                                        </span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {phase === 'epic' && (
                    <motion.div
                        key="epic-phase"
                        className="smart-breathing-phase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="analysis-anim"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="pulse-ring"
                                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.div
                                className="pulse-ring ring-2"
                                animate={{ scale: [1, 2.2, 1], opacity: [0.2, 0, 0.2] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                            />
                            <div className="analysis-icon">🔬</div>
                        </motion.div>
                        <motion.p
                            className="analysis-text"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {lang === 'vi' ? 'Đang phân tích triệu chứng của bạn...' : 'Analyzing your symptoms...'}
                        </motion.p>
                    </motion.div>
                )}

                {phase === 'form' && (
                    <motion.div
                        key="form-phase"
                        className="smart-dashboard"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <motion.div
                            className="analysis-result-bar"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="result-badge">
                                {analysis?.key === 'energy-reset' ? '🦴' :
                                    analysis?.key === 'jetlag-recovery' ? '😴' :
                                        analysis?.key === 'silent-healing' ? '🧠' :
                                            analysis?.key === 'couple-healing' ? '💑' : '🌿'}
                            </div>
                            <div className="result-info">
                                <span className="result-condition">"{input}"</span>
                                <span className="result-match">
                                    → {t.therapies[analysis?.key || 'default']?.name}
                                </span>
                            </div>
                        </motion.div>

                        <div className="dashboard-header">
                            <span className="form-step-badge">
                                {lang === 'vi' ? 'Bước 2 / 2' : 'Step 2 of 2'}
                            </span>
                            <h2>{t.reservationTitle}</h2>
                        </div>

                        <div className="dashboard-content no-chat">
                            <div className="smart-form-section-wrapper standalone-form">
                                <img src="/meditation.png" alt="" className="form-bg-img" />
                                <div className="smart-form-section">
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
