import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUsers } from '@/service/user';

export async function GET(request: Request) {
  // token을 분석/해독해서 고객 정보를 가져온다.
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Unauthorized', { status: 401 }); // 401 Unauthorized
  }

  // get searchParams
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as 'all' | 'search';
  const data = searchParams.get('value') || undefined;

  return getUsers(type, data).then((data) => NextResponse.json(data));
}
