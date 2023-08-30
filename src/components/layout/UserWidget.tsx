'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Avatar from '../ui/Avatar';

const NAV_ITEMS = [
  { title: 'About', href: '/about' },
  { title: 'Help', href: '/help' },
  { title: 'Press', href: '/press' },
  { title: 'API', href: '/api' },
  { title: 'Jobs', href: '/jobs' },
  { title: 'Privacy', href: '/privacy' },
  { title: 'Terms', href: '/terms' },
  { title: 'Locations', href: '/locations' },
  { title: 'Language', href: '/language' }
];

export default function UserWidget() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="flex-none w-72 p-5">
      <div className="flex items-center mb-6">
        <Link href={`/user/${session?.user.username}`}>
          <Avatar size="md" image={session?.user.image} border={false} />
        </Link>
        <div className="ml-4 flex flex-col">
          <p className="font-bold text-sm">{session?.user.username}</p>
          <p className="text-slate-500">{session?.user.name}</p>
        </div>
      </div>
      <div>
        <ul className="flex flex-wrap mb-6">
          {NAV_ITEMS.map((item, idx) => {
            return (
              <li key={item.title} className="text-sm text-slate-500 mb-1">
                <Link href={item.href} className="hover:text-slate-600">
                  {item.title}
                </Link>
                {idx !== NAV_ITEMS.length - 1 && '∙'}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-500">
          @Copyright VICKYGRAM from Metaaa
        </p>
      </div>
    </div>
  );
}
