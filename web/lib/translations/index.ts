// Translation exports

import { th } from './th'
import { en } from './en'
import type { Locale } from '@/lib/config/i18n'

export type Translations = typeof th

export const translations = {
  th,
  en,
} as const

export function getTranslations(locale: Locale): Translations {
  return translations[locale]
}

