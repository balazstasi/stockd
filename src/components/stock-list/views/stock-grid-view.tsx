import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/src/components/ui/card';
import { ITickerAggsGroupedDaily, ITickerResult } from '@/src/lib/types';
import { useFavorites } from '@/src/store/favorites';
import { IAggsGroupedDaily } from '@polygon.io/client-js';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { Star, StarIcon } from 'lucide-react';
import { useStore } from 'zustand';

interface StockGridViewProps {
  metadata: Array<ITickerResult> | null;
  prices: IAggsGroupedDaily | null;
}
export const StockGridView = ({ metadata, prices }: StockGridViewProps) => {
  const stocks = metadata;
  const { favorites, addFavorite, isFavorite, removeFavorite } = useStore(
    useFavorites,
    (store) => ({
      favorites: store.tickers,
      addFavorite: store.addTicker,
      removeFavorite: store.removeTicker,
      isFavorite: (ticker: string) => store.tickers.includes(ticker),
    })
  );

  if (stocks == null || prices == null) {
    return <div className='mt-8 text-center'>No results</div>;
  }

  return (
    <div className='mt-8 grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-2 lg:grid-cols-3'>
      {(stocks ?? [])
        .filter((result) => {
          const hasPriceData = prices?.results?.find(
            (price) => price['T'] === result.ticker
          );

          return hasPriceData;
        })
        .map((result) => {
          const price = (prices?.results ?? []).find(
            (price) =>
              price['T']?.toLocaleUpperCase() ===
              result?.ticker?.toLocaleUpperCase()
          );
          const dailyIncrease = Number(price?.h) - Number(price?.l);
          return (
            <Card key={result.ticker}>
              <CardHeader className='flex flex-row justify-between'>
                <div className='self-center'>
                  <CardTitle>{result.ticker}</CardTitle>
                  <CardDescription>{result.name}</CardDescription>
                </div>

                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() =>
                    isFavorite(result.ticker)
                      ? removeFavorite(result.ticker)
                      : addFavorite(result.ticker)
                  }
                >
                  {isFavorite(result.ticker) ? (
                    <StarFilledIcon className='h-6 w-6 text-yellow-500' />
                  ) : (
                    <StarIcon className='h-6 w-6' />
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 gap-2'>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      High
                    </p>
                    <p>${Number(price?.h).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Low
                    </p>
                    <p>${Number(price?.l).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Volume
                    </p>
                    <p>{Number(price?.v).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Volumn Weighted Average Price
                    </p>
                    <p>${Number(price?.vw).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Daily Increase
                    </p>
                    <p
                      className={
                        dailyIncrease >= 0 ? 'text-green-500' : 'text-red-500'
                      }
                    >
                      {Number(dailyIncrease).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};
