'use client';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { useRef, useState } from 'react';
import { themes, type ThemeName } from '@/lib/themes';

export default function Home() {
  const container = useRef<HTMLElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);
      const titleSplit = SplitText.create('.home_headline h1', {
        type: 'words, lines',
        linesClass: 'line-wrapper',
      });

      const adventureCards = gsap.utils.toArray(
        '.choose_adventure_wrapper',
      ) as HTMLElement[];

      gsap.set(titleSplit.words, {
        opacity: 0,
        yPercent: 50,
      });

      adventureCards.forEach((card, index) => {
        gsap.set(card, {
          scale: 0,
          rotate: (index + 1) % 2 == 0 ? '20deg' : '-20deg',
        });
      });

      const tl = gsap.timeline({
        onComplete: () => setAnimationComplete(true),
      });

      tl.to(titleSplit.words, {
        opacity: 1,
        yPercent: 0,
        duration: 0.5,
        stagger: {
          each: 0.1,
          amount: 0,
        },
      });

      tl.to(adventureCards, {
        scale: 1,
        rotate: index => ((index + 1) % 2 == 0 ? '6deg' : '-6deg'),
        duration: 1.5,
        ease: 'elastic.out(1,0.5)',
        stagger: {
          each: 0.1,
          amount: 0,
        },
      });
    },
    { scope: container },
  );

  useGSAP(
    (_context, contextSafe) => {
      if (!animationComplete) return;

      const adventureCards = gsap.utils.toArray(
        '.choose_adventure_wrapper',
      ) as HTMLElement[];

      const cleanupFunctions: (() => void)[] = [];

      const onEnterHandler = contextSafe!(
        ({ index, alternate }: { index: number; alternate: number }) => {
          return () => {
            gsap.to(adventureCards[index], {
              rotate: 0,
              scale: 1.1,
            });

            gsap.to(adventureCards[alternate], {
              scale: 0.9,
              x: (index + 1) % 2 == 0 ? '-100px' : '100px',
            });

            gsap.to(container.current, {
              background:
                (index + 1) % 2 == 0
                  ? 'var(--primitive-dark-amaranth-500)'
                  : 'var(--primitive-nude-400)',
            });
          };
        },
      );

      const onLeaveHandler = contextSafe!(
        ({ index, alternate }: { index: number; alternate: number }) => {
          return (e: MouseEvent) => {
            const rect = adventureCards[index].getBoundingClientRect();
            let movingToNeighbour = false;

            if (index % 2 === 0) {
              if (e.clientX >= rect.right) {
                movingToNeighbour = true;
              }
            } else {
              if (e.clientX <= rect.left) {
                movingToNeighbour = true;
              }
            }

            gsap.to(adventureCards[index], {
              scale: 1,
              rotate: (index + 1) % 2 == 0 ? '6deg' : '-6deg',
            });

            gsap.to(adventureCards[alternate], {
              scale: 1,
              x: '0',
            });

            if (!movingToNeighbour) {
              gsap.to(container.current, {
                background: 'var(--bg)',
              });
            } else {
              onEnterHandler({ index: alternate, alternate: index })();
            }
          };
        },
      );

      adventureCards.forEach((card, index) => {
        const alternate = adventureCards.length - (index + 1);
        const onEnter = onEnterHandler;
        const onLeave = onLeaveHandler;

        card.addEventListener('mouseenter', onEnter({ index, alternate }));
        card.addEventListener('mouseleave', onLeave({ index, alternate }));

        cleanupFunctions.push(() => {
          card.removeEventListener('mouseenter', onEnter({ index, alternate }));
          card.removeEventListener('mouseleave', onLeave({ index, alternate }));
        });

        if (card.matches(':hover')) {
          onEnter({ index, alternate })();
        }
      });

      return () => {
        cleanupFunctions.forEach(cleanFn => {
          cleanFn();
        });
      };
    },
    { scope: container, dependencies: [animationComplete] },
  );

  return (
    <section
      ref={container}
      className='w-screen h-screen flex justify-center items-center bg-background'>
      <div className='overflow-hidden pb-[10] home_headline'>
        <h1 className='max-w-[14ch] text-center'>
          Where will your Emily story begin?
        </h1>
      </div>
      <div className='choose_adventure absolute flex h-[75vh] mx-auto'>
        {Object.keys(themes).map((key, index) => (
          <div
            key={key}
            className={`choose_adventure_wrapper h-full w-full rounded-[32px] overflow-hidden relative ${(index + 1) % 2 == 0 ? 'rotate-6' : '-rotate-6 mr-[-2.4vw]'}`}>
            <div className='absolute inset-0'>
              <video
                loop
                autoPlay
                muted
                src={themes[key as ThemeName].heroVideo}
                className='h-full w-full object-cover'
              />
            </div>

            <h2 className='center-absolute'>{themes[key as ThemeName].name}</h2>
            <h4 className='absolute uppercase text-nowrap bottom-0 left-1/2 -translate-x-1/2'>
              {themes[key as ThemeName].title}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}
