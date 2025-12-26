'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { getTranslations } from '@/lib/translations'
import { i18nConfig } from '@/lib/config/i18n'

export default function Home() {
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="flex min-h-screen items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6" suppressHydrationWarning>
            {currentTranslations.home.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8" suppressHydrationWarning>
            {currentTranslations.home.description}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/about"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              suppressHydrationWarning
            >
              {currentTranslations.nav.about}
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              suppressHydrationWarning
            >
              {currentTranslations.nav.contact}
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section - เพื่อทดสอบ scroll */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" suppressHydrationWarning>
            {currentTranslations.home.scrollTest}
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p suppressHydrationWarning>
              {currentTranslations.home.navbarAlwaysVisible}
            </p>
            <p suppressHydrationWarning>
              {currentTranslations.home.cssClasses} <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">fixed top-0 left-0 right-0 z-50</code>
            </p>
          </div>
        </div>
      </section>

      {/* More Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" suppressHydrationWarning>
            {currentTranslations.home.moreContent}
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p suppressHydrationWarning>{currentTranslations.home.navbarStillVisible}</p>
            <p suppressHydrationWarning>{currentTranslations.home.scrollableContent}</p>
          </div>
        </div>
      </section>

      {/* Even More Content */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6" suppressHydrationWarning>
            {currentTranslations.home.evenMoreContent}
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p suppressHydrationWarning>{currentTranslations.home.navbarStays}</p>
            <p suppressHydrationWarning>{currentTranslations.home.clickNavigation}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
