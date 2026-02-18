'use client';

import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { PhotoCard } from '@/components/PhotoCard';
import { PhotoSkeleton } from '@/components/PhotoSkeleton';
import { photos } from '@/lib/photos';

const breakpointColumns = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

export default function PhotosPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visiblePhotos, setVisiblePhotos] = useState(12);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500 &&
        visiblePhotos < photos.length
      ) {
        setVisiblePhotos(prev => Math.min(prev + 6, photos.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visiblePhotos]);

  const lightboxSlides = photos.map(photo => ({
    src: photo.src,
    alt: photo.alt,
    description: photo.caption,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Photos
          </h1>
          <p className="text-lg text-gray-700">
            Overly nostalgic photos try-hard
          </p>
        </div>

        {/* Masonry Grid */}
        {isLoading ? (
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <PhotoSkeleton key={i} />
            ))}
          </Masonry>
        ) : (
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {photos.slice(0, visiblePhotos).map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => openLightbox(index)}
              />
            ))}
          </Masonry>
        )}

        {/* Loading more indicator */}
        {visiblePhotos < photos.length && !isLoading && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </div>
  );
}