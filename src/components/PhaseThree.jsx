import { motion } from 'framer-motion'
import './PhaseThree.css'

const HEALING_STEPS = [
    {
        id: 1,
        type: 'empathy',
        title: 'Chúng tôi hiểu bạn',
        icon: '💆',
        description: 'Vì bạn đang cảm thấy nặng nề và căng thẳng...',
        detail: 'Cơ thể bạn đang gửi tín hiệu cần được chăm sóc. Đây là bước đầu tiên của hành trình phục hồi.',
        image: '/hot-stone.png',
        color: '#d4a5a5',
    },
    {
        id: 2,
        type: 'solution',
        title: 'Giải phóng cơ sâu',
        icon: '🌿',
        description: 'Bước 1: Trị liệu bằng tinh dầu thảo mộc',
        detail: 'Liệu pháp tinh dầu organic kết hợp kỹ thuật massage Thụy Điển giúp thả lỏng các nhóm cơ sâu, giảm đau mỏi hiệu quả từ 60 phút đầu tiên.',
        duration: '60 phút',
        image: '/essential-oils.png',
        color: '#5c7a3d',
    },
    {
        id: 3,
        type: 'solution',
        title: 'Tái tạo năng lượng',
        icon: '✨',
        description: 'Bước 2: Đá nóng & Liệu pháp ánh sáng',
        detail: 'Đá bazan nóng đặt lên các huyệt đạo kết hợp ánh sáng trị liệu hồng ngoại, kích hoạt tuần hoàn máu và tái tạo tế bào mới.',
        duration: '45 phút',
        image: '/hot-stone.png',
        color: '#c8a96e',
    },
    {
        id: 4,
        type: 'solution',
        title: 'Cân bằng tâm trí',
        icon: '🧘',
        description: 'Bước 3: Thiền định & Hương trị liệu',
        detail: 'Phòng riêng tĩnh lặng với hương trầm và nhạc sóng não Theta, hướng dẫn thiền định cá nhân giúp tâm trí rũ bỏ mọi áp lực.',
        duration: '30 phút',
        image: '/meditation.png',
        color: '#7a9c5a',
    },
    {
        id: 5,
        type: 'result',
        title: 'Tái sinh toàn diện',
        icon: '🌸',
        description: 'Kết quả: Cơ thể & tâm trí hài hòa',
        detail: 'Sau lộ trình, bạn sẽ cảm nhận rõ sự khác biệt: vai gáy nhẹ nhàng, tâm trí sáng suốt, giấc ngủ sâu hơn và năng lượng tích cực lan tỏa.',
        image: '/flower-bloom.png',
        color: '#d4a5a5',
    },
]

function StreamPath() {
    return (
        <svg className="stream-path-svg" viewBox="0 0 100 1200" preserveAspectRatio="none" fill="none">
            <defs>
                <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5c7a3d" stopOpacity="0.08" />
                    <stop offset="30%" stopColor="#7a9c5a" stopOpacity="0.2" />
                    <stop offset="60%" stopColor="#c8a96e" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#d4a5a5" stopOpacity="0.08" />
                </linearGradient>
            </defs>
            <motion.path
                d="M 50 0 C 85 120, 15 240, 50 360 C 85 480, 15 600, 50 720 C 85 840, 15 960, 50 1080 L 50 1200"
                stroke="url(#streamGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: 'easeOut', delay: 0.5 }}
            />
            {[0, 240, 480, 720, 960].map((y, i) => (
                <motion.circle
                    key={i}
                    cx="50"
                    cy={y + 60}
                    r="5"
                    fill="#5c7a3d"
                    opacity="0.4"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.3, 1] }}
                    transition={{ delay: 0.6 + i * 0.3, duration: 0.7 }}
                />
            ))}
        </svg>
    )
}

