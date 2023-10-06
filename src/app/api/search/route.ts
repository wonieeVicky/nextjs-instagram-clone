import { searchUsers } from '@/service/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // next에게 항상 요청을 동적으로 처리하도록 지시

export async function GET() {
  // 로그인 여부를 보지 않는다.
  // 항상 동일한 함수를 호출하므로 SSG로 처리됨
  return searchUsers().then((data) => NextResponse.json(data));
}
