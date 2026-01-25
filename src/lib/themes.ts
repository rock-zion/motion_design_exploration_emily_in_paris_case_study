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
    },
  },
} as const;

export type ThemeName = keyof typeof themes;
