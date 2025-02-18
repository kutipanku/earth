import { decode } from 'next-auth/jwt';

interface Props {
  sessionToken?: string;
}

const getAuthStatus = async ({ sessionToken }: Props) => {
  const currentAccount = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET || '',
  });

  if (!currentAccount?.id || currentAccount === null) {
    return {
      userId: '',
      isAuthorized: false,
    };
  }

  return {
    userId: currentAccount.id as string,
    isAuthorized: true,
  };
};

export default getAuthStatus;
