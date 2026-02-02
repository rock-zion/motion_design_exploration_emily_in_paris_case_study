'use client';

import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import React, { useRef } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { gsap } from 'gsap';
import { useMediaQuery } from 'react-responsive';

type BubbleButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'in' | 'out';
};

const BubbleButton = ({
  children,
  href,
  onClick,
  variant = 'in',
}: BubbleButtonProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const containerRef = useRef<HTMLDivElement>(null);

  const isBubbleIn = variant === 'in';

  const buttonPRoperties = {
    duration: 0.3,
    rightOrigin: isBubbleIn ? 'bottom right' : 'center',
    containerClasses: isBubbleIn ? 'bg-white' : '',
    leftIconBg: isBubbleIn
      ? 'bg-(--bg-brand-tertiary)'
      : 'bg-(--bg-brand-secondary)',
    rightIconBg: isBubbleIn ? 'bg-(--bg-brand-secondary)' : 'bg-(--bg-brand)',
  };

  useGSAP(
    (_, contextSafe) => {
      if (!containerRef.current) return;
      const container = containerRef.current;

      const onEnter = contextSafe!(() => {
        gsap.to('.icon-wrapper-right', {
          duration: buttonPRoperties.duration,
          ease: 'power2.inOut',
          rotate: '45deg',
          width: 0,
          height: 0,
          scale: 0,
          transformOrigin: buttonPRoperties.rightOrigin,
        });

        gsap.to('.icon-wrapper-left', {
          duration: buttonPRoperties.duration,
          ease: 'power2.inOut',
          width: isMobile ? '48px' : '56px',
          height: isMobile ? '48px' : '56px',
          scale: 1,
          rotate: '45deg',
          transformOrigin: 'center',
        });
      });

      const onLeave = contextSafe!(() => {
        gsap.to('.icon-wrapper-right', {
          duration: buttonPRoperties.duration,
          ease: 'power2.inOut',
          rotate: '0deg',
          width: isMobile ? '48px' : '56px',
          height: isMobile ? '48px' : '56px',
          scale: 1,
          transformOrigin: buttonPRoperties.rightOrigin,
        });

        gsap.to('.icon-wrapper-left', {
          duration: buttonPRoperties.duration,
          ease: 'power2.inOut',
          width: 0,
          height: 0,
          scale: 0,
          rotate: '0',
          transformOrigin: 'center',
        });
      });

      container.addEventListener('mouseenter', onEnter);
      container.addEventListener('mouseleave', onLeave);

      return () => {
        container.addEventListener('mouseenter', onEnter);
        container.addEventListener('mouseleave', onLeave);
      };
    },
    { scope: containerRef },
  );

  const baseStyles = `flex items-center h-[64px] max-md:h-[56px] text-black rounded-full p-1 cursor-pointer ${buttonPRoperties.containerClasses}`;
  const iconBaseStyles = `flex justify-center items-center w-[calc(64px-0.5rem)] h-[calc(64px-0.5rem)] max-md:w-[calc(56px-0.5rem)] max-md:h-[calc(56px-0.5rem)] rounded-full overflow-hidden`;

  const InnerContent = (
    <>
      <div
        className={`icon-wrapper-left w-0 h-0 scale-0 arrow-icon-style ${buttonPRoperties.leftIconBg}`}>
        <BsArrowUpRight size={24} />
      </div>

      {isBubbleIn ? (
        <span className='font-montreal-medium text-p text-center block mx-[32px]'>
          {children}
        </span>
      ) : (
        <div className='font-montreal-medium bg-white text-p h-[60px] max-md:h-[52px] flex items-center rounded-full px-[32px]'>
          {children}
        </div>
      )}

      <div
        className={`icon-wrapper-right arrow-icon-style  ${buttonPRoperties.rightIconBg}`}>
        <BsArrowUpRight size={24} />
      </div>
    </>
  );

  return (
    <div ref={containerRef} className='inline-block'>
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

export default BubbleButton;
