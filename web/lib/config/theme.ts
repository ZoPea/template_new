// Theme Configuration
// ตั้งค่าเปิด/ปิด feature theme

export const themeConfig = {
  enabled: true, // เปลี่ยนเป็น false เพื่อปิดการใช้งาน theme feature
  defaultTheme: 'light' as 'light' | 'dark', // light หรือ dark (ไม่มี system แล้ว)
  storageKey: 'theme-preference', // Key สำหรับเก็บใน localStorage
}

