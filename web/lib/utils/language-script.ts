// Script สำหรับ apply language ก่อน React hydrate
// ป้องกัน Flash of Unstyled Content (FOUC)

import { i18nConfig } from '@/lib/config/i18n'

export const languageScript = `
(function() {
  const i18nConfig = {
    enabled: ${i18nConfig.enabled},
    defaultLocale: '${i18nConfig.defaultLocale}',
    storageKey: '${i18nConfig.storageKey}'
  };

  if (!i18nConfig.enabled) {
    document.documentElement.lang = i18nConfig.defaultLocale;
    return;
  }

  function getLocale() {
    try {
      const stored = localStorage.getItem(i18nConfig.storageKey);
      if (stored === 'th' || stored === 'en') {
        return stored;
      }
    } catch (e) {}
    return i18nConfig.defaultLocale;
  }

  const locale = getLocale();
  document.documentElement.lang = locale;
})();
`.trim()

