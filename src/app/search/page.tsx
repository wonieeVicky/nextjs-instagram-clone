﻿import UserSearch from '@/components/ui/UserSearch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Search',
  description: 'Search users to follow'
};

export default function SearchPage() {
  return <UserSearch />;
}
