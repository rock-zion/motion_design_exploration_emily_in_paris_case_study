'use client';

import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import useMouseTrack from '@/hooks/useMouseTrack';
import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';

type RootLayoutProps = {
  children: React.ReactNode;
};

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  useMouseTrack();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenisInstance);

    lenisInstance.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <html suppressHydrationWarning lang='en'>
      <LenisContext.Provider value={lenis}>
        <ThemeProvider>
          <div
            id='mouse-tracker'
            className='fixed z-[9999] origin-center pointer-events-none w-[8px] h-[8px] rounded-full '></div>

          {children}
        </ThemeProvider>
      </LenisContext.Provider>
    </html>
  );
}
