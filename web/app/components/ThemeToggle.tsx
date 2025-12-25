'use client'

import { useTheme } from '@/lib/contexts/ThemeContext'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, isThemeEnabled } = useTheme()
  // ตั้งค่า mounted เป็น false ทั้ง server และ client เพื่อให้ render เหมือนกัน
  const [mounted, setMounted] = useState(false)

  // ใช้ useEffect เพื่อ set mounted หลังจาก component mount แล้ว
  useEffect(() => {
    setMounted(true)
  }, [])

  // ถ้า theme feature ถูกปิด → ไม่แสดงอะไร
  if (!isThemeEnabled) {
    return null
  }

  // ถ้ายังไม่ mount → return null (ไม่แสดงอะไรเลย) เพื่อป้องกัน hydration error
  // เนื่องจาก mounted เร็วมาก skeleton จึงไม่จำเป็น
  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    // Toggle ระหว่าง light ↔ dark
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const getThemeIcon = () => {
    return theme === 'light' ? '☀️' : '🌙'
  }

  const getThemeLabel = () => {
    return theme === 'light' ? 'Light' : 'Dark'
  }

  const getNextTheme = () => {
    return theme === 'light' ? 'dark' : 'light'
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 flex items-center gap-2 cursor-pointer"
      aria-label={`Switch to ${getNextTheme()} theme`}
    >
      <span className="text-xl">{getThemeIcon()}</span>
      <span className="text-sm font-medium">{getThemeLabel()}</span>
    </button>
  )
}

