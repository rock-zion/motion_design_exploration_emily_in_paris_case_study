import BubbleButton from '@/components/buttons/BubbleButton';
import { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { InertiaPlugin, Draggable, Flip, ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { BsArrowRepeat } from 'react-icons/bs';

const WallOfLove = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  gsap.registerPlugin(Draggable, Flip, InertiaPlugin, ScrollTrigger);

  const isMobile = globalThis.innerWidth <= 768;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const container = containerRef.current;

      if (!isMobile) {
        Draggable.create('.draggable', {
          bounds: containerRef.current,
          inertia: true,
        });
      }

      const DURATION = 0.1;
      const mouseTracker = document.querySelector('#mouse-tracker');
      let trackerMarqueeWrapper: HTMLDivElement | null = null;
      let trackerTextContent: HTMLParagraphElement | null = null;
      const activeTweens: gsap.core.Tween[] = [];

      const createTextContent = () => {
        if (!mouseTracker) return;

        mouseTracker.classList.add('marquee__tracker');
        trackerTextContent = document.createElement('p');
        trackerTextContent.innerText = 'DRAG ME';
        trackerTextContent.classList.add(
          'marquee__text',
          'font-mango',
          'text-XL',
        );

        if (!trackerMarqueeWrapper) {
          trackerMarqueeWrapper = document.createElement('div');
          trackerMarqueeWrapper.classList.add('tracker-marquee__wrapper');
        }

        mouseTracker.appendChild(trackerMarqueeWrapper);
        trackerMarqueeWrapper.appendChild(trackerTextContent);
        const width = trackerTextContent.getBoundingClientRect().width;
        if (width == 0) return;

        const requiredClones = Math.ceil(150 / width) + 2;

        for (let i = 0; i < requiredClones; i++) {
          const cloneP = trackerTextContent.cloneNode(
            true,
          ) as HTMLParagraphElement;
          cloneP.setAttribute('aria-hidden', 'true');

          trackerMarqueeWrapper.appendChild(cloneP);
        }
      };

      const removeTextContent = () => {
        if (mouseTracker) {
          mouseTracker.innerHTML = '';
          mouseTracker.classList.remove('marquee__tracker');
        }
        trackerMarqueeWrapper = null;
        trackerTextContent = null;
      };

      const onEnter = () => {
        const tween1 = gsap.to(trackerMarqueeWrapper, {
          height: '32px',
          width: '150px',
          borderRadius: '0px',
          overwrite: 'auto',
          duration: DURATION,
        });
        activeTweens.push(tween1);

        if (!isMobile) {
          createTextContent();
        }
      };

      const onLeave = () => {
        const tween1 = gsap.to(trackerMarqueeWrapper, {
          height: '8px',
          width: '8px',
          borderRadius: '100%',
          overwrite: 'auto',
          duration: DURATION,
        });

        activeTweens.push(tween1);
        removeTextContent();
      };

      // paint cards on screen
      const draggables = gsap.utils.toArray('.draggable') as HTMLElement[];

      const tween = gsap?.to(draggables, {
        width: isMobile ? '350px' : '400px',
        height: isMobile ? '350px' : '400px',
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: container,
          start: 'top 50%',
        },
      });

      activeTweens.push(tween);

      const shuffleButton = document.querySelector('.shuffle');
      const slider = document.querySelector('.slider');

      if (!slider) return;

      const handleCreateNewCard = () => {
        const lastItem = slider.querySelector(
          '.draggable:last-child',
        ) as HTMLElement;

        if (!lastItem) return;

        lastItem.style.display = 'none';
        const newItem = document.createElement('div');

        newItem.className = `w-[350px] h-[350px] flex flex-col p-[20px] origin-center draggable bg-shadow post-card bg-(--bg-brand-secondary) absolute ${lastItem.classList[lastItem.classList.length - 1]}`;

        const oldImg = lastItem.querySelector('img');
        const oldName = lastItem.querySelector('.name')?.textContent || '';
        const oldLocation =
          lastItem.querySelector('.location')?.textContent || '';
        const oldExperience =
          lastItem.querySelector('.experience')?.textContent || '';
        const oldProfileImage = lastItem.querySelector(
          '.profile-image',
        ) as HTMLImageElement;

        newItem.innerHTML = `
          <div class='w-full h-[85%] overflow-hidden shrink-0'>
            <img
              loading='lazy' 
              src="${oldImg ? oldImg.src : ''}"
              alt=''
              class='w-full h-full object-cover'
            />
          </div>
          <div class='flex items-center h-full font-montreal-book text-(--primitive-neutral-1000)'>
            <div class='w-[42px] h-[42px] rounded-full overflow-hidden shrink-0'>
              ${oldProfileImage ? `<img loading="lazy" class='w-full h-full rounded-full' src=${oldProfileImage.src} />` : ''}
            </div>
            <div>
              <div>
                <span class="name">${oldName}</span>, 
                <span class="location">${oldLocation}</span>
              </div>
              <span class="experience">${oldExperience}</span>
            </div>
          </div>
        `;
        slider.insertBefore(newItem, slider.firstChild);
      };

      const handleMoveCard = () => {
        const state = Flip.getState('.draggable');

        handleCreateNewCard();

        Flip.from(state, {
          targets: '.draggable',
          ease: 'sine.inOut',
          absolute: true,
          onEnter: elements => {
            return gsap.from(elements, {
              duration: 1,
              xPercent: -200,
              opacity: 0,
              ease: 'expo.out',
            });
          },
          onLeave: element => {
            return gsap.to(element, {
              duration: 1,
              xPercent: -200,
              transformOrigin: 'center',
              opacity: 0,
              ease: 'expo.out',
              onComplete: () => {
                slider.removeChild(element[0]);
              },
            });
          },
        });
      };

      container.addEventListener('mouseenter', onEnter);
      container.addEventListener('mouseleave', onLeave);

      if (!shuffleButton) return;
      shuffleButton.addEventListener('click', handleMoveCard);

      return () => {
        shuffleButton.removeEventListener('click', handleMoveCard);
        container.removeEventListener('mouseenter', onEnter);
        container.removeEventListener('mouseleave', onLeave);

        activeTweens.forEach(tween => {
          if (tween && tween.kill) {
            tween.kill();
          }
        });
        activeTweens.length = 0;
      };
    },
    { scope: containerRef },
  );

  if (isMobile) {
    return (
      <section
        className='w-screen h-screen overflow-hidden relative pointer-events-auto'
        ref={containerRef}>
        <button className='h-[64px] px-[32px] shuffle rounded-full bg-(--bg-brand-secondary) text-(--primitive-neutral-1000) font-montreal-medium left-[50%] -translate-x-[50%] flex items-center absolute w-fit z-[100] top-[75%]'>
          <BsArrowRepeat /> <span className='ml-2'>Shuffle</span>
        </button>

        <div className='absolute w-[350px] h-[350px] slider center-absolute z-50'>
          {theme.review.reviews.map((review, index) => {
            return (
              <div
                key={review.id}
                className={`w-0 h-0 opacity-0 flex flex-col p-[20px] origin-center draggable bg-shadow post-card bg-(--bg-brand-secondary) absolute ${(index + 1) % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}>
                <div className='w-full h-[85%] overflow-hidden shrink-0'>
                  <img
                    loading='lazy'
                    src={review.image}
                    alt=''
                    className='w-full h-full object-cover event-image'
                  />
                </div>
                <div className='flex items-center h-full font-montreal-book text-(--primitive-neutral-1000)'>
                  <div className='w-[42px] h-[42px] rounded-full overflow-hidden shrink-0'>
                    {review.profile && (
                      <img
                        loading='lazy'
                        className='w-full h-full rounded-full profile-image'
                      />
                    )}
                  </div>
                  <div>
                    <div>
                      <span className='name'>{review.name}</span>,{' '}
                      <span className='location'>{review.location}</span>
                    </div>

                    <span className='experience'>{review.experience}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      className='w-screen h-screen overflow-hidden relative pointer-events-auto'
      ref={containerRef}>
      <h1 className='center-absolute z-0 pointer-events-none text-center text-display2 text-(--content-primary) max-md:hidden font-serif-bold'>
        WALL <br /> OF <br /> LOVE
      </h1>

      <div className='center-absolute z-1 max-md:hidden'>
        <BubbleButton size='xl' variant='out'>
          Book Now
        </BubbleButton>
      </div>

      <div className='absolute slider center-absolute z-50'>
        {theme.review.reviews.map((review, index) => {
          return (
            <div
              key={review.id}
              className={`w-0 h-0 opacity-0 flex flex-col p-[20px] origin-center draggable bg-shadow post-card bg-(--bg-brand-secondary) center-absolute ${(index + 1) % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}>
              <div className='w-full h-[85%] overflow-hidden shrink-0'>
                <img
                  loading='lazy'
                  src={review.image}
                  alt=''
                  className='w-full h-full object-cover event-image'
                />
              </div>
              <div className='flex items-center h-full font-montreal-book text-(--primitive-neutral-1000)'>
                <div className='w-[42px] h-[42px] rounded-full overflow-hidden shrink-0'>
                  {review.profile && (
                    <img
                      loading='lazy'
                      className='w-full h-full rounded-full profile-image'
                    />
                  )}
                </div>
                <div>
                  <div>
                    <span className='name'>{review.name}</span>,{' '}
                    <span className='location'>{review.location}</span>
                  </div>

                  <span className='experience'>{review.experience}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WallOfLove;
