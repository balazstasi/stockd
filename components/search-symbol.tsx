'use client';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const SearchSymbol = () => {
  const [symbol, setSymbol] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(e.target.value);
  };

  return (
    <div className='flex w-full max-w-[240px] items-center'>
      <Input
        type='text'
        placeholder='🔎 Search Symbol'
        className='h-10 w-full'
      />
    </div>
  );
};
