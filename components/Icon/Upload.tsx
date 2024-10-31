import { IconProps } from '@/components/Icon/index';

export default function UploadIcon({ width, height, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      width={width || 40}
      height={height || 40}
      {...rest}
    >
      <path
        d="M8.33329 16.6667H6.66663V13.3333H8.33329V11.6667H9.99996V10H11.6666V8.33333H13.3333V6.66667H15V5H16.6666V3.33333H18.3333V1.66667H21.6666V3.33333H23.3333V5H25V6.66667H26.6666V8.33333H28.3333V10H30V11.6667H31.6666V13.3333H33.3333V16.6667H31.6666V18.3333H28.3333V16.6667H26.6666V15H25V13.3333H23.3333V28.3333H16.6666V13.3333H15V15H13.3333V16.6667H11.6666V18.3333H8.33329V16.6667Z"
        fill="current"
      />
      <path
        d="M36.6667 33.3333H3.33337V38.3333H36.6667V33.3333Z"
        fill="current"
      />
    </svg>
  );
}
