import { useLocale, useTranslations } from 'next-intl';

import LocaleSwitcherSelect from '@/components/LocaleSwitcher/LocaleSwithcerSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: 'en',
          label: t('en'),
        },
        {
          value: 'kr',
          label: t('kr'),
        },
      ]}
      label={t('label')}
    />
  );
}
