import { useTheme } from '@/contexts/ThemeContext';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef, useState } from 'react';
import { BsArrowUpRight } from 'react-icons/bs';

const TourList = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const detailsStyle =
    'font-mango border rounded-full px-[16px] text-h5-sm leading-0 flex items-center pt-[6px]';

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const activities: HTMLElement[] = gsap.utils.toArray('.activities');

      const cleanupFunctions: (() => void)[] = [];
      const mouseTracker = document.querySelector('#mouse-tracker');
      const imageContainer = document.createElement('div');

      if (!mouseTracker) return;

      activities.forEach((activity, index) => {
        let trackerTextContent: HTMLParagraphElement | null;
        let requiredClones: number;
        const spacers = activity.querySelectorAll('.spacer');
        const icon = activity.querySelector('.arrow-icon-style');

        const createTextContent = () => {
          mouseTracker.classList.add('marquee__tracker');
          trackerTextContent = document.createElement('p');
          trackerTextContent.innerText = 'EXPLORE MORE';
          trackerTextContent.classList.add(
            'marquee__text',
            'font-mango',
            'text-XL',
          );
          mouseTracker.appendChild(trackerTextContent);

          const width = trackerTextContent.getBoundingClientRect().width;
          requiredClones = Math.ceil(150 / width) + 2;

          console.log({ requiredClones, width, trackerTextContent });
          if (requiredClones)
            for (let i = 0; i < requiredClones; i++) {
              const cloneP = trackerTextContent.cloneNode(
                true,
              ) as HTMLParagraphElement;
              cloneP.setAttribute('aria-hidden', 'true');
              mouseTracker.appendChild(cloneP);
            }
        };

        const removeTextContent = () => {
          if (mouseTracker) mouseTracker.innerHTML = '';
          mouseTracker.classList.remove('marquee__tracker');
        };

        const onEnter = () => {
          setHoverIndex(index);

          gsap.to(mouseTracker, {
            height: '32px',
            width: '150px',
            xPercent: -50,
            yPercent: -50,
            borderRadius: '0px',
            overwrite: 'auto',
            duration: 0.3,
          });

          gsap.to(spacers, {
            height: '150px',
            width: '150px',
            duration: 1,
            ease: 'power2.inOut',
          });

          gsap.to(icon, {
            rotate: '45deg',
            duration: 0.3,
            ease: 'power2.inOut',
          });

          const otherActivities = activities.filter((el, i) => i !== index);

          gsap.to(otherActivities, {
            opacity: 0.7,
            duration: 0.3,
            ease: 'power2.inOut',
          });

          createTextContent();
        };

        const onLeave = () => {
          setHoverIndex(-1);
          gsap.to(mouseTracker, {
            height: '8px',
            width: '8px',
            borderRadius: '100%',
            overwrite: 'auto',
            xPercent: 0,
            yPercent: -0,
            duration: 0.3,
          });

          gsap.to(spacers, {
            height: '0px',
            width: '0px',
            duration: 1,
            ease: 'power2.inOut',
          });

          gsap.to(icon, {
            rotate: '0deg',
            duration: 0.3,
            ease: 'power2.inOut',
          });

          gsap.to(activities, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.inOut',
          });

          removeTextContent();
        };

        activity.addEventListener('mouseenter', onEnter);
        activity.addEventListener('mouseleave', onLeave);

        cleanupFunctions.push(() => {
          activity.removeEventListener('mouseenter', onEnter);
          activity.removeEventListener('mouseleave', onLeave);
        });
      });

      return () => {
        mouseTracker.classList.remove('marquee__tracker');
        mouseTracker.innerHTML = '';
        cleanupFunctions.forEach(func => {
          func();
        });
      };
    },
    {
      scope: containerRef,
    },
  );

  return (
    <div ref={containerRef} className='h-fit my-[15vh]'>
      <div className='w-[90vw] mx-auto'>
        {theme.activities.map(activity => (
          <div
            key={activity.id}
            className={`activities h-[196px] border-t flex items-center justify-between cursor-pointer text-(--content-primary)`}>
            <div className='flex items-center'>
              <div className='spacer w-[0px] h-[0px]'></div>
              <div>
                <div>
                  <h4 className='mb-4 '>{activity.title}</h4>
                </div>
                <div className='flex'>
                  <div className={`${detailsStyle}`}>{activity.category}</div>
                  <div className={`${detailsStyle}`}>{activity.duration}</div>
                  <div className={`${detailsStyle}`}>{activity.price}</div>
                </div>
              </div>
            </div>
            <div className='flex items-center'>
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
