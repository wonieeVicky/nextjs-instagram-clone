'use client';

import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import PostCard from './PostCard';
import GridSpinner from '../ui/GridSpinner';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import DialogPortal from '../ui/DialogPortal';

export default function PostList() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SimplePost | null>(null);
  const { data: session } = useSession();
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');
  const user = session?.user;

  useEffect(() => {
    if (selectedPost) {
      setShowDialog(true);
    }
  }, [selectedPost]);

  useEffect(() => {
    !showDialog && setSelectedPost(null);
  }, [showDialog]);

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
              <PostCard
                post={post}
                priority={index < 2}
                setSelectedPost={setSelectedPost}
              />
            </li>
          ))}
        </ul>
      )}
      <DialogPortal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        post={selectedPost}
      />
    </section>
  );
}
