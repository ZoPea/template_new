// Date Formatting Utilities
// จัดรูปแบบวันที่ตาม locale

import type { Locale } from '@/lib/config/i18n'

// Thai month names
const thaiMonths = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
]

// English month names
const englishMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * Format date to "15 มกราคม 2024" (Thai) or "15 January 2024" (English)
 */
export function formatDateLong(date: Date | string | number, locale: Locale): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const day = d.getDate()
  const month = d.getMonth()
  const year = d.getFullYear()

  if (locale === 'th') {
    return `${day} ${thaiMonths[month]} ${year}`
  } else {
    return `${day} ${englishMonths[month]} ${year}`
  }
}

/**
 * Format date to "15/01/2024" (DD/MM/YYYY)
 */
export function formatDateShort(date: Date | string | number, locale: Locale): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()

  return `${day}/${month}/${year}`
}

/**
 * Format date using Intl.DateTimeFormat (more flexible)
 */
export function formatDateIntl(
  date: Date | string | number,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
  const localeString = locale === 'th' ? 'th-TH' : 'en-US'

  return new Intl.DateTimeFormat(localeString, options).format(d)
}

