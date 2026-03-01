import { motion } from 'framer-motion'
import { useLang } from '../contexts/LanguageContext'

export default function LanguageToggle() {
    const { lang, toggleLang } = useLang()

    return (
        <motion.button
            className="lang-toggle"
            onClick={toggleLang}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            title={lang === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
            aria-label="Toggle language"
        >
            <div className="lang-toggle-track">
                <motion.div
                    className="lang-toggle-thumb"
                    animate={{ x: lang === 'en' ? 0 : 28 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
                <span className={`lang-label lang-en ${lang === 'en' ? 'active' : ''}`}>EN</span>
                <span className={`lang-label lang-vi ${lang === 'vi' ? 'active' : ''}`}>VI</span>
            </div>
        </motion.button>
    )
}
