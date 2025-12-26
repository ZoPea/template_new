// Custom hook สำหรับ date และ number formatting
// ใช้ locale จาก LanguageContext อัตโนมัติ

'use client'

import { useLanguage } from '@/lib/contexts/LanguageContext'
import { formatDateLong, formatDateShort, formatDateIntl } from '@/lib/utils/date-format'
import { formatNumber, formatCurrency, formatPercentage } from '@/lib/utils/number-format'

export function useFormat() {
  const { locale } = useLanguage()

  return {
    // Date formatting
    formatDateLong: (date: Date | string | number) => formatDateLong(date, locale),
    formatDateShort: (date: Date | string | number) => formatDateShort(date, locale),
    formatDateIntl: (
      date: Date | string | number,
      options?: Intl.DateTimeFormatOptions
    ) => formatDateIntl(date, locale, options),

    // Number formatting
    formatNumber: (value: number | string, options?: Intl.NumberFormatOptions) =>
      formatNumber(value, locale, options),
    formatCurrency: (
      value: number | string,
      currency?: string,
      options?: Intl.NumberFormatOptions
    ) => formatCurrency(value, locale, currency, options),
    formatPercentage: (value: number | string, options?: Intl.NumberFormatOptions) =>
      formatPercentage(value, locale, options),

    // Locale
    locale,
  }
}

