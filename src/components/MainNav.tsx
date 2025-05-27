'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MainNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: '/',
      label: 'Dashboard',
      active: pathname === '/',
    },
    {
      href: '/companies',
      label: 'Companies',
      active: pathname === '/companies' || pathname.startsWith('/companies/'),
    },
    {
      href: '/analysis',
      label: 'AI Analysis',
      active: pathname === '/analysis',
    },
    {
      href: '/import',
      label: 'Import Data',
      active: pathname === '/import',
    },
    {
      href: '/reports',
      label: 'Reports',
      active: pathname === '/reports',
    },
  ];

  return (
    <nav className="flex items-center space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}