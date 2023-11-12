﻿import HeartIcon from '../ui/icons/HeartIcon';
import HeartFillIcon from '../ui/icons/HeartFillIcon';
import BookmarkIcon from '../ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import ToggleButton from './ToggleButton';
import BookmarkFillIcon from './icons/BookmarkFillIcon';
import { Comment, SimplePost } from '@/model/post';
import usePosts from '@/hooks/posts';
import useMe from '@/hooks/me';
import CommentForm from './CommentForm';

export default function ActionBar({
  post,
  children,
  onComment
}: {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
}) {
  const { likes, createdAt, id } = post;
  const { setBookmark, user } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) =>
    user && setLike(post, user.username, like);
  const handleBookmark = (bookmark: boolean) =>
    user && setBookmark(id, bookmark);
  const handleComment = (comment: string) =>
    user && onComment({ comment, username: user.username, image: user.image });

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          title={liked ? 'unlike' : 'like'}
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          title={bookmarked ? 'unbookmark' : 'bookmark'}
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {children}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
