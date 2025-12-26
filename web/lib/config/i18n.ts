// i18n Configuration
// ตั้งค่าเปิด/ปิด feature i18n

export const i18nConfig = {
  enabled: true, // เปลี่ยนเป็น false เพื่อปิดการใช้งาน i18n feature
  defaultLocale: 'th' as 'th' | 'en', // th หรือ en
  locales: ['th', 'en'] as const, // รายการภาษาที่รองรับ
  storageKey: 'language-preference', // Key สำหรับเก็บใน localStorage
}

export type Locale = typeof i18nConfig.locales[number]

