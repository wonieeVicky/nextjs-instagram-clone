import Link from 'next/link';
import { TbHome, TbSearch } from 'react-icons/tb';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { IconType } from 'react-icons';

// navigation Type
type navigationType = {
  name: string;
  href: string;
  icon: JSX.Element;
};

const navigation: navigationType[] = [
  { name: 'home', href: '/', icon: <TbHome /> },
  { name: 'search', href: '/', icon: <TbSearch /> },
  { name: 'add', href: '/', icon: <BiMessageSquareAdd /> }
];

export default function Header() {
  return (
    <header className="p-4 sticky top-0 bg-white z-10">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-lg lg:text-2xl md:text-xl font-semibold">
            Vickygram
          </h1>
        </Link>
        <nav className="flex gap-4" aria-label="Global">
          <div className="flex gap-x-4 text-sm md:text-base lg:gap-x-10 md:gap-x-6">
            {/* map rendering navigation icon */}
            {navigation.map((nav, index) => (
              <Link href={nav.href} key={index} className="text-2xl">
                {nav.icon}
                <span className="hidden">{nav.name}</span>
              </Link>
            ))}
            <button>Sign in</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
