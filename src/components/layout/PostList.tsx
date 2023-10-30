'use client';

import { useSession } from 'next-auth/react';
import PostCard from './PostCard';
import GridSpinner from '../ui/GridSpinner';
import usePosts from '@/hooks/posts';

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();

  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      {posts && (
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
