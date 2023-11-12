'use client';

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
  title: string;
};

const menu: menuType[] = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    title: 'Home'
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: 'Search users'
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    title: 'New post'
  }
];

export default function Navbar() {
  const pathname = usePathname();

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/" aria-label="Vickygram">
        <h1 className="text-3xl font-bold">Vickygram</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-label={item.title}>
                {pathname === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}

          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size="small" highlight />
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
