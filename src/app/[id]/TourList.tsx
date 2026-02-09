import { useTheme } from '@/contexts/ThemeContext';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef, useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';

const TourList = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTab = useMediaQuery({ maxWidth: 990 });

  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const prevIndex = useRef<number>(-1);

  const detailsStyle =
    'font-mango border rounded-full px-[16px] text-h5-sm leading-0 flex items-center pt-[6px]';

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const activityParent: HTMLElement | null =
        containerRef.current.querySelector('.slider-wrapper');
      const activities: HTMLElement[] = gsap.utils.toArray('.activities');

      const activeTweens: gsap.core.Tween[] = [];
      const cleanupFunctions: (() => void)[] = [];
      const mouseTracker = document.querySelector('#mouse-tracker');
      const DURATION = 0.1;

      if (!mouseTracker) return;

      const handleActivityParentEnter = () => {
        createImageBackdrop();
      };
      const handleActivityParentLeave = () => {};

      let imageWrapper: HTMLDivElement | null = null;
      let imageInner: HTMLDivElement | null = null;
      let image: HTMLImageElement;
      let trackerMarqueeWrapper: HTMLDivElement | null = null;
      let trackerTextContent: HTMLParagraphElement | null = null;

      const createImageBackdrop = () => {
        imageWrapper = document.createElement('div');
        imageWrapper.classList.add('mouse-tracker-backdrop');
        imageInner = document.createElement('div');

        imageWrapper.appendChild(imageInner);

        for (const activity of theme.activities) {
          image = document.createElement('img');
          image.src = activity.bg;
          image.classList.add('mouse-tracker-backdrop_image');
          imageInner.appendChild(image);
        }
      };

      const createTextContent = () => {
        mouseTracker.classList.add('marquee__tracker');
        trackerTextContent = document.createElement('p');
        trackerTextContent.innerText = 'EXPLORE MORE';
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

        const oldBackdrop = mouseTracker.querySelector(
          '.mouse-tracker-backdrop',
        );

        if (oldBackdrop) {
          const tween = gsap.to(oldBackdrop, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            onComplete: () => {
              oldBackdrop.remove();
              imageWrapper = null;
              imageInner = null;
            },
          });
          activeTweens.push(tween);
        }

        trackerMarqueeWrapper = null;
        trackerTextContent = null;
      };

      activities.forEach((activity, index) => {
        const spacers = activity.querySelectorAll('.spacer');
        const icon = activity.querySelector('.arrow-icon-style');

        const animateImageBackDrop = (prevIndex: number, index: number) => {
          if (!mouseTracker) return;
          const destinationY = -(index * 450);

          if (prevIndex !== -1) {
            gsap.set(imageInner, { y: -(prevIndex * 450) });
          }

          gsap.to(imageInner, {
            y: destinationY,
            duration: 0.8,
            ease: 'expo.out',
          });

          if (!imageWrapper) return;
          mouseTracker.insertBefore(imageWrapper, mouseTracker.firstChild);
        };

        const onEnter = () => {
          const previousIndex = prevIndex.current;
          prevIndex.current = index;
          setHoverIndex(index);

          const tween1 = gsap.to(trackerMarqueeWrapper, {
            height: '32px',
            width: '150px',

            borderRadius: '0px',
            overwrite: 'auto',
            duration: DURATION,
          });

          const tween2 = gsap.to(spacers, {
            height: '100px',
            width: '100px',
            duration: 1,
            ease: 'power2.inOut',
          });

          const tween3 = gsap.to(icon, {
            rotate: '45deg',
            duration: DURATION,
            ease: 'power2.inOut',
          });

          const otherActivities = activities.filter((el, i) => i !== index);

          const tween4 = gsap.to(otherActivities, {
            opacity: 0.7,
            duration: DURATION,
            ease: 'power2.inOut',
          });

          const tween5 = gsap.to(activity, {
            backgroundColor: theme.activities[index].hoverBg,
            duration: DURATION,
            ease: 'power2.inOut',
          });

          activeTweens.push(tween1, tween2, tween3, tween4, tween5);

          if (!isMobile && !isTab) {
            animateImageBackDrop(previousIndex, index);
            createTextContent();
          }
        };

        const onLeave = () => {
          setHoverIndex(-1);

          const tween1 = gsap.to(trackerMarqueeWrapper, {
            height: '8px',
            width: '8px',
            borderRadius: '100%',
            overwrite: 'auto',
            duration: DURATION,
          });

          const tween2 = gsap.to(spacers, {
            height: '0px',
            width: '0px',
            duration: 1,
            ease: 'power2.inOut',
          });

          const tween3 = gsap.to(icon, {
            rotate: '0deg',
            duration: DURATION,
            ease: 'power2.inOut',
          });

          const tween4 = gsap.to(activities, {
            opacity: 1,
            duration: DURATION,
            ease: 'power2.inOut',
          });

          const tween5 = gsap.to(activity, {
            backgroundColor: '',
            duration: DURATION,
            ease: 'power2.inOut',
          });

          activeTweens.push(tween1, tween2, tween3, tween4, tween5);

          removeTextContent();
        };

        activity.addEventListener('mouseenter', onEnter);
        activity.addEventListener('mouseleave', onLeave);

        cleanupFunctions.push(() => {
          activity.removeEventListener('mouseenter', onEnter);
          activity.removeEventListener('mouseleave', onLeave);
        });
      });

      if (!activityParent) return;
      activityParent.addEventListener('mouseenter', handleActivityParentEnter);
      activityParent.addEventListener('mouseleave', handleActivityParentLeave);

      return () => {
        activeTweens.forEach(tween => {
          if (tween && tween.kill) {
            tween.kill();
          }
        });
        activeTweens.length = 0;

        mouseTracker.classList.remove('marquee__tracker');
        mouseTracker.innerHTML = '';
        cleanupFunctions.forEach(func => func());
        activityParent.removeEventListener(
          'mouseenter',
          handleActivityParentEnter,
        );
        activityParent.removeEventListener(
          'mouseleave',
          handleActivityParentLeave,
        );
      };
    },
    { scope: containerRef },
  );

  return (
    <div id="tourlist" ref={containerRef} className='h-fit py-[15vh] pointer-events-auto'>
      <div className='w-[90vw] slider-wrapper mx-auto max-[990px]:grid max-[990px]:grid-cols-2 max-md:grid-cols-1 gap-[16px] group'>
        {theme.activities.map(activity => (
          <div
            key={activity.id}
            className={`activities h-[196px] max-[990px]:h-fit border-t max-[990px]:border-0 flex items-center justify-between cursor-pointer text-(--content-primary) transition-colors duration-300 bg-amber-50/0`}>
            <div className='flex items-center'>
              <div className='spacer w-[0px] h-[0px] max-[990px]:hidden'></div>
              <div>
                <div>
                  <div className='overflow-hidden hidden max-[990px]:block rounded-1xl w-[100%] h-[auto] aspect-[16/9] '>
                    <img
                      loading='lazy'
                      className='w-full h-full object-cover'
                      src={activity.bg}
                    />
                  </div>
                  <h4 className='mb-4 '>{activity.title}</h4>
                </div>
                <div className='flex'>
                  <div className={`${detailsStyle}`}>{activity.category}</div>
                  <div className={`${detailsStyle}`}>{activity.duration}</div>
                  <div className={`${detailsStyle}`}>{activity.price}</div>
                </div>
              </div>
            </div>
            <div className='flex items-center max-[990px]:hidden'>
              <div className='arrow-icon-style border border-(--content-primary) w-[64px] h-[64px]'>
                <BsArrowUpRight size={24} />
              </div>
              <div className={`spacer w-[0px] h-[0px]`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourList;
