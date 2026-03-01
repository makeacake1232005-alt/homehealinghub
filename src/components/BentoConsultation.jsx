import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './BentoConsultation.css'

export default function BentoConsultation({ onComplete }) {
    const [selected, setSelected] = useState(null)
    const [phase, setPhase] = useState('grid') // 'grid' | 'breathing'

    const bentoItems = [
        { id: 'vai-gay', title: 'Đau Vai Gáy', icon: '💆' },
        { id: 'mat-ngu', title: 'Mất Ngủ', icon: '🦉' },
        { id: 'stress', title: 'Stress Ngập Đầu', icon: '🌪️' },
        { id: 'that-lung', title: 'Đau Thắt Lưng', icon: '🚶' },
    ]

    const handleSelect = (item) => {
        setSelected(item)
        setTimeout(() => setPhase('breathing'), 800)
    }

    useEffect(() => {
        if (phase === 'breathing') {
            const timer = setTimeout(() => {
                onComplete({
                    condition: selected.title,
                    messages: [`Vấn đề: ${selected.title}`],
                })
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [phase, selected, onComplete])

    return (
        <div className="bento-consultation">
            <AnimatePresence mode="wait">
                {phase === 'grid' && (
                    <motion.div
                        key="grid"
                        className="bento-container"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    >
                        <h1 className="bento-title">Tình trạng hiện tại của bạn?</h1>
                        <div className="bento-grid">
                            {bentoItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    className={`bento-card ${selected && selected.id !== item.id ? 'faded' : ''} ${selected && selected.id === item.id ? 'selected' : ''}`}
                                    onClick={() => !selected && handleSelect(item)}
                                    layoutId={`bento-card-${item.id}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={!selected ? { scale: 1.03, y: -8 } : {}}
                                    whileTap={!selected ? { scale: 0.97 } : {}}
                                >
                                    <div className="bento-icon">{item.icon}</div>
                                    <h2 className="bento-card-title">{item.title}</h2>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {phase === 'breathing' && (
                    <motion.div
                        key="breathing"
                        className="bento-breathing-phase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            className="bento-orb"
                            layoutId={`bento-card-${selected.id}`}
                            animate={{
                                scale: [1, 1.25, 1],
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <div className="bento-icon giant">{selected.icon}</div>
                        </motion.div>

                        <motion.p
                            className="bento-loading-text"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Chúng tôi đang thiết kế liệu trình<br />xoa dịu <strong>{selected.title.toLowerCase()}</strong> cho bạn...
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
