import BubbleButton from '@/components/buttons/BubbleButton';
import { useTheme } from '@/contexts/ThemeContext';
import parse from 'html-react-parser';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

const Explore = () => {
  const { theme } = useTheme();
  const container = useRef<HTMLElement>(null);
  const imageCanvas = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (!container.current) return;

      let currentImageIndex = 0;
      let lastX = 0;
      let lastY = 0;

      const distanceThreshold = 1000;
      const timeThreshold = 100;
      let lastTime = 0;

      const mouseMoveListener = contextSafe!((e: MouseEvent) => {
        const now = Date.now();

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.hypot(dx * dx + dy * dy);

        if (distance > distanceThreshold && now - lastTime > timeThreshold) {
          createTrail(e.clientX, e.clientY);
          lastX = e.clientX;
          lastY = e.clientY;
          lastTime = now;
        }
      });

      container.current.addEventListener('mousemove', mouseMoveListener);

      const images = theme.unlockExperience.cursorTrailImages;
      const createTrail = (x: number, y: number) => {
        const img = document.createElement('img');
        img.classList.add('image-trail');
        img.src = images[currentImageIndex].img;
        imageCanvas.current?.appendChild(img);

        currentImageIndex = (currentImageIndex + 1) % images.length;

        gsap.set(img, {
          x: x,
          y: y,
          scale: 0,
          opacity: 0,
        });

        gsap.to(img, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });

        gsap.to(img, {
          scale: 0.2,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            img.remove();
          },
        });
      };
    },
    { scope: container },
  );

  useGSAP(
    () => {
      if (!marqueeRef.current) return;

      const marqueeContent = marqueeRef.current.querySelector(
        '.marquee-inner',
      ) as HTMLElement;
      if (!marqueeContent) return;

      const existingClones = marqueeRef.current.querySelectorAll(
        '.marquee-inner[aria-hidden="true"]',
      );
      existingClones.forEach(clone => clone.remove());

      const screenWidth = window.innerWidth;
      const width = marqueeContent.offsetWidth;

      const requiredClones = Math.ceil(screenWidth / width) + 2;

      for (let i = 0; i < requiredClones; i++) {
        const clone = marqueeContent.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        marqueeRef.current.append(clone);
      }

      const allTracks = marqueeRef.current.querySelectorAll('.marquee-inner');

      const tween = gsap
        .to(allTracks, {
          xPercent: '-=100',
          duration: 30,
          ease: 'none',
          repeat: -1,
          modifiers: {
            xPercent: gsap.utils.unitize(v => {
              const val = Number.parseFloat(v);
              return ((val % 100) - 100) % 100;
            }),
          },
        })
        .totalProgress(0.5);

      let currentScroll = 0;
      const scrollHandler = () => {
        const isScrollingDown = window.pageYOffset > currentScroll;

        gsap.to(tween, {
          timeScale: isScrollingDown ? 1 : -1,
          duration: 0.5,
          ease: 'power1.out',
        });

        currentScroll = window.pageYOffset;
      };

      window.addEventListener('scroll', scrollHandler);

      return () => {
        tween.kill();
        window.removeEventListener('scroll', scrollHandler);
      };
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className='h-[95vh] w-screen flex-col-center max-md:justify-start relative'>
      <div
        ref={imageCanvas}
        className='image-canvas absolute inset-0 z-[-1] max-md:hidden'></div>
      <span className='font-mango px-[12px] mb-6 uppercase text-[32px] text-(--primitive-neutral-900) bg-(--bg-brand-secondary) block max-md:mt-[15vh]'>
        {theme.unlockExperience.title}
      </span>

      <h2 className='w-[11ch] text-(--bg-inverse)  mb-6 text-center'>
        {parse(theme.unlockExperience.cta)}
      </h2>

      <BubbleButton variant='out'>
        {theme.unlockExperience.ctaBtnText}
      </BubbleButton>

      <div
        ref={marqueeRef}
        className='marquee relative w-[100vw] mt-16 overflow-hidden hidden max-md:flex'>
        <div className='marquee-inner flex flex-auto h-[30vh] w-fit'>
          {theme.unlockExperience.cursorTrailImages.map(img => (
            <div
              className='marquee-image-wrapper h-full w-[45vw] mr-[16px] overflow-hidden shrink-0 rounded-4xl'
              key={`first-${img.id}`}>
              <img
                className='h-full w-full object-cover'
                src={img.img}
                alt={img.img.split('/')[2].replaceAll('_', ' ') ?? 'Image'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
