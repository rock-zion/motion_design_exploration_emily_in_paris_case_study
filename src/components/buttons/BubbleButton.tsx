'use client';

import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import React, { useRef } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { gsap } from 'gsap';
import { useMediaQuery } from 'react-responsive';
import dynamic from 'next/dynamic';

const NoSSR = dynamic(() => import('@/components/no-ssr'), { ssr: false });

type BubbleButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'in' | 'out';
  altLeft?: boolean;
  size?: 'default' | 'xl';
};

const BubbleButton = ({
  children,
  href,
  onClick,
  variant = 'in',
  altLeft,
  size = 'default',
}: BubbleButtonProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const containerRef = useRef<HTMLDivElement>(null);

  const isBubbleIn = variant === 'in';

  const resolveLeftIconBg = () => {
    let bg = '';
    if (!isBubbleIn && altLeft) {
      bg = 'bg-(--bg-brand-tertiary)';
    } else if (isBubbleIn) {
      bg = 'bg-(--bg-brand-tertiary)';
    } else {
      bg = 'bg-(--bg-brand-secondary)';
    }

    return bg;
  };

  const sizeConfig = {
    default: {
      arrowIconSize: 'w-[calc(64px-0.5rem)] h-[calc(64px-0.5rem)]',
      containerHeight: 'h-[64px] max-md:h-[56px]',
      iconSize: isMobile ? '48px' : '56px',
      arrowSize: 24,
      innerHeight: 'h-[60px] max-md:h-[52px]',
      padding: 'p-1',
      textSize: 'text-p',
      horizontalPadding: 'px-[32px]',
      horizontalMargin: 'mx-[32px]',
    },

    xl: {
      arrowIconSize: 'w-[calc(110px-0.5rem)] h-[calc(110px-0.5rem)]',
      containerHeight: 'h-[110px] max-md:h-[90px]',
      iconSize: isMobile ? 80 : 96,
      arrowSize: isMobile ? 36 : 42,
      innerHeight: 'h-[106px] max-md:h-[86px]',
      padding: 'p-2',
      textSize: 'text-XL',
      horizontalPadding: 'px-[48px]',
      horizontalMargin: 'mx-[48px]',
    },
  };

  const config = sizeConfig[size];

  const buttonPRoperties = {
    duration: 0.3,
    rightOrigin: isBubbleIn ? 'bottom right' : 'center',
    containerClasses: isBubbleIn ? 'bg-white' : '',
    leftIconBg: resolveLeftIconBg(),
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
          width: config.iconSize,
          height: config.iconSize,
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
          width: config.iconSize,
          height: config.iconSize,
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
        container.removeEventListener('mouseenter', onEnter);
        container.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: containerRef },
  );

  const baseStyles = `flex items-center ${config.containerHeight} text-black rounded-full ${config.padding} cursor-pointer ${buttonPRoperties.containerClasses}`;

  const InnerContent = (
    <>
      <div
        className={`icon-wrapper-left w-0 h-0 scale-0 arrow-icon-style ${buttonPRoperties.leftIconBg}`}>
        <BsArrowUpRight size={config.arrowSize} />
      </div>

      {isBubbleIn ? (
        <span
          className={`font-montreal-medium ${config.textSize} text-center block mx-[32px]`}>
          {children}
        </span>
      ) : (
        <div
          className={`font-montreal-medium bg-white ${config.textSize} ${config.innerHeight} flex items-center rounded-full ${config.horizontalPadding}`}>
          {children}
        </div>
      )}

      <div
        className={`icon-wrapper-right arrow-icon-style ${config.arrowIconSize}  ${buttonPRoperties.rightIconBg}`}>
        <BsArrowUpRight size={config.arrowSize} />
      </div>
    </>
  );

  return (
    <NoSSR>
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
    </NoSSR>
  );
};

export default BubbleButton;
