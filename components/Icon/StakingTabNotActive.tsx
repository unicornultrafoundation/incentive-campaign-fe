import React from 'react';

import { IconProps } from './index';

export default function StakingTabNotActive(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="277"
      height="68"
      viewBox="0 0 277 68"
      fill="none"
      {...props}
    >
      <path
        d="M19.2482 13.3553C22.0669 5.35303 29.6279 0 38.1121 0H237.545C245.929 0 253.424 5.22957 256.317 13.0989L276.5 68H0L19.2482 13.3553Z"
        fill="url(#paint0_linear_245_66435)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_245_66435"
          x1="214.5"
          y1="68"
          x2="205"
          y2="-8.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#141414" />
          <stop offset="1" stopColor="#1E1E1E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
