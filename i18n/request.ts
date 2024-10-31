import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from '@/i18n/locale';

export default getRequestConfig(async () => {
  // This can either be defined statically if only a single locale
  // is supported, or alternatively read from the user settings
  // const locale = 'en';
  const locale = await getUserLocale();
  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
