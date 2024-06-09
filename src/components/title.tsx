'use client';
import { Label } from '@radix-ui/react-label';
import { usePathname } from 'next/navigation';

interface TitleProps {
  label?: string;
}
export const Title = ({ label }: TitleProps) => {
  const labelFromPath = usePathname().replace('/', '');

  const title =
    label ?? labelFromPath.charAt(0).toUpperCase() + labelFromPath.slice(1);

  return (
    <div className='mt-32 w-full text-center'>
      <Label className='text-3xl'>{title}</Label>
    </div>
  );
};
