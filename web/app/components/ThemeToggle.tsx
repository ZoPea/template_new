'use client'

import { useTheme } from '@/lib/contexts/ThemeContext'
import { useState, useEffect } from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle() {
  const { theme, setTheme, isThemeEnabled } = useTheme()
  // ตั้งค่า mounted เป็น false ทั้ง server และ client เพื่อให้ render เหมือนกัน
  const [mounted, setMounted] = useState(false)

  // ใช้ useEffect เพื่อ set mounted หลังจาก component mount แล้ว
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    return theme === 'light' ? (
      <FiSun className="w-5 h-5 transition-colors duration-200 group-hover:text-yellow-500" />
    ) : (
      <FiMoon className="w-5 h-5 transition-colors duration-200 group-hover:text-blue-400" />
    )
  }

  const getNextTheme = () => {
    return theme === 'light' ? 'dark' : 'light'
  }

  return (
    <button
      onClick={toggleTheme}
      className="group p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center cursor-pointer"
      aria-label={`Switch to ${getNextTheme()} theme`}
      title={`Switch to ${getNextTheme()} theme`}
    >
      {getThemeIcon()}
    </button>
  )
}

