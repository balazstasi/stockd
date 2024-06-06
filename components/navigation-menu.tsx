'use client';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { usePathname, useRouter } from 'next/navigation';

interface NavigationMenuProps {
  selected?: 'home' | 'favorites' | 'search';
}
export function NavigationMenu() {
  let selected = usePathname().split('/')[1] as NavigationMenuProps['selected'];
  if ((selected as string) === '/' || (selected as string) === '') {
    selected = 'home';
  }

  const navigation = useRouter();

  const currentSearch = usePathname().split('/')[2] as string;
  console.log('🚀 ~ NavigationMenu ~ currentSearch:', currentSearch);

  console.log(selected);
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          className={
            selected === 'home'
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }
          onClick={() => {
            navigation.push('/');
          }}
        >
          Home
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          className={
            selected === 'favorites'
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }
          onClick={() => {
            navigation.push('/favorites');
          }}
        >
          Favorites
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          className={
            selected === 'search'
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }
          onClick={() => {
            navigation.push('/search');
          }}
        >
          Search
        </MenubarTrigger>
      </MenubarMenu>
      {currentSearch && currentSearch.length > 0 && (
        <MenubarMenu>
          {
            <div className='ml-2 w-full justify-end rounded-md bg-zinc-600 p-1 text-center text-xs text-zinc-50'>
              Symbol | {currentSearch}
            </div>
          }
        </MenubarMenu>
      )}
    </Menubar>
  );
}
