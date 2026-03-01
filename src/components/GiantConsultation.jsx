import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './GiantConsultation.css'

export default function GiantConsultation({ onComplete }) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({ condition: '', intensity: 50, symptom: '', bodyPart: '' })

    const handleStep1 = (answer) => {
        setFormData(prev => ({ ...prev, condition: answer }))
        setStep(2)
    }

    const handleStep2 = () => {
        setFormData(prev => ({ ...prev, intensity: formData.intensity }))
        setStep(3)
    }

    const handleStep3 = (answer) => {
        setFormData(prev => ({ ...prev, symptom: answer }))
        setStep(4)
    }

    const handleStep4 = (part) => {
        setFormData(prev => ({ ...prev, bodyPart: part }))
        setTimeout(() => {
            onComplete({
                name: '', // Khách hàng không cần nhập tên theo yêu cầu rút gọn
                condition: formData.condition,
                messages: [
                    `Mệt mỏi nhất ở: ${formData.condition}`,
                    `Mức độ stress: ${formData.intensity}/100`,
                    `Triệu chứng: ${formData.symptom}`,
                    `Vùng cơ thể cần xoa dịu: ${part}`
                ],
                formData: { ...formData, bodyPart: part }
            })
        }, 1500)
    }

    // Dynamic background for Aura Slider
    const getBgStyle = () => {
        if (step !== 2) return {}
        const ratio = formData.intensity / 100
        // Calculate a color from warm (#ffebd2) to cool (#291c42)
        const h = Math.round(35 + (260 - 35) * ratio)
        const s = Math.round(50 + (30 * ratio))
        const l = Math.round(90 - (75 * ratio))

        return {
            backgroundColor: `hsl(${h}, ${s}%, ${l}%)`,
            transition: 'background-color 0.3s ease'
        }
    }

    // Determine font color dynamically for step 2 if background is dark
    const isDarkBg = step === 2 && formData.intensity > 60

    return (
        <div className="giant-consultation" style={getBgStyle()}>
            <AnimatePresence mode="wait">

                {/* STEP 1: TYPOGRAPHY KHỔNG LỒ */}
                {step === 1 && (
                    <motion.div key="step1" className="giant-step"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="giant-question">
                            Hôm nay,<br />bạn cảm thấy mệt mỏi nhất ở đâu?
                        </h1>
                        <div className="giant-pill-group">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="giant-pill" onClick={() => handleStep1('Đau Cổ Vai Gáy')}>Đau Cổ Vai Gáy</motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="giant-pill" onClick={() => handleStep1('Nặng Đầu / Căng Thẳng')}>Nặng Đầu / Căng Thẳng</motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="giant-pill" onClick={() => handleStep1('Trạng Thái Uể Oải')}>Trạng Thái Uể Oải</motion.button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: THANH TRƯỢT NĂNG LƯỢNG (AURA SLIDER) */}
                {step === 2 && (
                    <motion.div key="step2" className="giant-step step-aura"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className={`giant-question ${isDarkBg ? 'text-light' : 'text-dark'}`}>
                            Kéo để diễn tả mức độ căng thẳng<br />của bạn lúc này
                        </h1>
                        <div className="aura-slider-wrapper">
                            <input
                                type="range" min="1" max="100"
                                value={formData.intensity}
                                onChange={(e) => setFormData(prev => ({ ...prev, intensity: Number(e.target.value) }))}
                                className="giant-slider"
                            />
                            <div className={`slider-labels ${isDarkBg ? 'text-light' : 'text-dark'}`}>
                                <span>Thư giãn</span>
                                <span>Rất mệt mỏi</span>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className={`giant-btn-next ${isDarkBg ? 'btn-light' : 'btn-dark'}`}
                            onClick={handleStep2}
                        >Tiếp Tục</motion.button>
                    </motion.div>
                )}

                {/* STEP 3: THẺ BÀI VUỐT (SWIPE CARD) */}
                {step === 3 && (
                    <motion.div key="step3" className="giant-step"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="giant-caption">Vuốt để trả lời nhanh</p>

                        <div className="swipe-card-container">
                            <motion.div
                                className="swipe-card"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(e, { offset }) => {
                                    if (offset.x > 80) handleStep3('Đúng vậy')
                                    else if (offset.x < -80) handleStep3('Bỏ qua')
                                }}
                                whileTap={{ scale: 0.95, cursor: "grabbing" }}
                            >
                                <div className="card-image-wrap">
                                    <img src="/essential-oils.png" alt="" className="swipe-img" />
                                </div>
                                <h2>"Tôi hay bị tỉnh giấc giữa đêm và khó ngủ lại."</h2>

                                <div className="swipe-hints">
                                    <span className="hint-left">← Bỏ qua</span>
                                    <span className="hint-right">Đúng vậy →</span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="giant-pill-group swipe-button-group">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="giant-pill pill-secondary" onClick={() => handleStep3('Bỏ qua')}>Không phải tôi</motion.button>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="giant-pill" onClick={() => handleStep3('Đúng vậy')}>Đúng Vậy</motion.button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 4: BẢN ĐỒ CƠ THỂ 2D (SILHOUETTE MAP) */}
                {step === 4 && (
                    <motion.div key="step4" className="giant-step step-body-map"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="giant-question map-title">Hãy chạm vào nơi bạn cần được xoa dịu nhất</h1>

                        <div className="giant-silhouette-container">
                            <svg viewBox="0 0 400 600" className="giant-svg-map">
                                {/* Elegant minimalist continuous line outline of a torso/body */}
                                <path
                                    className="silhouette-path"
                                    d="M200 50 C160 50, 140 90, 140 130 C140 160, 155 180, 175 195 C140 205, 90 230, 70 290 C60 320, 50 400, 50 400 L95 400 C95 400, 105 330, 115 290 C130 330, 140 450, 140 550 L260 550 C260 450, 270 330, 285 290 C295 330, 305 400, 305 400 L350 400 C350 400, 340 320, 330 290 C310 230, 260 205, 225 195 C245 180, 260 160, 260 130 C260 90, 240 50, 200 50 Z"
                                />
                                {/* Glowing interaction points */}
                                <BodyDot cx="200" cy="110" part="Đầu" onSelect={handleStep4} label="Đầu" />
                                <BodyDot cx="200" cy="205" part="Cổ Vai Gáy" onSelect={handleStep4} label="Vai Gáy" />
                                <BodyDot cx="200" cy="350" part="Lưng" onSelect={handleStep4} label="Lưng" />
                                <BodyDot cx="200" cy="500" part="Chân" onSelect={handleStep4} label="Chân" />
                            </svg>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function BodyDot({ cx, cy, part, onSelect, label }) {
    const [rippling, setRippling] = useState(false)

    // Auto-pulse animation randomly delayed for visual realism
    const randomDelay = Math.random() * 2;

    const handleClick = () => {
        setRippling(true)
        onSelect(part)
    }

    return (
        <g className="body-dot-group" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <circle cx={cx} cy={cy} r="40" fill="transparent" /> {/* Catch area */}
            <circle cx={cx} cy={cy} r="12" fill="var(--color-primary)" className="core-dot" />

            {/* Ambient Idle Pulse */}
            {!rippling && (
                <motion.circle cx={cx} cy={cy} r="12" fill="transparent" stroke="var(--color-primary)" strokeWidth="1.5"
                    animate={{ r: [12, 28, 12], opacity: [0.8, 0, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: randomDelay }}
                />
            )}

            {/* Click Ripple Effect */}
            {rippling && (
                <>
                    <motion.circle cx={cx} cy={cy} r="12" fill="var(--color-primary)"
                        animate={{ r: 80, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <motion.circle cx={cx} cy={cy} r="12" fill="transparent" stroke="var(--color-primary)" strokeWidth="3"
                        animate={{ r: 120, opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                </>
            )}
            <text x={Number(cx) + 30} y={Number(cy) + 5} className="svg-dot-label">{label}</text>
        </g>
    )
}
