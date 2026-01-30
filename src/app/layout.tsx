'use client';

import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      let yAxis: number;
      let xAxis: number;

      const page = containerRef.current;

      const handleMouseTrack = (e: MouseEvent) => {
        xAxis = e.clientX - 10;
        yAxis = e.clientY - 10;

        console.log({ x: e.clientX, y: e.clientY });

        gsap.to('.mouse-tracker', {
          x: xAxis,
          y: yAxis,
          duration: 0.5,
        });
      };

      page.addEventListener('mousemove', handleMouseTrack);

      return () => {
        page.removeEventListener('mousemove', handleMouseTrack);
      };
    },
    { scope: containerRef },
  );

  return (
    <html suppressHydrationWarning lang='en'>
      <ThemeProvider>
        <div ref={containerRef}>
          <div className='fixed z-[900] mouse-tracker w-[8px] h-[8px] rounded-full bg-black'></div>

          {children}
        </div>
      </ThemeProvider>
    </html>
  );
}
