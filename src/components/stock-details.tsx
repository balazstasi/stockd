'use client';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ITickerAggsGroupedDaily } from '@/src/lib/types';
import { StarIcon } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { useStore } from 'zustand';
import { useFavorites } from '@/src/store/favorites';
import { StarFilledIcon } from '@radix-ui/react-icons';

interface StockDetailProps {
  name: string;
  symbol: string;
  companyName: string;
  price: {
    currentPrice: number;
    highPrice: number;
    lowPrice: number;
    openPrice: number;
    previousClosePrice: number;
    volume: number;
  };
  bars: {
    results: ITickerAggsGroupedDaily[];
  };
}
export function StockDetails(props: StockDetailProps) {
  const dailyIncrease =
    props.price.currentPrice - props.price.previousClosePrice;
  const lineChartData = props?.bars?.results?.map((item) => ({
    x: new Date(item.t as number).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
    }),
    y: `${item.c}`,
  }));

  const { favorites, addFavorite, isFavorite, removeFavorite } = useStore(
    useFavorites,
    (store) => ({
      favorites: store.tickers,
      addFavorite: store.addTicker,
      removeFavorite: store.removeTicker,
      isFavorite: (ticker: string) => store.tickers.includes(ticker),
    })
  );

  return (
    <div className='container mx-auto -mt-16 w-full px-4 py-8'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
            <div className='flex flex-col items-center justify-between'>
              <div>
                <h1 className='hidden max-w-xs truncate text-2xl font-bold sm:block'>
                  {props.name}
                </h1>
                <p className='text-gray-500 dark:text-gray-400'>
                  {props.symbol}
                </p>
              </div>
              <div className='text-right'>
                <div className='text-left text-4xl font-bold'>
                  ${props.price?.currentPrice.toFixed(2)}
                </div>
                <div className='text-sm text-gray-500 dark:text-gray-400'>
                  {dailyIncrease.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                Daily High
              </div>
              <div className='text-2xl font-bold'>
                ${props.price?.highPrice.toFixed(2)}
              </div>
            </div>
            <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                Daily Low
              </div>
              <div className='text-2xl font-bold'>
                ${props.price?.lowPrice.toFixed(2)}
              </div>
            </div>
            <div className='w-full rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                Volume
              </div>
              <div className='text-2xl font-bold'>{props.price?.volume}</div>
            </div>
            <Button
              variant='secondary'
              className='h-full w-full rounded-lg bg-gray-100 p-4 dark:bg-gray-800'
              onClick={() =>
                isFavorite(props.symbol)
                  ? removeFavorite(props.symbol)
                  : addFavorite(props.symbol)
              }
            >
              {isFavorite(props.symbol) ? (
                <StarFilledIcon className='h-6 w-6 text-yellow-500' />
              ) : (
                <StarIcon className='h-6 w-6 text-foreground' />
              )}
            </Button>
          </div>
        </div>
        <div className='rounded-lg bg-gray-100 p-6 dark:bg-gray-800'>
          <div className='aspect-[16/9]'>
            <LineChart data={lineChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface LineChartProps {
  data: { x: string; y: string }[];
}

const LineChart = ({ data }: LineChartProps) => {
  const chartData = {
    labels: data.map((entry: any) => entry.x),

    datasets: [
      {
        label: 'Stock Prices',
        data: data.map((entry: any) => entry.y),
        fill: true,
        borderColor: 'rgba(240, 10%, 3.9%, 1)',
        tension: 0.4,
        hoverBorderColor: 'rgba(240, 10%, 3.9%, 0.4)',
      },
    ],

    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  return <Line data={chartData} />;
};
