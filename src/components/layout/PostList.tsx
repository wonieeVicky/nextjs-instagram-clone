'use client';

import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import PostCard from './PostCard';
import GridSpinner from '../ui/GridSpinner';

export default function PostList() {
  const { data: session } = useSession();
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');
  const user = session?.user;

  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      {posts && user && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-6">
              <PostCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
