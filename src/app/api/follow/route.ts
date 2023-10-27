﻿import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { followUser, unfollowUser } from '@/service/user';

// PUT Follow
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { id, follow } = await req.json();

  if (!id || follow === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = follow ? followUser : unfollowUser;
  return request(user.id, id)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
