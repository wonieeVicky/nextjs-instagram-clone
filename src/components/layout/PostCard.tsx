'use client';

import { SimplePost } from '@/model/post';

import Avatar from '../ui/Avatar';
import Image from 'next/image';
import CommentForm from '../ui/CommentForm';
import ActionBar from '../ui/ActionBar';
import { useState } from 'react';
import ModalPortal from '../ui/ModalPortal';
import PostModal from '../ui/PostModal';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, likes, text, createdAt } = post;
  const [openModal, setOpenModal] = useState(false);

  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar image={userImage} highlight size="medium" />
        <span className="text-gray-900 font-bold ml-2">{username}</span>
      </div>
      <Image
        src={image}
        className="w-full object-cover aspect-square cursor-pointer"
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <p>포스트 상세페이지</p>
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
