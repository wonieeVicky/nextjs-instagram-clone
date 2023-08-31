'use client';

import Avatar from '../ui/Avatar';
import { User } from '@/model/user';

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
  user: User;
};

export default function Sidebar({ user: { name, username, image } }: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        {NAV_ITEMS.map((item, idx) => {
          return (
            <span key={item.title}>
              {item.title}
              {idx !== NAV_ITEMS.length - 1 && '∙'}
            </span>
          );
        })}
      </p>
      <p className="text-sm font-bold mt-8 text-neutral-500">
        @Copyright VICKYGRAM from Metaaa
      </p>
    </>
  );
}
