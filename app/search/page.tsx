import Search from '@/components/search-symbol';
import { Text } from '@/components/text';
import { Label } from '@/components/ui/label';
import ky from 'ky';
import { SearchResult } from '@/lib/types';
import { ArrowDown, Dot } from 'lucide-react';
import { SearchResults } from '@/components/search-results';
import { ITickerDetails, restClient } from '@polygon.io/client-js';
import StockList from '@/components/stock-list';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/pagination';

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
    term: searchParams.query as string,
    cursor: (searchParams?.cursor ?? null) as string | null,
  });

  const searchResultDetails =
    (await fetchSearchResultDetails(
      (searchResults?.results ?? []).map((result) => result.ticker)
    )) || null;

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-center justify-items-center overflow-hidden bg-background align-middle'>
      <div className='mb-4 w-full text-center'>
        <Label htmlFor='terms' className='text-3xl'>
          Search Stocks by Symbol
        </Label>
      </div>

      <div className='flex max-h-[calc(100vh-120px)] w-full flex-col self-center overflow-y-scroll px-8 py-8'>
        <Search placeholder={'Eg. META'} />
        <StockList stocks={searchResultDetails} />
      </div>
      <Pagination
        cursor={
          searchResults?.next_url != null
            ? new URL(searchResults?.next_url ?? '').searchParams.get('cursor')
            : null
        }
        url={searchResults?.next_url ?? null}
      />
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
  const apiClient = restClient(process.env.POLYGON_API_KEY);

  if (!term) {
    return null;
  }

  if (term.length < 2) {
    return null;
  }

  try {
    const searchResults = await apiClient.reference.tickers(
      cursor != null
        ? {
            search: term,
            marketType: 'stocks',
            limit: 5,
            cursor,
          }
        : {
            search: term,
            marketType: 'stocks',
            limit: 5,
          },
      {
        pagination: true,
      }
    );

    return searchResults;
  } catch (error: Error | any) {
    console.error(error);
  }
};

const fetchSearchResultDetails = async (tickers: string[]) => {
  const apiClient = restClient(
    process.env.POLYGON_API_KEY,
    process.env.POLYGON_API_URL,
    {
      headers: {
        Authorozation: `Bearer ${process.env.POLYGON_API_KEY}`,
      },
    }
  );

  try {
    const promiseArray = tickers.map((ticker) =>
      apiClient.reference.tickerDetails(ticker)
    );
    const searchResults = await Promise.all(promiseArray);
    console.log(
      '🚀 ~ fetchSearchResultDetails ~ searchResults:',
      searchResults
    );
    return searchResults;
  } catch (error: Error | any) {
    console.error(error);
  }
};
