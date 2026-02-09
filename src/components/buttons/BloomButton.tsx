import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import React, { useRef } from 'react';
import gsap from 'gsap';

type BloomButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

const BloomButton = ({ href, onClick, children }: BloomButtonProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const container = containerRef.current;

      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;

      if (isTouchDevice) return;

      const mouseTracker = document.querySelector('#mouse-tracker');
      if (!mouseTracker) return;

      let bloom: HTMLDivElement | null;
      const child = container.querySelector('a, button');

      const onEnter = (e: MouseEvent) => {
        bloom = document.createElement('div');
        bloom.className =
          'absolute bg-(--bg-brand-secondary) h-[8px] w-[8px] rounded-full';

        bloom.style.top = `${e.layerY}px`;
        bloom.style.left = `${e.layerX}px`;
        bloom.style.transformOrigin = 'center';
        container.appendChild(bloom);

        gsap.to(bloom, {
          width: '500px',
          height: '500px',
          x: -246,
          y: -246,
          duration: 0.6,
        });

        gsap.to(child, {
          color: 'var(--primitive-neutral-900)',
        });
      };

      const onLeave = (e: MouseEvent) => {
        if (!bloom) return;

        const bloomRect = bloom.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const bloomCenterX =
          bloomRect.left + bloomRect.width / 2 - containerRect.left;
        const bloomCenterY =
          bloomRect.top + bloomRect.height / 2 - containerRect.top;

        const deltaX = e.layerX - bloomCenterX;
        const deltaY = e.layerY - bloomCenterY;

        const targetColor = getComputedStyle(document.documentElement)
          .getPropertyValue('--content-primary')
          .trim();

        gsap.to(bloom, {
          width: '8px',
          height: '8px',
          x: deltaX,
          y: deltaY,
          duration: 0.6,
          onComplete: () => {
            bloom?.remove();
            bloom = null;
          },
        });

        gsap.to(child, {
          color: targetColor,
        });
      };

      container.addEventListener('mouseenter', onEnter);
      container.addEventListener('mouseleave', onLeave);

      return () => {
        container.removeEventListener('mouseenter', onEnter);
        container.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: containerRef },
  );

  const baseStyles = `flex items-center text-(--content-primary) text-h4 cursor-pointer border border-(--content-primary) px-[32px] py-[16px] rounded-[50]`;

  return (
    <div
      className={`relative overflow-hidden ${baseStyles}`}
      ref={containerRef}>
      {href ? (
        <Link className='z-[10]' href={href}>
          {children}
        </Link>
      ) : (
        <button className='z-[10]' onClick={onClick}>
          {children}
        </button>
      )}
    </div>
  );
};

export default BloomButton;
