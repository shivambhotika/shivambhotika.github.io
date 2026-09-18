'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Photo } from '@/lib/photos';

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
}

export function PhotoCard({ photo, onClick }: PhotoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative cursor-pointer overflow-hidden rounded-lg mb-4"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
            {photo.caption && (
              <p className="text-sm font-medium mb-1">{photo.caption}</p>
            )}
            {photo.location && (
              <p className="text-xs text-gray-300">{photo.location}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}