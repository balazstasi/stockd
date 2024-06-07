import Search from '@/src/components/search-symbol';
import { Text } from '@/src/components/text';
import { Label } from '@/src/components/ui/label';
import ky from 'ky';
import { SearchResult } from '@/src/lib/types';
import { ArrowDown, Dot } from 'lucide-react';
import { SearchResults } from '@/src/components/search-results';
import {
  IDailyOpenClose,
  ITickerDetails,
  ITickers,
  restClient,
} from '@polygon.io/client-js';
import StockList from '@/src/components/stock-list';
import { Button } from '@/src/components/ui/button';
import { Pagination } from '@/src/components/pagination';
import { fetchPolygonData } from '@/src/lib/utils/api';

import('@polygon.io/client-js').then(({ restClient }) => {
  const globalFetchOptions = {
    trace: true,
  };
  const rest = restClient(
    process.env.POLYGON_API_KEY,
    'https://api.polygon.io',
    globalFetchOptions
  );
  rest.stocks
    .aggregates('TSLA', 1, 'minute', '2023-08-01', '2023-08-01', {
      limit: 50000,
    })
    .then((data: any) => {
      const resultCount = data.length;
      console.log('Result count:', resultCount);
    })
    .catch((e) => {
      console.error('An error happened:', e);
    });
});

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  searchResults: { results: SearchResult[]; error: null } | { results: null };
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchResults = await fetchSearchTerm({
    term: (searchParams?.query ?? '') as string,
    cursor: (searchParams?.cursor ?? null) as string | null,
  });

  console.log('🚀 ~ SearchPage ~ searchResults:', searchResults);

  return (
    <div>
      <div className='sticky my-4 w-full text-center'>
        <Label htmlFor='terms' className='text-3xl'>
          Search Stocks by Symbol
        </Label>
      </div>
      <div className='min-w-screen flex flex-col items-center justify-center justify-items-center overflow-hidden bg-background align-middle'>
        <div className='flex max-h-[calc(100vh-120px)] w-full flex-col self-center overflow-y-scroll px-2 lg:px-8 lg:py-8'>
          <StockList stocks={searchResults?.results ?? null} />
          {/* <Pagination
          cursor={
            searchResults?.next_url != null
              ? new URL(searchResults?.next_url ?? '').searchParams.get(
                  'cursor'
                )
              : null
          }
          url={searchResults?.next_url ?? null}
        /> */}
        </div>
      </div>
    </div>
  );
}

const fetchSearchTerm = async ({
  term,
  cursor,
}: {
  term: string;
  cursor: string | null;
}) => {
  if (!term || term === '') {
    return;
  }

  const searchResults = await fetchPolygonData<{
    results: ITickers['results'] | null;
    next_url: string | null;
  }>({
    endpoint: 'v3/reference/tickers',
    params: !cursor
      ? {
          search: term,
          limit: 10,
        }
      : {
          search: term,
          cursor: cursor,
          limit: 10,
        },
    apiKey: process.env.POLYGON_API_KEY as string,
  });

  const tickerList = searchResults?.results
    ?.map((res) => res?.ticker ?? null)
    .filter(Boolean) as string[];

  if (!tickerList || tickerList.length === 0) {
    return null;
  }

  const searchResultStockDetails = await fetchSearchResultDetails(tickerList);
  // const stockListDailyOpenClose =
  //   await fetchStockListDailyOpenClose(tickerList);

  return {
    results: searchResultStockDetails,
    // dailyOpenClose: stockListDailyOpenClose,
    next_url: searchResults?.next_url ?? null,
  };
};

const fetchSearchResultDetails = async (tickers: string[]) => {
  if (!tickers || tickers.length === 0) {
    return null;
  }

  console.log('🚀 ~ fetchSearchResultDetails ~ tickers:', tickers);

  const searchResults = await Promise.all(
    tickers.map((ticker) =>
      fetchPolygonData<ITickerDetails>({
        endpoint: `v3/reference/tickers/${ticker}`,
        apiKey: process.env.POLYGON_API_KEY as string,
      })
    )
  );

  console.log('🚀 ~ fetchSearchResultDetails ~ searchResults:', searchResults);
  return searchResults;
};

const fetchStockListDailyOpenClose = async (tickers: string[]) => {
  const YESTERDAY = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const dailyOpenCloseList = await Promise.all(
    tickers.map((ticker) =>
      fetchPolygonData<IDailyOpenClose>({
        endpoint: `v1/open-close/${ticker}/${YESTERDAY}`,
        apiKey: process.env.POLYGON_API_KEY as string,
      })
    )
  );

  return dailyOpenCloseList;
};
