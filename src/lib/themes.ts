export const themes = {
  paris: {
    name: 'Paris',
    title: 'Paris by Emily',
    subtitle: 'Live the city of lights',
    heroImage: '/images/paris-hero.jpg',
    cta: 'Explore Paris',
    description: 'Discover romantic streets and café culture',
  },
  rome: {
    name: 'Rome',
    title: 'Paris by Emily',
    subtitle: 'Where history comes alive',
    heroImage: '/images/rome-hero.jpg',
    cta: 'Explore Rome',
    description: 'Walk through ancient history and Italian charm',
  },
} as const;

export type ThemeName = keyof typeof themes;
