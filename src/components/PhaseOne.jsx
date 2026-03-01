import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SmartPromptConsultation from './SmartPromptConsultation'
import { useLang } from '../contexts/LanguageContext'
import './PhaseOne.css'

export default function PhaseOne({ onComplete, userData, setUserData }) {
    const [wizardActive, setWizardActive] = useState(null)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const { t } = useLang()

    const handleStartConsultation = () => {
        setIsTransitioning(true)
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
                style={{ display: wizardActive ? 'none' : 'flex' }}
            >
                {/* Hero Banner as fullscreen background */}
                <div className="hero-banner-bg">
                    <img src="/spa-banner.png" alt="" aria-hidden="true" />
                    <div className="hero-banner-overlay" />
                </div>

                {/* Centered Content */}
                <motion.div
                    className="hero-center-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.h1
                        className="section-title" id="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                    >
                        {t.heroTitle1}<br />
                        <span className="title-accent">{t.heroTitle2}</span>
                    </motion.h1>
                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.5 }}
                    >
                        {t.heroSubtitle}
                    </motion.p>

                    <motion.button
                        className="epic-btn-container"
                        onClick={handleStartConsultation}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        {t.heroBtn}
                    </motion.button>
                </motion.div>
            </motion.div>
        </>
    )
}
