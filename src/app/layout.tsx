import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { Toaster } from 'react-hot-toast';

import { ReactQueryClientProvider } from '@/api/ReactQueryClientProvider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SciCommons',
  description: 'A portal for anonymous peer reviews',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader showSpinner={false} color="#64e466" shadow={false} />
          {children}
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
