'use client';

import { useTheme } from '@/contexts/ThemeContext';
import MenuBtn from './MenuBtn';
import BubbleButton from '../buttons/BubbleButton';

const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div className='fixed z-100 h-[90px] w-screen flex justify-between items-center'>
      <nav className='flex justify-between items-center w-[96vw] mx-auto'>
        <div className='flex-1'>
          <MenuBtn />
        </div>
        <h4 className='uppercase flex-1 font-rumble'>{theme.title}</h4>
        <BubbleButton variant='out'>View Experiences</BubbleButton>
      </nav>
    </div>
  );
};

export default Navbar;
