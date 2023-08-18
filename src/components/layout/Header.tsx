'use client';

import Link from 'next/link';
import {
  BiMessageAdd,
  BiSolidMessageAdd,
  BiHomeSmile,
  BiSolidHomeSmile
} from 'react-icons/bi';
import { RiSearchFill, RiSearchLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

// navigation Type
type navigationType = {
  name: string;
  href: string;
  icon: JSX.Element;
  activeIcon?: JSX.Element;
};

const navigation: navigationType[] = [
  {
    name: 'home',
    href: '/',
    icon: <BiHomeSmile />,
    activeIcon: <BiSolidHomeSmile />
  },
  {
    name: 'search',
    href: '/search',
    icon: <RiSearchLine />,
    activeIcon: <RiSearchFill />
  },
  {
    name: 'new',
    href: '/new',
    icon: <BiMessageAdd />,
    activeIcon: <BiSolidMessageAdd />
  }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="p-4 sticky top-0 bg-white z-10">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-lg lg:text-2xl md:text-xl font-bold">
            Vickygram
          </h1>
        </Link>
        <nav className="flex gap-4" aria-label="Global">
          <div className="flex gap-x-4 text-sm md:text-base lg:gap-x-10 md:gap-x-6">
            {/* map rendering navigation icon */}
            {navigation.map((nav, index) => (
              <Link href={nav.href} key={index} className="text-2xl">
                {pathname === nav.href ? nav.activeIcon : nav.icon}
                <span className="hidden">{nav.name}</span>
              </Link>
            ))}
            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
              <span className="relative py-1 px-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                Sign in
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
