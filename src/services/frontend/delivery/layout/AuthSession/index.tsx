import { PropsWithChildren } from 'react';
import DashboardLayout from '@frontend/delivery/layout/Dashboard';
import { getServerAuthSession } from '../../lib/next-auth/session';

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
