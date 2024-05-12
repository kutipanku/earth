import { PropsWithChildren } from 'react';
import { getServerAuthSession } from '@/lib/auth';
import DashboardLayout from '@/view/layout';

const Dashboard = async ({ children }: PropsWithChildren) => {
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

export default Dashboard;
