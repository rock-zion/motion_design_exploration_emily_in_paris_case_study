'use client';

import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import React, { useRef } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { gsap } from 'gsap';

type BubbleOutButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

const BubbleOutButton = ({ children, href, onClick }: BubbleOutButtonProps) => {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const leftIcon = container.current.querySelector('.icon-wrapper-left');
      const rightIcon = container.current.querySelector('.icon-wrapper-right');

      gsap.set(leftIcon, { width: 0, height: 0, scale: 0 });

      const onEnter = () => {
        console.log('entering');
        gsap.to(rightIcon, {
          duration: 0.3,
          ease: 'power2.inOut',
          rotate: '45deg',
          width: 0,
          height: 0,
          scale: 0,
          transformOrigin: 'center',
        });

        gsap.to(leftIcon, {
          duration: 0.3,
          ease: 'power2.inOut',
          width: '56px',
          height: '56px',
          scale: 1,
          rotate: '45deg',
          transformOrigin: 'center',
        });
      };

      const onLeave = () => {
        gsap.to(rightIcon, {
          duration: 0.3,
          ease: 'power2.inOut',
          rotate: '0deg',
          width: '56px',
          height: '56px',
          scale: 1,
          transformOrigin: 'center',
        });

        gsap.to(leftIcon, {
          duration: 0.3,
          ease: 'power2.inOut',
          width: 0,
          height: 0,
          scale: 0,
          transformOrigin: 'center',
          rotate: '0',
        });
      };

      container.current?.addEventListener('mouseenter', onEnter);
      container.current?.addEventListener('mouseleave', onLeave);
    },
    { scope: container },
  );

  const baseStyles =
    'flex items-center h-[64px] text-black rounded-full p-1 cursor-pointer';

  const InnerContent = (
    <>
      <div className='flex-1 icon-wrapper-left bg-(--bg-brand-secondary) flex justify-center items-center w-[calc(64px-0.5rem)] h-[calc(64px-0.5rem)] rounded-full'>
        <BsArrowUpRight size={24} />
      </div>
      <div className='font-montreal-medium bg-white text-[18px] h-[60px] flex items-center rounded-full px-[32px]'>
        {children}
      </div>
      <div className='icon-wrapper-right bg-(--bg-brand) flex justify-center items-center w-[calc(64px-0.5rem)] h-[calc(64px-0.5rem)] rounded-full'>
        <BsArrowUpRight size={24} />
      </div>
    </>
  );

  return (
    <div ref={container} className={'inline-block'}>
      {href ? (
        <Link href={href} className={baseStyles}>
          {InnerContent}
        </Link>
      ) : (
        <button onClick={onClick} className={baseStyles}>
          {InnerContent}
        </button>
      )}
    </div>
  );
};

export default BubbleOutButton;
