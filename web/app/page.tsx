'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="flex min-h-screen items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to Single Page App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            This is a Single Page Application built with Next.js
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/about"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Content Section - เพื่อทดสอบ scroll */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Scroll Down to Test Fixed Navbar
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Navbar จะแสดงอยู่ด้านบนตลอดเวลาแม้คุณจะ scroll ลงมา
            </p>
            <p>
              ใช้ CSS classes: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">fixed top-0 left-0 right-0 z-50</code>
            </p>
          </div>
        </div>
      </section>

      {/* More Content */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            More Content
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>ลอง scroll ขึ้นลงดู Navbar จะยังคงอยู่ด้านบนตลอดเวลา</p>
            <p>นี่คือตัวอย่างเนื้อหาที่เพิ่มเข้ามาเพื่อให้คุณสามารถ scroll ได้</p>
          </div>
        </div>
      </section>

      {/* Even More Content */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Even More Content
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>Navbar ยังคงอยู่ด้านบน!</p>
            <p>ลองคลิกที่ navigation links เพื่อเปลี่ยนหน้า (ไม่ reload)</p>
          </div>
        </div>
      </section>
    </div>
  )
}
