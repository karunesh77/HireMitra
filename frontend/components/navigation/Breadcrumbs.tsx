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
    <nav className={`flex items-center gap-2 ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="text-[#FF7A00] hover:text-[#E66A00] transition font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#4A4A4A] font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="text-[#E5E7EB]">/</span>
          )}
        </div>
      ))}
    </nav>
  );
}
