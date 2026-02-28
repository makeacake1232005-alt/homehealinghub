import { useEffect, useRef, useCallback, useState } from 'react'

/* ===========================================
   AMBIENT SOUND ENGINE
   Uses Web Audio API to synthesize:
   - Water drop sounds (sine chirps)
   - Leaf rustling (filtered noise bursts)
   - Soft wind drone (low-pass filtered noise)
   =========================================== */

export function useAmbientSound() {
    const ctxRef = useRef(null)
    const droneRef = useRef(null)
    const intervalRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const getCtx = useCallback(() => {
        if (!ctxRef.current) {
            ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
        }
        return ctxRef.current
    }, [])

    // Water drop sound
    const playWaterDrop = useCallback(() => {
        try {
            const ctx = getCtx()
            const now = ctx.currentTime

            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            const filter = ctx.createBiquadFilter()

            osc.type = 'sine'
            osc.frequency.setValueAtTime(1800 + Math.random() * 600, now)
            osc.frequency.exponentialRampToValueAtTime(300 + Math.random() * 200, now + 0.15)

            filter.type = 'bandpass'
            filter.frequency.value = 1200
            filter.Q.value = 2

            gain.gain.setValueAtTime(0, now)
            gain.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.04, now + 0.01)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3 + Math.random() * 0.2)

            osc.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            osc.start(now)
            osc.stop(now + 0.6)
        } catch (e) { /* silent */ }
    }, [getCtx])

    // Leaf rustle sound
    const playLeafRustle = useCallback(() => {
        try {
            const ctx = getCtx()
            const now = ctx.currentTime
            const duration = 0.3 + Math.random() * 0.4

            const bufferSize = ctx.sampleRate * duration
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
            const data = buffer.getChannelData(0)

            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * 0.3
            }

            const source = ctx.createBufferSource()
            source.buffer = buffer

            const filter = ctx.createBiquadFilter()
            filter.type = 'highpass'
            filter.frequency.value = 3000 + Math.random() * 2000
            filter.Q.value = 0.5

            const gain = ctx.createGain()
            gain.gain.setValueAtTime(0, now)
            gain.gain.linearRampToValueAtTime(0.03 + Math.random() * 0.02, now + 0.05)
            gain.gain.linearRampToValueAtTime(0.02, now + duration * 0.6)
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

            source.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            source.start(now)
            source.stop(now + duration)
        } catch (e) { /* silent */ }
    }, [getCtx])

    // Soft wind drone
    const startDrone = useCallback(() => {
        try {
            const ctx = getCtx()

            const bufferSize = ctx.sampleRate * 4
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
            const data = buffer.getChannelData(0)

            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1)
            }

            const source = ctx.createBufferSource()
            source.buffer = buffer
            source.loop = true

            const filter = ctx.createBiquadFilter()
            filter.type = 'lowpass'
            filter.frequency.value = 200
            filter.Q.value = 1

            const gain = ctx.createGain()
            gain.gain.value = 0.015

            source.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            source.start()
            droneRef.current = { source, gain }
        } catch (e) { /* silent */ }
    }, [getCtx])

    // Page turn sound
    const playPageTurn = useCallback(() => {
        try {
            const ctx = getCtx()
            const now = ctx.currentTime

            const bufferSize = ctx.sampleRate * 0.5
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
            const data = buffer.getChannelData(0)

            for (let i = 0; i < bufferSize; i++) {
                const t = i / ctx.sampleRate
                data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 8) * 0.5
            }

            const source = ctx.createBufferSource()
            source.buffer = buffer

            const filter = ctx.createBiquadFilter()
            filter.type = 'bandpass'
            filter.frequency.setValueAtTime(2000, now)
            filter.frequency.exponentialRampToValueAtTime(800, now + 0.3)
            filter.Q.value = 0.8

            const gain = ctx.createGain()
            gain.gain.setValueAtTime(0.06, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

            source.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            source.start(now)
        } catch (e) { /* silent */ }
    }, [getCtx])

    const start = useCallback(() => {
        const ctx = getCtx()
        if (ctx.state === 'suspended') ctx.resume()

        startDrone()

        // Random water drops & leaf rustles
        intervalRef.current = setInterval(() => {
            const r = Math.random()
            if (r < 0.4) {
                playWaterDrop()
            } else if (r < 0.65) {
                playLeafRustle()
            }
        }, 1500 + Math.random() * 2000)

        setIsPlaying(true)
    }, [getCtx, startDrone, playWaterDrop, playLeafRustle])

    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        if (droneRef.current) {
            try {
                droneRef.current.gain.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 1)
                setTimeout(() => {
                    try { droneRef.current.source.stop() } catch (e) { /* */ }
                }, 1100)
            } catch (e) { /* */ }
            droneRef.current = null
        }
        setIsPlaying(false)
    }, [])

    useEffect(() => {
        return () => stop()
    }, [stop])

    return { start, stop, isPlaying, playWaterDrop, playLeafRustle, playPageTurn }
}

export default function AmbientSoundToggle({ ambient }) {
    return (
        <button
            className="ambient-toggle"
            id="ambient-toggle"
            onClick={() => ambient.isPlaying ? ambient.stop() : ambient.start()}
            aria-label={ambient.isPlaying ? 'Tắt âm thanh' : 'Bật âm thanh'}
            title={ambient.isPlaying ? 'Tắt âm thanh ambient' : 'Bật âm thanh ambient'}
        >
            {ambient.isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 010 7.07" />
                    <path d="M19.07 4.93a10 10 0 010 14.14" />
                </svg>
            ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
            )}
        </button>
    )
}
