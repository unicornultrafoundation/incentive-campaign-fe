import { classNames } from '@/utils/string';

interface Props {
  current: number;
  tabs: {
    label: string;
    value: any;
  }[];
  onChangeTab: (tab: any) => void;
}

export default function Tabs({ current, tabs, onChangeTab }: Props) {
  return (
    <div className="flex items-center rounded mb-6">
      {tabs.map((tab) => (
        <div
          className={classNames(
            'tablet:px-[32px] px-6 py-[10px] flex items-center gap-[6px] cursor-pointer select-none',
            current === tab.value && ' border-b-[3px] border-[#4651F6]',
          )}
          onClick={() => onChangeTab(tab.value)}
          key={tab.value}
        >
          <div
            className={`tablet:text-2xl text-lg	font-inter font-semibold ${current === tab.value ? 'text-[#4651F6]' : ' text-[#4A4A4A]'}`}
          >
            {tab.label}
          </div>
        </div>
      ))}
    </div>
  );
}
