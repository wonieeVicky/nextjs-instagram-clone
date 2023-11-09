import { NextResponse } from 'next/server';
import { getUserByUsername } from '@/service/user';
import { withSessionUser } from '@/util/session';

export async function GET() {
  // token을 분석/해독해서 고객 정보를 가져온다.
  return withSessionUser(async (user) =>
    getUserByUsername(user.username).then((data) => NextResponse.json(data))
  );
}
