'use client';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import Avatar from '../ui/Avatar';
import ScrollableBar from '../ui/ScrollableBar';
import useMe from '@/hooks/user';

// 사용자의 유저 정보로 팔로잉 리스트를 받아와야 함 => SSR로 구현 시 과부하. CSR로 구현
export default function FollowingBar() {
  const { data, isLoading: loading } = useMe();
  const users = data?.following;

  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0">
      {loading ? (
        <PropagateLoader size={8} color="green" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }, i) => (
            <Link
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
              key={i}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
