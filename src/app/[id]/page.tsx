'use client';

import { useRef } from 'react';
import Hero from './Hero';
import Navbar, { type INavbarHandle } from '@/components/navbar/Navbar';
import Explore from './Explore';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import VideoSection from './VideoSection';

export const HomePage = () => {
  const navBarRef = useRef<INavbarHandle>(null);
  const pageRef = useRef<HTMLElement>(null);

  const triggerMenuReveal = () => {
    navBarRef.current?.triggerMyFunction();
  };

  useGSAP(
    () => {
      if (!pageRef.current) return;

      const page = pageRef.current;
      const handleMouseTrack = (e: MouseEvent) => {
        const x = `${e.pageX - 10}px`;
        const y = `${e.pageY - 10}px`;

        gsap.to('.mouse-tracker', { x: x, y: y, duration: 0.5 });
      };

      page.addEventListener('mousemove', handleMouseTrack);
    },
    { scope: pageRef },
  );
  return (
    <main ref={pageRef}>
      <div className='absolute z-[900] mouse-tracker w-[8px] h-[8px] rounded-full bg-black'></div>
      <Navbar ref={navBarRef} />
      <Hero triggerMenuReveal={triggerMenuReveal} />
      <Explore />
      <VideoSection />
    </main>
  );
};
export default HomePage;
