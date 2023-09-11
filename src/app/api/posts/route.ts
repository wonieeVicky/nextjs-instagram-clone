import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getFollowingPostsOf } from '@/service/posts';

export async function GET() {
  // token을 분석/해독해서 고객 정보를 가져온다.
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Unauthorized', { status: 401 }); // 401 Unauthorized
  }

  return getFollowingPostsOf(user.username).then((data) =>
    NextResponse.json(data)
  );
}
