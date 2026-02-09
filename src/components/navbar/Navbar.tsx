'use client';

import { useTheme } from '@/contexts/ThemeContext';
import MenuBtn from './MenuBtn';
import BubbleButton from '../buttons/BubbleButton';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { useLenis } from '@/app/layout';
import Lenis from 'lenis';

export interface INavbarHandle {
  triggerMyFunction: () => void;
}

type NavbarProps = React.HTMLAttributes<HTMLDivElement>;

const Navbar = forwardRef<INavbarHandle, NavbarProps>((props, ref) => {
  const navBarRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const { contextSafe } = useGSAP(() => {}, { scope: navBarRef });
  const { theme } = useTheme();
  const currentScrollRef = useRef<number>(0);

  const [dark, setDark] = useState<boolean>(false);

  const revealMenu = contextSafe(() => {
    gsap.to('.nav-wrapper > *', {
      y: 0,
      duration: 1.5,
      stagger: 0.2,
    });
  });

  useImperativeHandle(ref, () => ({
    triggerMyFunction() {
      revealMenu();
    },
  }));

  useGSAP(() => {}, {
    scope: navBarRef,
    dependencies: [],
  });

  useGSAP(
    () => {
      const vph = globalThis.innerHeight; // view port height
      const scrollHandler = (lenisEvent: Lenis) => {
        const scrollY = lenisEvent.scroll;
        const delta = scrollY - currentScrollRef.current;
        if (Math.abs(delta) < 100) return;

        const scrollingDown = currentScrollRef.current > scrollY;

        gsap.killTweensOf(navBarRef.current);
        gsap.to(navBarRef.current, {
          yPercent: scrollingDown ? 0 : -100,
          duration: 0.3,
          ease: 'power2.out',
        });

        if ((currentScrollRef.current / vph) * 100 > 120) {
          setDark(true);
        } else {
          setDark(false);
        }

        currentScrollRef.current = scrollY;
      };

      if (!lenis) return;
      lenis.on('scroll', scrollHandler);
      return () => {
        lenis.off('scroll', scrollHandler);
      };
    },
    { scope: navBarRef, dependencies: [lenis, currentScrollRef] },
  );

  return (
    <div
      ref={navBarRef}
      className='fixed z-100 h-[90px] w-screen flex justify-between items-center overflow-hidden'>
      <nav className='flex justify-between items-center w-[96vw] mx-auto nav-wrapper'>
        <div className='flex-1 translate-y-[90px] hide-in-mobile'>
          <MenuBtn dark={dark} />
        </div>
        <h4
          className={`translate-y-[90px] uppercase flex-1 font-rumble max-md:ml-[16px] ${dark ? 'text-(--content-primary)' : ''} transition-all duration-1000`}>
          {theme.title}
        </h4>
        <div className='translate-y-[90px] hide-in-mobile'>
          <BubbleButton variant='out'>View Experiences</BubbleButton>
        </div>
        <div className='translate-y-[90px] hidden max-md:block'>
          <MenuBtn dark={dark} />
        </div>
      </nav>
    </div>
  );
});

Navbar.displayName = 'NavBar';
export default Navbar;
