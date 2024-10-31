import { ReactNode, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Props {
  children: ReactNode | ReactNode[];
}

export default function Carousel({ children }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <Swiper
      className="my-swiper"
      spaceBetween={isMobile ? 0 : 12}
      slidesPerView={1}
      pagination={isMobile ? false : { clickable: true }}
      breakpoints={{
        300: { slidesPerView: 1.05 },
        464: { slidesPerView: 1 },
        1024: { slidesPerView: 5 },
        3000: { slidesPerView: 5 },
      }}
      modules={[Navigation, Pagination]}
    >
      {childrenArray.map((child, index) => (
        <SwiperSlide key={index}>
          <div className="w-full px-3 pb-5">{child}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
