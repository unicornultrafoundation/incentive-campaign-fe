'use client';

import Icon from '@/components/Icon';

import Footer from '../components/Footer';
import LandingHeader from '../components/Header';

export default function Home() {
  return (
    <>
      <LandingHeader />
      <div className="landing-page w-full h-full px-4 tablet:px-8 desktop:px-[10%] relative flex flex-col items-center justify-center pb-10 tablet:pb-0">
      <Icon.EllipseBackground className="absolute hidden tablet:block  z-0 top-[47%] left-[-8%]" />
        <div className="relative">
          <div className="absolute flex w-full justify-center z-0 ">
            <Icon.EllipseBackground className="z-0 h-revert-layer" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
