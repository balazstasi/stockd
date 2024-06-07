import { Card, CardHeader, CardFooter } from '@/src/components/ui/card';
import { LineChartIcon } from 'lucide-react';
import React from 'react';

import 'tailwindcss/tailwind.css';

type StockData = {
  symbol: string;
  companyName: string;
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  previousClosePrice: number;
  volume: number;
};

type StockCardProps = {
  data: StockData;
};

const StockCard: React.FC<StockCardProps> = ({ data }) => {
  return (
    <Card className='mx-auto max-w-sm overflow-hidden rounded-lg bg-background shadow-lg'>
      <CardHeader className='bg-foreground p-4 text-foreground shadow'>
        <div className='flex items-center justify-between space-x-2 text-background'>
          <h2 className='max-w-[200px] truncate text-2xl font-semibold'>
            {data.companyName}
          </h2>
          <LineChartIcon className='h-4 w-4' />
        </div>
        <p className='p-1 text-sm font-semibold text-background'>
          {data.symbol}
        </p>
      </CardHeader>
      <Card className='p-4'>
        <div className='mb-4'>
          <span className='block font-semibold text-foreground'>
            Current Price
          </span>
          <span className='text-xl font-bold'>
            ${data.currentPrice.toFixed(2)}
          </span>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <span className='block cursor-pointer select-none rounded-md p-1 text-xs font-bold text-foreground text-green-400 hover:bg-green-400 hover:text-background hover:text-white active:bg-green-500'>
              ↑<span className='font-normal'>${data.highPrice.toFixed(2)}</span>
            </span>
          </div>
          <div>
            <span className='block cursor-pointer select-none rounded-md p-1 text-xs font-bold text-red-400 hover:bg-red-400 hover:text-background hover:text-white active:bg-red-500'>
              ↓<span className='font-normal'>${data.lowPrice.toFixed(2)}</span>
            </span>
          </div>
          <div>
            <span className='block font-semibold text-foreground'>Open</span>
            <span>${data.openPrice.toFixed(2)}</span>
          </div>
          <div>
            <span className='block font-semibold text-foreground'>Close</span>
            <span>${data.previousClosePrice.toFixed(2)}</span>
          </div>
          <div className='col-span-2 mt-4'>
            <span className='block text-foreground'>
              Volume <b>|</b> {data.volume.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>
      <CardFooter className='bg-muted p-4'>
        <span className='text-xs text-muted-foreground'>
          Data provided by polygon.io
        </span>
      </CardFooter>
    </Card>
  );
};

export { StockCard };
