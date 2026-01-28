import { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { NEXT_ACTION_REVALIDATED_HEADER } from 'next/dist/client/components/app-router-headers';

const MarqueeMadness = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const marquees: HTMLElement[] = gsap.utils.toArray('.marquee');

      marquees.forEach(marquee => {
        if (!marquee) return;

        const marqueeContent = marquee.querySelector('.marquee-inner');

        if (!marqueeContent) return;
        const marqueeContentClone = marqueeContent.cloneNode(
          true,
        ) as HTMLElement;

        marqueeContentClone.setAttribute('aria-hidden', 'true');

        marquee.append(marqueeContentClone);

        const width = marqueeContent.getBoundingClientRect().width;

        const targets = [marqueeContent, marqueeContentClone];

        const distanceToTranslate = -1 * width;

        gsap.fromTo(
          targets,
          { x: 0 },
          {
            x: distanceToTranslate,
            duration: 10,
            ease: 'linear',
            repeat: -1,
          },
        );

        console.log({ width });
      });
    },
    { scope: containerRef },
  );

  return (
    <section className='mt-[15vh]' ref={containerRef}>
      {theme.maequeeMadness.map((marquee, index) => {
        const isItem1 = index % 3 === 0;
        const isItem2 = index % 3 === 1;
        const isItem3 = index % 3 === 2;

        return (
          <div
            key={marquee.id}
            className={`marquee flex relative overflow-hidden ]
                ${isItem1 ? '-rotate-4 bg-(--bg-brand-tertiary)' : ''} 
                ${isItem2 ? 'rotate-4 bg-(--bg-brand-secondary)' : ''} 
                ${isItem3 ? '-rotate-4 bg-(--bg-brand)' : ''}
        `}>
            {isItem2 ? (
              <div className='marquee-inner flex shrink-0'>
                <div className='flex items-center gap-0 shrink-0 font-serif-semi-bold'>
                  <h1 className='text-display text-(--content-primary) selection:bg-(--bg-brand)'>
                    {marquee.textA}
                  </h1>
                  <div className='w-[clamp(100px,15vw,250px)] aspect-square'>
                    <img
                      className='w-full h-full'
                      alt={marquee.textA}
                      src={marquee.stickerA}
                    />
                  </div>
                  <h1 className='text-display text-(--content-primary) selection:bg-(--bg-brand)'>
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

                <div className='flex items-center gap-0 shrink-0 font-serif-semi-bold'>
                  <h1 className='text-display text-(--content-primary) selection:bg-(--bg-brand)'>
                    {marquee.textA}
                  </h1>
                  <div className='w-[clamp(100px,15vw,250px)] aspect-square'>
                    <img
                      className='w-full h-full'
                      alt={marquee.textA}
                      src={marquee.stickerA}
                    />
                  </div>
                  <h1 className='text-display text-(--content-primary) selection:bg-(--bg-brand)'>
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
            ) : (
              <div className='marquee-inner flex shrink-0'>
                <div className='flex items-center gap-0 shrink-0 font-serif-semi-bold'>
                  <h1 className='text-display text-(--content-primary) selection:bg-(--bg-brand)'>
                    {marquee.textA}
                  </h1>
                  <div className='w-[clamp(100px,15vw,250px)] aspect-square'>
                    <img
                      className='w-full h-full'
                      alt={marquee.textA}
                      src={marquee.stickerA}
                    />
                  </div>
                  <h1 className='text-display text-(--content-primary) selection:bg-(--bg-brand)'>
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
            )}
          </div>
        );
      })}
    </section>
  );
};

export default MarqueeMadness;
