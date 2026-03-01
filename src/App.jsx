import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import PhaseOne from './components/PhaseOne'
import PhaseTwo from './components/PhaseTwo'
import PhaseThree from './components/PhaseThree'
import FallingPetals from './components/FallingPetals'
import LanguageToggle from './components/LanguageToggle'
import { useAmbientSound } from './components/AmbientSound'
import AmbientSoundToggle from './components/AmbientSound'
import './components/LanguageToggle.css'
import './App.css'

function App() {
  const [currentPhase, setCurrentPhase] = useState(1)
  const [userData, setUserData] = useState({
    name: '',
    condition: '',
    messages: []
  })

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

      {/* Fixed bottom controls */}
      <div className="fixed-controls">
        <LanguageToggle />
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
