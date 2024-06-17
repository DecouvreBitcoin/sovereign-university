import * as Tabs from '@radix-ui/react-tabs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-[1440px] flex flex-col justify-start lg:text-start text-center">
      <h2 className="text-black text-[40px] font-medium mb-[34px]">
        {t('publicCommunication.contactdata.contactTitle')}
      </h2>{' '}
      <div className="text-black font-medium mb-[34px]">
        {t('publicCommunication.contactdata.organizationNameSubtitle')}
      </div>
      <p className="text-black mb-[34px]">
        {t('publicCommunication.contactdata.organizationName')}
      </p>
      <div className="text-black font-medium mb-[34px]">
        {t('publicCommunication.contactdata.taxNumberSubtitle')}
      </div>
      <p className="text-black mb-[34px]">
        {t('publicCommunication.contactdata.taxNumber')}
      </p>
      <div className="text-black font-medium mb-[34px]">
        {t('publicCommunication.contactdata.emailSubtitle')}
      </div>
      <p className="text-black mb-[34px]">
        {t('publicCommunication.contactdata.emailValue')}
      </p>
      <div className="text-black font-medium mb-[34px]">
        {t('publicCommunication.contactdata.addressSubtitle')}
      </div>
      <p className="text-black mb-[34px]">
        {t('publicCommunication.contactdata.addressValue')}
      </p>
    </div>
  );
};

const GeneralInfo = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-black text-[40px] font-medium mb-[34px]">
        {t('publicCommunication.generalinfo.generaltitle')}
      </h2>{' '}
      <div className="text-black mb-[34px] font-medium">
        {t('publicCommunication.generalinfo.generalsubtitle')}
      </div>
      <p className="text-black mb-[34px]">
        {t('publicCommunication.generalinfo.firstparagraph')}
      </p>
      <div className="text-black mb-[34px] font-medium">
        {t('publicCommunication.generalinfo.provisionsubtitle')}
      </div>
      <p className="text-black mb-[34px]">
        {t('publicCommunication.generalinfo.provisionparagraph')}
      </p>
    </div>
  );
};

const CookiesInfo = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-black text-[40px] font-medium mb-[34px]">
        {t('publicCommunication.cookiesinfo.cookiestitle')}
      </h2>{' '}
      <div className="text-black mb-[34px] font-medium">
        {t('publicCommunication.cookiesinfo.cookiessubtitle')}
      </div>
      <p className="text-black mb-[34px]">
        {t('publicCommunication.cookiesinfo.cookiesfirstparagraph')}
      </p>
      <div className="text-black mb-[34px] font-medium">
        {t('publicCommunication.cookiesinfo.cookiessubtitle2')}
      </div>
      <p className="text-black mb-[34px]">
        {t('publicCommunication.cookiesinfo.cookiesparagraph2')}
      </p>
    </div>
  );
};

const PrivacyInfo = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-black text-[40px] font-medium mb-[34px]">
        {t('publicCommunication.privacyinfo.privacytitle')}
      </h2>{' '}
      <div className="text-black mb-[34px] font-medium">
        {t('publicCommunication.privacyinfo.privacysubtitle')}
      </div>
      <p className="text-black mb-[34px]">
        {t('publicCommunication.privacyinfo.privacyfirstparagraph')}
      </p>
      <div className="text-black mb-[34px] font-medium">
        {t('publicCommunication.privacyinfo.privacysubtitle2')}
      </div>
      <p className="text-black mb-[34px]">
        {t('publicCommunication.privacyinfo.privacyparagraph2')}
      </p>
    </div>
  );
};

const legalTabs = [
  {
    id: 'contact',
    label: 'publicCommunication.legalsections.contact',
    component: ContactInfo,
  },
  {
    id: 'general',
    label: 'publicCommunication.legalsections.general',
    component: GeneralInfo,
  },
  {
    id: 'cookies',
    label: 'publicCommunication.legalsections.cookies',
    component: CookiesInfo,
  },
  {
    id: 'privacy',
    label: 'publicCommunication.legalsections.privacy',
    component: PrivacyInfo,
  },
];

export const LegalInformation = () => {
  const { t } = useTranslation();
  const [activeSubTab, setActiveSubTab] = useState('contact');

  return (
    <Tabs.Root
      className="TabsRoot px-3"
      value={activeSubTab}
      onValueChange={setActiveSubTab}
    >
      <Tabs.List
        className="TabsList flex flex-row justify-center mx-auto lg:pb-[40px] lg:mt-[27px] space-x-[21px] transition-all duration-300"
        aria-label="Manage your account"
        role="tablist"
      >
        {legalTabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            className={`TabsTrigger lg:px-[18px] lg:py-[14px] lg:text-xl lg:leading-[24px] font-normal text-[16px] leading-[16px] py-[7px] px-[10px] transition-all duration-300 border-b-4 ${
              activeSubTab === tab.id
                ? 'border-darkOrange-5 text-black font-bold'
                : 'border-darkOrange-0 text-[#050A14] opacity-50'
            }`}
            value={tab.id}
            role="tab"
            onClick={() => setActiveSubTab(tab.id)}
          >
            {t(tab.label)}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {legalTabs.map((tab) => (
        <Tabs.Content
          key={tab.id}
          className="TabsContent mb-[32px] pt-[32px] lg:pt-[40px] lg:mb-[40px]"
          value={tab.id}
          role="tabpanel"
          id={`${tab.id}-panel`}
          aria-labelledby={tab.id}
        >
          <div className="flex flex-row text-center lg:justify-start lg:text-start space-x-[21px] w-[1440px]">
            <tab.component />
          </div>

          {/* Subtab Content */}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
