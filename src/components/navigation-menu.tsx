'use client';
import { cn } from '@/src/lib/utils/cn';
import { HomeIcon, HeartIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavigationMenu() {
  const selected = usePathname();
  return (
    <header className='fixed left-0 top-0 z-50 w-full bg-transparent shadow-md dark:bg-gray-900'>
      <div className='container mx-auto flex items-center justify-center px-4 py-3 md:px-6'>
        <nav className='flex items-center gap-6'>
          <Link
            href='/#'
            className={cn(
              'flex items-center gap-2 font-semibold text-gray-900 underline-offset-4 hover:underline dark:text-gray-50',
              {
                underline: selected === '/',
              }
            )}
            prefetch={false}
          >
            <HomeIcon className='h-5 w-5' />
            Home
          </Link>
          <Link
            href='/favorites'
            className={cn(
              'flex items-center gap-2 font-semibold text-gray-900 underline-offset-4 hover:underline dark:text-gray-50',
              {
                underline: selected === '/favorites',
              }
            )}
            prefetch={false}
          >
            <HeartIcon className='h-5 w-5' />
            Favorites
          </Link>
          <Link
            href='/search'
            className={cn(
              'flex items-center gap-2 font-semibold text-gray-900 underline-offset-4 hover:underline dark:text-gray-50',
              {
                underline: selected === '/search',
              }
            )}
            prefetch={false}
          >
            <SearchIcon className='h-5 w-5' />
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
