import { IconProps } from './index';

export default function LocaleJapan({
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
      <g clipPath="url(#clip0_1188_27527)">
        <path
          d="M12.283 24.0181C18.9104 24.0181 24.283 18.6455 24.283 12.0181C24.283 5.39065 18.9104 0.0180664 12.283 0.0180664C5.65554 0.0180664 0.282959 5.39065 0.282959 12.0181C0.282959 18.6455 5.65554 24.0181 12.283 24.0181Z"
          fill="#F0F0F0"
        />
        <path
          d="M12.283 17.2355C15.1645 17.2355 17.5004 14.8996 17.5004 12.0182C17.5004 9.13668 15.1645 6.80078 12.283 6.80078C9.40157 6.80078 7.06567 9.13668 7.06567 12.0182C7.06567 14.8996 9.40157 17.2355 12.283 17.2355Z"
          fill="#D80027"
        />
      </g>
      <defs>
        <clipPath id="clip0_1188_27527">
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
