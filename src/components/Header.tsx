'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Thoughts', href: '/thoughts', dividerAfter: true },
  { name: 'Reading', href: '/reading' },
  { name: 'Listening', href: '/listening' },
  { name: 'Investments', href: '/investments' },
  { name: 'Podcast', href: '/podcast' },
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
            /gt
          </Link>

          <nav className="flex items-center gap-4 md:gap-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <span key={item.name} className="hidden md:flex items-center gap-4 md:gap-6">
                  <Link
                    href={item.href}
                    className="font-pixel text-lg md:text-xl"
                    style={{
                      textDecoration: isActive ? 'none' : 'underline',
                      textUnderlineOffset: '3px'
                    }}
                  >
                    {isActive && '>'}{item.name}
                  </Link>
                  {item.dividerAfter && <span className="font-pixel text-lg md:text-xl text-muted">|</span>}
                </span>
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
