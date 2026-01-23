'use client';
import { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import parse from 'html-react-parser';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { gsap } from 'gsap';

const Hero = () => {
  const container = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { theme } = useTheme();

  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);
      const title = SplitText.create('.title-wrapper h3', { type: 'chars' });
      const subTitle = SplitText.create('.subtitle-wrapper small', {
        type: 'chars',
      });

      const tl = gsap.timeline();

      const staggerTime = 1;
      const charDuration = 0.6;

      //   preset sryles
      gsap.set([title.chars, subTitle.chars], {
        opacity: 0,
      });

      gsap.set(title.chars, {
        yPercent: 100,
      });

      gsap.set('.video-wrapper', {
        scale: 1.5,
      });

      gsap.set('.video-overlay', {
        opacity: 1,
      });

      gsap.set('.video', {
        filter: 'blur(10px)',
      });

      gsap.set(container.current, {
        background: '#000000',
      });

      //   tweens
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
          onComplete: () => {
            if (!videoRef.current) return;
            videoRef.current?.play();
          },
        },
        0,
      );

      tl.to(
        '.video-wrapper',
        {
          scale: 0.5,
          ease: 'power2.inOut',
          duration: 1,
        },
        '>',
      );

      tl.to(
        '.video-overlay',
        {
          opacity: 0,
          duration: 1,
        },
        '<',
      );

      tl.to(
        title.chars,
        {
          opacity: 1,
          yPercent: -100,
          duration: charDuration,
          ease: 'power2.out',
          stagger: {
            amount: staggerTime,
          },
        },
        '>',
      );

      tl.to(
        subTitle.chars,
        {
          opacity: 0,
          duration: charDuration,
          ease: 'power2.out',
          stagger: {
            amount: staggerTime,
          },
        },
        '<',
      );

      tl.to(
        '.video',
        {
          duration: charDuration,
          filter: 'blur(0px)',
        },
        `<+=${staggerTime}`,
      );

      tl.to(
        '.video-wrapper',
        {
          duration: charDuration,
          scale: 1,
          ease: 'power2.inOut',
        },
        '<',
      );

      tl.to(
        container.current,
        {
          duration: 1,
          background: 'var(--background)',
        },
        '>',
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      id='hero'
      className='h-screen w-screen bg-background p-2'>
      <div className='w-full h-full flex-col-center relative'>
        <div className='center-absolute video-wrapper rounded-[32px] overflow-hidden w-full h-full'>
          <div className='absolute video-overlay inset-0 z-10 bg-black' />
          <video
            muted
            loop
            className='video w-full h-full object-cover'
            src={theme.heroVideo}
            ref={videoRef}
          />
          <div className='z-20 left-8 bottom-8 absolute flex items-center'>
            <h1 className='w-[50%] font-family-serif-semi-bold'>
              {theme.hero.title}
            </h1>
            <div className='flex w-[50%] justify-center'>
              <div className='w-[50%]'>
                <h5 className='leading-5'>{theme.hero.subtitle}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className='overflow-hidden title-wrapper'>
          <h3 className='rumble text-[64px]!'>{theme.title}</h3>
        </div>
        <div className='overflow-hidden subtitle-wrapper'>
          <small className='montreal-book text-[.75rem]!'>
            {parse(theme.subtitle)}
          </small>
        </div>
      </div>
    </section>
  );
};

export default Hero;
