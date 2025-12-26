'use client'

import { useLanguage } from '@/lib/contexts/LanguageContext'
import { useState, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { i18nConfig, type Locale } from '@/lib/config/i18n'
import { FlagIcon } from 'react-flag-kit'

export default function LanguageSwitcher() {
  const { locale, setLocale, isI18nEnabled } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // ใช้ useEffect เพื่อ set mounted หลังจาก component mount แล้ว
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // ถ้า i18n feature ถูกปิด → ไม่แสดงอะไร
  if (!isI18nEnabled) {
    return null
  }

  // ถ้ายังไม่ mount → return null เพื่อป้องกัน hydration error
  if (!mounted) {
    return null
  }

  const toggleLanguage = () => {
    // Toggle ระหว่าง th ↔ en
    const nextLocale: Locale = locale === 'th' ? 'en' : 'th'
    setLocale(nextLocale)
  }

  const getLanguageLabel = () => {
    // แสดงธงตามภาษาปัจจุบัน
    return locale === 'th' ? <FlagIcon code="TH" /> : <FlagIcon code="GB" />
  }

  const getNextLanguage = () => {
    return locale === 'th' ? 'en' : 'th'
  }

  return (
    <button
      onClick={toggleLanguage}
      className="group px-3 py-2 rounded-lg text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center cursor-pointer"
      aria-label={`Switch to ${getNextLanguage()} language`}
      title={`Switch to ${getNextLanguage()} language`}
    >
      {getLanguageLabel()}
    </button>
  )
}

