'use client';

import { Suspense, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import { useUsersApiAuthActivate } from '@/api/users-auth/users-auth';

const ActivateAccount = () => {
  const router = useRouter();
  const params = useParams<{ token: string }>();

  const { isLoading, error, isSuccess, isError } = useUsersApiAuthActivate(params.token);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Account activated successfully! Redirecting to login page...', {
        position: 'bottom-right',
        duration: 10000,
      });

      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        router.push('/auth/login');
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isSuccess, router]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100 transition-colors duration-300 dark:bg-gray-800">
        <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md transition-colors duration-300 dark:bg-gray-900">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center">
              <Image src="/auth/activateaccount.png" alt="logo" width={80} height={80} />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              {isLoading
                ? 'Activating your Account...'
                : isError
                  ? `${(error as unknown as { response: { data: { detail: string } } })?.response?.data?.detail || 'An error occurred'}`
                  : 'Account Activated'}
            </h1>
            <div className="mt-2 text-gray-500 dark:text-gray-400">
              {isLoading ? (
                <div className="mt-4 flex justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-dashed border-brand"></div>
                </div>
              ) : isError ? (
                `Please try again.`
              ) : (
                `Your account has been activated successfully! Redirecting to login page in ${countdown} seconds...`
              )}
            </div>
          </div>
          {!isLoading && !isError && (
            <Link href="https://mail.google.com" passHref>
              <button
                type="button"
                className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Open Gmail
              </button>
            </Link>
          )}
          <Link
            href="/auth/login"
            className="mt-4 flex items-center justify-center text-brand transition-colors duration-300 hover:text-brand-dark dark:text-brand-dark dark:hover:text-brand"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Sign in
          </Link>
        </div>
      </div>
    </Suspense>
  );
};

export default ActivateAccount;
