import React from 'react';

import { IconProps } from '@/components/Icon/index';

export default function FacebookIcon({ className, width, height }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_318_39628)">
        <path
          d="M24 12.2505C24 5.62313 18.6274 0.250488 12 0.250488C5.37264 0.250488 0 5.62313 0 12.2505C0 17.878 3.87456 22.6003 9.10128 23.8972V15.9177H6.62688V12.2505H9.10128V10.6703C9.10128 6.58601 10.9498 4.69289 14.9597 4.69289C15.72 4.69289 17.0318 4.84217 17.5685 4.99097V8.31497C17.2853 8.28521 16.7933 8.27033 16.1822 8.27033C14.2147 8.27033 13.4544 9.01577 13.4544 10.9535V12.2505H17.3741L16.7006 15.9177H13.4544V24.1627C19.3954 23.4451 24 18.3858 24 12.2505Z"
          fill="#AFAFAF"
        />
      </g>
      <defs>
        <clipPath id="clip0_318_39628">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
