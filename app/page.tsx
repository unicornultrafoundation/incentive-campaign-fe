'use client';

import Icon from '@/components/Icon';
import HomeSectionTwo from '@/components/Pages/Home/SectionTwo';

import Footer from '../components/Footer';
import LandingHeader from '../components/Header';
import SectionOne from '@/components/Pages/Home/SectionOne';

export default function Home() {
  return (
    <>
      <LandingHeader />
      {/* Content */}
      <SectionOne />
      <HomeSectionTwo />
      <Footer />
    </>
  );
}
