'use client';

import { DetailUser } from '@/model/user';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import Avatar from './Avatar';

export default function UserInfo() {
  const params = useParams();

  const {
    data: userInfo,
    isLoading,
    error
  } = useSWR<DetailUser>(`/api/user/${params?.id}`);

  if (isLoading) return <p>Loading...</p>;
  if (error || !userInfo) return <p>Error</p>;

  return (
    <section className="flex items-center justify-center py-10 max-w-screen-xl mx-auto border-b">
      <Avatar image={userInfo.image} size="xlarge" highlight />
      <div className="ml-8">
        <p className="text-lg mb-1">{userInfo.username}</p>
        <div className="flex text-sm mb-2">
          <p className="mr-3">
            <strong>{userInfo.posts}</strong> posts
          </p>
          <p className="mr-3">
            <strong>{userInfo.followers?.length || 0}</strong> followers
          </p>
          <p>
            <strong>{userInfo.following?.length || 0}</strong> following
          </p>
        </div>
        <p className="font-bold">{userInfo.name}</p>
      </div>
    </section>
  );
}
