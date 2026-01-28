import { useRef } from 'react';
import BubbleButton from '@/components/buttons/BubbleButton';
import { useTheme } from '@/contexts/ThemeContext';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import parse from 'html-react-parser';
import { ScrollTrigger } from 'gsap/all';

const Events = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!containerRef.current) return;

      const activities: HTMLElement[] = gsap.utils.toArray('.activity-wrapper');

      activities.forEach(activity => {
        gsap.to(activity, {
          scale: 0.9,
          filter: 'blur(5px)',
          scrollTrigger: {
            trigger: activity,
            start: 'top top',
            end: 'bottom center',
            scrub: true,
            // markers: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className='pt-[5vh]'>
      {theme.unlockExperience.emilyActivities.map((activity, index) => (
        <div
    
          key={activity.id}
          className='flex items-end activity-wrapper sticky top-0 w-[95vw] h-[85vh] overflow-hidden rounded-[32px] bg-amber-500 mx-auto '>
          <div className='inset-0 absolute z-[-1]'>
            <video
              playsInline
              muted
              autoPlay
              loop
              src={activity.video}
              className='pointer-events-none w-full h-full object-cover'
            />
          </div>
          <div className='bg-black/0.5 p-[40px] w-full'>
            <div className='font-mango text-h5-sm leading-0 px-[24px] pt-[6px] bg-(--bg-brand-secondary) w-fit text-(--content-primary)'>
              {theme.unlockExperience.emilyActivities[index].type}
            </div>
            <h3 className='font-serif-bold text-start max-md:text-center my-4'>
              {parse(theme.unlockExperience.emilyActivities[index].title)}
            </h3>
            <div className='flex justify-between items-center'>
              <div className='flex'>
                <div className='flex items-center font-mango text-h5-sm pt-[6px] leading-0 px-[32px] bg-(--bg-brand-secondary) rounded-full text-(--content-primary)'>
                  <text>
                    {theme.unlockExperience.emilyActivities[index].duration}
                  </text>
                </div>
                <div className='flex items-center font-mango text-h5-sm pt-[6px] leading-0 px-[32px] bg-(--bg-brand-secondary) rounded-full text-(--content-primary)'>
                  <text>
                    {theme.unlockExperience.emilyActivities[index].price}
                  </text>
                </div>
              </div>
              <BubbleButton href='/' variant='out'>
                Explore More
              </BubbleButton>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Events;
