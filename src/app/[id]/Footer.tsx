import React from 'react';

const Footer = () => {
  return (
    <section className='sticky bottom-[-24rem] bg-(--background) h-screen z-[-1]'>
      <div className='grid grid-cols-[60%_1fr_1fr] w-[95vw] mx-auto pt-[10vh]'>
        <div className='flex flex-col'>
          <img
            className=' w-[150px]'
            src={'/images/Netflix_Logo_RGB.png'}
            alt='netflix logo'
          />
          <p className='font-montreal-book'>
            NO AFFILIATION WITH <br /> THE NETFLIX OR EMILY <br /> IN PARIS
            BRAND
          </p>
        </div>
        <div></div>
        <div className='flex gap-x-[32px]'>
          <div className='text-h6 font-mango'>CITY</div>
          <div className='flex flex-col'>
            <button>Paris</button>
            <button>Rome</button>
          </div>
        </div>
      </div>
      <p className='text-display font-rumble mt-[2vh] w-full text-center'>
        Paris By Emily
      </p>
      <p className='font-montreal-book text-center'>
        NO AFFILIATION WITH THE NETFLIX OR EMILY IN PARIS BRAND I BUILD THIS
        LANDING PAGE SOLEY FOR THE PURPOSE OF DEMONSTRATING A SKILL
      </p>
    </section>
  );
};

export default Footer;
