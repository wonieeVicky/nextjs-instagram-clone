import { User } from '@/model/user';

declare module 'next-auth' {
  interface Session {
    // user: {
    //   username: string;
    // } & DefaultSession['user'];
    user: User;
  }
}
