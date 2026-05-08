import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center gap-1.5 text-sm ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          {item.href ? (
            <Link href={item.href} className="text-[#FF7A00] hover:text-[#E66A00] transition-colors font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#6B7280] font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <svg className="w-3.5 h-3.5 text-[#D1D5DB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </nav>
  );
}
