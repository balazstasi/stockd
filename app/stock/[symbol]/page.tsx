import { StockDetails } from '@/src/components/stock-details';
import { ITickerAggsGroupedDaily } from '@/src/lib/types';
import { fetchPolygonData } from '@/src/lib/utils/api';

import { Suspense } from 'react';

interface StockDetailProps {
  params: {
    symbol: string;
  };
}

async function StockDetail({ params }: StockDetailProps) {
  const details = await fetchStockDetails(params.symbol);
  const stockOpenClose = await fetchOpenClose(params.symbol);
  const aggs = await fetchStockListGroupedDaily();
  const bars = await fetchStockAggregateBars();

  const symbol = stockOpenClose?.symbol ?? '';
  const currentPrice = stockOpenClose?.open ?? 0;
  const highPrice = stockOpenClose?.high ?? 0;
  const lowPrice = stockOpenClose?.low ?? 0;
  const openPrice = stockOpenClose?.open ?? 0;
  const previousClosePrice = stockOpenClose?.close ?? 0;
  const volume = stockOpenClose?.volume ?? 0;
  const companyName = details?.results?.name ?? '';

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='flex min-h-screen w-full flex-col items-center justify-center justify-items-center bg-background px-4 align-middle'>
        <StockDetails
          name={details?.results?.name}
          symbol={symbol}
          companyName={companyName}
          bars={bars}
          price={{
            currentPrice,
            highPrice,
            lowPrice,
            openPrice,
            previousClosePrice,
            volume,
          }}
        />
        {/* <StockCard
          data={{
            symbol,
            companyName,
            currentPrice,s
            highPrice,
            lowPrice,
            openPrice,
            previousClosePrice,
            volume,
          }}
        /> */}
      </div>
    </Suspense>
  );
}

const fetchStockDetails = async (symbol: string) => {
  const response = await fetchPolygonData<any>({
    endpoint: `v3/reference/tickers/${symbol}`,
    apiKey: process.env.POLYGON_API_KEY as string,
  });

  return response;
};

const fetchOpenClose = async (symbol: string) => {
  const LAST_CLOSE_DAY = new Date(Date.now() - 24 * 60 * 60 * 1000 * 2)
    .toISOString()
    .split('T')[0];

  const response = await fetchPolygonData<any>({
    endpoint: `v1/open-close/${symbol}/${LAST_CLOSE_DAY}`,
    apiKey: process.env.POLYGON_API_KEY as string,
  });

  return response;
};

const fetchStockListGroupedDaily = async () => {
  const YESTERDAY = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const YESTERDAY_STR = YESTERDAY.toISOString().split('T')[0];
  const stockListBarsGroupedDaily = fetchPolygonData<any>({
    endpoint: `v2/aggs/grouped/locale/us/market/stocks/${YESTERDAY_STR}`,
    params: {
      adjusted: true,
    },
    apiKey: process.env.POLYGON_API_KEY as string,
  });

  return stockListBarsGroupedDaily;
};

const fetchStockAggregateBars = async () => {
  const ONE_MONTH_AGO = new Date(Date.now() - 24 * 60 * 60 * 1000 * 30);
  const ONE_MONTH_AGO_STR = ONE_MONTH_AGO.toISOString().split('T')[0];
  const TWO_DAYS_AGO = new Date(Date.now() - 24 * 60 * 60 * 1000 * 2);
  const TWO_DAYS_AGO_STR = TWO_DAYS_AGO.toISOString().split('T')[0];

  const stockListBarsGroupedDaily = fetchPolygonData<ITickerAggsGroupedDaily[]>(
    {
      endpoint: `v2/aggs/ticker/AAPL/range/1/day/${ONE_MONTH_AGO_STR}/${TWO_DAYS_AGO_STR}`,
      params: {
        adjusted: true,
      },
      apiKey: process.env.POLYGON_API_KEY as string,
    }
  );

  return stockListBarsGroupedDaily;
};

export default StockDetail;
