import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GiantConsultation from './GiantConsultation'
import BentoConsultation from './BentoConsultation'
import SmartPromptConsultation from './SmartPromptConsultation'
import './PhaseOne.css'


// Removed ExperienceShowcase

export default function PhaseOne({ onComplete, userData, setUserData }) {
    const [wizardActive, setWizardActive] = useState(null)
    const [isTransitioning, setIsTransitioning] = useState(false)

    const handleStartConsultation = () => {
        setIsTransitioning(true)
        // Hiệu ứng cực đỉnh kéo dài 1.5s trước khi mở form smart
        setTimeout(() => {
            setWizardActive('smart')
        }, 1500)
    }

    return (
        <>
            {wizardActive === 'smart' && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99999 }}>
                    <SmartPromptConsultation onComplete={onComplete} />
                </div>
            )}

            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        key="epic-transition"
                        initial={{ scale: 0, opacity: 0, borderRadius: '50%' }}
                        animate={{ scale: 30, opacity: 1, borderRadius: '0%' }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            width: '100px',
                            height: '100px',
                            backgroundColor: '#0d0e12',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 99998,
                            transformOrigin: 'center',
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                className="phase-one"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8 } }}
                style={{ display: wizardActive ? 'none' : 'block' }}
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

                {/* Main Content Area (Consultation Start Button) */}
                <div className="main-content-area" id="consultation-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '6rem auto 10rem', textAlign: 'center' }}>
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

                    <h1 className="section-title" id="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
                        Personalized<br />
                        <span className="title-accent">Healing Consultation</span>
                    </h1>
                    <p className="section-subtitle" style={{ fontSize: '1.2rem', marginBottom: '4rem', maxWidth: '600px' }}>
                        Take a deep breath and share how you feel right now. Click the button below to enter your private sanctuary.
                    </p>

                    <button className="epic-btn-container" onClick={handleStartConsultation}>
                        Personal Healing Consultation
                    </button>

                </div>
            </motion.div>
        </>
    )
}
