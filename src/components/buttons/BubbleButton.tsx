'use client';

import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import React, { useRef } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { gsap } from 'gsap';

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

  const { contextSafe } = useGSAP(
    () => {
      gsap.set('.icon-wrapper-left', { width: 0, height: 0, scale: 0 });
    },
    { scope: containerRef },
  );

  const onEnter = contextSafe(() => {
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
      width: '56px',
      height: '56px',
      scale: 1,
      rotate: '45deg',
      transformOrigin: 'center',
    });
  });

  const onLeave = contextSafe(() => {
    gsap.to('.icon-wrapper-right', {
      duration: buttonPRoperties.duration,
      ease: 'power2.inOut',
      rotate: '0deg',
      width: '56px',
      height: '56px',
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

  const baseStyles = `flex items-center h-[64px] text-black rounded-full p-1 cursor-pointer ${buttonPRoperties.containerClasses}`;
  const iconBaseStyles = `flex justify-center items-center w-[calc(64px-0.5rem)] h-[calc(64px-0.5rem)] rounded-full overflow-hidden`;

  const InnerContent = (
    <>
      <div
        className={`icon-wrapper-left ${iconBaseStyles} ${buttonPRoperties.leftIconBg}`}>
        <BsArrowUpRight size={24} />
      </div>

      {isBubbleIn ? (
        <span className='font-montreal-medium text-[18px] block mx-[32px]'>
          {children}
        </span>
      ) : (
        <div className='font-montreal-medium bg-white text-[18px] h-[60px] flex items-center rounded-full px-[32px]'>
          {children}
        </div>
      )}

      <div
        className={`icon-wrapper-right ${iconBaseStyles} ${buttonPRoperties.rightIconBg}`}>
        <BsArrowUpRight size={24} />
      </div>
    </>
  );

  return (
    <div
      ref={containerRef}
      className='inline-block'
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}>
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
