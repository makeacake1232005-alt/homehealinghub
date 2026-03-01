import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import PhaseOne from './components/PhaseOne'
import PhaseTwo from './components/PhaseTwo'
import PhaseThree from './components/PhaseThree'
import FallingPetals from './components/FallingPetals'
import { useAmbientSound } from './components/AmbientSound'
import AmbientSoundToggle from './components/AmbientSound'
import './App.css'

function App() {
  const [currentPhase, setCurrentPhase] = useState(1)
  const [userData, setUserData] = useState({
    name: '',
    condition: '',
    messages: []
  })

  // Global ambient sound
  const ambient = useAmbientSound()

  useEffect(() => {
    const handleFirstClick = () => {
      if (!ambient.isPlaying) {
        ambient.start()
      }
    }
    window.addEventListener('click', handleFirstClick)
    return () => window.removeEventListener('click', handleFirstClick)
  }, [ambient])

  const handlePhaseOneComplete = useCallback((data) => {
    setUserData(prev => ({ ...prev, ...data }))
    setCurrentPhase(2)
  }, [])

  const handlePhaseTwoComplete = useCallback(() => {
    setCurrentPhase(3)
  }, [])

  return (
    <div className="app" id="app-root">
      <FallingPetals />

      {/* Optional floating toggle to let user pause if they want, but it starts automatically on interaction */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
        <AmbientSoundToggle ambient={ambient} />
      </div>

      <AnimatePresence mode="wait">
        {currentPhase === 1 && (
          <PhaseOne
            key="phase-one"
            onComplete={handlePhaseOneComplete}
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {currentPhase === 2 && (
          <PhaseTwo
            key="phase-two"
            onComplete={handlePhaseTwoComplete}
            userData={userData}
          />
        )}
        {currentPhase === 3 && (
          <PhaseThree
            key="phase-three"
            userData={userData}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
