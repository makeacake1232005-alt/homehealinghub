import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AmbientSoundToggle, { useAmbientSound } from './AmbientSound'
import { useLang } from '../contexts/LanguageContext'
import './PhaseThree.css'

const STEP_META = [
    { id: 1, type: 'empathy', icon: '💆', image: '/shoulder-relief.png', color: '#d4a5a5' },
    { id: 2, type: 'solution', icon: '🌿', image: '/essential-oils.png', color: '#5c7a3d' },
    { id: 3, type: 'solution', icon: '✨', image: '/infrared-therapy.png', color: '#c8a96e' },
    { id: 4, type: 'solution', icon: '🧘', image: '/meditation.png', color: '#7a9c5a' },
    { id: 5, type: 'result', icon: '🌸', image: '/flower-bloom.png', color: '#d4a5a5' },
]

const pageVariants = {
    enter: (direction) => ({
        opacity: 0,
        x: direction > 0 ? 300 : -300,
        scale: 0.92,
        rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0,
    },
    exit: (direction) => ({
        opacity: 0,
        x: direction > 0 ? -300 : 300,
        scale: 0.92,
        rotateY: direction > 0 ? -15 : 15,
    }),
}

const pageTransition = {
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1],
}

function BookPage({ step, stepData, userData, t }) {
    let description = stepData.description
    if (step.type === 'empathy' && userData?.condition) {
        description = `${t.conditionPrefix} ${userData.condition.toLowerCase().substring(0, 80)}...`
    }

    return (
        <motion.div
            className="book-page"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            id={`book-page-${step.id}`}
        >
            <div className="page-content">
                <div className="page-image-side">
                    <motion.img
                        src={step.image}
                        alt={stepData.title}
                        className="page-image"
                        initial={{ scale: 1.15, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
                    />
                    <div className="page-image-vignette" />

                    <motion.div
                        className="page-floating-icon"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        {step.icon}
                    </motion.div>
                </div>

                <div className="page-text-side">
                    <motion.div
                        className="page-text-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.9 }}
                    >
                        <div className="page-badge" style={{ background: step.color + '18', color: step.color }}>
                            {step.type === 'empathy' ? t.badgeEmpathy : step.type === 'result' ? t.badgeResult : `${t.badgeStep} ${step.id - 1}`}
                        </div>

                        <h2 className="page-title">{stepData.title}</h2>

                        <motion.div
                            className="page-divider"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            style={{ background: step.color, transformOrigin: 'left' }}
                        />

                        <p className="page-description">{description}</p>
                        <p className="page-detail">{stepData.detail}</p>

                        {stepData.duration && (
                            <motion.div
                                className="page-duration"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                                <span>{stepData.duration}</span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

function RecommendationPage({ userData, t }) {
    const REC_IMAGES = { 'energy-reset': '/hot-stone.png', 'jetlag-recovery': '/essential-oils.png', 'silent-healing': '/meditation.png', 'default': '/flower-bloom.png' }

    function getTherapyKey(condition) {
        if (!condition) return 'default'
        const c = condition.toLowerCase()
        if (c.includes('pain') || c.includes('shoulder') || c.includes('neck') || c.includes('back') || c.includes('sore') || c.includes('stiff') || c.includes('đau') || c.includes('vai') || c.includes('gáy') || c.includes('lưng')) return 'energy-reset'
        if (c.includes('sleep') || c.includes('insomnia') || c.includes('trouble') || c.includes('jetlag') || c.includes('ngủ')) return 'jetlag-recovery'
        if (c.includes('stress') || c.includes('tension') || c.includes('heavy') || c.includes('burnout') || c.includes('căng') || c.includes('nặng')) return 'silent-healing'
        return 'default'
    }

    const key = getTherapyKey(userData?.condition)
    const rec = t.therapies[key]

    return (
        <motion.div
            className="book-page recommendation-page"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
        >
            <div className="page-content rec-page-content">
                <div className="page-image-side">
                    <motion.img
                        src={REC_IMAGES[key]}
                        alt={rec.name}
                        className="page-image"
                        initial={{ scale: 1.15, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
                    />
                    <div className="page-image-vignette" />
                </div>

                <div className="page-text-side">
                    <motion.div
                        className="rec-text-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.9 }}
                    >
                        <p className="rec-greeting">
                            {t.recWelcome}{userData?.name ? ` ${userData.name}` : ''},
                        </p>
                        <p className="rec-subtitle">{t.recSubtitle}</p>

                        <div className="rec-service-block">
                            <div className="rec-sparkle">✦</div>
                            <h3 className="rec-service-name">{rec.name}</h3>
                            <p className="rec-service-desc">{rec.desc}</p>
                        </div>

                        <div className="rec-details-row">
                            <div className="rec-detail-item">
                                <span className="rec-detail-label">{t.recIntensity}</span>
                                <span className="rec-detail-value">{userData?.formData?.intensity || 'High'}</span>
                            </div>
                            <div className="rec-detail-item">
                                <span className="rec-detail-label">{t.recDuration}</span>
                                <span className="rec-detail-value">{rec.duration}</span>
                            </div>
                            <div className="rec-detail-item">
                                <span className="rec-detail-label">{t.recContact}</span>
                                <span className="rec-detail-value">0981073280</span>
                            </div>
                        </div>

                        <motion.a
                            href="tel:0981073280"
                            className="rec-cta-btn"
                            id="cta-book"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span className="cta-shimmer" />
                            <span>{t.recCta}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default function PhaseThree({ userData }) {
    const [currentPage, setCurrentPage] = useState(0)
    const [direction, setDirection] = useState(1)
    const [isPaused, setIsPaused] = useState(false)
    const [userInteracted, setUserInteracted] = useState(false)
    const autoTimerRef = useRef(null)
    const ambient = useAmbientSound()
    const { t } = useLang()

    const totalPages = STEP_META.length + 1

    const goToPage = useCallback((newPage, dir = 1) => {
        if (newPage < 0 || newPage >= totalPages) return
        setDirection(dir)
        setCurrentPage(newPage)
        ambient.playPageTurn()
        setTimeout(() => ambient.playBirdChirp(), 300 + Math.random() * 500)
    }, [totalPages, ambient])

    const nextPage = useCallback(() => {
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1, 1)
        }
    }, [currentPage, totalPages, goToPage])

    const prevPage = useCallback(() => {
        if (currentPage > 0) {
            goToPage(currentPage - 1, -1)
        }
    }, [currentPage, goToPage])

    useEffect(() => {
        if (isPaused || userInteracted) return

        autoTimerRef.current = setTimeout(() => {
            if (currentPage < totalPages - 1) {
                nextPage()
            } else {
                setIsPaused(true)
            }
        }, 3500)

        return () => {
            if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
        }
    }, [currentPage, isPaused, userInteracted, totalPages, nextPage])

    useEffect(() => {
        const timer = setTimeout(() => {
            ambient.start()
        }, 800)
        return () => clearTimeout(timer)
    }, []) // eslint-disable-line

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault()
                setUserInteracted(true)
                nextPage()
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                setUserInteracted(true)
                prevPage()
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [nextPage, prevPage])

    const handleManualNav = (dir) => {
        setUserInteracted(true)
        if (dir > 0) nextPage()
        else prevPage()
    }

    return (
        <motion.div
            className="phase-three"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="book-bg">
                <div className="book-bg-grad" />
                <motion.div
                    className="book-bg-image"
                    animate={{ opacity: [0.03, 0.06, 0.03] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <img src="/spa-banner.png" alt="" aria-hidden="true" />
                </motion.div>
            </div>

            <header className="book-header">
                <div className="book-header-inner">
                    <div className="book-logo" id="logo-warm">
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="14" stroke="#5c7a3d" strokeWidth="1.5" fill="none" />
                            <path d="M16 6C16 6 10 11 10 16C10 19.3 12.7 22 16 22C19.3 22 22 19.3 22 16C22 11 16 6 16 6Z" fill="#5c7a3d" opacity="0.8" />
                        </svg>
                        <span>Home Healing Hub</span>
                    </div>

                    <div className="book-header-controls">
                        <AmbientSoundToggle ambient={ambient} />
                        <div className="page-indicator">
                            {currentPage + 1} / {totalPages}
                        </div>
                    </div>
                </div>
            </header>

            <div className="book-container">
                <div className="book-progress-track">
                    <motion.div
                        className="book-progress-fill"
                        animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                </div>

                <div className="page-dots">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            className={`page-dot ${i === currentPage ? 'active' : ''} ${i < currentPage ? 'passed' : ''}`}
                            onClick={() => {
                                setUserInteracted(true)
                                goToPage(i, i > currentPage ? 1 : -1)
                            }}
                            aria-label={`Page ${i + 1}`}
                        />
                    ))}
                </div>

                <div className="book-viewport">
                    <AnimatePresence mode="wait" custom={direction}>
                        {currentPage < STEP_META.length ? (
                            <BookPage
                                key={`step-${STEP_META[currentPage].id}`}
                                step={STEP_META[currentPage]}
                                stepData={t.steps[currentPage]}
                                userData={userData}
                                t={t}
                            />
                        ) : (
                            <RecommendationPage
                                key="recommendation"
                                userData={userData}
                                t={t}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="book-nav">
                    <motion.button
                        className="nav-arrow nav-prev"
                        onClick={() => handleManualNav(-1)}
                        disabled={currentPage === 0}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={t.prevPage}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </motion.button>
                    <motion.button
                        className="nav-arrow nav-next"
                        onClick={() => handleManualNav(1)}
                        disabled={currentPage === totalPages - 1}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={t.nextPage}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </motion.button>
                </div>

                {!userInteracted && !isPaused && (
                    <motion.div
                        className="auto-play-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.div
                            className="auto-play-bar"
                            key={currentPage}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 3.5, ease: 'linear' }}
                        />
                        <span>{t.autoPlaying}</span>
                    </motion.div>
                )}
            </div>

            <footer className="book-footer" id="footer">
                <div className="footer-inner">
                    <span className="footer-brand">{t.footerBrand}</span>
                    <span className="footer-hint">{t.footerHint}</span>
                </div>
            </footer>
        </motion.div>
    )
}
