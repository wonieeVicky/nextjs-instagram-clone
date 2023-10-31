import { useCacheKeys } from '@/context/CacheKeysContext';
import { Comment, SimplePost } from '@/model/post';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like })
  }).then((res) => res.json());
}
async function addComment(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment })
  }).then((res) => res.json());
}

// encapsulate the logic of posts
export default function usePosts() {
  const cacheKeys = useCacheKeys();
  const {
    data: posts,
    isLoading,
    error,
    mutate
  } = useSWR<SimplePost[]>(cacheKeys.postsKey);

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      // optimistic update를 위한 newPost 생성
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter((u) => u !== username)
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      // 내부 mutate를 사용해서 optimistic update 구현
      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false, // 재갱신 x, newPosts 데이터 신뢰, 네트워크 통신 절약
        rollbackOnError: true
      });
    },
    [posts, mutate]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      // optimistic update를 위한 newPost 생성
      const newPost = {
        ...post,
        comments: post.comments + 1
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      // 내부 mutate를 사용해서 optimistic update 구현
      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false, // 재갱신 x, newPosts 데이터 신뢰, 네트워크 통신 절약
        rollbackOnError: true
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, error, setLike, postComment };
}
