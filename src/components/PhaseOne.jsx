import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './PhaseOne.css'

const PLACEHOLDER_TEXTS = [
    'Chia sẻ cảm nhận của bạn...',
    'Tôi hay bị đau mỏi vai gáy...',
    'Gần đây tôi cảm thấy stress...',
    'Tôi muốn thư giãn và tái tạo năng lượng...',
]

function BreathingOrb() {
    return (
        <div className="breathing-orb-container" id="breathing-orb">
            <motion.div
                className="breathing-orb"
                animate={{
                    scale: [1, 1.18, 1],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <div className="orb-inner" />
                <div className="orb-ring orb-ring-1" />
                <div className="orb-ring orb-ring-2" />
                <div className="orb-ring orb-ring-3" />
            </motion.div>

            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="ambient-particle"
                    style={{
                        '--angle': `${i * 45}deg`,
                        '--distance': `${70 + i * 12}px`,
                    }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: 3 + i * 0.4,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}

function RippleEffect({ isActive }) {
    return (
        <AnimatePresence>
            {isActive && (
                <>
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={`ripple-${i}`}
                            className="ripple"
                            initial={{ scale: 0.3, opacity: 0.6 }}
                            animate={{ scale: 3.5 + i, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 1.8,
                                delay: i * 0.15,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />
                    ))}
                </>
            )}
        </AnimatePresence>
    )
}

function AbsorbedMessage({ text, onComplete }) {
    return (
        <motion.div
            className="absorbed-message"
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{
                opacity: 0,
                scale: 0.2,
                y: -80,
                filter: 'blur(10px)',
            }}
            transition={{
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={onComplete}
        >
            {text}
        </motion.div>
    )
}

function ExperienceShowcase() {
    const experiences = [
        {
            id: 1,
            title: 'Trị Liệu Tinh Dầu Thảo Mộc',
            desc: 'Kỹ thuật massage chuyên sâu kết hợp tinh dầu thiên nhiên nguyên chất, giúp giải tỏa tận gốc vùng cơ căng cứng, mang lại cảm giác nhẹ nhõm tức thì.',
            img: '/essential-oils.png',
            duration: '60 phút'
        },
        {
            id: 2,
            title: 'Phục Hồi Đá Nóng Bazan',
            desc: 'Hơi ấm từ đá núi lửa bazan kết hợp liệu pháp ánh sáng hồng ngoại thâm nhập sâu vào huyệt đạo, kích hoạt tuần hoàn máu và đào thải độc tố cơ thể.',
            img: '/infrared-therapy.png',
            duration: '45 phút'
        },
        {
            id: 3,
            title: 'Thiền Định Tĩnh Tâm',
            desc: 'Không gian riêng tư, tách biệt hoàn toàn với tiếng ồn. Âm nhạc sóng não và hương trầm sẽ dẫn dắt bạn vào trạng thái thư giãn sâu, tái tạo năng lượng tinh thần.',
            img: '/meditation.png',
            duration: '30 phút'
        }
    ]

    return (
        <section className="experience-showcase" id="experience-showcase">
            <div className="showcase-container">
                <motion.div
                    className="showcase-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="showcase-kicker">KHÁM PHÁ</span>
                    <h2 className="showcase-title">Trải Nghiệm Chữa Lành Thực Tế</h2>
                    <p className="showcase-subtitle">Mỗi bước trong hành trình tại Home Healing Hub đều được thiết kế tỉ mỉ để xoa dịu các giác quan và đánh thức khả năng tự phục hồi của bạn.</p>
                </motion.div>

                <div className="showcase-grid">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            className="showcase-card"
                            key={exp.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="showcase-img-wrap">
                                <img src={exp.img} alt={exp.title} className="showcase-img" />
                                <div className="showcase-overlay" />
                                <div className="showcase-duration">{exp.duration}</div>
                            </div>
                            <div className="showcase-content">
                                <h3 className="showcase-card-title">{exp.title}</h3>
                                <p className="showcase-card-desc">{exp.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default function PhaseOne({ onComplete, userData, setUserData }) {
    const [inputValue, setInputValue] = useState('')
    const [messages, setMessages] = useState([])
    const [isAbsorbing, setIsAbsorbing] = useState(false)
    const [absorbingText, setAbsorbingText] = useState('')
    const [showRipple, setShowRipple] = useState(false)
    const [placeholderIdx, setPlaceholderIdx] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: 'Vietnam',
        condition: '',
        intensity: 'Nhẹ',
    })
    const inputRef = useRef(null)
    const formRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIdx(prev => (prev + 1) % PLACEHOLDER_TEXTS.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const handleSubmitMessage = (e) => {
        e.preventDefault()
        if (!inputValue.trim() || isAbsorbing) return

        const text = inputValue.trim()
        setAbsorbingText(text)
        setIsAbsorbing(true)
        setShowRipple(true)
        setInputValue('')

        setTimeout(() => setShowRipple(false), 1800)
    }

    const handleAbsorbComplete = () => {
        setMessages(prev => [...prev, absorbingText])
        setIsAbsorbing(false)
        setAbsorbingText('')

        if (messages.length >= 0) {
            setTimeout(() => {
                setShowForm(true)
                setTimeout(() => {
                    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }, 400)
            }, 600)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const allMessages = [...messages]
        if (absorbingText) allMessages.push(absorbingText)

        onComplete({
            name: formData.firstName,
            condition: formData.condition || allMessages.join('. '),
            messages: allMessages,
            formData,
        })
    }

    return (
        <motion.div
            className="phase-one"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8 } }}
        >
            {/* Navigation Bar */}
            <motion.header
                className="main-header"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
            >
                <div className="header-inner">
                    <div className="logo" id="logo">
                        <div className="logo-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <circle cx="16" cy="16" r="14" stroke="#5c7a3d" strokeWidth="1.5" fill="none" />
                                <path d="M16 6C16 6 10 11 10 16C10 19.3 12.7 22 16 22C19.3 22 22 19.3 22 16C22 11 16 6 16 6Z" fill="#5c7a3d" opacity="0.8" />
                                <path d="M16 10C16 10 13 13 13 16C13 17.7 14.3 19 16 19C17.7 19 19 17.7 19 16C19 13 16 10 16 10Z" fill="#7a9c5a" opacity="0.5" />
                            </svg>
                        </div>
                        <span className="logo-text">Home Healing Hub</span>
                    </div>
                    <nav className="header-nav" id="main-nav">
                        <a href="#" className="nav-link active">HOME</a>
                        <a href="#" className="nav-link">ABOUT US</a>
                        <a href="#" className="nav-link">THE JOURNAL</a>
                        <a href="#" className="nav-link">WELLNESS COLLECTION</a>
                        <a href="#" className="nav-link">HEALING JOURNEYS</a>
                        <a href="#" className="nav-link">MEMBERSHIP PACKAGE</a>
                        <a href="#" className="nav-link">CONTACT US</a>
                    </nav>
                    <div className="header-icons">
                        <button className="icon-btn" aria-label="Account">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0112 0v1" /></svg>
                        </button>
                        <button className="icon-btn" aria-label="Cart">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Hero Banner with Spa Image */}
            <motion.section
                className="hero-banner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
            >
                <div className="hero-banner-img">
                    <img src="/spa-banner.png" alt="Luxury spa interior" />
                    <div className="hero-banner-overlay" />
                </div>
                <div className="hero-banner-decor">
                    <motion.div
                        className="decor-sparkle decor-1"
                        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                        className="decor-sparkle decor-2"
                        animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.2, 1] }}
                        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div
                        className="decor-sparkle decor-3"
                        animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.4, 1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    />
                </div>
            </motion.section>

            {/* Experience Showcase - Realism Section */}
            <ExperienceShowcase />

            {/* Main Content Area (Consultation) */}
            <div className="main-content-area" id="consultation-section">
                {/* Decorative leaves */}
                <motion.div
                    className="floating-leaves"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.span
                        className="leaf leaf-1"
                        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >🌿</motion.span>
                    <motion.span
                        className="leaf leaf-2"
                        animate={{ y: [0, -6, 0], rotate: [0, -8, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >🍃</motion.span>
                </motion.div>

                {/* Section Title */}
                <motion.div
                    className="section-intro"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <h1 className="section-title" id="hero-title">
                        Tư Vấn Trị Liệu<br />
                        <span className="title-accent">Cá Nhân Hóa</span>
                    </h1>
                    <p className="section-subtitle" id="hero-subtitle">
                        Hãy tĩnh tâm và chia sẻ cảm nhận hiện tại của bạn. Chúng tôi ở đây để lắng nghe và thiết kế liệu trình chữa lành phù hợp nhất.
                    </p>
                </motion.div>

                {/* Orb + Engraving */}
                <div className="engraving-area" id="engraving-area">
                    <BreathingOrb />
                    <RippleEffect isActive={showRipple} />

                    <AnimatePresence>
                        {isAbsorbing && absorbingText && (
                            <AbsorbedMessage
                                text={absorbingText}
                                onComplete={handleAbsorbComplete}
                            />
                        )}
                    </AnimatePresence>

                    {messages.length > 0 && (
                        <motion.div
                            className="message-counter"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <span className="counter-dot" />
                            {messages.length} cảm nhận đã được ghi nhận
                        </motion.div>
                    )}

                    <motion.form
                        className="engraving-input-wrapper"
                        onSubmit={handleSubmitMessage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <div className="engraving-input-container" id="engraving-input">
                            <textarea
                                ref={inputRef}
                                className="engraving-input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSubmitMessage(e)
                                    }
                                }}
                                placeholder={PLACEHOLDER_TEXTS[placeholderIdx]}
                                rows={2}
                                aria-label="Describe your current condition"
                            />
                            <motion.button
                                type="submit"
                                className="send-btn"
                                id="send-btn"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                disabled={!inputValue.trim() || isAbsorbing}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 2L11 13" />
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                                </svg>
                            </motion.button>
                        </div>
                        <p className="input-hint">Nhấn Enter để gửi • Shift+Enter xuống dòng</p>
                    </motion.form>
                </div>

                {/* Consultation Form */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            ref={formRef}
                            className="consultation-form-wrapper"
                            initial={{ opacity: 0, y: 60, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="form-card" id="consultation-form">
                                {/* Form side image */}
                                <div className="form-image">
                                    <img src="/essential-oils.png" alt="Essential oils therapy" />
                                    <div className="form-image-overlay">
                                        <p className="image-caption">Aromatherapy<br /><span>Healing Collection</span></p>
                                    </div>
                                </div>

                                <div className="form-body">
                                    <div className="form-header">
                                        <h2 className="form-title">Thông tin của bạn</h2>
                                        <p className="form-desc">Hoàn tất để nhận liệu trình cá nhân hóa</p>
                                    </div>

                                    <form onSubmit={handleFormSubmit} className="consultation-form">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="firstName">TÊN (FIRST NAME)</label>
                                                <input type="text" id="firstName" className="form-input"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                                    placeholder="Trọng" required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="lastName">HỌ (LAST NAME)</label>
                                                <input type="text" id="lastName" className="form-input"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                                    placeholder="Long" required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="email">ĐỊA CHỈ EMAIL</label>
                                            <input type="email" id="email" className="form-input"
                                                value={formData.email}
                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                placeholder="vd: tenban@email.com" required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="phone">SỐ ĐIỆN THOẠI</label>
                                            <div className="phone-input-wrapper">
                                                <select className="country-select" id="countryCode"
                                                    value={formData.countryCode}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                                                >
                                                    <option value="Vietnam">Việt Nam (+84)</option>
                                                    <option value="US">US (+1)</option>
                                                    <option value="UK">UK (+44)</option>
                                                </select>
                                                <input type="tel" id="phone" className="form-input phone-input"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                    placeholder="0987654321"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="condition">MÔ TẢ CHI TIẾT TÌNH TRẠNG</label>
                                            <textarea id="condition" className="form-input form-textarea"
                                                value={formData.condition}
                                                onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value }))}
                                                placeholder="Ví dụ: Tôi hay bị đau mỏi cổ vai gáy do ngồi máy tính nhiều, khó ngủ về đêm..."
                                                rows={3}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label" htmlFor="intensity">MỨC ĐỘ</label>
                                            <select id="intensity" className="form-input form-select"
                                                value={formData.intensity}
                                                onChange={(e) => setFormData(prev => ({ ...prev, intensity: e.target.value }))}
                                            >
                                                <option value="Nhẹ">Nhẹ (Thi thoảng có cảm giác khó chịu)</option>
                                                <option value="Vừa">Vừa (Ảnh hưởng đến sinh hoạt hàng ngày)</option>
                                                <option value="Sâu">Đau Sâu (Thường xuyên căng thẳng, đau nhức)</option>
                                            </select>
                                        </div>

                                        <motion.button type="submit" className="submit-btn" id="submit-consultation"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="btn-shimmer" />
                                            <span className="btn-text">Nhận Phác Đồ Trị Liệu Dành Riêng Cho Bạn</span>
                                        </motion.button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
