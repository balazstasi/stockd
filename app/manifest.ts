import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Stocked',
    short_name: 'Stocked',
    description: 'Stock data search and visualizer',
    start_url: '/',
    display: 'standalone',
    background_color: '#1E283A',
    theme_color: '#1E283A',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
