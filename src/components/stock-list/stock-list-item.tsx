import { Button } from '@/src/components/ui/button';
import { TableRow, TableCell } from '@/src/components/ui/table';
import { useFavorites } from '@/src/store/favorites';
import {
  IAggsGroupedDaily,
  ITickerDetails,
  ITickers,
} from '@polygon.io/client-js';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { Badge } from '@/src/components/ui/badge';
import Link from 'next/link';
import { useStore } from 'zustand';
import { MoreHorizontal, StarIcon } from 'lucide-react';
import { ValuesType } from 'utility-types';
import { DotsHorizontalIcon, StarFilledIcon } from '@radix-ui/react-icons';

type ITickerResult = ValuesType<ITickers['results']>;
export const StockListItem = ({
  metadata,
  prices,
}: {
  metadata: ITickerResult;
  prices: IAggsGroupedDaily['results'][number] | null;
}) => {
  const { favorites, addFavorite, isFavorite, removeFavorite } = useFavorites(
    (store) => ({
      favorites: store.tickers,
      addFavorite: store.addTicker,
      removeFavorite: store.removeTicker,
      isFavorite: (ticker: string) => store.tickers.includes(ticker),
    })
  );

  if (metadata == null || prices == null) {
    return <div>No data</div>;
  }

  return (
    <TableRow>
      <TableCell className='hidden sm:table-cell'>
        <div className='w-20 self-center rounded-md bg-foreground p-1 text-center font-semibold text-background'>
          {metadata.ticker?.toUpperCase()}
        </div>
      </TableCell>
      <TableCell className='flex flex-row font-medium'>
        <p className='self-center'>{metadata.name}</p>
        {isFavorite(metadata.ticker) && (
          <Button
            className='self-center'
            variant='ghost'
            size='icon'
            onClick={() => removeFavorite(metadata.ticker)}
          >
            <StarFilledIcon className='h-4 w-4 text-yellow-500' />
          </Button>
        )}

        {!isFavorite(metadata.ticker) && (
          <Button
            className='self-center'
            variant='ghost'
            size='icon'
            onClick={() => addFavorite(metadata.ticker)}
          >
            <StarIcon className='h-4 w-4' />
          </Button>
        )}
      </TableCell>
      <TableCell id='low' className='text-red-400'>
        <p>${prices?.h}</p>
      </TableCell>
      <TableCell id='high' className='text-green-500'>
        <p>${prices?.l}</p>
      </TableCell>

      <TableCell className='hidden md:table-cell'>
        <p className='line-clamp-[10]'>${Number(prices.vw).toFixed(2)}</p>
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        {Number(prices.v).toFixed(2) ?? 'Unknown'}
      </TableCell>
      <TableCell className='bg-background'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='bg-white p-1'>
            <Button aria-haspopup='true' size='icon' variant='ghost'>
              <MoreHorizontal className='h-4 w-4' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-background'>
            <DropdownMenuItem>
              <Button variant='link'>
                <Link href={`/stock/${metadata.ticker}`}>
                  <div className='flex flex-row'>
                    <DotsHorizontalIcon className='mr-1 h-4 w-4 self-center' />
                    <p>View Details</p>
                  </div>
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant='link'
                onClick={() => {
                  if (metadata.ticker == null) {
                    return;
                  }
                  if (isFavorite(metadata.ticker)) {
                    removeFavorite(metadata.ticker);
                    return;
                  }
                  addFavorite(metadata.ticker);
                }}
              >
                {isFavorite(metadata.ticker) ? (
                  <div className='flex flex-row'>
                    <StarFilledIcon className='mr-1 h-4 w-4 self-center text-yellow-500' />{' '}
                    Remove from Favorites
                  </div>
                ) : (
                  <div className='flex flex-row'>
                    <StarIcon className='mr-1 h-4 w-4 self-center' /> Add to
                    Favorites
                  </div>
                )}
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
