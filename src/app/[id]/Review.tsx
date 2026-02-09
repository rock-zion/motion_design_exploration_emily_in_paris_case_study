import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import BubbleButton from '@/components/buttons/BubbleButton';
import { AiFillStar } from 'react-icons/ai';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useMediaQuery } from 'react-responsive';

const Review = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { theme } = useTheme();
  const containerRef = useRef<HTMLElement>(null);
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  useGSAP(
    () => {
      ScrollTrigger.normalizeScroll({
        allowNestedScroll: true,
        lockAxis: true,
      });

      if (!containerRef.current) return;
      const container = containerRef.current;

      const imageWrappers: HTMLElement[] = gsap.utils.toArray('.image-wrapper');
      const buffer: HTMLElement | null = container.querySelector('.buffer');

      const refresh = () => ScrollTrigger.refresh();
      globalThis.addEventListener('resize', refresh);

      const imageTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'top top',
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          pinType: isMobile ? 'transform' : 'fixed',
        },
      });

      tl.to(buffer, {
        y: '-200vh',
        immediateRender: false,
      });

      return () => globalThis.removeEventListener('resize', refresh);
    },
    { scope: containerRef },
  );

  return (
    <section
      className='w-screen will-change-transform h-[100dvh] relative flex justify-center items-center pointer-events-auto overflow-x-clip'
      ref={containerRef}>
      <div className='relative w-[90%]  h-[90%] max-md:[100vh] rounded-2xl flex-col-center bg-(--bg-brand-secondary)'>
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
          loading='lazy'
          className='w-full h-full object-cover'
          src={theme.review.imageA}
          alt=''
        />
      </div>
      <div className='absolute  image-wrapper z-10 w-[40vw] max-md:w-[60vw] h-[70vh] overflow-hidden rounded-2xl rotate-4'>
        <img
          loading='lazy'
          className='w-full h-full object-cover'
          src={theme.review.imageB}
          alt=''
        />
      </div>
      <div className='buffer will-change-transform absolute top-0 flex flex-col w-[10] h-[200vh]'></div>
    </section>
  );
};

export default Review;
