import { useEffect, useRef, useCallback, useState } from 'react'

/* ===========================================
   AMBIENT SOUND ENGINE - FOREST CHILL
   Uses Web Audio API to synthesize:
   - Soft forest wind (layered filtered noise)
   - Leaf rustling (gentle high-pass bursts)
   - Bird chirps (soft sine melodies)
   - Distant bird calls (harmonics)
   - Page turn whisper
   =========================================== */

export function useAmbientSound() {
    const ctxRef = useRef(null)
    const dronesRef = useRef([])
    const intervalRef = useRef(null)
    const birdIntervalRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const getCtx = useCallback(() => {
        if (!ctxRef.current) {
            ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
        }
        return ctxRef.current
    }, [])

    // Gentle bird chirp - short melodic sine tones
    const playBirdChirp = useCallback(() => {
        try {
            const ctx = getCtx()
            const now = ctx.currentTime

            // Random bird pattern: 2-4 quick notes
            const noteCount = 2 + Math.floor(Math.random() * 3)
            const baseFreq = 2200 + Math.random() * 1800 // 2200-4000 Hz range
            const vol = 0.02 + Math.random() * 0.015

            for (let n = 0; n < noteCount; n++) {
                const noteTime = now + n * (0.08 + Math.random() * 0.06)
                const noteDur = 0.06 + Math.random() * 0.08
                const freq = baseFreq + (Math.random() - 0.5) * 600

                const osc = ctx.createOscillator()
                const gain = ctx.createGain()

                osc.type = 'sine'
                osc.frequency.setValueAtTime(freq, noteTime)
                osc.frequency.exponentialRampToValueAtTime(freq * (0.85 + Math.random() * 0.3), noteTime + noteDur)

                gain.gain.setValueAtTime(0, noteTime)
                gain.gain.linearRampToValueAtTime(vol, noteTime + 0.008)
                gain.gain.exponentialRampToValueAtTime(0.001, noteTime + noteDur)

                osc.connect(gain)
                gain.connect(ctx.destination)

                osc.start(noteTime)
                osc.stop(noteTime + noteDur + 0.05)
            }
        } catch (e) { /* silent */ }
    }, [getCtx])

    // Distant bird call - longer, softer, with harmonics
    const playDistantBird = useCallback(() => {
        try {
            const ctx = getCtx()
            const now = ctx.currentTime
            const duration = 0.4 + Math.random() * 0.5
            const freq = 1400 + Math.random() * 800
            const vol = 0.012 + Math.random() * 0.008

            const osc = ctx.createOscillator()
            const osc2 = ctx.createOscillator()
            const gain = ctx.createGain()
            const filter = ctx.createBiquadFilter()

            // Main tone with gentle vibrato
            osc.type = 'sine'
            osc.frequency.setValueAtTime(freq, now)
            osc.frequency.linearRampToValueAtTime(freq * 1.15, now + duration * 0.3)
            osc.frequency.linearRampToValueAtTime(freq * 0.9, now + duration * 0.7)
            osc.frequency.linearRampToValueAtTime(freq * 0.8, now + duration)

            // Soft harmonic
            osc2.type = 'sine'
            osc2.frequency.setValueAtTime(freq * 2.01, now)
            osc2.frequency.linearRampToValueAtTime(freq * 1.8, now + duration)

            const gain2 = ctx.createGain()
            gain2.gain.value = vol * 0.2

            filter.type = 'bandpass'
            filter.frequency.value = freq
            filter.Q.value = 3

            gain.gain.setValueAtTime(0, now)
            gain.gain.linearRampToValueAtTime(vol, now + 0.03)
            gain.gain.setValueAtTime(vol * 0.9, now + duration * 0.5)
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

            osc.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            osc2.connect(gain2)
            gain2.connect(ctx.destination)

            osc.start(now)
            osc.stop(now + duration + 0.1)
            osc2.start(now)
            osc2.stop(now + duration + 0.1)
        } catch (e) { /* silent */ }
    }, [getCtx])

    // Leaf rustle - gentle forest leaves
    const playLeafRustle = useCallback(() => {
        try {
            const ctx = getCtx()
            const now = ctx.currentTime
            const duration = 0.5 + Math.random() * 0.8

            const bufferSize = Math.floor(ctx.sampleRate * duration)
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
            const data = buffer.getChannelData(0)

            for (let i = 0; i < bufferSize; i++) {
                const env = Math.sin((i / bufferSize) * Math.PI) // smooth envelope
                data[i] = (Math.random() * 2 - 1) * 0.25 * env
            }

            const source = ctx.createBufferSource()
            source.buffer = buffer

            const filter = ctx.createBiquadFilter()
            filter.type = 'bandpass'
            filter.frequency.value = 4000 + Math.random() * 3000
            filter.Q.value = 0.4

            const gain = ctx.createGain()
            gain.gain.setValueAtTime(0, now)
            gain.gain.linearRampToValueAtTime(0.025 + Math.random() * 0.015, now + 0.08)
            gain.gain.linearRampToValueAtTime(0.018, now + duration * 0.5)
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

            source.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            source.start(now)
            source.stop(now + duration)
        } catch (e) { /* silent */ }
    }, [getCtx])

    // Forest wind drone - layered for depth
    const startForestDrone = useCallback(() => {
        try {
            const ctx = getCtx()

            // Layer 1: Deep forest hum
            const buf1Size = ctx.sampleRate * 6
            const buf1 = ctx.createBuffer(2, buf1Size, ctx.sampleRate)
            for (let ch = 0; ch < 2; ch++) {
                const data = buf1.getChannelData(ch)
                for (let i = 0; i < buf1Size; i++) {
                    data[i] = (Math.random() * 2 - 1)
                }
            }

            const src1 = ctx.createBufferSource()
            src1.buffer = buf1
            src1.loop = true

            const filt1 = ctx.createBiquadFilter()
            filt1.type = 'lowpass'
            filt1.frequency.value = 180
            filt1.Q.value = 0.7

            const gain1 = ctx.createGain()
            gain1.gain.value = 0.018

            src1.connect(filt1)
            filt1.connect(gain1)
            gain1.connect(ctx.destination)
            src1.start()

            // Layer 2: Mid breeze through trees
            const buf2Size = ctx.sampleRate * 5
            const buf2 = ctx.createBuffer(2, buf2Size, ctx.sampleRate)
            for (let ch = 0; ch < 2; ch++) {
                const data = buf2.getChannelData(ch)
                for (let i = 0; i < buf2Size; i++) {
                    data[i] = (Math.random() * 2 - 1)
                }
            }

            const src2 = ctx.createBufferSource()
            src2.buffer = buf2
            src2.loop = true

            const filt2 = ctx.createBiquadFilter()
            filt2.type = 'bandpass'
            filt2.frequency.value = 600
            filt2.Q.value = 0.3

            const gain2 = ctx.createGain()
            gain2.gain.value = 0.008

            // Slow LFO for wind swell
            const lfo = ctx.createOscillator()
            const lfoGain = ctx.createGain()
            lfo.type = 'sine'
            lfo.frequency.value = 0.15 // Very slow: one swell per ~7 seconds
            lfoGain.gain.value = 0.004

            lfo.connect(lfoGain)
            lfoGain.connect(gain2.gain)

            src2.connect(filt2)
            filt2.connect(gain2)
            gain2.connect(ctx.destination)
            src2.start()
            lfo.start()

            // Layer 3: High canopy whisper
            const buf3Size = ctx.sampleRate * 4
            const buf3 = ctx.createBuffer(1, buf3Size, ctx.sampleRate)
            const d3 = buf3.getChannelData(0)
            for (let i = 0; i < buf3Size; i++) {
                d3[i] = (Math.random() * 2 - 1)
            }

            const src3 = ctx.createBufferSource()
            src3.buffer = buf3
            src3.loop = true

            const filt3 = ctx.createBiquadFilter()
            filt3.type = 'highpass'
            filt3.frequency.value = 3000
            filt3.Q.value = 0.2

            const gain3 = ctx.createGain()
            gain3.gain.value = 0.005

            src3.connect(filt3)
            filt3.connect(gain3)
            gain3.connect(ctx.destination)
            src3.start()

            dronesRef.current = [
                { source: src1, gain: gain1 },
                { source: src2, gain: gain2, lfo },
                { source: src3, gain: gain3 },
            ]
        } catch (e) { /* silent */ }
    }, [getCtx])

    // Soft page turn whisper
    const playPageTurn = useCallback(() => {
        try {
            const ctx = getCtx()
            const now = ctx.currentTime

            const bufferSize = Math.floor(ctx.sampleRate * 0.4)
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
            const data = buffer.getChannelData(0)

            for (let i = 0; i < bufferSize; i++) {
                const t = i / ctx.sampleRate
                data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 10) * 0.4
            }

            const source = ctx.createBufferSource()
            source.buffer = buffer

            const filter = ctx.createBiquadFilter()
            filter.type = 'bandpass'
            filter.frequency.setValueAtTime(1800, now)
            filter.frequency.exponentialRampToValueAtTime(600, now + 0.25)
            filter.Q.value = 0.6

            const gain = ctx.createGain()
            gain.gain.setValueAtTime(0.04, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

            source.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)

            source.start(now)
        } catch (e) { /* silent */ }
    }, [getCtx])

    const start = useCallback(() => {
        const ctx = getCtx()
        if (ctx.state === 'suspended') ctx.resume()

        startForestDrone()

        // Random leaf rustles
        intervalRef.current = setInterval(() => {
            if (Math.random() < 0.55) {
                playLeafRustle()
            }
        }, 1800 + Math.random() * 2500)

        // Random bird sounds  
        birdIntervalRef.current = setInterval(() => {
            const r = Math.random()
            if (r < 0.3) {
                playBirdChirp()
            } else if (r < 0.45) {
                playDistantBird()
            }
        }, 3000 + Math.random() * 5000)

        setIsPlaying(true)
    }, [getCtx, startForestDrone, playLeafRustle, playBirdChirp, playDistantBird])

    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        if (birdIntervalRef.current) {
            clearInterval(birdIntervalRef.current)
            birdIntervalRef.current = null
        }
        if (dronesRef.current.length > 0) {
            const ctx = ctxRef.current
            if (ctx) {
                dronesRef.current.forEach(drone => {
                    try {
                        drone.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5)
                        setTimeout(() => {
                            try { drone.source.stop() } catch (e) { /* */ }
                            try { if (drone.lfo) drone.lfo.stop() } catch (e) { /* */ }
                        }, 1600)
                    } catch (e) { /* */ }
                })
            }
            dronesRef.current = []
        }
        setIsPlaying(false)
    }, [])

    useEffect(() => {
        return () => stop()
    }, [stop])

    return { start, stop, isPlaying, playLeafRustle, playPageTurn, playBirdChirp }
}

export default function AmbientSoundToggle({ ambient }) {
    return (
        <button
            className="ambient-toggle"
            id="ambient-toggle"
            onClick={() => ambient.isPlaying ? ambient.stop() : ambient.start()}
            aria-label={ambient.isPlaying ? 'Tắt âm thanh' : 'Bật âm thanh'}
            title={ambient.isPlaying ? 'Tắt âm thanh rừng' : 'Bật âm thanh rừng'}
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
