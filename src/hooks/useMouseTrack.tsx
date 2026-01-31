import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';

const useMouseTrack = () => {
  const positionRef = useRef({
    positionX: 0,
    positionY: 0,
  });

  useGSAP(() => {
    const handleMouseTrack = (e: MouseEvent) => {
      const X = e.clientX - 4;
      const Y = e.clientY - 4;

      positionRef.current.positionX = X;
      positionRef.current.positionY = Y;

      gsap.to(['#mouse-tracker'], {
        x: positionRef.current.positionX,
        y: positionRef.current.positionY,
        duration: 0.5,
        ease: 'power2.out',
        force3D: true,
        immediateRender: true,
      });
    };

    globalThis.addEventListener('mousemove', handleMouseTrack);

    return () => {
      globalThis.removeEventListener('mousemove', handleMouseTrack);
    };
  });

  return positionRef;
};

export default useMouseTrack;
