export type Locale = (typeof locales)[number];

export const locales = ['en', 'kr', 'vi', 'jp'] as const;
export const defaultLocale: Locale = 'en';
