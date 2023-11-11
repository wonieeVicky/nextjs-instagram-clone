import { NextRequest, NextResponse } from 'next/server';
import { createPost, getFollowingPostsOf } from '@/service/posts';
import { withSessionUser } from '@/util/session';

export async function GET() {
  // token을 분석/해독해서 고객 정보를 가져온다.
  return withSessionUser(async (user) =>
    getFollowingPostsOf(user.username).then((data) => NextResponse.json(data))
  );
}
export async function POST(req: NextRequest) {
  // token을 분석/해독해서 고객 정보를 가져온다.
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const text = form.get('text')?.toString();
    const file = form.get('file') as Blob;

    if (!text || !file) {
      return new Response('Bad Request', { status: 400 }); // 400 Bad Request
    }

    return createPost(user.id, text, file).then((data) =>
      NextResponse.json(data)
    );
  });
}
