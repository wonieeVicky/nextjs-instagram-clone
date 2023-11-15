'use client';

import Link from 'next/link';
import Avatar from '../ui/Avatar';
import { AuthUser } from '@/model/user';

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

type Props = {
  user: AuthUser;
};

export default function Sidebar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && (
          <Link href={`/user/${username}`}>
            <Avatar image={image} />
          </Link>
        )}
        <div className="ml-4">
          <Link href={`/user/${username}`}>
            <p className="font-bold">{username}</p>
            <p className="text-lg text-neutral-500 leading-4">{name}</p>
          </Link>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        {NAV_ITEMS.map((item) => {
          return item.title;
        }).join(' · ')}
      </p>
      <p className="text-sm font-bold mt-8 text-neutral-500">
        @Copyright VICKYGRAM from Metaaa
      </p>
    </>
  );
}
