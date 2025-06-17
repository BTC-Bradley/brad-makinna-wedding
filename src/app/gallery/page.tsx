import { Metadata } from 'next'
import GalleryComponent from '@/components/GalleryComponent'

export const metadata: Metadata = {
  title: 'Photo Gallery | Bradley & MaKinna',
  description: 'Engagement photos of Bradley and MaKinna',
}

export default function GalleryPage() {
  return <GalleryComponent />
}
