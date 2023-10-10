﻿'use client';

import { SimplePost } from '@/model/post';

import Avatar from '../ui/Avatar';
import Image from 'next/image';
import CommentForm from '../ui/CommentForm';
import ActionBar from '../ui/ActionBar';
import { useState } from 'react';
import ModalPortal from '../ui/ModalPortal';
import PostModal from '../ui/PostModal';
import PostDetail from '../ui/PostDetail';
import PostUserAvatar from '../ui/PostUserAvatar';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, likes, text, createdAt, id } = post;
  const [openModal, setOpenModal] = useState(false);

  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <PostUserAvatar image={userImage} username={username} />
      <Image
        src={image}
        className="w-full object-cover aspect-square cursor-pointer"
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} />
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
