import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/src/components/ui/card';
import { ITickerAggsGroupedDaily, ITickerResult } from '@/src/lib/types';
import { IAggsGroupedDaily } from '@polygon.io/client-js';

interface StockGridViewProps {
  metadata: Array<ITickerResult> | null;
  prices: IAggsGroupedDaily | null;
}
export const StockGridView = ({ metadata, prices }: StockGridViewProps) => {
  const stocks = metadata;

  if (stocks == null || prices == null) {
    return <div className='mt-8 text-center'>No results</div>;
  }

  return (
    <div className='mt-8 grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-2 lg:grid-cols-3'>
      {(stocks ?? [])
        .filter((result) => {
          console.log(prices);
          const hasPriceData = prices?.results?.find(
            (price) => price['T'] === result.ticker
          );

          console.log('🚀 ~ .filter ~ hasPriceData:', hasPriceData);
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
              <CardHeader>
                <CardTitle>{result.ticker}</CardTitle>
                <CardDescription>{result.name}</CardDescription>
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
