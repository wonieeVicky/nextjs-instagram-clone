'use client';
import { DetailUser, User } from '@/model/user';

import useSWR from 'swr';

type Props = {
  user: User;
};

// 사용자의 유저 정보로 팔로잉 리스트를 받아와야 함 => SSR로 구현 시 과부하. CSR로 구현
export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 사용자의 정보를 얻어온다.
  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서 Sanity에 접근한다. (service/user.ts)
  // 3. 백엔드에서 사용자의 상세 정보(followings)를 Sanity에서 가지고 온다.(/api/me/route.ts)
  // 4. 여기에서 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여준다(image, username)

  const { data, isLoading } = useSWR<DetailUser>('/api/me');

  // const followings = await getFollowings({ username: user.username });

  // if (!followings) {
  //   return;
  // }

  return (
    <div className="border p-8 rounded-md">
      {/* <MultiCarousel>
        {followings.map(({ name, username, email, image }: User) => (
          <div key={username} className="flex flex-col items-center">
            <Avatar image={image} highlight />
            <p>{username}</p>
          </div>
        ))}
      </MultiCarousel> */}
    </div>
  );
}
