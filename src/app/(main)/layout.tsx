'use client';

import BottomBar from '@/components/BottomBar';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { cn } from '@/lib/utils';
import { useTheme } from '@/stores/useTheme';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { dark } = useTheme();
  return (
    <div
      className={cn('relative flex h-full w-screen flex-col', {
        dark: dark,
      })}
    >
      <NavBar />
      <main className="min-h-[calc(100vh-64px)] w-screen flex-1 overflow-x-hidden overflow-y-scroll bg-common-minimal">
        {children}
      </main>
      <Footer />
      <BottomBar />
    </div>
  );
}
