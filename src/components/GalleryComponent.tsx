'use client'

import { useState } from 'react'
import Image from 'next/image'

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
]

export default function GalleryComponent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-sage mb-6 font-serif text-5xl font-light tracking-wide dark:text-amber-400">
          Photo Gallery
        </h1>
        <div className="bg-sage/30 mx-auto mb-8 h-1 w-24 dark:bg-amber-400/30"></div>
        <p className="text-gray-600">
          A collection of our favorite moments together
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="aspect-w-4 aspect-h-3 relative cursor-pointer overflow-hidden rounded-lg"
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
          className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="aspect-w-4 aspect-h-3 relative w-full max-w-4xl">
            <Image
              src={selectedImage}
              alt="Selected photo"
              fill
              className="object-contain"
            />
          </div>
          <button
            className="hover:text-sage absolute top-4 right-4"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            <svg
              className="h-8 w-8"
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
  )
}
