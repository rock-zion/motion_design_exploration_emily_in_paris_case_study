import { paris } from './paris';
import { rome } from './rome';

export const themes = {
  paris,
  rome
} as const;

export type ThemeName = keyof typeof themes;
