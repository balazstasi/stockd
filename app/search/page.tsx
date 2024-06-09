import {
  IAggsGroupedDaily,
  ITickerDetails,
  ITickers,
} from '@polygon.io/client-js';

import { fetchPolygonData, fetchPolygonListData } from '@/src/lib/utils/api';
import { StockList } from '@/src/components/stock-list/stock-list';

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
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searches = await fetchSearchTerm({
    term: (searchParams?.query ?? '') as string,
    cursor: (searchParams?.cursor ?? null) as string | null,
  });

  const dailyStats = await fetchStockListGroupedDaily();
  console.log('🚀 ~ SearchPage ~ dailyStats:', dailyStats);

  return (
    <div>
      <div className='flex min-w-full flex-col items-center justify-center justify-items-center overflow-hidden bg-background align-middle'>
        <div className='flex max-h-[calc(100vh-120px)] w-full flex-col self-center overflow-y-scroll px-2 lg:px-8 lg:py-8'>
          <StockList
            stocks={searches?.results?.results ?? null}
            dailyStats={dailyStats}
          />
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
          // limit: 10, // TODO: optional, if we want pagination ?
        }
      : {
          search: term,
          cursor: cursor,
        },
    apiKey: process.env.POLYGON_API_KEY as string,
  });

  const tickerList = searchResults?.results
    ?.map((res) => res?.ticker ?? null)
    .filter(Boolean) as string[];

  if (!tickerList || tickerList.length === 0) {
    return { results: null, details: null, dailyStats: null };
  }

  return { results: searchResults, details: null, dailyStats: null };
};

const fetchStockListGroupedDaily = async () => {
  const YESTERDAY = new Date(Date.now() - 24 * 60 * 60 * 1000 * 2);
  const YESTERDAY_STR = YESTERDAY.toISOString().split('T')[0];

  const stockListBarsGroupedDaily = fetchPolygonData<IAggsGroupedDaily>({
    endpoint: `v2/aggs/grouped/locale/us/market/stocks/${YESTERDAY_STR}`,
    params: {
      adjusted: true,
    },
    apiKey: process.env.POLYGON_API_KEY as string,
  });

  return stockListBarsGroupedDaily;
};
