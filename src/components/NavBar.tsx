'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { IconArrowNarrowLeft, IconPlus } from '@tabler/icons-react';
import Cookies from 'js-cookie';
import { Bell, LogOut, NotebookTabs, User } from 'lucide-react';
import toast from 'react-hot-toast';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import useIdenticon from '@/hooks/useIdenticons';
import useStore from '@/hooks/useStore';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { useTheme } from '@/stores/useTheme';

const NavBar: React.FC = () => {
  const isAuthenticated = useStore(useAuthStore, (state) => state.isAuthenticated);
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/articles', label: 'Articles' },
    { href: '/communities', label: 'Communities' },
    { href: '/posts', label: 'Posts' },
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
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b border-common-minimal bg-common-cardBackground">
      <nav className="flex w-full items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <IconArrowNarrowLeft
            className="mr-4 size-7 cursor-pointer text-text-primary"
            strokeWidth={1.5}
            onClick={() => {
              router.back();
            }}
          />
          <Image src="/logo.png" alt="Logo" width={60} height={40} />
        </div>
        <ul className="mx-auto hidden space-x-1 md:flex">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className={cn(
                'rounded-full px-4 py-1 text-sm text-text-primary hover:bg-functional-green/10',
                {
                  'bg-functional-green/10 font-bold text-functional-green':
                    link.label === activeTab,
                }
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        {isAuthenticated ? (
          <div className="flex items-center space-x-2 md:space-x-4">
            <CreateDropdown />
            <Link href="/notifications">
              <Bell className="h-9 w-9 cursor-pointer rounded-full p-2 text-text-secondary hover:bg-common-minimal" />
            </Link>
            <ProfileDropdown />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="text-text-secondary hover:text-text-primary">
              <button>Login</button>
            </Link>
            <Link href="/auth/register" className="text-gray-800 hover:text-gray-600">
              <button className="rounded-full bg-green-500 px-4 py-2 text-white">Register</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;

const CreateDropdown: React.FC = () => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center rounded-full bg-functional-green px-2 py-2 text-sm text-neutral-0 sm:px-4">
          <IconPlus className="size-4 text-neutral-0" />
          <span className="ml-1 hidden text-sm text-neutral-0 sm:block">Create</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/submitarticle">Submit Article</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/createcommunity">Create Community</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push('/post/create');
          }}
        >
          Create Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProfileDropdown: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const { dark, setDark } = useTheme();
  const imageData = useIdenticon(40);

  const handleLogout = () => {
    logout();
    const access = Cookies.get('accessToken');
    const refresh = Cookies.get('refreshToken');
    console.log(access, refresh);
    toast.success('Logged out successfully');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={`data:image/png;base64,${imageData}`}
          alt="Profile"
          width={40}
          height={40}
          className="cursor-pointer rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/myprofile" className="flex items-center ">
            <User size={16} className="mr-2" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/mycontributions" className="flex items-center ">
            <NotebookTabs size={16} className="mr-2" /> Contributions
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center space-x-2">
            Dark Mode{' '}
            <Switch
              className="ml-2"
              checked={dark}
              onClick={() => {
                setDark();
              }}
            />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={handleLogout} className="flex items-center text-functional-red">
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
