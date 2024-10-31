import { IconProps } from '@/components/Icon/index';

export default function BoxIcon({ className, width, height }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_696_4460)">
        <path
          d="M0.666626 6V14.6667H1.33329V15.3333H14.6666V14.6667H15.3333V6H0.666626ZM8.66663 13.3333V14.6667H7.33329V13.3333H5.99996V12H8.66663V11.3333H6.66663V10.6667H5.99996V8H7.33329V6.66667H8.66663V8H9.99996V9.33333H7.33329V10H9.33329V10.6667H9.99996V13.3333H8.66663Z"
          fill="#2C3034"
        />
        <path
          d="M7.33329 0.666687V4.66669H0.666626V4.00002H1.33329V2.66669H1.99996V2.00002H2.66663V1.33335H3.33329V0.666687H7.33329Z"
          fill="black"
        />
        <path
          d="M15.3333 4.00002V4.66669H8.66663V0.666687H12.6666V1.33335H13.3333V2.00002H14V2.66669H14.6666V4.00002H15.3333Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_696_4460">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
