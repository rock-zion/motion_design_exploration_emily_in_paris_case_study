import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';

const Review = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {}, { scope: containerRef });
  return (
    <section
      className='w-screen h-screen relative flex justify-center items-center'
      ref={containerRef}>
          <div className='absolute w-[90%] h-[90%] bg-(--bg-brand-secondary)'>
              
      </div>
      <div></div>
      <div></div>
    </section>
  );
};

export default Review;
