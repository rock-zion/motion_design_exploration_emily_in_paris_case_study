'use client';

import { useRef } from 'react';
import Hero from './Hero';
import Navbar, { type INavbarHandle } from '@/components/navbar/Navbar';

export const HomePage = () => {
  const navBarRef = useRef<INavbarHandle>(null);

  const triggerMenuReveal = () => {
    navBarRef.current?.triggerMyFunction();
  };
  return (
    <div>
      <Navbar ref={navBarRef} />
      <Hero triggerMenuReveal={triggerMenuReveal} />
    </div>
  );
};
export default HomePage;
