'use client';

import { useTheme } from '@/contexts/ThemeContext';
import MenuBtn from './MenuBtn';
import BubbleButton from '../buttons/BubbleButton';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { forwardRef, useRef, useImperativeHandle } from 'react';

export interface INavbarHandle {
  triggerMyFunction: () => void;
}

type NavbarProps = React.HTMLAttributes<HTMLDivElement>;

const Navbar = forwardRef<INavbarHandle, NavbarProps>((props, ref) => {
  const navBarRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(() => {}, { scope: navBarRef });
  const { theme } = useTheme();

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

  return (
    <>
      <div
        ref={navBarRef}
        className='fixed z-100 h-[90px] w-screen flex justify-between items-center overflow-hidden'>
        <nav className='flex justify-between items-center w-[96vw] mx-auto nav-wrapper'>
          <div className='flex-1 translate-y-[90px] hide-in-mobile'>
            <MenuBtn />
          </div>
          <h4 className='translate-y-[90px] uppercase flex-1 font-rumble max-md:ml-[16px]'>
            {theme.title}
          </h4>
          <div className='translate-y-[90px] hide-in-mobile'>
            <BubbleButton variant='out'>View Experiences</BubbleButton>
          </div>
          <div className='translate-y-[90px] hidden max-md:block'>
            <MenuBtn />
          </div>
        </nav>
      </div>
    </>
  );
});

Navbar.displayName = 'NavBar';
export default Navbar;
