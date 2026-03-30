export interface Photo {
  src: string;
  alt: string;
}

export interface Album {
  id: string;
  title: string;
  coverPhoto: string;
  photos: Photo[];
}

export const albums: Album[] = [
  {
    id: 'cosl',
    title: 'COSL Internship',
    coverPhoto: '/COSL/IMG_6855.jpg',
    photos: [
      { src: '/COSL/IMG_6855.jpg', alt: 'COSL Internship' },
      { src: '/COSL/13017a4b-255f-459e-8b89-366b455eb92b.JPG', alt: 'COSL Internship' },
      { src: '/COSL/80f92c5d-62b2-415a-b949-54b4ae900a10.jpg', alt: 'COSL Internship' },
      { src: '/COSL/IMG_7478.jpg', alt: 'COSL Internship' },
      { src: '/COSL/96e860ce4121e5182c2f686ff706eb87.JPG', alt: 'COSL Internship' },
      { src: '/COSL/IMG_6853_2.jpg', alt: 'COSL Internship' },
      { src: '/COSL/IMG_7062.jpg', alt: 'COSL Internship' },
      { src: '/COSL/a4aecb9a-c632-4f34-a0a1-382ede643885.JPG', alt: 'COSL Internship' },
      { src: '/COSL/7ecba569b91c51feb51fb5900d4df261.jpg', alt: 'COSL Internship' },
    ],
  },
  {
    id: 'ew',
    title: 'Energy Week 2',
    coverPhoto: '/EW/DSC00677.jpg',
    photos: [
      { src: '/EW/DSC00677.jpg', alt: 'Energy Week 2' },
      { src: '/EW/IMG_2931.jpg', alt: 'Energy Week 2' },
      { src: '/EW/IMG_2896.jpg', alt: 'Energy Week 2' },
      { src: '/EW/DSC03068.jpg', alt: 'Energy Week 2' },
      { src: '/EW/DSC03072.jpg', alt: 'Energy Week 2' },
      { src: '/EW/IMG_2478.jpg', alt: 'Energy Week 2' },
      { src: '/EW/DSC00678.jpg', alt: 'Energy Week 2' },
      { src: '/EW/IMG_2434.jpg', alt: 'Energy Week 2' },
    ],
  },
];

export const allPhotos: Photo[] = albums.flatMap((a) => a.photos);
