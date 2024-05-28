import { NextRequest } from 'next/server';
import { decode } from 'next-auth/jwt';

interface Props {
  req: NextRequest;
}

const useAuthorization = async ({ req }: Props) => {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );
  const currentAccount = await decode({
    token: sessionToken?.value,
    secret: process.env.NEXTAUTH_SECRET || '',
  });

  if (!currentAccount?.id || currentAccount === null) {
    return {
      id: '',
      isAuthorized: false,
    };
  }

  return {
    id: currentAccount.id as string,
    isAuthorized: true,
  };
};

export default useAuthorization;
