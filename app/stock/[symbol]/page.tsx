import ky from 'ky';
import { DailyOpenClose } from '@/lib/types';
import { PriceCard } from '@/components/price-card';
import { StockCard } from '@/components/stock-card';
import { fetchPolygonData } from '@/lib/utils/api';
import { ITickerDetails } from '@polygon.io/client-js';

interface StockDetailProps {
  params: {
    symbol: string;
  };
}

async function StockDetail({ params }: StockDetailProps) {
  const stockOpenClose = await fetchDailyStockData(params['symbol'] as string);
  const stockDetails = await fetchStockDetails(params['symbol'] as string);

  if (!stockOpenClose) {
    return <div>Loading...</div>;
  }

  if ('error' in stockOpenClose) {
    return (
      <div className='min-w-screen align-middlemt-2 flex min-h-screen flex-col items-center justify-center justify-items-center overflow-hidden bg-background bg-red-500 p-1 text-xl text-red-100'>
        {stockOpenClose.error}
      </div>
    );
  }

  const symbol = stockOpenClose.symbol;
  const currentPrice = stockOpenClose.open;
  const highPrice = stockOpenClose.high;
  const lowPrice = stockOpenClose.low;
  const openPrice = stockOpenClose.open;
  const previousClosePrice = stockOpenClose.close;
  const volume = stockOpenClose.volume;
  const companyName = stockDetails.results?.name ?? '';

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-center justify-items-center bg-background align-middle'>
      <div className='max-w-[280px]'>
        {/* <PriceCard {...stockData} /> */}
        <StockCard
          data={{
            symbol,
            companyName,
            currentPrice,
            highPrice,
            lowPrice,
            openPrice: 0,
            previousClosePrice,
            volume,
          }}
        />
      </div>
    </div>
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
