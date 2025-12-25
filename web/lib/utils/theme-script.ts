// Script สำหรับ apply theme ก่อน React hydrate
// ป้องกัน Flash of Unstyled Content (FOUC)

import { themeConfig } from '@/lib/config/theme'

export const themeScript = `
(function() {
  const themeConfig = {
    enabled: ${themeConfig.enabled},
    defaultTheme: '${themeConfig.defaultTheme}',
    storageKey: '${themeConfig.storageKey}'
  };

  if (!themeConfig.enabled) {
    document.documentElement.classList.remove('dark');
    return;
  }

  function getTheme() {
    try {
      const stored = localStorage.getItem(themeConfig.storageKey);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch (e) {}
    return themeConfig.defaultTheme;
  }

  const theme = getTheme();
  const actualTheme = theme; // ไม่มี system แล้ว → ใช้ theme โดยตรง

  if (actualTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
`.trim()

