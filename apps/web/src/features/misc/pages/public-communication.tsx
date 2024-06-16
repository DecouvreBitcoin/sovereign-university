import * as Tabs from '@radix-ui/react-tabs';
import { useTranslation } from 'react-i18next';

// import { useState } from 'react';

import { PageLayout } from '#src/components/PageLayout/index.tsx';
import { BlogsNews } from '#src/features/misc/components/PublicCommunication/blogs-news.tsx';
import { LegalInformation } from '#src/features/misc/components/PublicCommunication/legal-information.tsx';

const mainTabs = [
  {
    id: 'tab1',
    label: 'publicCommunication.blogpost',
    component: BlogsNews,
  },
  {
    id: 'tab2',
    label: 'publicCommunication.legal',
    component: LegalInformation,
  },
];

export const PublicCommunicationPage = () => {
  const { t } = useTranslation();
  //
  //   const [selectedSubTab, setSelectedSubTab] = useState(
  //     subTabs[mainTabs[0].id][0].id,
  //   );

  //   const handleSubTabChange = (value: string) => {
  //     setSelectedSubTab(value);
  //   };

  return (
    <PageLayout
      variant="light"
      footerVariant="light"
      title={t('publicCommunication.title')}
      description={t('publicCommunication.description')}
    >
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.List
          className="TabsList flex flex-row mx-auto justify-center lg:pb-[40px] lg:mt-[27px] border-0 md:border-b-2 space-x-[21px] transition-all duration-300"
          aria-label="Manage your account"
          role="tablist"
        >
          {mainTabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              className="TabsTrigger lg:px-[18px] lg:py-[14px] lg:text-xl lg:leading-[24px] font-normal lg:!font-medium rounded-2xl text-[16px] leading-[16px] py-[7px] px-[10px] bg-transparent text-darkOrange-5 border border-darkOrange-5 focus:bg-darkOrange-5 focus:text-white active:bg-darkOrange-5 active:text-white active:scale-95 transition-colors duration-150"
              value={tab.id}
              role="tab"
            >
              {t(tab.label)}
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
            <div className="hidden md:flex flex-row text center justify-center space-x-[21px]">
              {tab.component()}
            </div>

            {/* Subtab Content */}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </PageLayout>
  );
};
