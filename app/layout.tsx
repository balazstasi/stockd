import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/src/lib/utils/cn';
import { NavigationMenu } from '@/src/components/navigation-menu';
import { Title } from '@/src/components/title';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'dark:bg-background-dark min-h-[calc(100vh-120px)] overflow-x-hidden overflow-y-hidden bg-background font-sans antialiased lg:overflow-hidden',
          fontSans.variable
        )}
      >
        <div>
          <NavigationMenu />
        </div>
        <div className='w-full overflow-hidden bg-background px-4'>
          <Title />

          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
