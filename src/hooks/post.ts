import { Comment, FullPost, SimplePost } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

async function addComment(id: string, comment: string) {
  return fetch('api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment })
  }).then((res) => res.json());
}

// encapsulate the logic of full post
export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate
  } = useSWR<FullPost>(`/api/posts/${postId}`);
  const { mutate: globalMutate } = useSWRConfig();
  const postComment = (comment: Comment) => {
    if (!post) return;

    // optimistic update를 위한 newPost 생성
    const newPost = {
      ...post,
      comments: [...post.comments, comment]
    };

    // 내부 mutate를 사용해서 optimistic update 구현
    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false, // 재갱신 x, newPosts 데이터 신뢰, 네트워크 통신 절약
      rollbackOnError: true
    }).then(() => globalMutate('/api/posts'));
  };

  return { post, isLoading, error, postComment };
}
