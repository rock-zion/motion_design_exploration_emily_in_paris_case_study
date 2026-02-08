import { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useLenis } from '../layout';
import Lenis from 'lenis';

const MarqueeMadness = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const marquees: HTMLElement[] = gsap.utils.toArray('.marquee');
      const activeTweens: gsap.core.Tween[] = [];
      let currentScroll = 0;

      marquees.forEach((marquee, index) => {
        const isEven = (index + 1) % 2 == 0;
        if (!marquee) return;

        const marqueeContent = marquee.querySelector(
          '.marquee-inner',
        ) as HTMLElement;

        if (!marqueeContent) return;

        const width = marqueeContent.offsetWidth;
        const screenWidth = window.innerWidth;

        if (width == 0) return;
        const requiredClones = Math.ceil(screenWidth / width) + 2;

        for (let i = 0; i < requiredClones; i++) {
          const clone = marqueeContent.cloneNode(true) as HTMLElement;
          clone.setAttribute('aria-hidden', 'true');
          marquee.append(clone);
        }

        const allTracks = marquee.querySelectorAll('.marquee-inner');

        const distanceToTranslate = -1 * width;
        if (isEven) {
          gsap.set(marquee, { x: distanceToTranslate });
        }

        const tween = gsap
          .to(allTracks, {
            xPercent: isEven ? '+=100' : '-=100',
            duration: 15,
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

        activeTweens.push(tween);
      });

      const scrollHandler = (lenisEvent: Lenis) => {
        const scrollY = lenisEvent.scroll;
        const isScrollingDown = scrollY > currentScroll;
        gsap.to(activeTweens, {
          timeScale: isScrollingDown ? 1 : -1,
          duration: 0.5,
          ease: 'power1.out',
        });
        currentScroll = scrollY;
      };

      if (!lenis) return;
      lenis.on('scroll', scrollHandler);

      return () => {
        lenis.off('scroll', scrollHandler);
        activeTweens.forEach(tween => {
          if (tween && tween.kill) {
            tween.kill();
          }
        });
      };
    },
    { scope: containerRef, dependencies: [lenis] },
  );

  return (
    <section
      className='my-[15vh] h-[80vh] max-lg:h-fit max-md:h-fit w-screen overflow-x-clip flex items-center flex-col relative '
      ref={containerRef}>
      {theme.maequeeMadness.map((marquee, index) => {
        const isItem1 = index % 3 === 0;
        const isItem2 = index % 3 === 1;
        const isItem3 = index % 3 === 2;

        return (
          <div
            key={marquee.id}
            className={`marquee flex overflow-x-clip mx-[-5vw]
                ${isItem1 ? 'origin-center -rotate-4 bg-(--bg-brand-tertiary)' : ''} 
                ${isItem2 ? 'origin-center z-50 translate-y-[-6vh] rotate-4 bg-(--bg-brand-secondary)' : ''} 
                ${isItem3 ? 'origin-center -rotate-4 bg-(--bg-brand)' : ''}
        `}>
            <div className='marquee-inner flex shrink-0'>
              <div className='flex items-center gap-0 shrink-0 font-serif-semi-bold'>
                <h1 className='text-display uppercase text-(--primitive-neutral-1000) selection:bg-(--bg-brand)'>
                  {marquee.textA}
                </h1>
                <div className='w-[clamp(100px,15vw,250px)] aspect-square'>
                  <img
                    loading='lazy'
                    className='w-full h-full object-contain'
                    alt={marquee.textA}
                    src={marquee.stickerA}
                  />
                </div>
                <h1 className='text-display uppercase text-(--primitive-neutral-1000) selection:bg-(--bg-brand)'>
                  {marquee.textB}
                </h1>
                <div className='w-[clamp(100px,15vw,250px)] aspect-square'>
                  <img
                    loading='lazy'
                    className='w-full h-full object-contain'
                    alt={marquee.textB}
                    src={marquee.stickerB}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MarqueeMadness;
