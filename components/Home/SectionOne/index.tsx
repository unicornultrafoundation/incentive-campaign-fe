'use client';

import { useTranslations } from 'next-intl';

export default function SectionOne() {
  const t = useTranslations();

  return (
    <div className="w-[100%] max-w-screen-mobile desktop:max-w-screen-desktop min-h-[100vh] bg-[pink] flex flex-row">
         <div className="w-[60%] max-w-screen-mobile desktop:max-w-screen-desktop  bg-[pink] flex flex-row">
      Yellow
    </div>
    </div>
  );
}
