import { createContext, useContext, useState } from 'react'

const translations = {
    en: {
        // PhaseOne
        navHome: 'HOME',
        navAbout: 'ABOUT US',
        navJournal: 'THE JOURNAL',
        navWellness: 'WELLNESS COLLECTION',
        navJourneys: 'HEALING JOURNEYS',
        navMembership: 'MEMBERSHIP PACKAGE',
        navContact: 'CONTACT US',
        heroTitle1: 'Personalized',
        heroTitle2: 'Healing Consultation',
        heroSubtitle: 'Take a deep breath and share how you feel right now. Click the button below to enter your private sanctuary.',
        heroBtn: 'Personal Healing Consultation',

        // SmartPrompt
        inputPlaceholder: 'Describe your current condition',
        suggestionHint: '↵ Press Enter or Tap',
        suggestions: [
            { keywords: ['n', 'ne', 'neck', 'shoulder', 'pain'], text: 'Neck & Shoulder Pain?', id: 'vai-gay' },
            { keywords: ['s', 'sl', 'sleep', 'insomnia', 'trouble'], text: 'Trouble Sleeping?', id: 'mat-ngu' },
            { keywords: ['s', 'st', 'stress', 'tension', 'heavy'], text: 'Heavy Stress & Tension?', id: 'stress' },
            { keywords: ['b', 'ba', 'back', 'lower'], text: 'Lower Back Pain?', id: 'that-lung' },
        ],
        healingPath: 'Healing Path',
        reservationTitle: 'Reservation Details',
        labelName: 'Full Name',
        labelPhone: 'Phone Number',
        labelEmail: 'Email (Optional)',
        intensityMild: 'Intensity: Mild (Occasional pain)',
        intensityModerate: 'Intensity: Moderate (Affects daily life)',
        intensitySevere: 'Intensity: Severe (Constant ache)',
        submitBtn: 'Complete & Preview Plan',

        // PhaseTwo
        whisper1: 'Relax your shoulders...',
        whisper2: 'Take a deep breath...',
        whisper3: 'Your personalized healing path is ready.',
        whisperDedication: '— for {name} —',

        // PhaseThree
        steps: [
            { title: 'We Understand You', description: 'Because you are feeling heavy and stressed...', detail: 'Your body is sending a signal for care. This is the first step of your healing journey — where we listen and understand.' },
            { title: 'Deep Muscle Release', description: 'Step 1: Herbal Essential Oil Therapy', detail: 'Organic essential oil therapy combined with Swedish massage techniques relaxes deep muscle groups, effectively reducing pain from the first 60 minutes.', duration: '60 mins' },
            { title: 'Energy Regeneration', description: 'Step 2: Hot Stone & Light Therapy', detail: 'Hot basalt stones placed on acupressure points combined with infrared therapy light activate blood circulation and regenerate new cells.', duration: '45 mins' },
            { title: 'Mind Balancing', description: 'Step 3: Meditation & Aromatherapy', detail: 'A quiet private room with agarwood scent and Theta brainwave music, guided personal meditation helps the mind shed all pressure.', duration: '30 mins' },
            { title: 'Total Rejuvenation', description: 'Result: Body & Mind Harmony', detail: 'After the journey, you will clearly feel the difference: light shoulders, clear mind, deeper sleep, and spreading positive energy.' },
        ],
        badgeEmpathy: 'Empathy',
        badgeResult: 'Result',
        badgeStep: 'Step',
        conditionPrefix: 'Because you are feeling',
        recWelcome: 'Welcome',
        recSubtitle: 'Based on your condition, your ideal healing journey is:',
        recCta: 'Treat yourself to this experience',
        recIntensity: 'Intensity',
        recDuration: 'Duration',
        recContact: 'Contact',
        autoPlaying: 'Auto-playing pages...',
        footerBrand: '© 2026 Home Healing Hub',
        footerHint: '← → or click to flip pages',
        prevPage: 'Previous Page',
        nextPage: 'Next Page',

        // AmbientSound
        muteLabel: 'Mute forest sound',
        playLabel: 'Play forest sound',

        // Therapies
        therapies: {
            'energy-reset': { name: 'Energy Reset: Deep Recovery Thai Therapy', desc: 'Intensive Thai stretching, herbal hot compresses, and 528Hz healing frequencies to relieve physical fatigue and joint stiffness.', duration: '120 mins', url: 'https://homehealinghub.com.vn/product/energy-reset-deep-recovery-thai-therapy/' },
            'jetlag-recovery': { name: 'Jetlag Recovery: Wake Up Refreshed', desc: 'Lymphatic drainage massage, rehydrating oils, and 963Hz Crown Frequency to clear mental fog and restore your natural circadian rhythm.', duration: '90 mins', url: 'https://homehealinghub.com.vn/product/jetlag-recovery-wake-up-refreshed-wherever-you-land/' },
            'silent-healing': { name: 'Silent Healing: Total Silence Therapy', desc: 'A calming massage in total silence, accompanied by 432Hz nature-aligned soundscapes and grounding oils to cure mental burnout.', duration: '90 mins', url: 'https://homehealinghub.com.vn/product/silent-healing-total-silence-sound-nature-therapy/' },
            'couple-healing': { name: 'Couple Healing: Romantic Connection Therapy', desc: 'Synchronized dual-massage with 639Hz Heart Frequency, romantic candlelight setup, and love-blend aromatherapy for deeper connection.', duration: '120 mins', url: 'https://homehealinghub.com.vn/product/couple-healing-romantic-connection-therapy-639hz-heart-frequency-experience/' },
            'default': { name: 'Signature Holistic Journey', desc: 'A bespoke treatment session specifically designed to target your unique physical and emotional state.', duration: '135 mins', url: 'https://homehealinghub.com.vn/healing-journeys/' },
        },
    },
    vi: {
        // PhaseOne
        navHome: 'TRANG CHỦ',
        navAbout: 'VỀ CHÚNG TÔI',
        navJournal: 'NHẬT KÝ',
        navWellness: 'BỘ SƯU TẬP',
        navJourneys: 'HÀNH TRÌNH TRỊ LIỆU',
        navMembership: 'GÓI THÀNH VIÊN',
        navContact: 'LIÊN HỆ',
        heroTitle1: 'Tư Vấn Trị Liệu',
        heroTitle2: 'Cá Nhân Hóa',
        heroSubtitle: 'Hãy hít thở thật sâu và chia sẻ cảm nhận của bạn. Nhấn nút bên dưới để bước vào không gian riêng tư.',
        heroBtn: 'Tư Vấn Trị Liệu Cá Nhân',

        // SmartPrompt
        inputPlaceholder: 'Mô tả tình trạng hiện tại của bạn',
        suggestionHint: '↵ Nhấn Enter hoặc Chạm',
        suggestions: [
            { keywords: ['đ', 'đa', 'đau', 'vai', 'gáy', 'cổ'], text: 'Đau Cổ Vai Gáy?', id: 'vai-gay' },
            { keywords: ['m', 'mấ', 'mất', 'ngủ', 'khó'], text: 'Mất Ngủ / Khó Ngủ?', id: 'mat-ngu' },
            { keywords: ['c', 'că', 'căng', 'stress', 'nặng'], text: 'Căng Thẳng / Stress Nặng?', id: 'stress' },
            { keywords: ['l', 'lư', 'lưng', 'thắt'], text: 'Đau Thắt Lưng?', id: 'that-lung' },
        ],
        healingPath: 'Lộ Trình Chữa Lành',
        reservationTitle: 'Thông Tin Đặt Lịch',
        labelName: 'Họ và Tên',
        labelPhone: 'Số Điện Thoại',
        labelEmail: 'Email (Không bắt buộc)',
        intensityMild: 'Mức độ: Nhẹ (Thi thoảng đau)',
        intensityModerate: 'Mức độ: Trung bình (Ảnh hưởng sinh hoạt)',
        intensitySevere: 'Mức độ: Nặng (Đau liên tục)',
        submitBtn: 'Hoàn Tất & Nhận Phác Đồ',

        // PhaseTwo
        whisper1: 'Hãy thả lỏng hai vai của bạn...',
        whisper2: 'Hít một hơi thật sâu...',
        whisper3: 'Lộ trình thư giãn của riêng bạn đã sẵn sàng.',
        whisperDedication: '— dành cho {name} —',

        // PhaseThree
        steps: [
            { title: 'Chúng Tôi Hiểu Bạn', description: 'Vì bạn đang cảm thấy nặng nề và căng thẳng...', detail: 'Cơ thể bạn đang gửi tín hiệu cần được chăm sóc. Đây là bước đầu tiên của hành trình phục hồi — nơi chúng tôi lắng nghe và thấu hiểu.' },
            { title: 'Giải Phóng Cơ Sâu', description: 'Bước 1: Trị liệu bằng tinh dầu thảo mộc', detail: 'Liệu pháp tinh dầu organic kết hợp kỹ thuật massage Thụy Điển giúp thả lỏng các nhóm cơ sâu, giảm đau mỏi hiệu quả từ 60 phút đầu tiên.', duration: '60 phút' },
            { title: 'Tái Tạo Năng Lượng', description: 'Bước 2: Đá nóng & Liệu pháp ánh sáng', detail: 'Đá bazan nóng đặt lên các huyệt đạo kết hợp ánh sáng trị liệu hồng ngoại, kích hoạt tuần hoàn máu và tái tạo tế bào mới.', duration: '45 phút' },
            { title: 'Cân Bằng Tâm Trí', description: 'Bước 3: Thiền định & Hương trị liệu', detail: 'Phòng riêng tĩnh lặng với hương trầm và nhạc sóng não Theta, hướng dẫn thiền định cá nhân giúp tâm trí rũ bỏ mọi áp lực.', duration: '30 phút' },
            { title: 'Tái Sinh Toàn Diện', description: 'Kết quả: Cơ thể & tâm trí hài hòa', detail: 'Sau lộ trình, bạn sẽ cảm nhận rõ sự khác biệt: vai gáy nhẹ nhàng, tâm trí sáng suốt, giấc ngủ sâu hơn và năng lượng tích cực lan tỏa.' },
        ],
        badgeEmpathy: 'Lắng Nghe',
        badgeResult: 'Kết Quả',
        badgeStep: 'Bước',
        conditionPrefix: 'Vì bạn đang cảm thấy',
        recWelcome: 'Xin chào',
        recSubtitle: 'Dựa trên tình trạng của bạn, lộ trình chữa lành lý tưởng là:',
        recCta: 'Dành tặng bản thân trải nghiệm này',
        recIntensity: 'Mức độ',
        recDuration: 'Thời lượng',
        recContact: 'Liên hệ',
        autoPlaying: 'Đang tự động lật trang...',
        footerBrand: '© 2026 Home Healing Hub',
        footerHint: '← → hoặc click để lật trang',
        prevPage: 'Trang trước',
        nextPage: 'Trang sau',

        // AmbientSound
        muteLabel: 'Tắt âm thanh rừng',
        playLabel: 'Bật âm thanh rừng',

        // Therapies
        therapies: {
            'energy-reset': { name: 'Phục Hồi Năng Lượng: Thai Massage Chuyên Sâu', desc: 'Kỹ thuật Thai kéo giãn chuyên sâu, chườm thảo mộc nóng và tần số chữa lành 528Hz giúp giải phóng mệt mỏi thể chất.', duration: '120 phút', url: 'https://homehealinghub.com.vn/product/energy-reset-deep-recovery-thai-therapy/' },
            'jetlag-recovery': { name: 'Phục Hồi Jetlag: Tỉnh Táo Trở Lại', desc: 'Massage dẫn lưu bạch huyết, tinh dầu dưỡng ẩm và tần số vương miện 963Hz giúp xóa tan sương mù trí tuệ.', duration: '90 phút', url: 'https://homehealinghub.com.vn/product/jetlag-recovery-wake-up-refreshed-wherever-you-land/' },
            'silent-healing': { name: 'Chữa Lành Trong Tĩnh Lặng', desc: 'Massage trong không gian tĩnh lặng hoàn toàn, cùng âm thanh 432Hz hài hòa thiên nhiên và tinh dầu grounding.', duration: '90 phút', url: 'https://homehealinghub.com.vn/product/silent-healing-total-silence-sound-nature-therapy/' },
            'couple-healing': { name: 'Couple Healing: Trị Liệu Kết Nối Lãng Mạn', desc: 'Massage đồng bộ cho cặp đôi với tần số trái tim 639Hz, nến thơm lãng mạn và tinh dầu tình yêu cho kết nối sâu sắc hơn.', duration: '120 phút', url: 'https://homehealinghub.com.vn/product/couple-healing-romantic-connection-therapy-639hz-heart-frequency-experience/' },
            'default': { name: 'Hành Trình Toàn Diện Đặc Biệt', desc: 'Liệu trình trị liệu riêng biệt được thiết kế chuyên biệt cho tình trạng thể chất và cảm xúc của bạn.', duration: '135 phút', url: 'https://homehealinghub.com.vn/healing-journeys/' },
        },
    }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('en')
    const t = translations[lang]
    const toggleLang = () => setLang(prev => prev === 'en' ? 'vi' : 'en')

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLang() {
    return useContext(LanguageContext)
}
