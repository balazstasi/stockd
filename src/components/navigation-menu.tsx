'use client';
import { Button } from '@/src/components/ui/button';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from '@/src/components/ui/menubar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface NavigationMenuProps {
  selected?: 'home' | 'favorites' | 'search';
}
export function NavigationMenu() {
  let selected = usePathname().split('/')[1] as NavigationMenuProps['selected'];
  if ((selected as string) === '/' || (selected as string) === '') {
    selected = 'home';
  }

  const currentSearch = usePathname().split('/')[2] as string;

  return (
    <Menubar className='justify-center bg-muted'>
      <MenubarMenu>
        <MenubarTrigger
          className={
            selected === 'home'
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }
        >
          <Link href={'/'}>🏚️ Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          className={
            selected === 'favorites'
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }
        >
          <Link href={'/favorites'}>⭐︎ Favorites</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          className={
            selected === 'search'
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }
        >
          <Link href={'/search'}>🔎 Search</Link>
        </MenubarTrigger>
      </MenubarMenu>
      {currentSearch && currentSearch.length > 0 && (
        <MenubarMenu>
          {
            <div className='flex w-full justify-end rounded-md p-1 text-center text-xs text-zinc-50 sm:w-full lg:w-full'>
              <div className='rounded-md bg-zinc-600 p-1'>{currentSearch}</div>
            </div>
          }
        </MenubarMenu>
      )}
    </Menubar>
  );
}
