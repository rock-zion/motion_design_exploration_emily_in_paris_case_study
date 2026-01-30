'use client';

import { useRef } from 'react';
import Hero from './Hero';
import Navbar, { type INavbarHandle } from '@/components/navbar/Navbar';
import Explore from './Explore';
import VideoSection from './VideoSection';
import Activities from './Activities';
import MarqueeMadness from './MarqueeMadness';

export const HomePage = () => {
  const navBarRef = useRef<INavbarHandle>(null);

  const triggerMenuReveal = () => {
    navBarRef.current?.triggerMyFunction();
  };

  return (
    <main id='scrollArea'>
      <div className='absolute z-[900] mouse-tracker w-[8px] h-[8px] rounded-full bg-black'></div>
      <Navbar ref={navBarRef} />
      <Hero triggerMenuReveal={triggerMenuReveal} />
      <Explore />
      <VideoSection />
      <Activities />
      <MarqueeMadness />
    </main>
  );
};
export default HomePage;
