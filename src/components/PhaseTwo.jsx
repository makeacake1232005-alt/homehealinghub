import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../contexts/LanguageContext'
import './PhaseTwo.css'

export default function PhaseTwo({ onComplete, userData }) {
    const [currentWhisper, setCurrentWhisper] = useState(0)
    const [showLiquid, setShowLiquid] = useState(false)
    const { t } = useLang()

    const WHISPER_MESSAGES = [t.whisper1, t.whisper2, t.whisper3]

    useEffect(() => {
        const t0 = setTimeout(() => setShowLiquid(true), 100)

        const timers = WHISPER_MESSAGES.map((_, idx) =>
            setTimeout(() => setCurrentWhisper(idx), idx * 1300 + 500)
        )

        const completeTimer = setTimeout(() => {
            onComplete()
        }, WHISPER_MESSAGES.length * 1300 + 900)

        return () => {
            clearTimeout(t0)
            timers.forEach(clearTimeout)
            clearTimeout(completeTimer)
        }
    }, [onComplete])

    const dedication = t.whisperDedication.replace('{name}', userData?.name || '')

    return (
        <motion.div
            className="phase-two"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="liquid-bg"
                initial={{ scale: 0, borderRadius: '50%' }}
                animate={{
                    scale: showLiquid ? 10 : 0,
                    borderRadius: showLiquid ? '0%' : '50%',
                }}
                transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
                className="color-wash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, delay: 0.3 }}
            />

            <motion.div
                className="transition-bg-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                transition={{ duration: 2, delay: 1 }}
            >
                <img src="/flower-bloom.png" alt="" aria-hidden="true" />
            </motion.div>

            <div className="organic-blobs">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`blob blob-${i}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: [0, 0.2, 0.12],
                            scale: [0.5, 1.3, 1],
                            y: [0, -15 * (i + 1), -8 * (i + 1)],
                            x: [0, 10 * (i % 2 === 0 ? 1 : -1), 5 * (i % 2 === 0 ? 1 : -1)],
                        }}
                        transition={{
                            duration: 3.5,
                            delay: 0.2 + i * 0.15,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />
                ))}
            </div>

            <motion.div
                className="expanding-orb"
                initial={{ scale: 1, opacity: 0.9 }}
                animate={{
                    scale: [1, 2, 25],
                    opacity: [0.9, 0.5, 0],
                }}
                transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="whisper-container">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentWhisper}
                        className={`whisper-text ${currentWhisper === WHISPER_MESSAGES.length - 1 ? 'whisper-final' : ''}`}
                        initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {WHISPER_MESSAGES[currentWhisper]}
                    </motion.p>
                </AnimatePresence>

                {userData?.name && (
                    <motion.p
                        className="whisper-name"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 2.5, duration: 1 }}
                    >
                        {dedication}
                    </motion.p>
                )}
            </div>

            <div className="transition-progress">
                {WHISPER_MESSAGES.map((_, idx) => (
                    <motion.div
                        key={idx}
                        className={`progress-dot ${idx <= currentWhisper ? 'active' : ''}`}
                        animate={{
                            scale: idx === currentWhisper ? 1.4 : 1,
                            opacity: idx <= currentWhisper ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>
        </motion.div>
    )
}
