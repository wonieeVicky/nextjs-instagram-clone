import { searchUsers } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { keyword: string };
};
export async function GET(_: NextRequest, context: Context) {
  // 로그인 여부를 보지 않는다.

  return searchUsers(context.params.keyword) //
    .then((data) => NextResponse.json(data));
}
