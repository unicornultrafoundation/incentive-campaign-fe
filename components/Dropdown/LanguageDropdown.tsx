import { useLocale } from 'next-intl';
import { Fragment, useEffect, useMemo, useState, useTransition } from 'react';

import ArrowRightIcon from '@/components/Icon/ArrowRight';
import LocaleEnglish from '@/components/Icon/LocaleEnglish';
import LocaleKorea from '@/components/Icon/LocaleKorea';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';
import { classNames } from '@/utils/string';

interface DataLocale {
  id: Locale;
  title: string;
  icon: any;
}

const LanguageDropdown = () => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<DataLocale | null>(null);

  const [, startTransition] = useTransition();

  const locale = useLocale();

  const localeList = useMemo(() => {
    const result: DataLocale[] = [
      {
        id: 'en',
        title: 'ENG',
        icon: <LocaleEnglish width={24} height={24} />,
      },
      // {
      //   id: 'jp',
      //   title: '日本語',
      //   icon: <LocaleJapan width={24} height={24} />,
      // },
      {
        id: 'kr',
        title: '한국',
        icon: <LocaleKorea width={24} height={24} />,
      },
      // {
      //   id: 'vi',
      //   title: 'Việt Nam',
      //   icon: <LocaleVn width={24} height={24} />,
      // },
    ];

    return result;
  }, []);

  // Init
  useEffect(() => {
    if (!dataSelected && locale) {
      const localeFind = localeList.find((x) => x.id === locale);
      if (localeFind) {
        setDataSelected(localeFind);
      } else {
        setDataSelected(localeList[0]);
      }
    }
  }, [dataSelected, locale, localeList]);

  return (
    <div className="flex flex-col relative z-20">
      <button
        type="button"
        onClick={() => setIsShowDropdown(!isShowDropdown)} // Bấm để hiển thị nút Disconnect
        className="relative px-3 py-2 tablet:px-4 tablet:py-1 h-full bg-[#141414] flex items-center gap-1 border border-solid border-[#8C8C99] rounded-[24px] tablet:rounded-[32px] text-[#7EFFC5]"
      >
        {dataSelected && (
          <div className="flex flex-row items-center justify-start gap-1.5 min-w-[94px]">
            <div>{dataSelected.icon}</div>
            <div className="text-xs tablet:text-sm text-white font-semibold text-center">
              {dataSelected.title}
            </div>
          </div>
        )}

        <ArrowRightIcon
          stroke="#929292"
          className="w-4 h-4 tablet:w-5 tablet:h-5 rotate-90"
        />
      </button>

      {isShowDropdown && (
        <div className="absolute overflow-hidden top-[100%] w-[136px] flex flex-col items-start justify-center bg-[#282828] rounded-2xl">
          {localeList.map((item, index) => {
            const { id, title, icon } = item;

            if (dataSelected && dataSelected.id === id) {
              return '';
            }

            return (
              <Fragment key={id}>
                {index > 0 && <div className="h-[1px] w-full bg-[#4A4A4A]" />}

                <div
                  className={classNames(
                    'flex flex-row items-center justify-start w-full gap-1.5',
                    'p-4 cursor-pointer hover:bg-slate-500 transition-colors duration-300',
                  )}
                  onClick={() => {
                    startTransition(() => {
                      setUserLocale(id);
                    });
                    setDataSelected(item);
                    setIsShowDropdown(false);
                  }}
                >
                  <div>{icon}</div>

                  <div className="text-white/60 text-sm">{title}</div>
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
