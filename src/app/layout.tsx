'use client';

import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import useMouseTrack from '@/hooks/useMouseTrack';
import Lenis from 'lenis';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  useMouseTrack();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 4,
      easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(time => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <html suppressHydrationWarning lang='en'>
      <ThemeProvider>
        <div>
          <div
            id='mouse-tracker'
            className='fixed z-[9999] origin-center pointer-events-none w-[8px] h-[8px] rounded-full '></div>

          {children}
        </div>
      </ThemeProvider>
    </html>
  );
}
