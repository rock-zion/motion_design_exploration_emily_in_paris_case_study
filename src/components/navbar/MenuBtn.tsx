import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const MenuBtn = ({ dark }: Readonly<{ dark: boolean }>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const positionMenuBalls = (index: number): string => {
    let positionStyle = '';
    if (index === 0) {
      positionStyle = 'right-[4px] bottom-[4px]';
    } else if (index == 1) {
      positionStyle = 'left-[4px] bottom-[4px]';
    } else if (index == 2) {
      positionStyle = 'right-[4px] top-[4px]';
    } else if (index == 3) {
      positionStyle = 'left-[4px] top-[4px]';
    }

    return positionStyle;
  };

  useGSAP(
    () => {
      if (!buttonRef.current) return;

      const button = buttonRef.current;

      const onEnter = () => {
        gsap.to('.pulse', {
          scale: 20,
          opacity: 0,
        });

        gsap.to('.menu-text div', {
          y: '-18px',
          duration: 0.3,
        });
      };

      const onLeave = () => {
        gsap.to('.pulse', {
          scale: 0,
          opacity: 1,
        });

        gsap.to('.menu-text div', {
          y: '0px',
          duration: 0.3,
        });
      };

      button?.addEventListener('mouseenter', onEnter);
      button?.addEventListener('mouseleave', onLeave);

      return () => {
        gsap.killTweensOf('.pulse');
        gsap.killTweensOf('.menu-text div');
        button.removeEventListener('mouseenter', onEnter);
        button.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: buttonRef },
  );

  return (
    <button
      ref={buttonRef}
      className='flex items-center cursor-pointer'
      onClick={() => {}}>
      <div className='w-[64px] h-[64px] flex justify-center items-center rounded-full bg-white'>
        <div className='grid w-[20px] h-[20px] relative grid-cols-2 items-center justify-center gap-[4px]'>
          {Array(4)
            .fill('')
            .map((_, index) => (
              <div
                className={`bg-black absolute w-[4px] h-[4px] rounded-full ${positionMenuBalls(index)}`}
                key={index}></div>
            ))}
          <div className='bg-red-300 scale-0 pulse center-absolute absolute w-[4px] h-[4px] rounded-full'></div>
        </div>
      </div>
      <div className='h-[18px] overflow-hidden font-montreal-medium block mx-[24px] hide-in-mobile relative menu-text'>
        <div
          className={`${dark ? 'text-(--content-primary)' : ''} transition-all duration-1000 leading-[18px]`}>
          Menu
        </div>
        <div
          className={`${dark ? 'text-(--content-primary)' : ''} transition-all duration-1000 leading-[18px] absolute inner-menu`}>
          Menu
        </div>
      </div>
    </button>
  );
};

export default MenuBtn;
