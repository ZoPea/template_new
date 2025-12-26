// Toast Configuration
// ตั้งค่าเปิด/ปิด feature toast

export const toastConfig = {
  enabled: true, // เปลี่ยนเป็น false เพื่อปิดการใช้งาน toast feature
  position: 'top-right' as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center',
  duration: 4000, // milliseconds (4 seconds)
  richColors: true, // ใช้สีที่สวยงามสำหรับ success/error/warning
  closeButton: true, // แสดงปุ่มปิด
}

