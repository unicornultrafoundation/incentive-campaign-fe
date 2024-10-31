import { IconProps } from '@/components/Icon/index';

export default function InventoryIcon({ width, height, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 16}
      height={height || 16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_1474_56488)">
        <path
          d="M6.66663 9.33329H7.33329V14.6666H6.66663V15.3333H1.33329V14.6666H0.666626V9.33329H1.33329V8.66663H6.66663V9.33329Z"
          fill="#9DA9AF"
        />
        <path
          d="M6.66663 1.33329H7.33329V6.66663H6.66663V7.33329H1.33329V6.66663H0.666626V1.33329H1.33329V0.666626H6.66663V1.33329Z"
          fill="#9DA9AF"
        />
        <path
          d="M14.6666 9.33329H15.3333V14.6666H14.6666V15.3333H9.33329V14.6666H8.66663V9.33329H9.33329V8.66663H14.6666V9.33329Z"
          fill="#9DA9AF"
        />
        <path
          d="M15.3333 1.33329V6.66663H14.6666V7.33329H9.33329V6.66663H8.66663V1.33329H9.33329V0.666626H14.6666V1.33329H15.3333Z"
          fill="#9DA9AF"
        />
      </g>
      <defs>
        <clipPath id="clip0_1474_56488">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
