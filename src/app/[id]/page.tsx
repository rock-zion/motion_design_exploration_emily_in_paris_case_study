'use client';

import { useRef } from 'react';
import Hero from './Hero';
import Navbar, { type INavbarHandle } from '@/components/navbar/Navbar';
import Explore from './Explore';
import VideoSection from './VideoSection';
import Activities from './Activities';
import MarqueeMadness from './MarqueeMadness';
import TourList from './TourList';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTheme } from '@/contexts/ThemeContext';
import Review from './Review';

import WallOfLove from './WallOfLove';
import Outro from './Outro';
import Footer from './Footer';

export const HomePage = () => {
  const containerRef = useRef<HTMLElement>(null);
  const navBarRef = useRef<INavbarHandle>(null);
  const { theme } = useTheme();

  const triggerMenuReveal = () => {
    navBarRef.current?.triggerMyFunction();
  };
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!marqueeRef.current) return;

      const marqueeContent = marqueeRef.current.querySelector(
        '.marquee-inner',
      ) as HTMLElement;
      if (!marqueeContent) return;

      const existingClones = marqueeRef.current.querySelectorAll(
        '.marquee-inner[aria-hidden="true"]',
      );
      existingClones.forEach(clone => clone.remove());

      const screenWidth = globalThis.innerWidth;
      const width = marqueeContent.offsetWidth;
      if (width == 0) return;

      const requiredClones = Math.ceil(screenWidth / width) + 2;

      for (let i = 0; i < requiredClones; i++) {
        const clone = marqueeContent.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        marqueeRef.current.append(clone);
      }

      const allTracks = marqueeRef.current.querySelectorAll('.marquee-inner');

      const tween = gsap
        .to(allTracks, {
          xPercent: '-=100',
          duration: 5,
          ease: 'none',
          repeat: -1,
          modifiers: {
            xPercent: gsap.utils.unitize(v => {
              const val = Number.parseFloat(v);
              return ((val % 100) - 100) % 100;
            }),
          },
        })
        .totalProgress(0.5);

      let currentScroll = 0;
      const scrollHandler = () => {
        const isScrollingDown = globalThis.pageYOffset > currentScroll;

        gsap.to(tween, {
          timeScale: isScrollingDown ? 1 : -1,
          duration: 0.5,
          ease: 'power1.out',
        });

        currentScroll = globalThis.pageYOffset;
      };

      let lastWidth = globalThis.innerWidth;

      const handleResize = () => {
        const currentWidth = globalThis.innerWidth;

        if (currentWidth !== lastWidth) {
          lastWidth = currentWidth;
          globalThis.location.reload();
        }
      };

      globalThis.addEventListener('resize', handleResize);
      globalThis.addEventListener('scroll', scrollHandler);

      return () => {
        tween.kill();
        globalThis.removeEventListener('scroll', scrollHandler);
        globalThis.removeEventListener('resize', handleResize);
      };
    },
    { scope: containerRef },
  );

  return (
    <>
      <main
        data-theme={theme}
        className='relative bg-(--background) gradient-bg'
        ref={containerRef}
        id='scrollArea'>
        <Navbar ref={navBarRef} />

        {/* <div className='bg-(--background) gradient-bg overflow-scroll'> */}
        <Hero triggerMenuReveal={triggerMenuReveal} />
        <Explore />
        <VideoSection />

        <div
          ref={marqueeRef}
          className='marquee flex overflow-hidden pt-[20vh] max-md:pt-[10vh] whitespace-nowrap'>
          <div className='marquee-inner flex items-center shrink-0'>
            <h1 className='text-(--content-primary) selection:bg-(--bg-brand) font-bold font-serif-bold'>
              {theme.unlockExperience.videoSection.marqueeText}
            </h1>
            <div className='w-64 aspect-square ml-4 max-md:w-32  shrink-0'>
              <img
                className='w-full h-full'
                alt={theme.unlockExperience.videoSection.marqueeText}
                src={theme.unlockExperience.videoSection.marqueeSticker}
              />
            </div>
          </div>
        </div>

        <Activities />
        <MarqueeMadness />
        <TourList />
        <Review />
        <WallOfLove />
        <Outro />
      </main>
      <Footer />
    </>
  );
};
export default HomePage;
