import { HomeUser } from '@/model/user';
import useSWR from 'swr';

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch('api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmark })
  }).then((res) => res.json());
}

// encapsulate the logic of posts
export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = (postId: string, bookmark: boolean) => {
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
  };

  return { user, isLoading, error, setBookmark };
}
