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
import { MoreHorizontal } from 'lucide-react';
import { ValuesType } from 'utility-types';

type ITickerResult = ValuesType<ITickers['results']>;
export const StockListItem = ({
  metadata,
  prices,
}: {
  metadata: ITickerResult;
  prices: IAggsGroupedDaily['results'][number] | null;
}) => {
  const { addFavorite } = useStore(useFavorites, ({ addTicker }) => ({
    addFavorite: addTicker,
  }));

  if (metadata == null || prices == null) {
    return <div>No data</div>;
  }

  return (
    <TableRow>
      <TableCell className='hidden sm:table-cell'>
        <div className='w-20 rounded-md bg-foreground p-1 text-center font-semibold text-background'>
          {metadata.ticker?.toUpperCase()}
        </div>
      </TableCell>
      <TableCell className='font-medium'>{metadata.name}</TableCell>
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
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup='true' size='icon' variant='ghost'>
              <MoreHorizontal className='h-4 w-4' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <Link href={`/stock/${metadata.ticker}`}>
              <DropdownMenuItem>
                <Button variant='ghost'>📈 Go To Stock Page</Button>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Button
                variant='ghost'
                onClick={() => {
                  if (metadata.ticker == null) {
                    return;
                  }

                  addFavorite(metadata.ticker);
                }}
              >
                ⭐︎ Add to Favorites
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
