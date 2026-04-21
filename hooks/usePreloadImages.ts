import { useEffect } from 'react';
import { allPhotos } from '../data/photos';
import { portfolioData } from '../data/portfolio';

/**
 * Preloads all app images on mount so they appear instantly when navigating.
 * Uses the browser's native Image() to warm the HTTP cache.
 */
export function usePreloadImages() {
  useEffect(() => {
    const urls: string[] = [];

    // Photo album images
    allPhotos.forEach((p) => urls.push(p.src));

    // Project images
    portfolioData.projects.forEach((p) => urls.push(p.image));

    // Profile image
    if (portfolioData.personal.profileImage) {
      urls.push(portfolioData.personal.profileImage);
    }

    // Preload each URL via native Image — fills the browser cache
    urls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  }, []);
}
