import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useRef, forwardRef } from 'react';

const VideoSection = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const subVideosRef = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const playPauseVideos = (action: 'play' | 'pause') => {
      mainVideoRef.current?.[action]();
      subVideosRef.current.forEach(video => video?.[action]());
    };

    const observerCallback: IntersectionObserverCallback = entries => {
      entries.forEach(el => {
        const action = el.isIntersecting ? 'play' : 'pause';

        playPauseVideos(action);
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (!containerRef.current) return;
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className='w-screen overflow-x-clip max-md:px-[24px] max-md:mt-[5vh]'>
      <div className='z-[10] max-w-[1080px] w-[70%] max-md:w-[100%]  aspect-square mx-auto rounded-4xl relative'>
        <video
          ref={mainVideoRef}
          playsInline
          muted
          loop
          poster={theme.unlockExperience.videoSection.poster}
          src={theme.unlockExperience.videoSection.video}
          className='pointer-events-none absolute inset-0 w-full h-full object-cover rounded-4xl'
        />

        {Object.entries(theme.unlockExperience.videoSection.subSections).map(
          ([, value], index) => {
            const isItem1 = index % 3 === 0;
            const isItem2 = index % 3 === 1;
            const isItem3 = index % 3 === 2;

            return (
              <VideoSectioBubble
                srcPoster={value.poster}
                ref={el => {
                  subVideosRef.current[index] = el;
                }}
                key={value.title}
                classNames={`
                  ${isItem1 ? 'w-[25%] left-[-12.5%] top-[30%]' : ''}
                  ${isItem2 ? 'w-[30%] right-[-10%] top-[25%]' : ''}
                  ${isItem3 ? 'w-[25%] bottom-[-12.5%] left-[20%]' : ''}
                `}
                srcImgs={value.video}
              />
            );
          },
        )}
      </div>
    </section>
  );
};

export default VideoSection;

const VideoSectioBubble = forwardRef<HTMLVideoElement, VideoSectioBubbleProps>(
  ({ classNames, srcImgs, srcPoster }, ref) => {
    return (
      <div
        className={`absolute overflow-hidden z-[50] ${classNames} aspect-square rounded-4xl`}>
        <video
          ref={ref}
          autoPlay
          playsInline
          muted
          loop
          src={srcImgs}
          poster={srcPoster}
          className='pointer-events-none absolute inset-0 w-full h-full object-cover'
        />
      </div>
    );
  },
);

VideoSectioBubble.displayName = 'VideoSectioBubble';

type VideoSectioBubbleProps = {
  classNames: string;
  srcImgs: string;
  srcPoster: string;
};
