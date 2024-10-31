import React from 'react';

import { IconProps } from '@/components/Icon/index';

export default function TwitterIcon({ className, width, height }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.9014 1H22.5816L14.5415 10.1893L24 22.6938H16.5941L10.7935 15.1099L4.15631 22.6938H0.473926L9.07356 12.8648L0 1H7.59394L12.8372 7.932L18.9014 1ZM17.6098 20.491H19.649L6.48589 3.08705H4.29759L17.6098 20.491Z"
        fill="#AFAFAF"
      />
    </svg>
  );
}
