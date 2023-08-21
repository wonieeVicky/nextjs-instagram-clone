﻿'use client'; //next에서 context를 사용하기 위해서는 csr 렌더링으로 명시해야 함
// context는 상태를 가지고 있기 때문에 서버컴포넌트는 상태에 접근 할 수 없음
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
