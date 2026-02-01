import { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const MarqueeMadness = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLElement>(null);


  useGSAP(
    () => {
      if (!containerRef.current) return;
      const marquees: HTMLElement[] = gsap.utils.toArray('.marquee');

      marquees.forEach((marquee, index) => {
        const isEven = (index + 1) % 2 == 0;
        if (!marquee) return;

        const marqueeContent = marquee.querySelector('.marquee-inner');

        if (!marqueeContent) return;

        const width = marqueeContent.scrollWidth;
        const screenWidth = window.innerWidth;

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

        gsap.to(allTracks, {
          x: isEven ? -distanceToTranslate : distanceToTranslate,
          duration: 30,
          ease: 'none',
          repeat: -1,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      className='my-[15vh] h-[80vh] max-lg:h-fit max-md:h-fit w-screen overflow-x-clip flex items-center flex-col relative'
      ref={containerRef}>
      {theme.maequeeMadness.map((marquee, index) => {
        const isItem1 = index % 3 === 0;
        const isItem2 = index % 3 === 1;
        const isItem3 = index % 3 === 2;

        return (
          <div
            key={marquee.id}
            className={`marquee flex overflow-hidden mx-[-5vw]
                ${isItem1 ? 'origin-center -rotate-4 bg-(--bg-brand-tertiary)' : ''} 
                ${isItem2 ? 'origin-center z-50 translate-y-[-6vh] rotate-4 bg-(--bg-brand-secondary)' : ''} 
                ${isItem3 ? 'origin-center -rotate-4 bg-(--bg-brand)' : ''}
        `}>
            <div className='marquee-inner flex shrink-0'>
              <div className='flex items-center gap-0 shrink-0 font-serif-semi-bold'>
                <h1 className='text-display uppercase text-(--content-primary) selection:bg-(--bg-brand)'>
                  {marquee.textA}
                </h1>
                <div className='w-[clamp(100px,15vw,250px)] aspect-square'>
                  <img
                    className='w-full h-full'
                    alt={marquee.textA}
                    src={marquee.stickerA}
                  />
                </div>
                <h1 className='text-display uppercase text-(--content-primary) selection:bg-(--bg-brand)'>
                  {marquee.textB}
                </h1>
                <div className='w-[clamp(100px,15vw,250px)] aspect-square'>
                  <img
                    className='w-full h-full'
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
