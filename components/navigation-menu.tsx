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
    </Menubar>
  );
}
