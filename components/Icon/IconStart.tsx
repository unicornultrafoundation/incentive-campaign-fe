import { IconProps } from './index';

export default function IconStart({ width, height, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 48 49"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.6844 22.2393L24.0105 0.5L26.3124 22.1897L47.9999 24.5109L26.2629 26.8179L24.0105 48.5L21.7344 26.7687L0.000488281 24.5109L21.6844 22.2393Z"
        fill="url(#paint0_diamond_491_15023)"
      />
      <defs>
        <radialGradient
          id="paint0_diamond_491_15023"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(24.0002 24.5) scale(23.9997 24)"
        >
          <stop stop-color="#67C99D" />
          <stop offset="0.516145" stop-color="#28513F" />
        </radialGradient>
      </defs>
    </svg>
  );
}
