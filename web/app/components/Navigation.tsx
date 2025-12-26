'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { getTranslations } from '@/lib/translations'
import { i18nConfig } from '@/lib/config/i18n'

export default function Navigation() {
  const pathname = usePathname()
  const { translations } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  // ใช้ useEffect เพื่อ set mounted หลังจาก component mount แล้ว
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // ตรวจจับการ scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // ถ้า scroll ลงมากกว่า 100px และ scroll ลงมากกว่าเดิม → ซ่อน navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } 
      // ถ้า scroll ขึ้น → แสดง navbar
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    // เพิ่ม event listener เมื่อ component mount
    window.addEventListener('scroll', handleScroll, { passive: true })

    // ลบ event listener เมื่อ component unmount (cleanup)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  // ใช้ default locale สำหรับ server-side render เพื่อป้องกัน hydration error
  // หลังจาก mount แล้วจะใช้ locale จาก context
  const currentTranslations = mounted ? translations : getTranslations(i18nConfig.defaultLocale)
  
  const navItems = [
    { href: '/', label: currentTranslations.nav.home },
    { href: '/about', label: currentTranslations.nav.about },
    { href: '/contact', label: currentTranslations.nav.contact },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold" suppressHydrationWarning>
                {currentTranslations.nav.appName}
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-blue-500 text-gray-900 dark:text-gray-100'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                    suppressHydrationWarning
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

