'use client';

import React, { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { IconArticle, IconHomeFilled, IconNotebook, IconUsersGroup } from '@tabler/icons-react';

import { cn } from '@/lib/utils';

const BottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');

  const navLinks = [
    { name: 'Articles', icon: <IconArticle /> },
    { name: 'Posts', icon: <IconNotebook /> },
    { name: 'Communities', icon: <IconUsersGroup /> },
    { name: 'Home', icon: <IconHomeFilled /> },
  ];

  useEffect(() => {
    switch (true) {
      case pathname.includes('articles') || pathname.includes('article'):
        setActiveTab('Articles');
        break;
      case pathname.includes('posts') || pathname.includes('post'):
        setActiveTab('Posts');
        break;
      case pathname.includes('communities') || pathname.includes('community'):
        setActiveTab('Communities');
        break;
      default:
        setActiveTab('Home');
    }
  }, [pathname]);

  return (
    <main className="fixed bottom-0 left-0 grid h-16 w-screen grid-cols-4 border-t border-common-minimal bg-common-cardBackground md:hidden">
      {navLinks.map((link, index) => (
        <div
          key={index}
          className={cn('flex flex-col items-center justify-center', {
            'border-t-2 border-functional-green/70 bg-gradient-to-b from-functional-green/10 to-transparent text-functional-green':
              link.name === activeTab,
            'text-text-secondary': link.name !== activeTab,
          })}
          onClick={() => router.push(`/${link.name.toLowerCase()}`)}
        >
          {link.icon}
          <p className="mt-1 text-xs">{link.name}</p>
        </div>
      ))}
    </main>
  );
};

export default BottomBar;
