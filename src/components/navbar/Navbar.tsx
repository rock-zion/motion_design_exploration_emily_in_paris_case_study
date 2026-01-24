'use client';

import { useTheme } from '@/contexts/ThemeContext';
import MenuBtn from './MenuBtn';
import BubbleButton from '../buttons/BubbleButton';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { forwardRef, useRef, useImperativeHandle } from 'react';

const Navbar = forwardRef((props, ref) => {
  const navBarRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!navBarRef.current) return;

      gsap.set('.nav-wrapper > *', { y: '90px' });
    },
    { scope: navBarRef },
  );
  const { theme } = useTheme();

  const revealMenu = contextSafe(() => {
    console.log('yaga');

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
    <div
      ref={navBarRef}
      className='fixed z-100 h-[90px] w-screen flex justify-between items-center nav-wrapper overflow-hidden'>
      <nav className='flex justify-between items-center w-[96vw] mx-auto'>
        <div className='flex-1'>
          <MenuBtn />
        </div>
        <h4 className='uppercase flex-1 font-rumble'>{theme.title}</h4>
        <BubbleButton variant='out'>View Experiences</BubbleButton>
      </nav>
    </div>
  );
});

Navbar.displayName = 'NavBar';
export default Navbar;
