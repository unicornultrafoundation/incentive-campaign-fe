import { IconProps } from '@/components/Icon/index';

export default function RemoveIcon({ width, height, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width={width || 24}
      height={height || 24}
      {...rest}
    >
      <path d="M22 3V5H2V3H8V2H9V1H15V2H16V3H22Z" fill="current" />
      <path
        d="M4 7V22H5V23H19V21H20V7H4ZM16 19H14V9H16V19ZM10 19H8V9H10V19Z"
        fill="current"
      />
    </svg>
  );
}
