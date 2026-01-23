'use client';
import { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import parse from 'html-react-parser';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { gsap } from 'gsap';

const Hero = () => {
  const container = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);
      const title = SplitText.create('.title_wrapper h3', { type: 'chars' });
      const subTitle = SplitText.create('.subtitle_wrapper small', {
        type: 'chars',
      });

      const tl = gsap.timeline();

      const staggerTime = 1.5;
      const charDuration = 1;

      gsap.set([title.chars, subTitle.chars], {
        opacity: 0,
      });

      gsap.set(title.chars, {
        yPercent: 100,
      });

      tl.to(title.chars, {
        opacity: 1,
        yPercent: 0,
        duration: charDuration,
        ease: 'power2.out',
        stagger: {
          amount: staggerTime,
        },
      });

      tl.to(
        subTitle.chars,
        {
          opacity: 1,
          duration: charDuration,
          ease: 'power2.out',
          stagger: {
            amount: staggerTime,
          },
        },
        0,
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id='hero'
      className='h-screen w-screen bg-background'>
      <div className='w-full h-full bg-black flex-col-center relative'>
        <div className='overflow-hidden title_wrapper'>
          <h3 className='rumble text-[64px]!'>{theme.title}</h3>
        </div>
        <div className='overflow-hidden subtitle_wrapper'>
          <small className='montreal_book text-[.75rem]!'>
            {parse(theme.subtitle)}
          </small>
        </div>
      </div>
    </section>
  );
};

export default Hero;
