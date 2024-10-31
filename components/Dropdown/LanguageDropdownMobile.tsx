import { useLocale } from 'next-intl';
import { Fragment, useEffect, useMemo, useState, useTransition } from 'react';

import Icon from '@/components/Icon';
import ArrowRightIcon from '@/components/Icon/ArrowRight';
import LocaleEnglish from '@/components/Icon/LocaleEnglish';
import LocaleJapan from '@/components/Icon/LocaleJapan';
import LocaleKorea from '@/components/Icon/LocaleKorea';
import LocaleVn from '@/components/Icon/LocaleVn';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';
import { classNames } from '@/utils/string';

interface DataLocale {
  id: Locale;
  title: string;
  icon: any;
}

const LanguageDropdownMobile = () => {
  const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<DataLocale | null>(null);

  const [, startTransition] = useTransition();

  const locale = useLocale();

  const localeList = useMemo(() => {
    const result: DataLocale[] = [
      {
        id: 'en',
        title: 'ENG',
        icon: <LocaleEnglish />,
      },
      {
        id: 'jp',
        title: '日本語',
        icon: <LocaleJapan />,
      },
      {
        id: 'kr',
        title: '한국',
        icon: <LocaleKorea />,
      },
      {
        id: 'vi',
        title: 'Việt Nam',
        icon: <LocaleVn />,
      },
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
    <div className="flex flex-col w-full relative gap-3">
      <div
        className="flex flex-row items-center w-full border border-[#4A4A4A] rounded-xl px-4 py-3"
        onClick={() => setIsShowDropdown(!isShowDropdown)}
      >
        <div className="flex flex-row items-center justify-center gap-2 w-full">
          {dataSelected && (
            <div className="flex-1 flex flex-row items-center justify-start gap-1.5">
              <div>{dataSelected.icon}</div>
              <div className="text-base text-white font-medium text-center normal-case">
                {dataSelected.title}
              </div>
            </div>
          )}

          <div className="flex-none">
            <ArrowRightIcon
              stroke="#7EFFC5"
              className={classNames(
                'w-6 h-6 transition-transform duration-300 ease-in-out',
                isShowDropdown && 'rotate-90',
              )}
            />
          </div>
        </div>
      </div>

      {isShowDropdown && (
        <div className="flex flex-col items-start justify-center w-full *:normal-case">
          {localeList.map((item, index) => {
            const { id, title, icon } = item;

            const isActive = dataSelected && dataSelected.id === id;

            return (
              <Fragment key={id}>
                {index > 0 && (
                  <div className="h-[1px] w-full bg-[#4A4A4A]"></div>
                )}

                <div
                  className={classNames(
                    'flex flex-row items-center justify-start w-full gap-3',
                    'p-4 cursor-pointer transition-colors duration-300',
                    isActive && 'bg-[#1F1F1F]',
                  )}
                  onClick={() => {
                    startTransition(() => {
                      setUserLocale(id);
                    });
                    setDataSelected(item);
                    setIsShowDropdown(false);
                  }}
                >
                  <div className="flex-1 flex flex-row items-center gap-3">
                    <div>{icon}</div>
                    <div className="text-white text-xl font-semibold">
                      {title}
                    </div>
                  </div>

                  {isActive && (
                    <div className="flex-none">
                      <Icon.Check color="#7EFFC5" width={25} height={25} />
                    </div>
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdownMobile;
