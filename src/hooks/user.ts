import { SimplePost } from '@/model/post';
import { HomeUser } from '@/model/user';
import useSWR from 'swr';

async function updateBookmark(id: string, bookmark: boolean) {
  return fetch('api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id, bookmark })
  }).then((res) => res.json());
}

// encapsulate the logic of posts
export default function useMe() {
  const { data, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = (user: HomeUser, postId: string, bookmark: boolean) => {
    const newUserData = {
      ...user,
      bookmarks: bookmark
        ? [...user.bookmarks, postId]
        : user.bookmarks.filter((u) => u !== postId)
    };

    return mutate(updateBookmark(user.id, bookmark), {
      optimisticData: newUserData,
      populateCache: false,
      revalidate: false, // 재갱신 x, newPosts 데이터 신뢰, 네트워크 통신 절약
      rollbackOnError: true
    });
  };

  return { data, isLoading, error, setBookmark };
}
