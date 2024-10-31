import React from 'react';

import { IconProps } from '@/components/Icon/index';

export default function YoutubeIcon({ className, width, height }: IconProps) {
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
        d="M23.4735 6.67642C24 8.5192 24 12.468 24 12.468C24 12.468 24 16.3729 23.4735 18.2596C23.2102 19.3126 22.3766 20.1024 21.3675 20.3656C19.4808 20.8483 12.0219 20.8483 12.0219 20.8483C12.0219 20.8483 4.5192 20.8483 2.63254 20.3656C1.6234 20.1024 0.789762 19.3126 0.526508 18.2596C0 16.3729 0 12.468 0 12.468C0 12.468 0 8.5192 0.526508 6.67642C0.789762 5.6234 1.6234 4.78976 2.63254 4.52651C4.5192 4 12.0219 4 12.0219 4C12.0219 4 19.4808 4 21.3675 4.52651C22.3766 4.78976 23.2102 5.6234 23.4735 6.67642ZM9.5649 16.0219L15.7952 12.468L9.5649 8.91408V16.0219Z"
        fill="#AFAFAF"
      />
    </svg>
  );
}
