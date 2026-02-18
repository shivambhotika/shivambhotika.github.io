export interface Photo {
  id: number;
  src: string;
  alt: string;
  caption?: string;
  location?: string;
  date?: string;
}

export const photos: Photo[] = [
  {
    id: 1,
    src: '/photos/photo-1.jpg',
    alt: 'Photo 1',
    caption: 'tried being cutesy',
    location: 'The Nest, Blr',
    date: '2025'
  },
  {
    id: 2,
    src: '/photos/photo-2.jpg',
    alt: 'Photo 2',
    caption: 'I had a friend',
    location: 'IDC, Blr',
    date: '2024'
  },
  {
    id: 3,
    src: '/photos/photo-3.jpg',
    alt: 'Photo 3',
    caption: 'Add your caption here',
    location: 'Add location',
    date: '2024'
  },
  {
    id: 5,
    src: '/photos/photo-5.jpg',
    alt: 'Photo 5',
    caption: 'Add your caption here',
    location: 'Add location',
    date: '2024'
  },
  {
    id: 6,
    src: '/photos/photo-6.jpg',
    alt: 'Photo 6',
    caption: 'Add your caption here',
    location: 'Add location',
    date: '2024'
  },
  {
    id: 7,
    src: '/photos/photo-7.jpg',
    alt: 'Photo 7',
    caption: 'Add your caption here',
    location: 'Add location',
    date: '2024'
  },
  {
    id: 8,
    src: '/photos/photo-8.jpg',
    alt: 'Photo 8',
    caption: 'Add your caption here',
    location: 'Add location',
    date: '2024'
  },
  {
    id: 9,
    src: '/photos/photo-9.jpg',
    alt: 'Photo 9',
    caption: 'Add your caption here',
    location: 'Add location',
    date: '2024'
  },
  {
    id: 10,
    src: '/photos/photo-10.jpg',
    alt: 'Photo 10',
    caption: 'Add your caption here',
    location: 'Add location',
    date: '2024'
  },
  {
    id: 11,
    src: '/photos/photo-11.jpg',
    alt: 'Photo 11',
    caption: 'Add your caption here',
    location: 'Add location',
    date: '2024'
  },
];