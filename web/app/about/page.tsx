'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { getTranslations } from '@/lib/translations'
import { i18nConfig } from '@/lib/config/i18n'
import { useFormat } from '@/lib/hooks/useFormat'

export default function About() {
  const { translations } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const { formatDateLong, formatDateShort, formatNumber, formatCurrency, formatPercentage } = useFormat()

  // ใช้ useEffect เพื่อ set mounted หลังจาก component mount แล้ว
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // ใช้ default locale สำหรับ server-side render เพื่อป้องกัน hydration error
  const currentTranslations = mounted ? translations : getTranslations(i18nConfig.defaultLocale)

  // ตัวอย่างข้อมูล
  const today = new Date()
  const exampleDate = new Date(2024, 0, 15) // 15 มกราคม 2024
  const exampleNumber = 1234567.89
  const examplePrice = 9999.99
  const examplePercentage = 12.34

  return (
    <div className="min-h-screen bg-white dark:bg-black py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6" suppressHydrationWarning>
          {currentTranslations.about.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8" suppressHydrationWarning>
          {currentTranslations.about.description}
        </p>

        {/* Date Formatting Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Date Formatting Examples
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Long Format:</p>
              <p className="text-lg font-mono text-gray-900 dark:text-white" suppressHydrationWarning>
                {formatDateLong(exampleDate)}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                th: "15 มกราคม 2024" | en: "15 January 2024"
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Short Format:</p>
              <p className="text-lg font-mono text-gray-900 dark:text-white" suppressHydrationWarning>
                {formatDateShort(exampleDate)}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                "15/01/2024"
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Today:</p>
              <p className="text-lg font-mono text-gray-900 dark:text-white" suppressHydrationWarning>
                {formatDateLong(today)}
              </p>
            </div>
          </div>
        </section>

        {/* Number Formatting Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Number Formatting Examples
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Number:</p>
              <p className="text-lg font-mono text-gray-900 dark:text-white" suppressHydrationWarning>
                {formatNumber(exampleNumber)}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                "1,234,567.89"
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Currency:</p>
              <p className="text-lg font-mono text-gray-900 dark:text-white" suppressHydrationWarning>
                {formatCurrency(examplePrice)}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                th: "฿9,999.99" | en: "$9,999.99"
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Percentage:</p>
              <p className="text-lg font-mono text-gray-900 dark:text-white" suppressHydrationWarning>
                {formatPercentage(examplePercentage)}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                "12.34%"
              </p>
            </div>
          </div>
        </section>

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

