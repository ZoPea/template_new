// Custom hook สำหรับ toast notifications
// ใช้ toast จาก sonner

'use client'

import { toast as sonnerToast } from 'sonner'
import { toastConfig } from '@/lib/config/toast'

export function useToast() {
  // ถ้า toast feature ถูกปิด → return no-op functions
  if (!toastConfig.enabled) {
    return {
      success: () => {},
      error: () => {},
      warning: () => {},
      info: () => {},
      loading: () => ({ dismiss: () => {}, update: () => {} }),
      promise: () => {},
      message: () => {},
      dismiss: () => {},
    }
  }

  return {
    // Success toast
    success: (message: string, options?: Parameters<typeof sonnerToast.success>[1]) => {
      return sonnerToast.success(message, options)
    },

    // Error toast
    error: (message: string, options?: Parameters<typeof sonnerToast.error>[1]) => {
      return sonnerToast.error(message, options)
    },

    // Warning toast
    warning: (message: string, options?: Parameters<typeof sonnerToast.warning>[1]) => {
      return sonnerToast.warning(message, options)
    },

    // Info toast
    info: (message: string, options?: Parameters<typeof sonnerToast.info>[1]) => {
      return sonnerToast.info(message, options)
    },

    // Loading toast (returns toast ID for dismiss)
    loading: (message: string, options?: Parameters<typeof sonnerToast.loading>[1]) => {
      const toastId = sonnerToast.loading(message, options)
      return {
        dismiss: () => sonnerToast.dismiss(toastId),
        update: (message: string, options?: Parameters<typeof sonnerToast.loading>[1]) => {
          sonnerToast.loading(message, { ...options, id: toastId })
        },
      }
    },

    // Dismiss toast by ID
    dismiss: (toastId?: string | number) => {
      sonnerToast.dismiss(toastId)
    },

    // Promise toast
    promise: <T,>(
      promise: Promise<T>,
      options: Parameters<typeof sonnerToast.promise<T>>[1]
    ) => {
      return sonnerToast.promise(promise, options)
    },

    // Custom message toast
    message: (message: string, options?: Parameters<typeof sonnerToast.message>[1]) => {
      return sonnerToast.message(message, options)
    },
  }
}

