import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';

import { PageLayout } from '#src/components/PageLayout/index.tsx';

interface SubTab {
  id: string;
  label: string;
  content: string;
}

interface SubTabsType {
  [key: string]: SubTab[];
}

const mainTabs = [
  { id: 'tab1', label: 'Blogs & news' },
  { id: 'tab2', label: 'Legal information' },
];

const subTabs: SubTabsType = {
  tab1: [
    { id: 'subtab1', label: 'All', content: 'Content for All' },
    {
      id: 'subtab2',
      label: 'Course release',
      content: 'Content for Course release',
    },
    { id: 'subtab3', label: 'Features', content: 'Content for Features' },
    { id: 'subtab4', label: 'Patch notes', content: 'Content for Patch notes' },
    { id: 'subtab5', label: 'Grants', content: 'Content for Grants' },
    { id: 'subtab6', label: 'Network', content: 'Content for Network' },
  ],
  tab2: [
    { id: 'subtab7', label: 'Contact', content: 'Content for Contact' },
    { id: 'subtab8', label: 'General', content: 'Content for General' },
    { id: 'subtab9', label: 'Cookies', content: 'Content for Cookies' },
    { id: 'subtab10', label: 'Privacy', content: 'Content for Privacy' },
  ],
};

export const PublicCommunicationPage = () => {
  const [selectedMainTab, setSelectedMainTab] = useState(mainTabs[0].id);
  const [selectedSubTab, setSelectedSubTab] = useState(
    subTabs[mainTabs[0].id][0].id,
  );

  const handleMainTabChange = (id: string) => {
    setSelectedMainTab(id);
    setSelectedSubTab(subTabs[id][0].id);
  };

  const handleSubTabChange = (id: string) => {
    setSelectedSubTab(id);
  };

  return (
    <PageLayout
      variant="light"
      title="Public communication"
      description="At Plan B Network, we are proud to follow open source standards and maintain transparency throughout our journey"
    >
      <Tabs.Root className="TabsRoot" defaultValue={mainTabs[0].id}>
        <Tabs.List
          className="TabsList flex flex-row mx-auto justify-center lg:pb-[40px] lg:mt-[27px] border-0 md:border-b-2 space-x-[21px] transition-all duration-300"
          aria-label="Manage your account"
        >
          {mainTabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              className="TabsTrigger lg:px-[18px] lg:py-[14px] lg:text-xl lg:leading-[24px] font-normal lg:!font-medium rounded-2xl bg-darkOrange-5 text-white active:scale-95 flex flex-row items-center justify-center transition-colors duration-150 group px-[10px] py-[14px] text-[16px] leading-[16px]"
              value={tab.id}
              onClick={() => handleMainTabChange(tab.id)}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content
          className="TabsContent mb-[32px] pt-[32px] lg:pt-[40px] lg:mb-[40px]"
          value={selectedMainTab}
        >
          <div className="hidden md:flex flex-row mx-auto justify-center space-x-[21px]">
            {subTabs[selectedMainTab].map((subTab) => (
              <button
                key={subTab.id}
                className={`border-b-2 ${selectedSubTab === subTab.id ? 'border-darkOrange-5 text-black' : 'border-darkOrange-0 text-[#050A14] opacity-50'} transition-all duration-300`}
                onClick={() => handleSubTabChange(subTab.id)}
              >
                {subTab.label}
              </button>
            ))}
          </div>
          <div className="md:hidden flex justify-center mt-4">
            <select
              className="form-select block w-full max-w-xs px-3 py-2 border border-darkOrange-5 font-bold rounded-md text-base leading-6 text-black bg-white active:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkOrange-0 focus-visible:ring-darkOrange-0"
              value={selectedSubTab}
              onChange={(e) => handleSubTabChange(e.target.value)}
            >
              {subTabs[selectedMainTab].map((subTab) => (
                <option
                  key={subTab.id}
                  value={subTab.id}
                  className={`focus:bg-white ${selectedSubTab === subTab.id ? 'font-bold ' : 'font-normal'}`}
                >
                  {subTab.label}
                </option>
              ))}
            </select>
          </div>
          {/* Subtab Content */}
          <div className="mt-[40px]">
            {subTabs[selectedMainTab].map(
              (subTab) =>
                selectedSubTab === subTab.id && (
                  <p className="text-black" key={subTab.id}>
                    {subTab.content}
                  </p>
                ),
            )}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </PageLayout>
  );
};
