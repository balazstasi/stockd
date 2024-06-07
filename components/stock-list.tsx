import Image from 'next/image';
import { CircleDollarSignIcon, MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DailyOpenClose, SearchResult } from '@/lib/types';
import { ITickerDetails } from '@polygon.io/client-js';

interface StockListProps {
  stocks: Array<ITickerDetails> | null;
}
export default function StockList({ stocks }: StockListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stocks</CardTitle>
        <CardDescription>
          Search for stocks and see their details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='hidden w-[100px] sm:table-cell'>
                <span className='sr-only'>Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='hidden md:table-cell'>Price</TableHead>
              <TableHead className='hidden md:table-cell'>Ticker</TableHead>
              <TableHead className='hidden md:table-cell'>List Date</TableHead>
              <TableHead>
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='overflow-y-scroll'>
            {stocks?.map((stock) => (
              <StockRow key={stock?.results?.ticker} stock={stock.results} />
            )) ?? <div className='w-full'>No results</div>}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className='text-xs text-muted-foreground'>
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}

const StockRow = ({ stock }: { stock: ITickerDetails['results'] }) => {
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
        {stock?.ticker?.toUpperCase()}
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
