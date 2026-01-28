export const themes = {
  paris: {
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
        '/images/Walking_Tour_guests_holding_pastry_like_emily_in_paris-p-800.avif',
        '/images/Macaron_making_guest_pouring_the_mix_to_pipe_the_macaron-p-800.avif',
        '/images/Macaron_making_filling_the_macarons.avif',
        '/images/Walking_Tour_Group_Photo_outside_Galerie-p-800.avif',
        '/images/Macaron_making_tais_taking_a_picture_of_2_guests_with_the_macaron_making_class_props-p-800.avif',
        '/images/Macaron_making_tote_bag_macarons_and_glass_of_champagne-p-800.avif',
        '/images/Wine_and_cheese_tasting_cutting_the_cheese-p-800.avif',
        '/images/Seine_Cruise_Paris_by_Emily_Boat_Logo_-p-800.avif',
        '/images/Seine_Cruise_Captain_and_guest_heart_hands-p-800.avif',
      ],

      videoSection: {
        video: '/video/paris-hero-b-video.mp4',
        marqueeText: 'Discover Experiences',
        marqueeSticker: '/images/stickers/sticker-montmartre-tour.avif',

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
  },
  rome: {
    name: 'Rome',
    title: 'Rome by Emily',
    subtitle:
      "THE <strong>OFFICIAL</strong> TRAVEL BRAND OF NETFLIX'S EMILY IN PARIS",
    heroVideo: '/video/paris-hero.mp4',
    poster: '/images/paris-hero.mp4',
    cta: 'Explore Rome',
    description: 'Walk through ancient history and Italian charm',
    hero: {
      title: "Live the Rome you've only seen on screen",
      subtitle:
        'Created for people who dream of Rome and want to live it, not just visit',
    },
    unlockExperience: {
      title: 'Explore at your own pace',
      ctaBtnText: 'View Experiences',
      cta: '<span>Unlock The Emily in<span>paris<span>Rome</span></span>Experience</span>',
      cursorTrailImages: [
        '/images/Walking_Tour_guests_holding_pastry_like_emily_in_paris-p-800.avif',
        '/images/Macaron_making_guest_pouring_the_mix_to_pipe_the_macaron-p-800.avif',
        '/images/Macaron_making_filling_the_macarons.avif',
        '/images/Walking_Tour_Group_Photo_outside_Galerie-p-800.avif',
        '/images/Macaron_making_tais_taking_a_picture_of_2_guests_with_the_macaron_making_class_props-p-800.avif',
        '/images/Macaron_making_tote_bag_macarons_and_glass_of_champagne-p-800.avif',
        '/images/Wine_and_cheese_tasting_cutting_the_cheese-p-800.avif',
        '/images/Seine_Cruise_Paris_by_Emily_Boat_Logo_-p-800.avif',
        '/images/Seine_Cruise_Captain_and_guest_heart_hands-p-800.avif',
      ],

      videoSection: {
        video: '/video/paris-hero-b-video.mp4',
        marqueeText: 'Discover Experiences',
        marqueeSticker: '/images/stickers/sticker-montmartre-tour.avif',
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

      emilyActivities: [
        {
          id: '1',
          video: '',
          type: 'WALKING TOURS',
          title: '<span>Walk in the <br /> footsteps of Emily</span>',
          duration: '2.5HOURS',
          price: 'FROM52€',
          category: 'tour',
        },
        {
          id: '2',
          video: '',
          type: 'WORKSHOPS',
          title: '<span>Croissant-Making <br /> Workshop</span>',
          duration: '2.5HOURS',
          price: 'FROM131€',
          category: 'workshop',
        },
        {
          id: '3',
          video: '',
          type: 'WORKSHOPS',
          title: '<span>Macaron-Making <br /> Workshop</span>',
          duration: '2.5HOURS',
          price: 'FROM131€',
          category: 'workshop',
        },
      ],
    },
  },
} as const;

export type ThemeName = keyof typeof themes;
