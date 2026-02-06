'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Reading', href: '/reading' },
  { name: 'Listening', href: '/listening' },
  { name: 'Thoughts', href: '/thoughts' },
  { name: 'Investments', href: '/investments' },
  { name: 'Substack', href: '/substack' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{ borderBottom: '2px solid var(--foreground)' }}>
      <div className="w-full px-6 md:px-12 lg:px-20 py-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-pixel text-2xl"
            style={{ textDecoration: 'none' }}
          >
            /root
          </Link>

          <nav className="flex items-center gap-4 md:gap-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-pixel text-lg md:text-xl hidden md:block"
                  style={{
                    textDecoration: isActive ? 'none' : 'underline',
                    textUnderlineOffset: '3px'
                  }}
                >
                  {isActive && '>'}{item.name}
                </Link>
              );
            })}
            {/* Mobile */}
            {navigation.slice(0, 4).map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={`m-${item.name}`}
                  href={item.href}
                  className="font-pixel text-base md:hidden"
                  style={{
                    textDecoration: isActive ? 'none' : 'underline',
                    textUnderlineOffset: '3px'
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
