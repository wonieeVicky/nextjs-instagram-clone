'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Avatar from '../ui/Avatar';

export default function UserWidget() {
  const { data: session } = useSession();

  return (
    <div className="flex-none w-96">
      <div className="flex mb-6">
        <Link href={`/user/${session?.user.username}`}>
          <Avatar size="md" image={session?.user.image} border={false} />
        </Link>
        <div className="ml-5">
          <p className="font-bold">{session?.user.username}</p>
          <p className="text-slate-500 text-lg">{session?.user.name}</p>
        </div>
      </div>
    </div>
  );
}
