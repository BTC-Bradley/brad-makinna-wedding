'use client';

import { useState } from 'react';
import Image from 'next/image';

// Placeholder images - replace with actual engagement photos
const photos = [
  {
    src: '/images/gallery-1.jpg',
    alt: 'Engagement photo 1',
  },
  {
    src: '/images/gallery-2.jpg',
    alt: 'Engagement photo 2',
  },
  {
    src: '/images/gallery-3.jpg',
    alt: 'Engagement photo 3',
  },
  {
    src: '/images/gallery-4.jpg',
    alt: 'Engagement photo 4',
  },
  {
    src: '/images/gallery-5.jpg',
    alt: 'Engagement photo 5',
  },
  {
    src: '/images/gallery-6.jpg',
    alt: 'Engagement photo 6',
  },
];

export default function GalleryComponent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-sage mb-4">Photo Gallery</h1>
        <p className="text-gray-600">
          A collection of our favorite moments together
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(photo.src)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full aspect-w-4 aspect-h-3">
            <Image
              src={selectedImage}
              alt="Selected photo"
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white hover:text-sage"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
} 