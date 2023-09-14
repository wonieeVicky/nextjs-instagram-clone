import { SimplePost } from '@/model/post';
import Avatar from '../ui/Avatar';
import HeartIcon from '../ui/icons/HeartIcon';
import HeartFillIcon from '../ui/icons/HeartFillIcon';
import BookmarkIcon from '../ui/icons/BookmarkIcon';
import SmileIcon from '../ui/icons/SmileIcon';
import { User } from '@/model/user';
import Image from 'next/image';
import { parseDate } from '@/util/date';

type Props = {
  post: SimplePost;
  user: User;
};

export default function PostCard({ post, user }: Props) {
  const { userImage, username, image, likes, text, createdAt } = post;

  return (
    <div className="w-full flex shadow-sm shadow-neutral-300 mb-4 rounded-lg flex-col">
      <div className="p-2 flex items-center">
        <Avatar image={userImage} size="medium" highlight />
        &nbsp;&nbsp;
        <span className="font-bold">{username}</span>
      </div>
      <div>
        <img src={image} alt="" />
      </div>
      <div className="py-2">
        <div className="p-1 px-3 flex justify-between">
          {user && likes?.includes(user.username) ? (
            <HeartFillIcon />
          ) : (
            <HeartIcon />
          )}
          <BookmarkIcon />
        </div>
        <div className="p-1 px-3 text-sm font-semibold">
          {likes?.length || 0} like
          {likes?.length > 1 ? 's' : ''}
        </div>
        <div className="p-1 px-3 text-sm">
          <span className="font-bold">{username}</span>
          &nbsp;&nbsp;
          <span>{text}</span>
        </div>
        <div className="p-1 px-3">
          <span className="text-xs font-light text-gray-500">
            {parseDate(createdAt)?.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-2 flex justify-between items-center border-t border-gray-300">
        <div className="flex items-center">
          <SmileIcon />
          &nbsp;&nbsp;
          <input
            type="text"
            placeholder="Add a comment..."
            className="h-9 w-96 bg-neutral-50 text-gray-500 border-0 text-sm placeholder-gray-400 focus:outline-none focus:ring-white"
          />
        </div>
        <button className="text-cyan-600 font-semibold text-sm">Post</button>
      </div>
    </div>
  );
}
