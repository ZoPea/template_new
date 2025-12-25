'use client'

import Link from 'next/link'

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-black py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          This is the Contact page. All navigation is client-side for a seamless
          Single Page Application experience.
        </p>
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

