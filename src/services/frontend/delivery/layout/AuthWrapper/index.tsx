'use client';

import { SessionProvider } from '../../lib/next-auth';

const AuthWrapperLayout = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthWrapperLayout;
