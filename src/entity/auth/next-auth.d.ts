import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      uuid: string;
      image: string;
      [key: string]: unknown;
    };
  }
}
