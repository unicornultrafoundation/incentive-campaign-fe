import React from 'react';

import { IconProps } from '@/components/Icon/index';

export default function DefaultAvatarIcon({
  className,
  width,
  height,
}: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M2.66671 13.3333H4.00004V22.6667H2.66671V21.3333H1.33337V14.6667H2.66671V13.3333Z"
        fill="#9DA9AF"
      />
      <path
        d="M25.3334 9.33333H24V8H17.3334V4H14.6667V8H8.00004V9.33333H6.66671V10.6667H5.33337V24H6.66671V25.3333H8.00004V26.6667H24V25.3333H25.3334V24H26.6667V10.6667H25.3334V9.33333ZM22.6667 17.3333H18.6667V13.3333H22.6667V17.3333ZM17.3334 22.6667H14.6667V21.3333H17.3334V22.6667ZM9.33337 21.3333H13.3334V22.6667H9.33337V21.3333ZM9.33337 13.3333H13.3334V17.3333H9.33337V13.3333ZM18.6667 22.6667V21.3333H22.6667V22.6667H18.6667Z"
        fill="#9DA9AF"
      />
      <path
        d="M30.6667 14.6667V21.3333H29.3333V22.6667H28V13.3333H29.3333V14.6667H30.6667Z"
        fill="#9DA9AF"
      />
    </svg>
  );
}
