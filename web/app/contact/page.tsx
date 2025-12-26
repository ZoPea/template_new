'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { getTranslations } from '@/lib/translations'
import { i18nConfig } from '@/lib/config/i18n'

export default function Contact() {
  const { translations } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // ใช้ useEffect เพื่อ set mounted หลังจาก component mount แล้ว
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // ใช้ default locale สำหรับ server-side render เพื่อป้องกัน hydration error
  const currentTranslations = mounted ? translations : getTranslations(i18nConfig.defaultLocale)

  return (
    <div className="min-h-screen bg-white dark:bg-black py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6" suppressHydrationWarning>
          {currentTranslations.contact.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8" suppressHydrationWarning>
          {currentTranslations.contact.description}
        </p>
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          suppressHydrationWarning
        >
          ← {currentTranslations.nav.home}
        </Link>
      </div>
    </div>
  )
}

