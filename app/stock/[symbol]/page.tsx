import ky from 'ky';
import { DailyOpenClose } from '@/lib/types';
import { PriceCard } from '@/components/price-card';

interface StockDetailProps {
  params: {
    symbol: string;
  };
}

async function StockDetail({ params }: StockDetailProps) {
  const stockData = await fetchDailyStockData(params['symbol'] as string);

  if (!stockData) {
    return <div>Loading...</div>;
  }

  if ('error' in stockData) {
    return (
      <div className='min-w-screen align-middlemt-2 flex min-h-screen flex-col items-center justify-center justify-items-center overflow-hidden bg-background bg-red-500 p-1 text-xl text-red-100'>
        {stockData.error}
      </div>
    );
  }

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-center justify-items-center bg-background align-middle'>
      <div className='w-[240px]'>
        <PriceCard {...stockData} />
      </div>
    </div>
  );
}

const fetchDailyStockData = async (
  symbol: string
): Promise<DailyOpenClose | null | { error: string }> => {
  const API_KEY = process.env.POLYGON_API_KEY;
  const API_URL = process.env.POLYGON_API_URL;
  const API_FUNCTION = 'open-close';
  const YESTERDAY = new Date(Date.now() - 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const REQ_URL = new URL(
    `${API_URL}/v1/${API_FUNCTION}/${symbol.toUpperCase()}/${YESTERDAY}`
  );

  REQ_URL.searchParams.append('adjusted', 'true');
  REQ_URL.searchParams.append('apiKey', API_KEY!);

  try {
    const response: DailyOpenClose = await ky
      .get(REQ_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .json();
    return response;
  } catch (error) {
    return { error: 'Maximum 5 requests per mimute. Please try again later.' };
  }

  return null;
};

export default StockDetail;
