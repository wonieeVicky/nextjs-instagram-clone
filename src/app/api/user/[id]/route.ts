import { getUserByUsername } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  // 로그인 여부를 보지 않는다.

  return getUserByUsername(context.params.id) //
    .then((data) => NextResponse.json(data));
}
