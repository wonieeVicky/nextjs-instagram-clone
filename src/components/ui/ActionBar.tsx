﻿import HeartIcon from '../ui/icons/HeartIcon';
import HeartFillIcon from '../ui/icons/HeartFillIcon';
import BookmarkIcon from '../ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import { useSession } from 'next-auth/react';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { useState } from 'react';
import ToggleButton from './ToggleButton';
import BookmarkFillIcon from './icons/BookmarkFillIcon';
import { SimplePost } from '@/model/post';

export default function ActionBar({ post }: { post: SimplePost }) {
  const { likes, username, text, createdAt, id } = post;
  const { data: session } = useSession();
  const user = session?.user;

  const [liked, setLiked] = useState(
    user ? likes.includes(user.username) : false
  );
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = (like: boolean) => {
    fetch('/api/likes', {
      method: 'PUT',
      body: JSON.stringify({ id, like })
    }).then(() => setLiked(like));
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {text && (
          <p>
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
