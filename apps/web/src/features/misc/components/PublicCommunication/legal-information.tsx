import * as Tabs from '@radix-ui/react-tabs';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-black">
        {t('publicCommunication.contactdata.contactTitle')}
      </h2>{' '}
      <div className="text-black">
        {t('publicCommunication.contactdata.organizationNameSubtitle')}
      </div>
      <p className="text-black">
        {t('publicCommunication.contactdata.organizationName')}
      </p>
      <div className="text-black">
        {t('publicCommunication.contactdata.taxNumberSubtitle')}
      </div>
      <p className="text-black">
        {t('publicCommunication.contactdata.taxNumber')}
      </p>
      <div className="text-black">
        {t('publicCommunication.contactdata.emailSubtitle')}
      </div>
      <p className="text-black">
        {t('publicCommunication.contactdata.emailValue')}
      </p>
      <div className="text-black">
        {t('publicCommunication.contactdata.addressSubtitle')}
      </div>
      <p className="text-black">
        {t('publicCommunication.contactdata.addressValue')}
      </p>
    </div>
  );
};

const GeneralInfo = () => {
  const { t } = useTranslation();

  return <div>GeneralInfo</div>;
};

const CookiesInfo = () => {
  const { t } = useTranslation();

  return <div>CookiesInfo </div>;
};

const PrivacyInfo = () => {
  const { t } = useTranslation();

  return <div>PrivacyInfo</div>;
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

  return (
    <Tabs.Root className="TabsRoot px-3" defaultValue="contact">
      <Tabs.List
        className="TabsList flex flex-row justify-center mx-auto lg:pb-[40px] lg:mt-[27px] space-x-[21px] transition-all duration-300"
        aria-label="Manage your account"
        role="tablist"
      >
        {legalTabs.map((tab) => (
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

      {legalTabs.map((tab) => (
        <Tabs.Content
          key={tab.id}
          className="TabsContent mb-[32px] pt-[32px] lg:pt-[40px] lg:mb-[40px]"
          value={tab.id}
          role="tabpanel"
          id={`${tab.id}-panel`}
          aria-labelledby={tab.id}
        >
          <div className="hidden md:flex flex-row text-center lg:justify-start lg:text-start  space-x-[21px]">
            {tab.component()}
          </div>

          {/* Subtab Content */}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
