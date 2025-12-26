'use client'

import { useState, useEffect, useRef } from 'react'
import { useToast } from '@/lib/hooks/useToast'
import Link from 'next/link'
import { useLanguage } from '@/lib/contexts/LanguageContext'
import { getTranslations } from '@/lib/translations'
import { i18nConfig } from '@/lib/config/i18n'

export default function ToastPage() {
  const { translations } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const toast = useToast()

  // ใช้ useEffect เพื่อ set mounted หลังจาก component mount แล้ว
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // ใช้ default locale สำหรับ server-side render เพื่อป้องกัน hydration error
  const currentTranslations = mounted ? translations : getTranslations(i18nConfig.defaultLocale)

  // ตัวอย่างการใช้งาน toast
  const handleSuccess = () => {
    toast.success('Operation completed successfully!', {
      description: 'Your changes have been saved and applied.',
    })
  }

  const handleError = () => {
    toast.error('Something went wrong. Please try again.', {
      description: 'An unexpected error occurred while processing your request.',
    })
  }

  const handleWarning = () => {
    toast.warning('Please check your input before proceeding.', {
      description: 'Some fields may contain invalid data or missing required information.',
    })
  }

  const handleInfo = () => {
    toast.info('Here is some useful information for you.', {
      description: 'This is additional context about the information displayed above.',
    })
  }

  const handleLoading = () => {
    const loadingToast = toast.loading('Processing your request...', {
      description: 'Please wait while we process your data.',
    })
    
    // Simulate async operation
    setTimeout(() => {
      loadingToast.dismiss()
      toast.success('Request completed!', {
        description: 'Your request has been processed successfully.',
      })
    }, 2000)
  }

  const handlePromise = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        // Random success/failure for demo
        if (Math.random() > 0.5) {
          resolve('Data saved successfully!')
        } else {
          reject(new Error('Failed to save data'))
        }
      }, 2000)
    })

    // Use toast.loading with description, then show success/error with description
    const loadingToast = toast.loading('Saving data...', {
      description: 'Please wait while we save your changes.',
    })

    promise
      .then((data) => {
        loadingToast.dismiss()
        toast.success(String(data), {
          description: 'Your data has been saved to the database.',
        })
      })
      .catch((error: Error) => {
        loadingToast.dismiss()
        toast.error(error.message || 'Failed to save', {
          description: 'Please check your connection and try again.',
        })
      })
  }

  const handleAction = () => {
    toast.success('File uploaded successfully!', {
      description: 'Your file has been uploaded and is ready to use.',
      action: {
        label: 'Undo',
        onClick: () => toast.info('Upload undone', {
          description: 'The file upload has been cancelled.',
        }),
      },
    })
  }

  const handleActionWithAllow = () => {
    toast.info('Do you want to allow this action?', {
      description: 'This will grant access to your account data.',
      action: {
        label: 'Allow',
        onClick: () => toast.success('Action allowed', {
          description: 'Access has been granted successfully.',
        }),
      },
      cancel: {
        label: 'Deny',
        onClick: () => toast.error('Action denied', {
          description: 'Access has been denied.',
        }),
      },
    })
  }

  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleCustomDuration = () => {
    // Clear any existing interval
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
    }

    const duration = 10000 // 10 seconds
    let remaining = duration / 1000 // seconds

    const toastId = toast.success('This toast will stay for 10 seconds', {
      description: `This toast will close in ${remaining} seconds...`,
      duration: duration,
    })

    // Update countdown every second
    countdownIntervalRef.current = setInterval(() => {
      remaining -= 1
      
      if (remaining > 0 && toastId) {
        // Update toast description with countdown
        toast.success('This toast will stay for 10 seconds', {
          description: `This toast will close in ${remaining} seconds...`,
          id: typeof toastId === 'string' || typeof toastId === 'number' ? toastId : undefined,
          duration: remaining * 1000, // Update remaining duration
        })
      } else {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current)
          countdownIntervalRef.current = null
        }
        if (toastId && (typeof toastId === 'string' || typeof toastId === 'number')) {
          toast.dismiss(toastId)
        }
      }
    }, 1000)
  }

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6" suppressHydrationWarning>
          Toast Notification Examples
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8" suppressHydrationWarning>
          Examples of different toast notification types using Sonner
        </p>

        {/* Basic Toast Types */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Basic Toast Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleSuccess}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Success Toast
            </button>
            <button
              onClick={handleError}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Error Toast
            </button>
            <button
              onClick={handleWarning}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Warning Toast
            </button>
            <button
              onClick={handleInfo}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Info Toast
            </button>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Advanced Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={handleLoading}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Loading Toast
            </button>
            <button
              onClick={handlePromise}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Promise Toast
            </button>
            <button
              onClick={handleAction}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Toast with Action
            </button>
            <button
              onClick={handleActionWithAllow}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Toast with Allow
            </button>
            <button
              onClick={handleCustomDuration}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Custom Duration
            </button>
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Code Examples
          </h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Basic Usage:</p>
              <pre className="bg-gray-800 dark:bg-gray-950 text-gray-100 p-4 rounded overflow-x-auto">
                <code>{`import { useToast } from '@/lib/hooks/useToast'

const toast = useToast()

// Success
toast.success('Operation completed!')

// Error
toast.error('Something went wrong!')

// Warning
toast.warning('Please check your input!')

// Info
toast.info('Here is some information!')`}</code>
              </pre>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Loading Toast:</p>
              <pre className="bg-gray-800 dark:bg-gray-950 text-gray-100 p-4 rounded overflow-x-auto">
                <code>{`const loadingToast = toast.loading('Processing...', {
  description: 'Please wait...',
})

// Dismiss after operation completes
setTimeout(() => {
  loadingToast.dismiss()
  toast.success('Done!', {
    description: 'Operation completed successfully.',
  })
}, 2000)`}</code>
              </pre>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Toast with Action & Allow:</p>
              <pre className="bg-gray-800 dark:bg-gray-950 text-gray-100 p-4 rounded overflow-x-auto">
                <code>{`toast.info('Do you want to allow this?', {
  description: 'This will grant access to your data.',
  action: {
    label: 'Allow',
    onClick: () => toast.success('Allowed'),
  },
  cancel: {
    label: 'Deny',
    onClick: () => toast.error('Denied'),
  },
})`}</code>
              </pre>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Promise Toast:</p>
              <pre className="bg-gray-800 dark:bg-gray-950 text-gray-100 p-4 rounded overflow-x-auto">
                <code>{`toast.promise(saveData(), {
  loading: 'Saving...',
  success: 'Saved successfully!',
  error: 'Failed to save',
})`}</code>
              </pre>
            </div>
          </div>
        </section>

        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          suppressHydrationWarning
        >
          ← {currentTranslations.nav.home}
        </Link>
      </div>
    </div>
  )
}

