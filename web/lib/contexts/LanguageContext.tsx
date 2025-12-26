'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { i18nConfig, type Locale } from '@/lib/config/i18n'
import { getTranslations, type Translations } from '@/lib/translations'

interface LanguageContextType {
  locale: Locale
  translations: Translations
  setLocale: (locale: Locale) => void
  isI18nEnabled: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    // ถ้า i18n feature ถูกปิด → return default
    if (!i18nConfig.enabled) {
      return i18nConfig.defaultLocale
    }

    // อ่านจาก localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(i18nConfig.storageKey) as Locale | null
      if (stored && i18nConfig.locales.includes(stored)) {
        return stored
      }
    }
    return i18nConfig.defaultLocale
  })

  // Get translations for current locale
  const translations = getTranslations(locale)

  // อัพเดท HTML lang attribute เมื่อ locale เปลี่ยน
  useEffect(() => {
    if (!i18nConfig.enabled) {
      document.documentElement.lang = i18nConfig.defaultLocale
      return
    }

    // อัพเดท HTML lang attribute
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    if (!i18nConfig.enabled) return

    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem(i18nConfig.storageKey, newLocale)
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        locale,
        translations,
        setLocale,
        isI18nEnabled: i18nConfig.enabled,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

