import React from 'react';

import { IconProps } from '@/components/Icon/index';

export default function TelegramIcon({ className, width, height }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M12.1465 0.250488C18.7271 0.250488 24.1465 5.66984 24.1465 12.2505C24.1465 18.8795 18.7271 24.2505 12.1465 24.2505C5.51745 24.2505 0.146484 18.8795 0.146484 12.2505C0.146484 5.66984 5.51745 0.250488 12.1465 0.250488ZM17.6626 8.42791C17.711 8.28275 17.711 8.13759 17.6626 7.94404C17.6626 7.84726 17.5658 7.7021 17.5175 7.65371C17.3723 7.50855 17.1304 7.50855 17.0336 7.50855C16.5981 7.50855 15.8723 7.75049 12.5336 9.15371C11.3723 9.63758 9.04971 10.6053 5.56584 12.1537C4.98519 12.3956 4.69487 12.5892 4.64648 12.8311C4.5981 13.2182 5.22713 13.3634 5.95294 13.6053C6.58197 13.7989 7.40455 14.0408 7.84003 14.0408C8.22713 14.0408 8.66261 13.8956 9.14648 13.5569C12.3884 11.3311 14.082 10.2182 14.1787 10.2182C14.2755 10.2182 14.3723 10.1698 14.4207 10.2182C14.5175 10.315 14.5175 10.4118 14.4691 10.4602C14.4207 10.7021 11.3723 13.5086 11.1787 13.7021C10.5013 14.3795 9.72713 14.815 10.9368 15.5892C11.9529 16.2666 12.5336 16.7021 13.5981 17.3795C14.2755 17.815 14.8078 18.3473 15.4852 18.2989C15.8239 18.2505 16.1626 17.9602 16.3078 17.0408C16.7433 14.9602 17.5175 10.315 17.6626 8.42791Z"
        fill="#AFAFAF"
      />
    </svg>
  );
}
