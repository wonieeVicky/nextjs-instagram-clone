import { getPostsOf } from '@/service/posts';
import { getUserByUsername } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  const userInfo = getUserByUsername(context.params.id);
  const posts = getPostsOf(context.params.id);

  return Promise.all([userInfo, posts]).then(([userInfo, posts]) =>
    NextResponse.json({ userInfo, posts })
  );
}
