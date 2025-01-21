'use client';
import { SessionProvider } from '../../lib/next-auth';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthWrapper;
