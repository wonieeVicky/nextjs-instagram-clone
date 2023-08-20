'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from '../ui/icons/HomeIcon';
import HomeFillIcon from '../ui/icons/HomeFillIcon';
import SearchIcon from '../ui/icons/SearchIcon';
import SearchFillIcon from '../ui/icons/SearchFillIcon';
import NewIcon from '../ui/icons/NewIcon';
import NewFillIcon from '../ui/icons/NewFillIcon';

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

  return (
    <div>
      <Link href="/">
        <h1>Vickygram</h1>
      </Link>
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {pathname === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
// <header className="p-4 sticky top-0 bg-white z-10">
//   <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
//     <Link href="/">
//       <h1 className="text-lg lg:text-2xl md:text-xl font-bold">
//         Vickygram
//       </h1>
//     </Link>
//     <nav className="flex gap-4" aria-label="Global">
//       <div className="flex gap-x-4 text-sm md:text-base lg:gap-x-10 md:gap-x-6">
//         {/* map rendering navigation icon */}
//         {navigation.map((nav, index) => (
//           <Link
//             href={nav.href}
//             key={index}
//             className="text-2xl h-max items-center"
//           >
//             {pathname === nav.href ? nav.clickedIcon : nav.icon}
//             <span className="hidden">{nav.name}</span>
//           </Link>
//         ))}
//         <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
//           <span className="relative py-1 px-2 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
//             Sign in
//           </span>
//         </button>
//       </div>
//     </nav>
//   </div>
// </header>