function HealingCard({ step, index, userData }) {
    const isLeft = index % 2 === 0
    const delay = 0.15 + index * 0.12

    let description = step.description
    if (step.type === 'empathy' && userData?.condition) {
        description = `Vì bạn đang cảm thấy ${userData.condition.toLowerCase().substring(0, 80)}...`
    }

    return (
        <motion.div
            className={`healing-card ${isLeft ? 'card-left' : 'card-right'} card-type-${step.type}`}
            initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="card-glass" id={`healing-step-${step.id}`}>
                {/* Card image */}
                <div className="card-image-container">
                    <img src={step.image} alt={step.title} className="card-image" />
                    <div className="card-image-overlay" />
                </div>

                <div className="card-body">
                    <div className="card-step-indicator">
                        <span className="step-icon">{step.icon}</span>
                        <div className="step-line" style={{ background: step.color }} />
                    </div>

                    <div className="card-content">
                        <div className="card-badge" style={{ background: step.color + '18' }}>
                            <span style={{ color: step.color }}>
                                {step.type === 'empathy' ? 'Lắng nghe' : step.type === 'result' ? 'Kết quả' : `Bước ${step.id - 1}`}
                            </span>
                        </div>

                        <h3 className="card-title">{step.title}</h3>
                        <p className="card-description">{description}</p>
                        <p className="card-detail">{step.detail}</p>

                        {step.duration && (
                            <div className="card-duration">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                                <span>{step.duration}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function RecommendationCard({ userData }) {
    return (
        <motion.div
            className="recommendation-card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="rec-card" id="recommendation-card">
                <div className="rec-header">
                    <p className="rec-greeting">
                        Xin chào{userData?.name ? ` ${userData.name}` : ''},
                    </p>
                    <p className="rec-subtitle">Based on your experience, we recommend:</p>
                </div>

                <div className="rec-service">
                    <div className="rec-sparkle">✦</div>
                    <h3 className="rec-service-name">Signature Holistic Journey</h3>
                    <p className="rec-service-desc">
                        A bespoke treatment session specifically for your unique physical and emotional state
                    </p>
                </div>

                <div className="rec-details">
                    <div className="rec-detail-item">
                        <span className="rec-detail-label">Intensity</span>
                        <span className="rec-detail-value">{userData?.formData?.intensity || 'High'}</span>
                    </div>
                    <div className="rec-detail-item">
                        <span className="rec-detail-label">Contact</span>
                        <span className="rec-detail-value">Vietnam: 0981073280</span>
                    </div>
                </div>

                <motion.button
                    className="cta-btn"
                    id="cta-book"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span className="cta-shimmer" />
                    <span className="cta-text">Book This Experience</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </motion.button>
            </div>
        </motion.div>
    )
}

export default function PhaseThree({ userData }) {
    return (
        <motion.div
            className="phase-three"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Warm background */}
            <div className="phase-three-bg">
                <div className="warm-grad-1" />
                <div className="warm-grad-2" />
            </div>

            {/* Header */}
            <motion.header
                className="p3-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
            >
                <div className="p3-header-inner">
                    <div className="logo-warm" id="logo-warm">
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="14" stroke="#5c7a3d" strokeWidth="1.5" fill="none" />
                            <path d="M16 6C16 6 10 11 10 16C10 19.3 12.7 22 16 22C19.3 22 22 19.3 22 16C22 11 16 6 16 6Z" fill="#5c7a3d" opacity="0.8" />
                        </svg>
                        <span className="logo-text-warm">Home Healing Hub</span>
                    </div>
                </div>
            </motion.header>

            {/* Hero image section */}
            <motion.section
                className="roadmap-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
            >
                <div className="roadmap-hero-img">
                    <img src="/spa-banner.png" alt="Luxury spa" />
                    <div className="roadmap-hero-overlay" />
                </div>
                <div className="roadmap-hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <p className="intro-eyebrow">Lộ trình của bạn</p>
                        <h1 className="roadmap-title" id="roadmap-title">
                            Hành trình<br />
                            <span className="title-highlight">xoa dịu & tái sinh</span>
                        </h1>
                        <p className="roadmap-subtitle">
                            Mỗi bước được thiết kế dựa trên những gì bạn đã chia sẻ
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Stream path + Cards */}
            <div className="roadmap-container">
                <StreamPath />
                <div className="healing-cards-list">
                    {HEALING_STEPS.map((step, index) => (
                        <HealingCard key={step.id} step={step} index={index} userData={userData} />
                    ))}
                </div>
            </div>

            {/* Gallery strip */}
            <motion.section
                className="gallery-strip"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="gallery-grid">
                    {[
                        { src: '/essential-oils.png', label: 'Aromatherapy' },
                        { src: '/hot-stone.png', label: 'Hot Stone' },
                        { src: '/meditation.png', label: 'Meditation' },
                        { src: '/flower-bloom.png', label: 'Renewal' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="gallery-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                        >
                            <img src={item.src} alt={item.label} />
                            <div className="gallery-item-overlay">
                                <span>{item.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Recommendation */}
            <RecommendationCard userData={userData} />

            {/* Final CTA */}
            <motion.section
                className="final-cta"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="cta-bg-image">
                    <img src="/spa-banner.png" alt="" />
                    <div className="cta-bg-overlay" />
                </div>
                <div className="cta-inner">
                    <motion.div
                        className="cta-leaves"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        🍃 🌿
                    </motion.div>
                    <h2 className="cta-heading">Bắt đầu hành trình xoa dịu</h2>
                    <p className="cta-subtext">Đặt lịch hôm nay và nhận ưu đãi 15% cho lần trải nghiệm đầu tiên</p>
                    <motion.a
                        href="tel:0981073280"
                        className="cta-btn-large"
                        id="cta-call"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span className="cta-shimmer" />
                        Dành tặng bản thân 60 phút này
                    </motion.a>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="p3-footer" id="footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="footer-logo">Home Healing Hub</span>
                        <p className="footer-tagline">Nơi cơ thể và tâm trí tìm thấy sự bình yên</p>
                    </div>
                    <div className="footer-links">
                        <a href="#">Về chúng tôi</a>
                        <a href="#">Liệu trình</a>
                        <a href="#">Đặt lịch</a>
                        <a href="#">Liên hệ</a>
                    </div>
                    <div className="footer-social">
                        <a href="#" aria-label="Facebook" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="social-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 Home Healing Hub. All rights reserved.</p>
                </div>
            </footer>
        </motion.div>
    )
}
