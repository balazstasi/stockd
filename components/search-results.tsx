'use client';
import { ITickers } from '@polygon.io/client-js';
import { useRouter } from 'next/navigation';

interface SearchResultProps {
  results: ITickers['results'] | null;
}
export const SearchResults = ({ results }: SearchResultProps) => {
  const navigation = useRouter();
  return (
    <>
      {(results ?? [])?.map((result: ITickers['results'][number]) => (
        <div
          key={result.ticker}
          className='rounded-md px-2 py-2 hover:cursor-pointer hover:bg-zinc-300 hover:text-zinc-900'
          onClick={() => {
            navigation.push(`/stock/${result.ticker}`);
          }}
        >
          <div className='flex'>
            <p className='rounded-md bg-zinc-300 p-1 text-xs font-semibold text-zinc-700 hover:cursor-pointer'>
              {result.ticker}
            </p>
            <p className='overflow-hidden truncate overflow-ellipsis p-1 align-middle text-xs'>
              {result.name}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
