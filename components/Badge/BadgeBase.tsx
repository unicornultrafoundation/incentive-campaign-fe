import { FC, useMemo } from 'react';

export interface BadgeBaseProps {
  color: 'success' | 'lime' | 'pink';
  text: string;
}

export const BadgeBase: FC<BadgeBaseProps> = (props) => {
  const { color, text } = props;

  const dataColor = useMemo(() => {
    let result: string = '#7EFFC5';

    switch (color) {
      case 'success':
        result = 'bg-[#7EFFC5]';
        break;

      case 'lime':
        result = 'bg-[#C7FF7E]';
        break;

      case 'pink':
        result = 'bg-[#FF7EC5]';
        break;

      default:
        break;
    }

    return result;
  }, [color]);

  return (
    <div
      className={`w-[70px] h-6 flex justify-center items-center rounded-[20px] px-2 py-1 font-medium text-base ${dataColor} text-[#141414] text-center`}
    >
      {text}
    </div>
  );
};
