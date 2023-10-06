import UserSearch from '@/components/ui/UserSearch';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic'; // next에게 항상 요청을 동적으로 처리하도록 지시

export const metadata: Metadata = {
  title: 'User Search',
  description: 'Search users to follow'
};

export default function SearchPage() {
  return <UserSearch />;
}
