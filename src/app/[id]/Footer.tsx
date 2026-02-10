import BloomButton from '@/components/buttons/BloomButton';

const Footer = () => {
  return (
    <section className='sticky bottom-[-24rem] bg-(--background) h-screen z-[-1] pointer-events-auto'>
      <div className='grid grid-cols-[60%_1fr_1fr] w-[95vw] mx-auto pt-[10vh] max-md:flex flex-col'>
        <div className='flex flex-col max-md:my-[24px]'>
          <img
            loading='lazy'
            className=' w-[150px]'
            src={
              'https://res.cloudinary.com/dixqgrowr/image/upload/v1770581107/emily_in_paris_motion_design_exploration/images/Netflix_Logo_RGB_iotdxf.png'
            }
            alt='netflix logo'
          />
          <p className='font-montreal-book ml-4'>
            NO AFFILIATION WITH <br /> THE NETFLIX OR EMILY <br /> IN PARIS
            BRAND
          </p>
        </div>
        <div></div>
        <div className='flex gap-x-[32px] items-start max-md:flex-col max-md:ml-4'>
          <div className='text-h5 font-mango bg-(--bg-brand-secondary) text-(--primitive-neutral-1000) px-[16px]'>
            CITY
          </div>
          <div className='flex flex-col max-md:mt-[48px]'>
            <BloomButton href='/paris'>Paris</BloomButton>
            <BloomButton href='/rome'>Rome</BloomButton>
          </div>
        </div>
      </div>
      <p className='text-display font-rumble mt-[2vh] w-full text-center'>
        Paris By Emily
      </p>
      <p className='font-montreal-book text-center uppercase'>
        No affiliation with Netflix or Emily in Paris. This landing page was
        created solely for skill demonstration purposes.
      </p>
    </section>
  );
};

export default Footer;
