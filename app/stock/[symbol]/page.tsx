import ky from 'ky';
import { DailyOpenClose } from '@/lib/types';
import { StockCard } from '@/components/stock-card';
import { fetchPolygonData } from '@/lib/utils/api';
import { ITickerDetails } from '@polygon.io/client-js';
import { Suspense } from 'react';

interface StockDetailProps {
  params: {
    symbol: string;
  };
}

async function StockDetail({ params }: StockDetailProps) {
  const stockOpenClose = await fetchDailyStockData(params['symbol'] as string);
  const stockDetails = await fetchStockDetails(params['symbol'] as string);

  if (stockOpenClose && 'error' in stockOpenClose) {
    return (
      <div className='min-w-screen align-middlemt-2 flex min-h-screen flex-col items-center justify-center justify-items-center overflow-hidden bg-background bg-red-500 p-1 text-xl text-red-100'>
        {stockOpenClose.error}
      </div>
    );
  }

  const symbol = stockOpenClose?.symbol ?? '';
  const currentPrice = stockOpenClose?.open ?? 0;
  const highPrice = stockOpenClose?.high ?? 0;
  const lowPrice = stockOpenClose?.low ?? 0;
  const openPrice = stockOpenClose?.open ?? 0;
  const previousClosePrice = stockOpenClose?.close ?? 0;
  const volume = stockOpenClose?.volume ?? 0;
  const companyName = stockDetails.results?.name ?? '';

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='min-w-screen flex min-h-screen flex-col items-center justify-center justify-items-center bg-background align-middle'>
        <StockCard
          data={{
            symbol,
            companyName,
            currentPrice,
            highPrice,
            lowPrice,
            openPrice,
            previousClosePrice,
            volume,
          }}
        />
      </div>
    </Suspense>
  );
}

const fetchDailyStockData = async (
  symbol: string
): Promise<DailyOpenClose | null | { error: string }> => {
  const YESTERDAY = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const API_FUNCTION = `v1/open-close/${symbol}/${YESTERDAY}`;

  const response = await fetchPolygonData<
    DailyOpenClose | null | { error: string }
  >({
    endpoint: API_FUNCTION,
    params: { adjusted: true },
    apiKey: process.env.POLYGON_API_KEY as string,
  });

  return response;
};

const fetchStockDetails = async (symbol: string) => {
  const response = await fetchPolygonData<ITickerDetails>({
    endpoint: `v3/reference/tickers/${symbol}`,
    apiKey: process.env.POLYGON_API_KEY as string,
  });

  return response;
};

export default StockDetail;
