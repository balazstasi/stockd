'use client';

import { useFavorites } from '@/src/store/favorites';
import { useStore } from 'zustand';

export const FavoriteTickers = () => {
  const tickers = useStore(useFavorites, (s) => s.tickers);

  return (
    <div className='flex flex-col space-y-2 p-4'>
      {Array.from(tickers).map((ticker) => (
        <div className='text-4xl text-foreground' key={ticker}>
          {ticker}
        </div>
      ))}
    </div>
  );
};
