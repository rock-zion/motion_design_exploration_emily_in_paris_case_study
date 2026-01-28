import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

type UseMarqueeProps = {
  scope: React.RefObject<HTMLElement | null>;
  dependencies: unknown[];
  xPercent: number;
  duration: number;
};

const useMarquee = ({
  scope,
  dependencies,
  xPercent = -100,
  duration = 60,
}: Readonly<UseMarqueeProps>) => {
  return useGSAP(
    (_, contextSafe) => {
      if (!scope.current) return;

      let currentScroll = 0;
      let isScrollingDown = true;
      gsap.set('.marquee-inner', { xPercent: 0 });

      const tween = gsap
        .to('.marquee-inner', {
          xPercent: xPercent,
          repeat: -1,
          duration: duration,
          ease: 'linear',
        })
        .totalProgress(0.5);

      const handleMarqueeDirectionFlip = contextSafe!(() => {
        if (window.pageYOffset > currentScroll) {
          isScrollingDown = true;
        } else {
          isScrollingDown = false;
          console.log('scrolling up');
        }

        gsap.to(tween, {
          timeScale: isScrollingDown ? 1 : -1,
        });
        currentScroll = window.pageYOffset;
      });

      window.addEventListener('scroll', handleMarqueeDirectionFlip);

      return () => {
        tween.kill();
        window.removeEventListener('scroll', handleMarqueeDirectionFlip);
      };
    },
    { scope, dependencies: [xPercent, duration, ...dependencies] },
  );
};

export default useMarquee;
