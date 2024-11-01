'use client';

import HomeSectionTwo from '@/components/Pages/Home/SectionTwo';
import SectionOne from '@/components/Pages/Home/SectionOne';

import Footer from '../components/Footer';
import LandingHeader from '../components/Header';

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
