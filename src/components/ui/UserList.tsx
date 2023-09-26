import { DetailUser } from '@/model/user';
import Avatar from './Avatar';
import Link from 'next/link';

type Props = {
  list: DetailUser[];
};
export default function UserList({ list }: Props) {
  return (
    <section>
      {list.map(({ name, username, image, following, followers }) => {
        return (
          <div
            className="max-w-2xl m-auto mb-2 border border-neutral-300"
            key={username}
          >
            <Link href={`/user/${username}`} className="flex items-center p-3 ">
              <div className="mr-3">
                <Avatar image={image} size="large" />
              </div>
              <div className="flex-auto">
                <h2 className="text-sm font-bold">{username}</h2>
                <p className="text-sm text-neutral-500">{name}</p>
                <p className="text-sm text-neutral-500">
                  {followers?.length || 0} followers {following?.length || 0}{' '}
                  following
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
}
