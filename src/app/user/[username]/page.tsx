import UserPosts from '@/components/ui/UserPosts';
import UserProfile from '@/components/ui/UserProfile';

import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Props = {
  params: {
    username: string;
  };
};

// cache함수 getUser를 만들어서 getUserForProfile을 실행시킨다.
const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  // 하단: 3개의 탭(posts, liked, bookmarks)
  // 상단: 사용자의 프로필 이미지와 정보(username, name, 숫자)
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username }
}: Props): Promise<Metadata> {
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return {
    title: `${user?.name} (@${user?.username}) ∙ Vickygram`,
    description: `${user?.name}'s all Vickygram posts`
  };
}
