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
  },
} as const;

export type ThemeName = keyof typeof themes;
