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
    <div className='sticky w-full pt-16 text-center lg:pt-24'>
      <Label className='text-3xl'>{title}</Label>
    </div>
  );
};
