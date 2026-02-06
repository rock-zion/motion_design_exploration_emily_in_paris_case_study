import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import BubbleButton from '@/components/buttons/BubbleButton';
import { AiFillStar } from 'react-icons/ai';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const Review = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const imageWrappers: HTMLElement[] = gsap.utils.toArray('.image-wrapper');

      const imageTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      imageWrappers.forEach((imgWrapper, index) => {
        const isEven = (index + 1) % 2 === 0;
        imageTl.to(
          imgWrapper,
          {
            xPercent: isEven ? 120 : -120,
            ease: 'power1.inOut',
          },
          0,
        );
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'bottom bottom',
            end: '+=100%',
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        })
        .to('.buffer', {
          y: '-200vh',
          ease: 'power1.inOut',
        });
    },
    { scope: containerRef },
  );

  return (
    <section
      className='w-screen h-screen overflow-hidden relative flex justify-center items-center'
      ref={containerRef}>
      <div className='relative w-[90%] h-[90%] rounded-2xl flex-col-center bg-(--bg-brand-secondary)'>
        <div className='flex'>
          {[...Array(5)].map((_, i) => (
            <AiFillStar
              key={i}
              size={16}
              style={{ color: 'var(--content-tertiary)' }}
            />
          ))}
        </div>
        <p className='text-(--primitive-neutral-1000) mt-4 text-XL font-mango uppercase'>
          {theme.review.name}
        </p>
        <h5 className='text-(--primitive-neutral-1000) leading-3 w-[40vw] text-center my-4'>
          {theme.review.text}
        </h5>
        <BubbleButton variant='out' altLeft={true}>
          View Experience
        </BubbleButton>
      </div>
      <div className='absolute image-wrapper z-10 w-[40vw] max-md:w-[60vw] h-[70vh] overflow-hidden rounded-2xl -rotate-4'>
        <img
          className='w-full h-full object-cover'
          src={theme.review.imageA}
          alt=''
        />
      </div>
      <div className='absolute  image-wrapper z-10 w-[40vw] max-md:w-[60vw] h-[70vh] overflow-hidden rounded-2xl rotate-4'>
        <img
          className='w-full h-full object-cover'
          src={theme.review.imageB}
          alt=''
        />
      </div>
      <div className='buffer top-[0] left-0 absolute w-[1] bg-amber-700 h-[200vh]'></div>
    </section>
  );
};

export default Review;
