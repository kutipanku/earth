import { NextRequest } from 'next/server';

export const getSessionToken = ({ req }: { req: NextRequest }) => {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  return sessionToken?.value;
};
