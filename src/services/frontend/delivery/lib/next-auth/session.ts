import { getServerSession, GoogleProvider } from '../next-auth';
import { getAdminDetail } from '@frontend/repository/api/admin';

import type { NextAuthOptions } from '../next-auth';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      if (token.email) {
        const email = token.email;
        const userOnDb = await getAdminDetail(email);

        token.id = userOnDb.data?.id || '';
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.uuid = token.id as string;
      } else {
        session.user = {
          uuid: token.id as string,
        };
      }

      return session;
    },
    async signIn({ user }) {
      if (!user.email) {
        return '/unauthorized';
      }

      const userOnDb = await getAdminDetail(user.email);
      if (!userOnDb.success) {
        return '/unauthorized';
      }
      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
