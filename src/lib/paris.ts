export const paris = {
  name: 'Paris',
  title: 'Paris by Emily',

  subtitle:
    "THE <strong>OFFICIAL</strong> TRAVEL BRAND OF NETFLIX'S EMILY IN PARIS",
  heroVideo: '/video/paris-hero.mp4',
  poster: '/images/paris-hero.mp4',
  cta: 'Explore Paris',
  description: 'Discover romantic streets and café culture',
  hero: {
    title: "Live the paris you've only seen on screen",
    subtitle:
      'Created for people who dream of paris and want to live it, not just visit',
  },
  unlockExperience: {
    title: 'Explore at your own pace',
    ctaBtnText: 'View Experiences',
    cta: 'Unlock The Emily in Paris Experience',

    cursorTrailImages: [
      {
        id: '1',
        img: '/images/Walking_Tour_guests_holding_pastry_like_emily_in_paris-p-800.avif',
      },
      {
        id: '2',
        img: '/images/Macaron_making_guest_pouring_the_mix_to_pipe_the_macaron-p-800.avif',
      },
      { id: '3', img: '/images/Macaron_making_filling_the_macarons.avif' },
      {
        id: '4',
        img: '/images/Walking_Tour_Group_Photo_outside_Galerie-p-800.avif',
      },
      {
        id: '5',
        img: '/images/Macaron_making_tais_taking_a_picture_of_2_guests_with_the_macaron_making_class_props-p-800.avif',
      },
      {
        id: '6',
        img: '/images/Macaron_making_tote_bag_macarons_and_glass_of_champagne-p-800.avif',
      },
      {
        id: '7',
        img: '/images/Wine_and_cheese_tasting_cutting_the_cheese-p-800.avif',
      },
      {
        id: '8',
        img: '/images/Seine_Cruise_Paris_by_Emily_Boat_Logo_-p-800.avif',
      },
      {
        id: '9',
        img: '/images/Seine_Cruise_Captain_and_guest_heart_hands-p-800.avif',
      },
    ],

    videoSection: {
      video: '/video/paris-hero-b-video.mp4',
      marqueeText: 'Discover Experiences',
      marqueeSticker: '/images/stickers/sticker-montmartre-tour.avif',

      subSections: {
        main1: {
          title: 'MONTMARTRE TOUR',
          video: '/video/montmarte-b-transcode.mp4',
        },
        main2: {
          title: 'CHAMPAGNE SEINE CRUISE',
          video: '/video/croissants-a-transcode.mp4',
        },

        main3: {
          title: 'WINE & CHEESE TASTING',
          video: '/video/wine-tasting-b-transcode.mp4',
        },
      },
    },
    emilyActivities: [
      {
        id: '1',
        video: '/video/food-tour-a-transcode.mp4',
        type: 'WALKING TOURS',
        title: '<span>Walk in the <br /> footsteps of Emily</span>',
        duration: '2.5HOURS',
        price: 'FROM52€',
        category: 'tour',
      },
      {
        id: '2',
        video: '/video/croissants-a-transcode.mp4',
        type: 'WORKSHOPS',
        title: '<span>Croissant-Making <br /> Workshop</span>',
        duration: '2.5HOURS',
        price: 'FROM131€',
        category: 'workshop',
      },
      {
        id: '3',
        video: '/video/macarons-a-transcode.mp4',
        type: 'WORKSHOPS',
        title: '<span>Macaron-Making <br /> Workshop</span>',
        duration: '2.5HOURS',
        price: 'FROM131€',
        category: 'workshop',
      },
    ],
  },

  maequeeMadness: [
    {
      id: '1',
      textA: 'Walking Tour',
      stickerA: '/images/stickers/sticker-montmartre-tour.avif',
      textB: 'Food Tour',
      stickerB: '/images/stickers/sticker-food-tour.avif',
    },
    {
      id: '2',
      textA: 'Cheese',
      stickerA: '/images/stickers/sticker-wine-cheese-tasting.avif',
      textB: 'Wine',
      stickerB: '/images/stickers/sticker-champagne-seine-cruise.avif',
    },
    {
      id: '3',
      textA: 'MACARON',
      stickerA: '/images/stickers/sticker-macaron-making-workshop.avif',
      textB: 'CROISSANT',
      stickerB: '/images/stickers/sticker-croissant-making-workshop.avif',
    },
  ],

  activities: [
    {
      id: '1',
      leadingSticker: '',
      hoverBg: 'var(--bg-brand)',
      bg: '/images/Walking_Tour_guests_holding_pastry_like_emily_in_paris-p-800.avif',
      title: 'Walk in the footsteps of Emily',
      category: 'WALKING TOURS',
      duration: '2.5 HOURS',
      price: 'FROM82 €',
    },
    {
      id: '2',
      leadingSticker: '',
      hoverBg: 'var(--bg-brand-secondary)',
      bg: '/images/Croissant_making_end_products_with_red_croissants.avif',
      title: 'Croissant-Making Workshop',
      category: 'WORKSHOPS',
      duration: '2.5 HOURS',
      price: 'FROM131 €',
    },
    {
      id: '3',
      leadingSticker: '',
      hoverBg: 'var(--bg-brand-secondary)',
      bg: '/images/Macron_making_guest_piping_macaroons.avif',
      title: 'Macaron-Making Workshop',
      category: 'WORKSHOPS',
      duration: '2.5 HOURS',
      price: 'FROM101 €',
    },
    {
      id: '4',
      leadingSticker: '',
      hoverBg: 'var(--bg-brand-tertiary)',
      bg: '/images/Seine_Cruise_Captain_and_guest_heart_hands-p-800.avif',
      title: 'Champagne Seine Cruise',
      category: 'BOAT CRUISE',
      duration: '1.5 HOURS',
      price: 'FROM115 €',
    },
    {
      id: '5',
      leadingSticker: '',
      hoverBg: 'var(--bg-brand)',
      bg: '/images/Screenshot_2025-07-22_at_15.27.4.avif',
      title: 'Food Tour',
      category: 'WALKING TOURS',
      duration: '2.5 HOURS',
      price: 'FROM122 €',
    },
    {
      id: '6',
      leadingSticker: '',
      hoverBg: 'var(--bg-brand)',
      bg: '/images/Montmartre_Walking_Tour_Selfie_stick_Wall_of_Love.avif',
      title: 'Montmartre Tour',
      category: 'WALKING TOURS',
      duration: '2 HOURS',
      price: 'FROM60 €',
    },
    {
      id: '7',
      leadingSticker: '',
      hoverBg: 'var(--bg-brand-secondary)',
      bg: '/images/Wine_and_cheese_tasting_cutting_the_cheese-p-800.avif',
      title: 'Wine, Cheese & Butter Tasting',
      category: 'WORKSHOPS',
      duration: '2 HOURS',
      price: 'FROM118 €',
    },
  ],

  review: {
    name: 'Danielle, Netherlands',
    text: 'It was such a joyful and affirming experience. Thank you, Guillaume, for such a memorable and enriching workshop. We can’t recommend it highly enough!',
    imageA: '/images/Croissant_making_guests_eating_their_final_products.avif',
    imageB:
      '/images/Croissant_making_two_guests_holding_their_raw_croissants.avif',
    reviews: [
      {
        profile: '',
        id: '1',
        name: 'Elsa',
        location: 'United Kingdom',
        experience: 'Wine, Cheese & Butter Tasting',
        image:
          '/images/Wine_and_cheese_tasting_paris_by_emily_board_and_cheese.avif',
      },
      {
        profile: '',
        id: '2',
        name: 'Katie',
        location: 'United Kingdom',
        experience: 'Walk in the footsteps of Emily',
        image:
          '/images/Walking_Tour_emily_in_paris_guests_posing_for_photo_outside_emilys_apartment.avif',
      },
      {
        profile: '',
        id: '3',
        name: 'Arina',
        location: 'France',
        experience: 'Champagne Seine Cruise',
        image: '/images/Seine_Cruise_Macarons_Polaroid.avif',
      },
      {
        profile: '',
        id: '4',
        name: 'Christopher',
        location: 'United States',
        experience: 'Croissant-Making Workshop',
        image: '/images/Croissant_making_three_guests_cutting_the_pastry.avif',
      },
      {
        profile: '',
        id: '5',
        name: 'Stacey',
        location: 'United Kingdom',
        experience: 'Macaron-Making Workshop',
        image:
          '/images/Macaron_making_workshop_with_paris_by_emily_glasses_and_champagne.avif',
      },
    ],
  },
  outro: {
    text: "<span className='text-h3 flex items-center flex-wrap w-[53vw] max-md:w-[95%] mx-auto text-(--content-primary)'>From<img className='mx-2 object-contain h-[clamp(52.7px,5.4vw+35.4px,102.4px)] w-[clamp(52.7px,5.4vw+35.4px,102.4px)] aspect-square' src='/images/stickers/sticker-croissant-making-workshop.avif'/><span className='bg-(--bg-brand-tertiary)'>croissant-making</span>&thinsp; workshops to<img className='mx-2 object-contain h-[clamp(52.7px,5.4vw+35.4px,102.4px)] w-[clamp(52.7px,5.4vw+35.4px,102.4px)] aspect-square' src='/images/stickers/sticker-champagne-seine-cruise.avif'/><span className='bg-(--bg-brand-secondary)'>champagne Seine cruises,</span>&thinsp;<span>discover</span><img className='mx-2 object-contain h-[clamp(52.7px,5.4vw+35.4px,102.4px)] w-[clamp(52.7px,5.4vw+35.4px,102.4px)] aspect-square' src='/images/stickers/sticker-montmartre-tour.avif'/><span className='bg-(--bg-brand)'>secret streets</span>&thinsp;<span>and Paris moments à la Emily.</span></span>",
  },
};
