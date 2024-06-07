'use client'; // Error components must be Client Components

import { Button } from '@/src/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <div className='min-w-screen mt-2 flex min-h-screen flex-col items-center justify-center justify-items-center overflow-hidden bg-background bg-red-500 p-1 px-8 align-middle text-xl text-red-100'>
        <h1 className='text-3xl'>Something went wrong</h1>
        <div className='mt-8 rounded-md bg-red-100 p-4 text-foreground'>
          <p className='mx-auto mt-2 max-w-[400px] text-center text-lg'>
            {error.message}
          </p>

          <p className='mx-auto mt-2 max-w-[400px] text-center text-lg'>
            <span>Digest | </span> {error.digest}
          </p>
        </div>

        <Button
          variant='secondary'
          className='mt-4 justify-center text-lg font-semibold text-foreground'
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </>
  );
}
