'use client';
import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { ITickerDetails } from '@polygon.io/client-js';
import Search from '@/src/components/search-symbol';
import Link from 'next/link';
import { useStore } from 'zustand';
import { useFavorites } from '@/src/store/favorites';

interface StockListProps {
  stocks: Array<ITickerDetails> | null;
}
export default function StockList({ stocks }: StockListProps) {
  return (
    <Card className='pb-8'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>Stocks</CardTitle>
          <div className='hidden md:block'>
            <Search placeholder={'Eg. META'} />
          </div>
        </div>
        <CardDescription>
          Search for stocks and see their details
        </CardDescription>
        <div className='w-full md:hidden'>
          <Search placeholder={'Eg. META'} />
        </div>
      </CardHeader>
      <CardContent>
        <Table className='max-h-[calc(50%-120px)] overflow-y-scroll'>
          <TableHeader>
            <TableRow>
              <TableHead className='hidden w-[100px] sm:table-cell'>
                <span className='sr-only'>Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='hidden md:table-cell'>Market</TableHead>
              <TableHead className='hidden md:table-cell'>
                Description
              </TableHead>
              <TableHead className='hidden md:table-cell'>List Date</TableHead>
              <TableHead>
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='overflow-y-scroll'>
            {stocks?.map((stock) => (
              <StockRow key={stock?.results?.ticker} stock={stock.results} />
            )) ?? (
              <div className='text-md w-full pt-4 text-muted-foreground'>
                No results
              </div>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const StockRow = ({ stock }: { stock: ITickerDetails['results'] }) => {
  const { tickers, addFavorite } = useStore(useFavorites, (s) => ({
    tickers: s.tickers,
    addFavorite: s.addTicker,
  }));

  return (
    <TableRow>
      <TableCell className='hidden sm:table-cell'>
        <div className='rounded-md bg-foreground p-1 text-center font-semibold text-background'>
          {stock?.ticker?.toUpperCase()}
        </div>
      </TableCell>
      <TableCell className='font-medium'>{stock?.name}</TableCell>
      <TableCell>
        <Badge
          variant='outline'
          className={
            stock?.active
              ? 'bg-green-400 text-background'
              : 'bg-destructive text-background'
          }
        >
          {stock?.active ? 'ACTIVE' : 'INACTIVE'}
        </Badge>
      </TableCell>
      <TableCell className='hidden md:table-cell'>{stock?.active}</TableCell>

      <TableCell className='hidden md:table-cell'>
        <p className='line-clamp-[10]'>
          {stock?.description ?? 'No description'}
        </p>
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        {stock?.list_date ?? 'Unknown'}
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
            <Link href={`/stock/${stock?.ticker}`}>
              <DropdownMenuItem>
                <Button variant='ghost'>📈 Go To Stock Page</Button>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <Button
                variant='ghost'
                onClick={() => {
                  if (stock?.ticker && !tickers.includes(stock?.ticker)) {
                    addFavorite(stock?.ticker);
                  }
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
