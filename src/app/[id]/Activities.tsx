import { useEffect, useRef } from 'react';
import BubbleButton from '@/components/buttons/BubbleButton';
import { useTheme } from '@/contexts/ThemeContext';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import parse from 'html-react-parser';
import { ScrollTrigger } from 'gsap/all';

const Events = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { theme } = useTheme();

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!containerRef.current) return;

      const activities: HTMLElement[] = gsap.utils.toArray('.activity-wrapper');

      activities.forEach((activity, index) => {
        gsap.to(activity, {
          scale: 0.9,
          filter: index == activities.length - 1 ? '' : 'blur(5px)',
          scrollTrigger: {
            trigger: activity,
            start: 'top top',
            end: 'bottom center',
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = entries => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;

        if (entry.intersectionRatio > 0.5) {
          video.play();
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });

    // Observe each video individually
    videoRefs.current.forEach(video => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} className='pt-[5vh]'>
      {theme.unlockExperience.emilyActivities.map((activity, index) => (
        <div
          key={activity.id}
          className='flex items-end activity-wrapper sticky top-0 w-[95vw] h-[85vh] overflow-hidden rounded-[32px] mx-auto '>
          <div className='inset-0 absolute z-[-1]'>
            <video
              ref={vid => {
                videoRefs.current[index] = vid;
              }}
              playsInline
              muted
              autoPlay
              loop
              src={activity.video}
              className='pointer-events-none w-full h-full object-cover'
            />
          </div>
          <div className='bg-black/0.5 p-[40px] w-full max-md:flex max-md:flex-col max-md:items-center'>
            <div className='font-mango text-h5 leading-0 px-[24px] pt-[6px] bg-(--bg-brand-secondary) w-fit text-(--primitive-neutral-1000) '>
              {theme.unlockExperience.emilyActivities[index].type}
            </div>
            <h2 className='font-serif-bold text-start max-md:text-center my-4'>
              {parse(theme.unlockExperience.emilyActivities[index].title)}
            </h2>
            <div className='flex justify-between items-center max-md:flex-col'>
              <div className='flex max-md:mb-4'>
                <div className='flex items-center font-mango text-h5 pt-[6px] leading-0 px-[32px] bg-(--bg-brand-secondary) rounded-full text-(--primitive-neutral-1000) '>
                  <span>
                    {theme.unlockExperience.emilyActivities[index].duration}
                  </span>
                </div>
                <div className='flex items-center font-mango text-h5 pt-[6px] leading-0 px-[32px] bg-(--bg-brand-secondary) rounded-full text-(--primitive-neutral-1000) '>
                  <span>
                    {theme.unlockExperience.emilyActivities[index].price}
                  </span>
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
