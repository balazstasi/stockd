import Search from '@/components/search-symbol';
import { Text } from '@/components/text';
import { Label } from '@/components/ui/label';
import ky from 'ky';
import { SearchResult } from '@/lib/types';
import { ArrowDown } from 'lucide-react';
import { SearchResults } from '@/components/search-results';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  searchResults: { results: SearchResult[]; error: null } | { results: null };
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  let searchResults = { results: [], error: null } as
    | { results: null; error: string | null }
    | { results: SearchResult[]; error: null }
    | null;
  searchResults = (await fetchSearchTerm(searchParams.query as string)) || null;

  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-center justify-items-center overflow-hidden bg-background align-middle'>
      <div className='mb-4 w-full text-center'>
        <Label htmlFor='terms' className='text-xl'>
          Search Stocks by Symbol
        </Label>
      </div>
      <div className='w-full px-4 sm:w-[300px]'>
        <Search placeholder={'Eg. META'} />
      </div>
      <div className='sm:w-max-[300px] w-full px-4 sm:px-0'>
        <div
          className={`no-scrollbar mt-4 h-[400px] w-full overflow-scroll rounded-t-md ${(searchResults.results ?? []).length < 15 ? 'rounded-b-md' : ''} bg-zinc-200`}
        >
          <SearchResults results={searchResults?.results ?? null} />
          {searchResults?.error && (
            <div className='flex w-full self-center px-4 align-middle sm:max-w-[300px] sm:px-0'>
              <div className='mt-2 w-full rounded-md bg-red-500 p-1 text-xl text-red-100 sm:max-w-[300px] sm:px-0'>
                {searchResults?.error}
              </div>
            </div>
          )}
        </div>
        {(searchResults?.results ?? [])?.length > 15 && (
          <div className='flex w-full justify-center justify-items-center rounded-b-md bg-zinc-200 px-4 py-2 text-center align-middle sm:w-[300px] sm:px-0'>
            <ArrowDown className='h-4 w-4 self-center text-center align-middle' />
          </div>
        )}
      </div>
    </div>
  );
}

const fetchSearchTerm = async (
  term: string
): Promise<
  | { results: SearchResult[]; error: null }
  | { results: null; error: string | null }
> => {
  const API_KEY = process.env.POLYGON_API_KEY;
  const API_URL = process.env.POLYGON_API_URL;
  const API_FUNCTION = 'v3/reference/tickers';

  const REQ_URL = new URL(`${API_URL}/${API_FUNCTION}`);

  REQ_URL.searchParams.append('search', term);
  REQ_URL.searchParams.append('apiKey', API_KEY!);
  REQ_URL.searchParams.append('sort', 'name');
  REQ_URL.searchParams.append('order', 'asc');
  try {
    const response: { results: SearchResult[] } = await ky
      .get(REQ_URL, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        cache: 'force-cache',
      })
      .json();

    return { ...response, error: null };
  } catch (error) {
    return {
      results: null,
      error:
        'Maximum 5 requests are allowed per minute. Please try again later',
    };
  }

  return { results: null, error: '' };
};
