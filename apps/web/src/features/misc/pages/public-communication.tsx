import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';

import { PageLayout } from '#src/components/PageLayout/index.tsx';

interface ContentBlock {
  type: 'title' | 'subtitle' | 'paragraph';
  value: string;
}

interface SubTab {
  id: string;
  label: string;
  content: ContentBlock[];
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
    {
      id: 'subtab1',
      label: 'All',
      content: [
        { type: 'title', value: 'All Content' },
        { type: 'paragraph', value: 'Content for All' },
      ],
    },
    {
      id: 'subtab2',
      label: 'Course release',
      content: [
        { type: 'title', value: 'Course Release' },
        { type: 'paragraph', value: 'Content for Course release' },
      ],
    },
    {
      id: 'subtab3',
      label: 'Features',
      content: [
        { type: 'title', value: 'Features' },
        { type: 'paragraph', value: 'Content for Features' },
      ],
    },
    {
      id: 'subtab4',
      label: 'Patch notes',
      content: [
        { type: 'title', value: 'Patch Notes' },
        { type: 'paragraph', value: 'Content for Patch notes' },
      ],
    },
    {
      id: 'subtab5',
      label: 'Grants',
      content: [
        { type: 'title', value: 'Grants' },
        { type: 'paragraph', value: 'Content for Grants' },
      ],
    },
    {
      id: 'subtab6',
      label: 'Network',
      content: [
        { type: 'title', value: 'Network' },
        { type: 'paragraph', value: 'Content for Network' },
      ],
    },
  ],
  tab2: [
    {
      id: 'subtab7',
      label: 'Contact',
      content: [
        { type: 'title', value: 'Contact' },
        { type: 'subtitle', value: 'Organization name:' },
        {
          type: 'paragraph',
          value: 'PlanB Network SARL is a swiss incorpated company',
        },
        { type: 'subtitle', value: 'Tax number:' },
        { type: 'paragraph', value: '12312451512' },
        { type: 'subtitle', value: 'Address:' },
        {
          type: 'paragraph',
          value: 'PlanB Network SARL is a swiss incorpated company',
        },
        { type: 'subtitle', value: 'Email:' },
        { type: 'paragraph', value: 'Contact@planb.network' },
      ],
    },
    {
      id: 'subtab8',
      label: 'General',
      content: [
        { type: 'title', value: 'General' },
        { type: 'subtitle', value: 'Subtitle 1' },
        {
          type: 'paragraph',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        { type: 'subtitle', value: 'Subtitle 2' },
        {
          type: 'paragraph',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      ],
    },
    {
      id: 'subtab9',
      label: 'Cookies',
      content: [
        { type: 'title', value: 'Cookies' },
        { type: 'subtitle', value: 'Subtitle 1' },
        {
          type: 'paragraph',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        { type: 'subtitle', value: 'Subtitle 2' },
        {
          type: 'paragraph',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      ],
    },
    {
      id: 'subtab10',
      label: 'Privacy',
      content: [
        { type: 'title', value: 'Privacy' },
        { type: 'subtitle', value: 'Subtitle 1' },
        {
          type: 'paragraph',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        { type: 'subtitle', value: 'Subtitle 2' },
        {
          type: 'paragraph',
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      ],
    },
  ],
};

export const PublicCommunicationPage = () => {
  const [selectedMainTab, setSelectedMainTab] = useState(mainTabs[0].id);
  const [selectedSubTab, setSelectedSubTab] = useState(
    subTabs[mainTabs[0].id][0].id,
  );

  const handleMainTabChange = (value: string) => {
    setSelectedMainTab(value);
    setSelectedSubTab(subTabs[value][0].id);
  };

  const handleSubTabChange = (value: string) => {
    setSelectedSubTab(value);
  };

  return (
    <PageLayout
      variant="light"
      footerVariant="light"
      title="Public communication"
      description="At Plan B Network, we are proud to follow open source standards and maintain transparency throughout our journey"
    >
      <Tabs.Root
        className="TabsRoot"
        defaultValue={mainTabs[0].id}
        value={selectedMainTab}
        onValueChange={handleMainTabChange}
      >
        <Tabs.List
          className="TabsList flex flex-row mx-auto justify-center lg:pb-[40px] lg:mt-[27px] border-0 md:border-b-2 space-x-[21px] transition-all duration-300"
          aria-label="Manage your account"
          role="tablist"
        >
          {mainTabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              className={`TabsTrigger lg:px-[18px] lg:py-[14px] lg:text-xl lg:leading-[24px] font-normal lg:!font-medium rounded-2xl text-[16px] leading-[16px] py-[7px] px-[10px] ${
                selectedMainTab === tab.id
                  ? 'bg-darkOrange-5 text-white active:scale-95 transition-colors duration-150'
                  : 'bg-transparent text-darkOrange-5 border border-darkOrange-5'
              }`}
              value={tab.id}
              role="tab"
              aria-selected={selectedMainTab === tab.id}
              aria-controls={`${tab.id}-panel`}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {mainTabs.map((tab) => (
          <Tabs.Content
            key={tab.id}
            className="TabsContent mb-[32px] pt-[32px] lg:pt-[40px] lg:mb-[40px]"
            value={tab.id}
            role="tabpanel"
            id={`${tab.id}-panel`}
            aria-labelledby={tab.id}
          >
            <div className="hidden md:flex flex-row mx-auto justify-center space-x-[21px]">
              {subTabs[selectedMainTab].map((subTab) => (
                <button
                  key={subTab.id}
                  className={`border-b-2 ${selectedSubTab === subTab.id ? 'border-darkOrange-5 text-black' : 'border-darkOrange-0 text-[#050A14] opacity-50'} transition-all duration-300`}
                  onClick={() => handleSubTabChange(subTab.id)}
                  aria-selected={selectedSubTab === subTab.id}
                  role="tab"
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
              {subTabs[selectedMainTab].map((subTab) =>
                selectedSubTab === subTab.id ? (
                  <div key={subTab.id}>
                    {subTab.content.map((block, index) => (
                      <div key={index}>
                        {block.type === 'title' && (
                          <h2 className="text-black font-medium mb-[34px] text-[40px]">
                            {block.value}
                          </h2>
                        )}
                        {block.type === 'subtitle' && (
                          <h4 className="text-black font-medium mb-[34px]">
                            {block.value}
                          </h4>
                        )}
                        {block.type === 'paragraph' && (
                          <p className="text-black mb-[34px]">{block.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : null,
              )}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </PageLayout>
  );
};
