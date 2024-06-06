import Search from '@/components/search-symbol';
import { Text } from '@/components/text';
import ky from 'ky';

export default async function SearchPage({
  params,
}: {
  params: { symbol: string };
}) {
  console.log(params.symbol);
  // const searchResults = await fetchSearchTerm(params.symbol);
  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-center justify-items-center bg-background align-middle'>
      <Text label='Search' />
      <Search placeholder={''} />
    </div>
  );
}

interface SearchResult {}
const fetchSearchTerm = async (
  term: string
): Promise<SearchResult[] | null> => {
  console.log('🚀 ~ fetchSearchTerm ~ term', term);
  const API_KEY = process.env.POLYGON_API_KEY;
  const API_URL = process.env.POLYGON_API_URL;
  const API_FUNCTION = 'v3/reference/tickers';

  const REQ_URL = new URL(`${API_URL}/${API_FUNCTION}`);

  REQ_URL.searchParams.append('search', term);
  REQ_URL.searchParams.append('apiKey', API_KEY!);
  REQ_URL.searchParams.append('sort', 'name');
  REQ_URL.searchParams.append('order', 'asc');
  console.log(REQ_URL);
  try {
    const response: SearchResult[] = await ky
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
