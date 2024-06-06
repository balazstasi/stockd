'use client';
import { LineChartIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

interface PriceCardProps {
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
  symbol: string;
  error?: string;
}
export const PriceCard = ({
  high,
  low,
  open,
  close,
  volume,
  symbol,
}: PriceCardProps) => {
  const [highCopied, setHighCopied] = useState(false);
  const [lowCopied, setLowCopied] = useState(false);
  const copyElementText = (
    text: string,
    setIsCopied: (value: boolean) => void
  ) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };

  return (
    <Card className='max-w-[600px] cursor-default'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='text-sm font-medium'>
          {symbol.toUpperCase()}
        </CardTitle>
        <LineChartIcon className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>${close}</div>
        <div className='mt-2 text-muted-foreground'>
          <div className='flex space-x-2'>
            <p
              className='cursor-pointer select-none rounded-md p-1 text-xs text-green-400 hover:bg-green-400 hover:text-white active:bg-green-500'
              onClick={(e) => {
                e.stopPropagation();
                copyElementText(high.toString(), setHighCopied);
              }}
            >
              <span>↑</span>
              <span className='text-sm font-medium text-zinc-900'>
                {highCopied ? '📋✔️' : `$${high}`}
              </span>
            </p>
            <p
              className='cursor-pointer select-none rounded-md p-1 text-xs text-red-400 hover:bg-red-400 hover:text-white active:bg-red-500'
              onClick={(e) => {
                e.stopPropagation();
                copyElementText(low.toString(), setLowCopied);
              }}
            >
              ↓
              <span className='text-sm font-medium text-zinc-900'>
                {lowCopied ? '📋✔️' : `$${low}`}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
