// Number Formatting Utilities
// จัดรูปแบบตัวเลขตาม locale

import type { Locale } from '@/lib/config/i18n'

/**
 * Format number to "1,234,567.89" format
 */
export function formatNumber(
  value: number | string,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) {
    return String(value)
  }

  const localeString = locale === 'th' ? 'th-TH' : 'en-US'

  return new Intl.NumberFormat(localeString, {
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    ...options,
  }).format(num)
}

/**
 * Format currency (e.g., "1,234.56 THB" or "1,234.56 USD")
 */
export function formatCurrency(
  value: number | string,
  locale: Locale,
  currency: string = locale === 'th' ? 'THB' : 'USD',
  options?: Intl.NumberFormatOptions
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) {
    return String(value)
  }

  const localeString = locale === 'th' ? 'th-TH' : 'en-US'

  return new Intl.NumberFormat(localeString, {
    style: 'currency',
    currency,
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    ...options,
  }).format(num)
}

/**
 * Format percentage (e.g., "12.34%")
 */
export function formatPercentage(
  value: number | string,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) {
    return String(value)
  }

  const localeString = locale === 'th' ? 'th-TH' : 'en-US'

  return new Intl.NumberFormat(localeString, {
    style: 'percent',
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    ...options,
  }).format(num / 100)
}

