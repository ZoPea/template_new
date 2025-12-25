'use client'

import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-black py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          This is the About page. Navigation is handled client-side for a smooth
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

