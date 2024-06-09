'use client';

import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils/cn';
import { useFavorites } from '@/src/store/favorites';
import { HeartCrack } from 'lucide-react';
import Link from 'next/link';
import { useStore } from 'zustand';

interface FavoriteTickersProps {
  dailyChanges: {
    dailyChange: number | null;
    ticker: string | undefined;
  }[];
}

export const FavoriteTickers = (props: FavoriteTickersProps) => {
  const { favorites, addFavorite, isFavorite, removeFavorite } = useFavorites(
    (store) => ({
      favorites: store.tickers,
      addFavorite: store.addTicker,
      removeFavorite: store.removeTicker,
      isFavorite: (ticker: string) => store.tickers.includes(ticker),
    })
  );

  const tickers = useStore(useFavorites, (s) => s.tickers);

  const changes = props?.dailyChanges?.map((item) => ({
    ticker: item.ticker,
    change: Number(item.dailyChange).toFixed(2),
  }));

  return (
    <div className='flex flex-col space-y-2 p-4'>
      {!tickers ||
        (tickers.length === 0 && (
          <div className='-mt-12 flex flex-row text-2xl'>
            <p className='self-center'>No favorites yet...</p>{' '}
            <HeartCrack className='h-6 w-6 self-center' />
          </div>
        ))}
      {tickers &&
        tickers.length > 0 &&
        tickers.map((ticker) => {
          const change = changes?.find(
            (item) => item.ticker === ticker
          )?.change;
          return (
            <div
              key={ticker}
              className='flex flex-row items-center justify-between'
            >
              <Link
                href={`/stock/${ticker}`}
                className='flex flex-row text-4xl font-medium'
              >
                <Button variant='link' className='text-4xl font-medium'>
                  {ticker}
                </Button>
                <p
                  className={cn(
                    `ml-2 text-3xl font-medium`,
                    change == null
                      ? 'text-gray-400'
                      : Number(change) > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                  )}
                >
                  ({change})
                </p>
              </Link>
            </div>
          );
        })}
    </div>
  );
};
