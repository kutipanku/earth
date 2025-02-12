import { PropsWithChildren } from 'react';
import { getServerAuthSession } from '@/lib/auth';
import DashboardLayout from '@frontend/delivery/layout/Dashboard';

const AuthSessionLayout = async ({ children }: PropsWithChildren) => {
  const authSession = await getServerAuthSession();

  return (
    <DashboardLayout
      displayName={authSession?.user?.name || ''}
      image={authSession?.user?.image || ''}
    >
      {children}
    </DashboardLayout>
  );
};

export default AuthSessionLayout;
