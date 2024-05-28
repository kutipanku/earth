import { getServerSession, type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getSuperUserByEmail } from '@/repository/db/super_user';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      if (token.email) {
        const email = token.email;
        const userOnDb = await getSuperUserByEmail(email);

        token.id = userOnDb?.id || '';
      }
      return token;
    },
    session({ session, token }) {
      session.user.uuid = token.id as string;
      return session;
    },
    async signIn({ user }) {
      if (!user.email) {
        return '/unauthorized';
      }

      const userOnDb = await getSuperUserByEmail(user.email);
      if (!userOnDb) {
        return '/unauthorized';
      }

      const keys = Object.keys(userOnDb);
      if (keys.length === 0) {
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
