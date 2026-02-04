'use client';

import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import useMouseTrack from '@/hooks/useMouseTrack';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  useMouseTrack();

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
