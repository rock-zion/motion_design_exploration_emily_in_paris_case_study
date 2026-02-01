'use client';

import { useRef } from 'react';
import Hero from './Hero';
import Navbar, { type INavbarHandle } from '@/components/navbar/Navbar';
import Explore from './Explore';
import VideoSection from './VideoSection';
import Activities from './Activities';
import MarqueeMadness from './MarqueeMadness';
import TourList from './TourList';

export const HomePage = () => {
  const navBarRef = useRef<INavbarHandle>(null);

  const triggerMenuReveal = () => {
    navBarRef.current?.triggerMyFunction();
  };

  return (
    <main id='scrollArea'>
      <Navbar ref={navBarRef} />
      <Hero triggerMenuReveal={triggerMenuReveal} />
      <Explore />
      <VideoSection />
      <Activities />
      <MarqueeMadness />
      <TourList />
    </main>
  );
};
export default HomePage;
