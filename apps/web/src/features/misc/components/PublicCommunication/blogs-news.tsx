import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { blogList as data } from '#src/features/misc/components/PublicCommunication/data.ts';

import { BlogList } from './blog-list.tsx';

const blogTabs = [
  {
    id: 'all',
    label: 'publicCommunication.blogcategories.all',
  },
  {
    id: 'course',
    label: 'publicCommunication.blogcategories.course',
  },
  {
    id: 'features',
    label: 'publicCommunication.blogcategories.features',
  },
  {
    id: 'patch',
    label: 'publicCommunication.blogcategories.patch',
  },
  {
    id: 'grants',
    label: 'publicCommunication.blogcategories.grants',
  },
  {
    id: 'network',
    label: 'publicCommunication.blogcategories.network',
  },
];

export const BlogsNews = () => {
  const [selectedMainTab, setSelectedMainTab] = useState(blogTabs[0].id);

  const handleMainTabChange = (value: string) => {
    setSelectedMainTab(value);
  };

  const { t } = useTranslation();
  return (
    <Tabs.Root
      className="TabsRoot px-3"
      defaultValue="contact"
      onValueChange={handleMainTabChange}
    >
      <Tabs.List
        className="TabsList flex flex-row justify-center mx-auto lg:pb-[40px] lg:mt-[27px] space-x-[21px] transition-all duration-300"
        aria-label="Manage your account"
        role="tablist"
      >
        {blogTabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            className="TabsTrigger lg:px-[18px] lg:py-[14px] lg:text-xl lg:leading-[24px] font-normal text-[16px] leading-[16px] py-[7px] px-[10px] active:!border-darkOrange-5 active:!text-black border-darkOrange-0 text-[#050A14] opacity-50 transition-all duration-300 border-b-2"
            value={tab.id}
            role="tab"
          >
            {t(tab.label)}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <div className="hidden md:flex flex-row text-center lg:justify-start lg:text-start  space-x-[21px]">
        <BlogList
          blogList={data.content.filter(
            (blog) =>
              blog.category === selectedMainTab || selectedMainTab === 'all',
          )}
        />
      </div>
    </Tabs.Root>
  );
};
