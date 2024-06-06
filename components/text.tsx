import { Label } from '@/components/ui/label';

interface TextProps {
  label: string;
}
export function Text({ label }: TextProps) {
  return (
    <div>
      <div className='flex items-center space-x-2'>
        <Label htmlFor='terms'>{label}</Label>
      </div>
    </div>
  );
}
