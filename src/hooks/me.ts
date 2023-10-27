import { HomeUser } from '@/model/user';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch('api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmark })
  }).then((res) => res.json());
}

async function updateFollowing(userId: string, follow: boolean) {
  return fetch('api/follow', {
    method: 'PUT',
    body: JSON.stringify({ id: userId, follow })
  }).then((res) => res.json());
}

// encapsulate the logic of posts
export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  const setFollow = useCallback(
    (userId: string, image: string | undefined, follow: boolean) => {
      if (!user) return;
      const following = user.following;

      const newUser = {
        ...user,
        following: follow
          ? [...following, { image, username: userId }]
          : following.filter((u) => u.username !== userId)
      };

      return mutate(updateFollowing(userId, follow), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false, // 재갱신 x, newPosts 데이터 신뢰, 네트워크 통신 절약
        rollbackOnError: true
      });
    },
    [user, mutate]
  );

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;

      const bookmarks = user.bookmarks; // []
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((u) => u !== postId)
      };

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false, // 재갱신 x, newPosts 데이터 신뢰, 네트워크 통신 절약
        rollbackOnError: true
      });
    },
    [user, mutate]
  );

  return { user, isLoading, error, setBookmark, setFollow };
}
