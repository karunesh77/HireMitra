'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLink {
  href: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  links: SidebarLink[];
  title?: string;
}

export default function Sidebar({ links, title }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className="p-6 space-y-2 h-full overflow-y-auto bg-white border-r border-[#E5E7EB]">
      {title && (
        <h3 className="text-lg font-bold text-[#001F3F] mb-6 px-4">{title}</h3>
      )}
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${
            isActive(link.href)
              ? 'bg-[#FF7A00] text-white shadow-md'
              : 'text-[#4A4A4A] hover:bg-gray-100 hover:text-[#001F3F]'
          }`}
        >
          <span className="text-xl">{link.icon}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
