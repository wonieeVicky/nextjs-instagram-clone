import { searchUsers } from '@/service/user';
import { NextResponse } from 'next/server';

export async function GET() {
  // 로그인 여부를 보지 않는다.
  return searchUsers().then((data) => NextResponse.json(data));
}
