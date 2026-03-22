import { HERO_IMAGE_SRC } from '../config/media';
import { optimizeImageUrl } from './cdnImageUrl';

/** Logical display cap for hero photo; matches {@link CdnImage} on the home hero. */
export const heroImageOptimizeOpts = {
  width: 1920,
  height: 640,
  crop: 'fill' as const,
};

export function getHeroImagePreloadUrl(): string {
  return optimizeImageUrl(HERO_IMAGE_SRC, heroImageOptimizeOpts);
}
