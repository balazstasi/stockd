'use client';

import { Button } from '@/src/components/ui/button';
import { GridIcon, ListIcon } from 'lucide-react';
import {
  StockListView,
  StockGridView,
} from '@/src/components/stock-list/views';
import { useUIState } from '@/src/store/ui';
import { IAggsGroupedDaily } from '@polygon.io/client-js';
import Search from '@/src/components/search-symbol';
import { ITickerResult } from '@/src/lib/types';

interface StockListProps {
  stocks: Array<ITickerResult> | null;
  dailyStats: IAggsGroupedDaily | null;
}
export const StockList = ({ stocks, dailyStats }: StockListProps) => {
  const { viewMode, setViewMode } = useUIState();

  return (
    <div className='bg-background py-8'>
      <div className='sticky -top-8 z-10 flex items-center justify-between bg-background px-4 py-4'>
        <h1 className='text-2xl font-bold'>Stock Options</h1>
        <div className='flex items-center gap-2'>
          <Search placeholder={'Eg. META'} />
          <Button
            variant={viewMode === 'list' ? undefined : 'outline'}
            onClick={() => setViewMode('list')}
          >
            <ListIcon className='h-5 w-5' />
            <span className='sr-only'>List View</span>
          </Button>
          <Button
            variant={viewMode === 'grid' ? undefined : 'outline'}
            onClick={() => setViewMode('grid')}
          >
            <GridIcon className='h-5 w-5' />
            <span className='sr-only'>Grid View</span>
          </Button>
        </div>
      </div>
      <div className='mx-auto w-full px-4 py-8'>
        <div className='mb-6'>
          {viewMode === 'list' && (
            <StockListView metadata={stocks} prices={dailyStats} />
          )}

          {viewMode === 'grid' && (
            <StockGridView metadata={stocks} prices={dailyStats} />
          )}
        </div>
      </div>
    </div>
  );
};
