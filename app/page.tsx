import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between bg-background p-24'>
      <div>
        <Button size='lg' className='bg-foreground text-xl text-background'>
          Test Button
        </Button>
      </div>
    </main>
  );
}
