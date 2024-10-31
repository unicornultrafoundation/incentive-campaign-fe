import { IconProps } from './index';

export default function MenuIcon({ ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="Pixel/Solid/Bars">
        <path
          id="Vector"
          d="M22 11H23V13H22V14H2V13H1V11H2V10H22V11Z"
          fill="#9DA9AF"
        />
        <path
          id="Vector_2"
          d="M22 19H23V21H22V22H2V21H1V19H2V18H22V19Z"
          fill="#9DA9AF"
        />
        <path
          id="Vector_3"
          d="M23 3V5H22V6H2V5H1V3H2V2H22V3H23Z"
          fill="#9DA9AF"
        />
      </g>
    </svg>
  );
}
