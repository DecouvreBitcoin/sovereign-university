import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@blms/ui';

import { AppContext } from '#src/providers/context.js';
import { trpc } from '#src/utils/trpc.js';

import { BillingSection } from './-components/billing-section.tsx';
import { BookingPart } from './-components/booking-part.tsx';

export const Route = createFileRoute('/dashboard/_dashboard/bookings')({
  component: DashboardBookings,
});

function DashboardBookings() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const { session } = useContext(AppContext);
  if (!session) {
    navigate({ to: '/' });
  }

  const { data: invoices } = trpc.user.billing.getInvoices.useQuery({
    language: i18n.language ?? 'en',
  });
  const { data: tickets } = trpc.user.billing.getTickets.useQuery();

  if (!tickets) return null;

  const now = new Date();

  const pastTickets = tickets.filter((ticket) => ticket.date < now);
  const upcomingTickets = tickets.filter((ticket) => ticket.date >= now);

  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <div className="text-2xl">{t('dashboard.bookings')}</div>
      <Tabs defaultValue="tickets" className="max-w-[1100px]">
        <TabsList>
          <TabsTrigger
            value="tickets"
            className="text-gray-500 data-[state=active]:text-black data-[state=inactive]:hover:text-black text-wrap"
          >
            {t('words.tickets')}
          </TabsTrigger>
          <TabsTrigger
            value="billings"
            className="text-gray-500 data-[state=active]:text-black data-[state=inactive]:hover:text-black text-wrap"
          >
            {t('words.billing')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tickets">
          {tickets && (
            <div className="pt-2 md:pt-8">
              <p className="desktop-h6 !font-medium text-darkOrange-5">
                {t('dashboard.booking.upcomingTicketTitle')}
              </p>
              <p className="desktop-subtitle1 text-newBlack-4 my-4">
                {t('dashboard.booking.upcomingTicketSubtitle')}
              </p>
              <div className="w-full flex flex-col gap-4 text-newBlack-4">
                <BookingPart tickets={upcomingTickets} />
              </div>

              <hr className="my-10 border-newGray-4" />

              <p className="desktop-h6 !font-medium text-darkOrange-5">
                {t('dashboard.booking.pastTicketTitle')}
              </p>
              <div className="w-full flex flex-col gap-4 text-newBlack-4">
                <BookingPart tickets={pastTickets} />
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="billings">
          {invoices && <BillingSection invoices={invoices} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
