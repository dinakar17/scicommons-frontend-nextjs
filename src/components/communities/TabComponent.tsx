import React from 'react';

import { usePathname, useRouter } from 'next/navigation';

import clsx from 'clsx';

interface TabComponentProps<ActiveTabType extends string> {
  tabs: ActiveTabType[];
  activeTab: ActiveTabType;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTabType>>;
}

const TabComponent = <ActiveTabType extends string>({
  tabs,
  activeTab,
  setActiveTab,
}: TabComponentProps<ActiveTabType>) => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (searchParams.has('tab')) {
  //     setActiveTab(searchParams.get('tab') as ActiveTabType);
  //   }
  // }, [searchParams, setActiveTab]);

  const handleTabClick = (tab: ActiveTabType) => {
    setActiveTab(tab);
    router.push(`${pathname}?tab=${tab}`);
  };

  return (
    <div className="flex rounded-md bg-slate-200 p-1 shadow">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={clsx('rounded-md px-4 py-2 transition-all duration-300', {
            'bg-white shadow-md': tab === activeTab,
            'text-gray-500': tab !== activeTab,
          })}
          onClick={() => handleTabClick(tab as ActiveTabType)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabComponent;
