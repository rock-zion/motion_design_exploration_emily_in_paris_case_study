'use client';

import { useRef } from 'react';
import Hero from './Hero';
import Navbar from '@/components/navbar/Navbar';

export const HomePage = () => {
  const navBarRef = useRef(null);

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
