import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <div className='-mt-32 flex flex-col items-center justify-center self-center px-8 text-zinc-800'>
        <div className='text-bold flex-col items-center justify-center self-center py-4 text-4xl'>
          {"STOCK'D"}
        </div>
        <div className='text-md rounded-md bg-foreground p-4 text-center text-background'>
          Search for Stocks and be informed of their latest stats. Also you will
          be able to save your favorites.
          <br />
          <br />
          <span className='bg-zinc-50 p-0.5 text-xs text-zinc-900'>
            Please use the navigation bar on the top!
          </span>
        </div>
      </div>
    </main>
  );
}
