'use client';

import Link from 'next/link';

import BottomBar from '@/components/BottomBar';
// import cookies from 'js-cookie';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import GyroSlider from '@/components/home/GyroSlider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordian';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { faqs } from '@/constants/common.constants';
import { cn } from '@/lib/utils';
import { useTheme } from '@/stores/useTheme';

const Home = () => {
  const { dark } = useTheme();
  const words = [
    {
      text: 'Welcome',
    },
    {
      text: 'to',
    },
    {
      text: 'SciCommons.',
      className: 'text-green-500 dark:text-green-500',
    },
  ];

  // console.log(cookies.get('accessToken'));
  // console.log(cookies.get('refreshToken'));

  return (
    <div
      className={cn('min-h-screen bg-common-cardBackground', {
        dark: dark,
      })}
    >
      <NavBar />
      <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-10">
        <TypewriterEffectSmooth words={words} />
        <p className="mb-6 max-w-3xl text-center text-sm text-neutral-600 dark:text-neutral-200 sm:text-base">
          Be part of the change. Join our open platform to review, rate, and access research freely.
          Improve research quality and accessibility with community-driven peer review.
        </p>
        <div className="flex flex-row gap-4">
          <Link href="/articles">
            <button className="h-10 w-40 rounded-xl border border-transparent bg-black text-sm text-white dark:border-white">
              Explore
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="h-10 w-40 rounded-xl border border-black bg-white text-sm  text-black">
              Signup
            </button>
          </Link>
        </div>
      </div>
      <div className="h-fit w-full bg-functional-green/10 py-4">
        <div className="flex w-full flex-col items-center py-8">
          <span className="text-center text-xl font-bold text-text-primary md:text-2xl">
            Features
          </span>
          <span className="text-base text-text-secondary">Uniqueness of our platform</span>
        </div>
        <GyroSlider />
      </div>
      <div className="flex w-full flex-col items-center py-12">
        <span className="px-8 text-center text-xl font-bold text-text-primary md:text-2xl">
          We Have Answered Almost All Your Questions
        </span>
        <div className="mt-8 flex max-w-[720px] flex-col items-center p-4">
          <Accordion type="single" collapsible className="max-w-[600px]">
            {faqs.map((faq, i) => (
              <AccordionItem
                className="border-b border-common-contrast px-0 py-1"
                key={i}
                value={faq?.ques}
              >
                <AccordionTrigger className="w-full p-5" defaultIconNeeded={true}>
                  <span className="text-text-primary">{faq?.ques}</span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 pt-0">
                  <span className="text-text-secondary">{faq?.ans}</span>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer />
      <BottomBar />
    </div>
  );
};

export default Home;
