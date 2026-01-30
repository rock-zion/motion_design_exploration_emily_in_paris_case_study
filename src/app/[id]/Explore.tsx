import BubbleButton from '@/components/buttons/BubbleButton';
import { useTheme } from '@/contexts/ThemeContext';
import parse from 'html-react-parser';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import useMarquee from '@/hooks/useMarquee';

const Explore = () => {
  const { theme } = useTheme();
  const container = useRef<HTMLElement>(null);
  const imageCanvas = useRef<HTMLDivElement>(null);

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

  useMarquee({
    scope: container,
    xPercent: -100,
    duration: 120,
    dependencies: [],
  });

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

      <div className='marquee relative w-[100vw] mt-16 overflow-hidden hidden max-md:block'>
        <div className='marquee-inner flex flex-auto gap-x-[16px] h-[30vh] w-fit'>
          {theme.unlockExperience.cursorTrailImages.map(img => (
            <div
              className='marquee-image-wrapper h-full w-[45vw] overflow-hidden shrink-[0] rounded-4xl'
              key={`first-${img.id}`}>
              <img
                className='h-full w-full object-cover'
                src={img.img}
                alt={img.img.split('/')[2].replaceAll('_', ' ') ?? 'Image'}
              />
            </div>
          ))}

          {theme.unlockExperience.cursorTrailImages.map((img, index) => (
            <div
              className='marquee-image-wrapper h-full w-[40vw] overflow-hidden shrink-[0] rounded-2xl'
              key={`second-${img.id}`}>
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
