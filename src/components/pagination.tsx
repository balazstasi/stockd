'use client';
import { Button } from '@/src/components/ui/button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface PaginationProps {
  cursor: string | null;
  url: string | null;
}
export const Pagination = ({ cursor, url }: PaginationProps) => {
  const [prevCursors, setPrevCursors] = useState<string[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(
    cursor ?? new URL(url ?? '').searchParams.get('cursor')
  );
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleNext = () => {
    if (nextCursor) {
      setPrevCursors([...prevCursors, nextCursor as string]);
      const params = new URLSearchParams(searchParams);
      params.set('cursor', nextCursor);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const handlePrev = () => {
    if (prevCursors.length > 0) {
      const prevCursor = prevCursors.pop() as string;
      console.log('🚀 ~ handlePrev ~ prevCursor:', prevCursor);
      setPrevCursors(prevCursors);
      const params = new URLSearchParams(searchParams);
      params.set('cursor', prevCursor);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <>
      <Button
        variant='default'
        size='lg'
        onClick={handlePrev}
        disabled={prevCursors.length === 0}
      >
        Prev
      </Button>

      <Button
        variant='default'
        size='lg'
        onClick={handleNext}
        disabled={nextCursor === prevCursors[prevCursors.length - 1]}
      >
        Next
      </Button>
    </>
  );
};
