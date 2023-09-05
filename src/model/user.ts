﻿export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, 'username' | 'image'>;

export type DetailUser = User & {
  followings: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
