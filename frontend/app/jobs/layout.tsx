import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse Jobs - HireMitra',
  description: 'Find blue-collar jobs near you. Browse plumbing, electrical, carpentry, painting and more job opportunities on HireMitra.',
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
