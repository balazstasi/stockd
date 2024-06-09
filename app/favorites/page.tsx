import { FavoriteTickers } from '@/src/components/favorite-tickers';
import { ITickerAggsGroupedDaily } from '@/src/lib/types';
import { fetchPolygonData } from '@/src/lib/utils/api';

export default async function Favorites() {
  const stockListBarsGroupedDaily = await fetchStockListGroupedDaily();

  const increasesForTickers = stockListBarsGroupedDaily?.results?.map(
    (result) => {
      return {
        dailyChange:
          result && result.c && result.o ? result.c - result.o : null,
        ticker: result?.T,
      };
    }
  );

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <FavoriteTickers dailyChanges={increasesForTickers} />
    </div>
  );
}

const fetchStockListGroupedDaily = async () => {
  const YESTERDAY = new Date(Date.now() - 24 * 60 * 60 * 1000 * 2);
  const YESTERDAY_STR = YESTERDAY.toISOString().split('T')[0];

  const stockListBarsGroupedDaily = fetchPolygonData<{
    results: ITickerAggsGroupedDaily[];
  }>({
    endpoint: `v2/aggs/grouped/locale/us/market/stocks/${YESTERDAY_STR}`,
    params: {
      adjusted: true,
    },
    apiKey: process.env.POLYGON_API_KEY as string,
  });

  return stockListBarsGroupedDaily;
};
