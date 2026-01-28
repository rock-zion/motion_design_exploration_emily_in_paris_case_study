import { useTheme } from '@/contexts/ThemeContext';
const VideoSection = () => {
  const { theme } = useTheme();

  return (
    <section className='w-screen max-md:px-[24px] overflow-hidden'>
      <div className='z-[10] max-w-[1080px] w-[70%] max-md:w-[100%]  aspect-square mx-auto rounded-4xl relative '>
        <video
          autoPlay
          playsInline
          muted
          loop
          src={theme.unlockExperience.videoSection.video}
          className='pointer-events-none absolute inset-0 w-full h-full object-cover rounded-4xl'
        />

        <div className='absolute overflow-hidden z-[50] w-[25%] aspect-square rounded-4xl left-[-12.5%] top-[30%]'>
          <video
            autoPlay
            playsInline
            muted
            loop
            src={theme.unlockExperience.videoSection.main1.video}
            className='pointer-events-none absolute inset-0 w-full h-full object-cover'
          />
        </div>

        <div className='absolute overflow-hidden z-[50] w-[30%] right-[-10%] top-[25%] aspect-square rounded-4xl'>
          <video
            autoPlay
            playsInline
            muted
            loop
            src={theme.unlockExperience.videoSection.main2.video}
            className='pointer-events-none absolute inset-0 w-full h-full object-cover'
          />
        </div>

        <div className='absolute overflow-hidden z-[50] w-[25%] bottom-[-12.5%] left-[20%] aspect-square rounded-4xl'>
          <video
            autoPlay
            playsInline
            muted
            loop
            src={theme.unlockExperience.videoSection.main3.video}
            className='pointer-events-none absolute inset-0 w-full h-full object-cover'
          />
        </div>
      </div>

      <div className='marquee relative w-[100vw] overflow-hidden pt-[20vh] max-md:pt-[10vh]'>
        <div className='marquee-inner flex w-fit'>
          {new Array(10).fill('').map((_, index) => (
            <div
              className='flex items-center gap-0 shrink-0 font-serif-bold'
              key={`marquee-item-${index}`}>
              <h1 className='font-display text-(--content-primary) selection:bg-(--bg-brand)'>
                {theme.unlockExperience.videoSection.marqueeText}
              </h1>
              <div className='w-[clamp(100px,15vw,250px)] aspect-square'>
                <img
                  className='w-full h-full'
                  alt={theme.unlockExperience.videoSection.marqueeText}
                  src={theme.unlockExperience.videoSection.marqueeSticker}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
