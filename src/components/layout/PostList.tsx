'use client';

import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { GridLoader, PropagateLoader } from 'react-spinners';
import PostCard from './PostCard';

export default function PostList() {
  const { data: session } = useSession();
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');
  const user = session?.user;

  console.log(posts);

  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          <GridLoader color="green" />
        </div>
      )}
      {posts && user && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-6">
              <PostCard post={post} user={user} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );

  // return (
  //   <section className="w-full flex justify-center items-center">
  //     {loading ? (
  //       <div className="p-2">
  //         <PropagateLoader size={8} color="green" />
  //       </div>
  //     ) : (
  //       posts!.length === 0 && <p>{`You don't have posts`}</p>
  //     )}
  //     <ul>
  //       {posts && user ? (
  //         posts.map((post) => (
  //           <li key={post.id}>
  //             <PostCard post={post} user={user} />
  //           </li>
  //         ))
  //       ) : loading ? (
  //         <PropagateLoader size={8} color="green" />
  //       ) : (
  //         posts!.length === 0 && <p>{`You don't have posts`}</p>
  //       )}
  //     </ul>
  //   </section>
  // );
}
