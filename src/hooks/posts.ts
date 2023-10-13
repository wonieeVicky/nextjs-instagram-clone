import { SimplePost } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

async function updateLike(id: string, like: boolean) {
  return fetch('api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like })
  }).then((res) => res.json());
}

// encapsulate the logic of posts
export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate
  } = useSWR<SimplePost[]>('/api/posts');

  const setLike = (post: SimplePost, username: string, like: boolean) => {
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
      revalidate: true,
      rollbackOnError: true
    });
  };

  return { posts, isLoading, error, setLike };
}
