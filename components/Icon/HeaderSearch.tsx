import { useEffect, useState } from 'react';

import { IconProps } from '@/components/Icon/index';
import { generateRandomString } from '@/utils';

export default function HeaderSearchIcon({ width, height }: IconProps) {
  const [random, setRandom] = useState<string>('');
  useEffect(() => {
    if (!random) {
      setRandom(generateRandomString(5));
    }
  }, [random]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <rect
        width="32"
        height="32"
        rx="16"
        fill={`url(#paint0_linear_1563_${random})`}
      />
      <path
        d="M15.6288 23.2558C11.4237 23.2558 8 19.8326 8 15.6279C8 11.4233 11.4237 8 15.6288 8C19.8339 8 23.2576 11.4233 23.2576 15.6279C23.2576 19.8326 19.8339 23.2558 15.6288 23.2558ZM15.6288 9.11628C12.034 9.11628 9.11641 12.0409 9.11641 15.6279C9.11641 19.2149 12.034 22.1395 15.6288 22.1395C19.2236 22.1395 22.1412 19.2149 22.1412 15.6279C22.1412 12.0409 19.2236 9.11628 15.6288 9.11628Z"
        fill="white"
      />
      <path
        d="M23.4436 24C23.3022 24 23.1607 23.9479 23.0491 23.8363L21.5606 22.3479C21.3447 22.1321 21.3447 21.7749 21.5606 21.5591C21.7764 21.3433 22.1337 21.3433 22.3495 21.5591L23.838 23.0474C24.0539 23.2633 24.0539 23.6205 23.838 23.8363C23.7264 23.9479 23.585 24 23.4436 24Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id={`paint0_linear_1563_${random}`}
          x1="0"
          y1="16"
          x2="32"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#67C99D" />
          <stop offset="1" stopColor="#28513F" />
        </linearGradient>
      </defs>
    </svg>
  );
}
