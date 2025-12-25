'use client'

import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react'
import { themeConfig } from '@/lib/config/theme'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  actualTheme: 'light' | 'dark' // Theme ที่ใช้งานจริง
  setTheme: (theme: Theme) => void
  isThemeEnabled: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // ถ้า theme feature ถูกปิด → return default
    if (!themeConfig.enabled) {
      return themeConfig.defaultTheme
    }

    // อ่านจาก localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(themeConfig.storageKey) as Theme | null
      return stored || themeConfig.defaultTheme
    }
    return themeConfig.defaultTheme
  })

  // คำนวณ actual theme (light/dark) จาก theme setting
  // ใช้ useMemo แทน state เพื่อหลีกเลี่ยง setState ใน useEffect
  const actualTheme = useMemo<'light' | 'dark'>(() => {
    if (!themeConfig.enabled) return 'light'
    // ไม่มี system แล้ว → ใช้ theme โดยตรง
    return theme
  }, [theme])

  // อัพเดท HTML class เมื่อ actualTheme เปลี่ยน
  useEffect(() => {
    if (!themeConfig.enabled) {
      document.documentElement.classList.remove('dark')
      return
    }

    // อัพเดท HTML class ทันที
    if (actualTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [actualTheme])

  const setTheme = (newTheme: Theme) => {
    if (!themeConfig.enabled) return

    setThemeState(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem(themeConfig.storageKey, newTheme)
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        actualTheme,
        setTheme,
        isThemeEnabled: themeConfig.enabled,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

