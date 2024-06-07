/* eslint-disable react/no-unescaped-entities */

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <div className='-mt-32 flex flex-col items-center justify-center self-center px-8 text-foreground'>
        <div className='text-bold flex-col items-center justify-center self-center py-4 text-4xl'>
          {"STOCK'D"}
        </div>
        <div className='text-md mt-4 rounded-md bg-foreground p-8 text-center text-background'>
          Search for Stocks and be informed of their latest stats. Also save
          your favs' for checking them later!
        </div>
        <Link href='/search'>
          <Button variant='link' className='mt-16 text-lg'>
            Press Here to search Stocks
          </Button>
        </Link>
      </div>
    </main>
  );
}
