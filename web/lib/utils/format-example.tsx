// ตัวอย่างการใช้งาน Date และ Number Formatting
// ไฟล์นี้เป็นตัวอย่าง ไม่ได้ถูก import ในโปรเจค

'use client'

import { useFormat } from '@/lib/hooks/useFormat'

export function FormatExample() {
  const {
    formatDateLong,
    formatDateShort,
    formatDateIntl,
    formatNumber,
    formatCurrency,
    formatPercentage,
  } = useFormat()

  const today = new Date()
  const number = 1234567.89

  return (
    <div className="space-y-4">
      {/* Date Formatting */}
      <div>
        <h3>Date Formatting</h3>
        <p>Long: {formatDateLong(today)}</p>
        {/* th: "15 มกราคม 2024" */}
        {/* en: "15 January 2024" */}
        
        <p>Short: {formatDateShort(today)}</p>
        {/* "15/01/2024" */}
        
        <p>Custom: {formatDateIntl(today, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Number Formatting */}
      <div>
        <h3>Number Formatting</h3>
        <p>Number: {formatNumber(number)}</p>
        {/* "1,234,567.89" */}
        
        <p>Currency: {formatCurrency(number)}</p>
        {/* th: "฿1,234,567.89" */}
        {/* en: "$1,234,567.89" */}
        
        <p>Percentage: {formatPercentage(12.34)}</p>
        {/* "12.34%" */}
      </div>
    </div>
  )
}

