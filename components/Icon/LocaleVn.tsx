import { IconProps } from './index';

export default function LocaleVn({
  className,
  width = 25,
  height = 25,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_1188_27558)">
        <path
          d="M12.283 24.0181C18.9104 24.0181 24.283 18.6455 24.283 12.0181C24.283 5.39065 18.9104 0.0180664 12.283 0.0180664C5.65554 0.0180664 0.282959 5.39065 0.282959 12.0181C0.282959 18.6455 5.65554 24.0181 12.283 24.0181Z"
          fill="#D80027"
        />
        <path
          d="M12.283 6.27881L13.5781 10.2645H17.7689L14.3784 12.7278L15.6735 16.7136L12.283 14.2503L8.89253 16.7136L10.1876 12.7278L6.79712 10.2645H10.9879L12.283 6.27881Z"
          fill="#FFDA44"
        />
      </g>
      <defs>
        <clipPath id="clip0_1188_27558">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.282959 0.0180664)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
