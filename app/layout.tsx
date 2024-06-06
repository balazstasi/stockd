import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { NavigationMenu } from '@/components/navigation-menu';

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
          'min-h-screen overflow-hidden font-sans antialiased',
          fontSans.variable
        )}
      >
        <div>
          <NavigationMenu />
        </div>
        {children}
      </body>
    </html>
  );
}
