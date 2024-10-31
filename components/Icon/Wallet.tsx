import React from 'react';

import { IconProps } from '@/components/Icon/index';

export default function WalletIcon({ className, width, height }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path
        d="M14.6666 5.33334V4.66668H2.66663V3.33334H14.6666V2.00001H14V1.33334H1.33329V2.00001H0.666626V14H1.33329V14.6667H14.6666V14H15.3333V5.33334H14.6666ZM14 10H13.3333V10.6667H12V10H11.3333V8.66668H12V8.00001H13.3333V8.66668H14V10Z"
        // fill="#2C3034"
      />
    </svg>
  );
}
