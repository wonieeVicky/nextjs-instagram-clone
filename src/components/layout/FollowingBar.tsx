'use client';
import { DetailUser } from '@/model/user';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';

import useSWR from 'swr';
import Avatar from '../ui/Avatar';

// 사용자의 유저 정보로 팔로잉 리스트를 받아와야 함 => SSR로 구현 시 과부하. CSR로 구현
export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 사용자의 정보를 얻어온다.
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서 Sanity에 접근한다. (service/user.ts)
  // 3. 백엔드에서 사용자의 상세 정보(followings)를 Sanity에서 가지고 온다.(/api/me/route.ts)
  // 4. 여기에서 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여준다(image, username)

  const { data, isLoading: loading } = useSWR<DetailUser>('/api/me');
  const users = data?.following;

  return (
    <section>
      {loading ? (
        <PropagateLoader size={8} color="green" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ul>
          {users.map(({ image, username }) => (
            <li key={username}>
              <Link href={`/user/${username}`}>
                <Avatar image={image} highlight />
                <p>{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
