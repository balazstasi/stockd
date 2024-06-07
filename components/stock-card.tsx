import { Card, CardHeader, CardFooter } from '@/components/ui/card';
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
    <Card className='mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-lg'>
      <CardHeader className='bg-foreground p-4 text-white'>
        <h2 className='text-2xl font-semibold'>{data.companyName}</h2>
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
            <span className='block text-foreground'>High</span>
            <span className='text-green-500'>${data.highPrice.toFixed(2)}</span>
          </div>
          <div>
            <span className='block text-foreground'>Low</span>
            <span className='text-red-500'>${data.lowPrice.toFixed(2)}</span>
          </div>
          <div>
            <span className='block text-foreground'>Open</span>
            <span>${data.openPrice.toFixed(2)}</span>
          </div>
          <div>
            <span className='block text-foreground'>Close</span>
            <span>${data.previousClosePrice.toFixed(2)}</span>
          </div>
          <div className='col-span-2 mt-4'>
            <span className='block text-foreground'>
              Volume | {data.volume.toLocaleString()}
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
