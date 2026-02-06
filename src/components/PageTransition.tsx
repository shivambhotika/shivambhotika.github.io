'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Define page hierarchy levels
const getPageLevel = (pathname: string): number => {
  if (pathname === '/') return 0;
  // Section pages (e.g., /thoughts, /reading)
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 1) return 1;
  // Individual items (e.g., /thoughts/my-post)
  return 2;
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [showContent, setShowContent] = useState(true);

  const handleRouteChange = useCallback(() => {
    const prevLevel = getPageLevel(prevPathname);
    const currentLevel = getPageLevel(pathname);

    // Only show loading when navigating "down" (to a deeper level)
    if (currentLevel > prevLevel) {
      setIsLoading(true);
      setShowContent(false);

      // Show loading for 1.5 seconds
      setTimeout(() => {
        setIsLoading(false);
        setShowContent(true);
      }, 1500);
    }

    setPrevPathname(pathname);
  }, [pathname, prevPathname]);

  useEffect(() => {
    if (pathname !== prevPathname) {
      handleRouteChange();
    }
  }, [pathname, prevPathname, handleRouteChange]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-bar">
            <div className="loading-bar-fill" />
          </div>
          <span className="loading-text font-pixel">loading_</span>
        </div>
      </div>
    );
  }

  return (
    <div className={showContent ? 'fade-in' : ''}>
      {children}
    </div>
  );
}
