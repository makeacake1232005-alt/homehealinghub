import { useMemo } from 'react'

export default function FallingPetals() {
    const petals = useMemo(() => {
        return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 12}s`,
            duration: `${8 + Math.random() * 10}s`,
            size: 10 + Math.random() * 12,
            opacity: 0.3 + Math.random() * 0.4,
            color: ['#f0c4c4', '#e8b4b4', '#d4a5a5', '#f2d5d0', '#ecc8c0', '#f5ddd5'][Math.floor(Math.random() * 6)],
            swayDirection: Math.random() > 0.5 ? 1 : -1,
        }))
    }, [])

    return (
        <div className="petals-container" aria-hidden="true">
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="petal"
                    style={{
                        left: petal.left,
                        animationDelay: petal.delay,
                        animationDuration: petal.duration,
                        width: `${petal.size}px`,
                        height: `${petal.size}px`,
                        '--sway': `${petal.swayDirection * (40 + Math.random() * 60)}px`,
                    }}
                >
                    <svg viewBox="0 0 24 24" fill={petal.color} opacity={petal.opacity}>
                        <path d="M12 2C12 2 8 6 6 10C4 14 6 18 10 19C8 16 9 12 12 9C15 12 16 16 14 19C18 18 20 14 18 10C16 6 12 2 12 2Z" />
                    </svg>
                </div>
            ))}
        </div>
    )
}
