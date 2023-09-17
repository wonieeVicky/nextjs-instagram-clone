﻿import { SimplePost } from '@/model/post';
import Avatar from '../ui/Avatar';

import Image from 'next/image';
import CommentForm from '../ui/CommentForm';
import ActionBar from '../ui/ActionBar';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, likes, text, createdAt } = post;

  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar image={userImage} highlight size="medium" />
        <span className="text-gray-900 font-bold ml-2">{username}</span>
      </div>
      <Image
        src={image}
        className="w-full object-cover aspect-square"
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
    </article>
  );
}
