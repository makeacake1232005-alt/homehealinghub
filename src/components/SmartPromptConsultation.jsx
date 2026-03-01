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
    const [phase, setPhase] = useState('input') // 'input' | 'breathing'
    const inputRef = useRef(null)

    useEffect(() => {
        if (phase === 'input') {
            // Auto focus
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
        setPhase('breathing')
        setTimeout(() => {
            onComplete({
                condition: text.replace('?', ''),
                messages: [`Vấn đề: ${text.replace('?', '')}`],
            })
        }, 3000)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && suggestion) {
            handleSelect(suggestion.text)
        } else if (e.key === 'Enter' && input.trim()) {
            handleSelect(input)
        }
    }

    return (
        <div className="smart-consultation">
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
                        <div className="smart-input-wrapper">
                            <input
                                ref={inputRef}
                                type="text"
                                className="smart-giant-input"
                                placeholder="Bạn đang thấy khó chịu ở đâu?"
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
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
                                >
                                    <span className="suggestion-text">{suggestion.text}</span>
                                    <span className="suggestion-hint">↵ Nhấn Enter hoặc Chạm</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {phase === 'breathing' && (
                    <motion.div
                        key="breathing-phase"
                        className="smart-breathing-phase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="smart-orb"
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
                            <div className="orb-center" />
                        </motion.div>

                        <motion.p
                            className="smart-loading-text"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Thả lỏng...<br />
                            <span>Đang thiết kế liệu trình cho <strong>{(suggestion?.text || input).replace('?', '')}</strong></span>
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
