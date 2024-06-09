'use client';

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
import {
  IAggsGroupedDaily,
  ITickerDetails,
  ITickers,
} from '@polygon.io/client-js';
import Search from '@/src/components/search-symbol';
import { StockListItem } from '@/src/components/stock-list/stock-list-item';
import { Fragment } from 'react';
import { ValuesType } from 'utility-types';
import { ITickerResult } from '@/src/lib/types';

interface StockListProps {
  metadata: ITickerResult[] | null;
  prices: IAggsGroupedDaily | null;
}

export const StockListView = ({
  metadata: stocks,
  prices: dailyStats,
}: StockListProps) => {
  if (stocks == null || dailyStats == null) {
    return <div className='mt-8 text-center'>No results</div>;
  }

  return (
    <Card className='my-8 pb-8'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>Stocks</CardTitle>
        </div>
        <CardDescription>
          Search for stocks and see their details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className='max-h-[calc(50%-120px)] overflow-y-scroll'>
          <TableHeader>
            <TableRow>
              <TableHead className='hidden w-[24px] sm:table-cell'>
                <span className='sr-only'>Symbol</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Low</TableHead>
              <TableHead className='hidden md:table-cell'>High</TableHead>
              <TableHead className='hidden md:table-cell'>VW Avg.</TableHead>
              <TableHead className='hidden md:table-cell'>Volume</TableHead>
              <TableHead>
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='overflow-y-scroll'>
            {(stocks ?? [])
              .filter((stock) => {
                const hasPriceData = dailyStats?.results?.find(
                  (price) =>
                    price['T']?.toLocaleUpperCase() ===
                    stock?.ticker?.toLocaleUpperCase()
                );

                return hasPriceData;
              })
              .map((stock: ITickerResult) => (
                <Fragment key={stock?.ticker}>
                  <StockListItem
                    metadata={stock}
                    prices={
                      (dailyStats?.results ?? []).find(
                        (stat) => stat.T === stock?.ticker
                      ) ?? null
                    }
                  />
                </Fragment>
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
};
