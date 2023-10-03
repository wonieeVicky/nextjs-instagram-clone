import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    slug: string[]; // slug/slug/slug...
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;
  if (!slug || !Array.isArray(slug) || slug.length === 0) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [username, query] = slug;

  const mapServiceFuncToQuery = {
    posts: getPostsOf,
    liked: getLikedPostsOf,
    saved: getSavedPostsOf
  };

  let request =
    mapServiceFuncToQuery[(query as 'posts' | 'liked' | 'saved') ?? 'posts'];

  return request(username).then((data) => NextResponse.json(data));
}
