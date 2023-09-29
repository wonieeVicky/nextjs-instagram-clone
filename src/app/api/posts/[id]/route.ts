import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getPost } from '@/service/posts';
import { authOptions } from '../../auth/[...nextauth]/route';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: Context) {
  // token을 분석/해독해서 고객 정보를 가져온다.
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Unauthorized', { status: 401 }); // 401 Unauthorized
  }

  return getPost(context.params.id).then((data) => NextResponse.json(data));
}
