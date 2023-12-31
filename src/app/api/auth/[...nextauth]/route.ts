﻿import { addUser } from '@/service/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET!
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // 프론트엔드에서 직접 user를 추가하지 않고, session 동작을 통해 server side에서 업데이트
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          id: token.id as string
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user: { name, email, image, id } }) {
      if (!email) {
        return false;
      }

      // sanity add user
      addUser({
        name: name || '',
        image,
        email,
        username: email?.split('@')[0] || '',
        id
      });

      return true;
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
