'use client';

import Icon from '@/components/Icon';
import HomeSectionTwo from '@/components/Pages/Home/SectionTwo';

import Footer from '../components/Footer';
import LandingHeader from '../components/Header';

export default function Home() {
  return (
    <>
      <LandingHeader />
      {/* Content */}
      <HomeSectionTwo />
      <Footer />
    </>
  );
}
