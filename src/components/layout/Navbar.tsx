﻿'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import HomeIcon from '../ui/icons/HomeIcon';
import HomeFillIcon from '../ui/icons/HomeFillIcon';
import SearchIcon from '../ui/icons/SearchIcon';
import SearchFillIcon from '../ui/icons/SearchFillIcon';
import NewIcon from '../ui/icons/NewIcon';
import NewFillIcon from '../ui/icons/NewFillIcon';
import ColorButton from '../ui/ColorButton';
import { signIn, signOut, useSession } from 'next-auth/react';
import Avatar from '../ui/Avatar';

// navigation Type
type menuType = {
  href: string;
  icon: JSX.Element;
  clickedIcon?: JSX.Element;
};

const menu: menuType[] = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />
  }
];

export default function Navbar() {
  const pathname = usePathname();

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-3xl font-bold">Vickygram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {pathname === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}

          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton text="Sign out" onClick={signOut} />
            ) : (
              <ColorButton text="Sign in" onClick={signIn} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
