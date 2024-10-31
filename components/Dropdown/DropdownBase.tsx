import { FC, useMemo, useState } from 'react';

import ArrowRightIcon from '@/components/Icon/ArrowRight';
import { classNames } from '@/utils/string';

export interface DropdownBaseProps {
  options: {
    label: string;
    value: number | string;
    data?: any;
  }[];
  onChange: (value: {
    label: string;
    value: number | string;
    data?: any;
  }) => void;
  value: any;
  className?: string;
}

export const DropdownBase: FC<DropdownBaseProps> = (props) => {
  const { options, onChange, value, className } = props;

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const toggleDropdown = (data: { isOpen?: boolean }) => {
    setIsOpenDropdown(
      data?.isOpen !== undefined ? data.isOpen : !isOpenDropdown,
    );
  };

  const handleSelect = (option: DropdownBaseProps['options'][number]) => {
    onChange(option);
    toggleDropdown({ isOpen: false });
  };

  const valueSelected = useMemo(() => {
    return options.find((x) => x.value === value?.value) || null;
  }, [value, options]);

  return (
    <>
      <div
        className="flex justify-between px-4 py-[10px] border border-solid rounded-lg border-[#4A4A4A] mb-2"
        onClick={() => {
          toggleDropdown({});
        }}
      >
        <p className="font-inter font-semibold text-base">
          {valueSelected?.label || ''}
        </p>
        <div className="rotate-90">
          <ArrowRightIcon width={20} height={20} stroke={'#929292'} />
        </div>
      </div>
      {isOpenDropdown && (
        <div
          className={classNames(
            ' left-0 right-0  bg-[#050505] border border-[#929292] rounded-lg shadow-lg z-10',
            className,
          )}
        >
          {options.map((option, index) => {
            const key = `option-${index}`;
            return (
              <div
                key={key}
                className="p-2 hover:bg-[#333333] text-white cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
