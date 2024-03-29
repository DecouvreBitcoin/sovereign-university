import { Button } from '../../../atoms/Button/index.tsx';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../atoms/Tabs/index.tsx';
import { useDisclosure } from '../../../hooks/index.ts';
import { trpc } from '../../../utils/index.ts';
import { ChangePasswordModal } from '../components/change-password-modal.tsx';
import { DashboardLayout } from '../layout.tsx';

export const DashboardProfile = () => {
  const {
    open: openChangePasswordModal,
    isOpen: isChangePasswordModalOpen,
    close: onClose,
  } = useDisclosure();

  const { data: user } = trpc.user.getDetails.useQuery();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="text-lg font-medium">Profile information</div>
        <Tabs defaultValue="info" className="max-w-[600px]">
          <TabsList>
            <TabsTrigger value="info">My personal information</TabsTrigger>
            <TabsTrigger value="document">My documents</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <div className="mt-6 flex w-full flex-col">
              <div className="mt-6 flex flex-col">
                <label htmlFor="usernameId">Username</label>
                <input
                  id="usernameId"
                  type="text"
                  value={user?.username}
                  disabled
                  className="rounded-lg bg-[#e9e9e91a] px-4 py-1 text-gray-400"
                />
              </div>
              <div className="mt-6 flex flex-col">
                <label htmlFor="emailId">Email</label>
                <input
                  id="emailId"
                  type="text"
                  value={user?.email ? user?.email : ''}
                  disabled
                  className="rounded-lg bg-[#e9e9e91a] px-4 py-1 text-gray-400"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="document"></TabsContent>

          <TabsContent value="security">
            <div className="mt-6 flex justify-between">
              <div>Password</div>
              <Button
                variant="tertiary"
                size="s"
                rounded
                onClick={openChangePasswordModal}
              >
                Change
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={onClose}
        />
      </div>
    </DashboardLayout>
  );
};
