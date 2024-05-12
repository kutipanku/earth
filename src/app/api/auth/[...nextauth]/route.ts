import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { getSuperUserByEmail } from '@/repository/db/super_user';

const getAuthOptions = (callbacks: NextAuthOptions['callbacks']) => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
      }),
    ],
    callbacks,
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const callbacks: NextAuthOptions['callbacks'] = {
    session({ session }) {
      return session;
    },
    async signIn({ user }) {
      console.log('[DEBUG] user', user);
      if (!user.email) {
        return '/unauthorized';
      }

      const userOnDb = await getSuperUserByEmail(user.email);

      console.log('[DEBUG] userOnDb', userOnDb);

      if (!userOnDb) {
        return '/unauthorized';
      }

      const keys = Object.keys(userOnDb);
      if (keys.length === 0) {
        return '/unauthorized';
      }

      return true;
    },
  };
  return NextAuth(req, res, getAuthOptions(callbacks));
};

export { handler as GET, handler as POST };
