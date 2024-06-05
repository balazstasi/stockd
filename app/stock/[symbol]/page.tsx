import ky from 'ky';
import { DailyOpenClose } from '@/lib/types';
import { PriceCard } from '@/components/price-card';

interface StockDetailProps {
  params: {
    symbol: string;
  };
}

async function StockDetail({ params }: StockDetailProps) {
  // const stockData = await fetchDailyStockData(params['symbol'] as string);

  // if (!stockData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-center justify-items-center bg-background align-middle'>
      <div className='w-[240px]'>
        <PriceCard
          high={1200}
          low={1100}
          open={1134}
          close={1200}
          volume={4000}
          symbol={params.symbol}
        />
        ;
      </div>
    </div>
  );
}

const fetchDailyStockData = async (
  symbol: string
): Promise<DailyOpenClose | null> => {
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
    console.error(error);
  }

  return null;
};

export default StockDetail;
