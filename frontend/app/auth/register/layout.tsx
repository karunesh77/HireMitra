import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your free HireMitra account. Join as a worker to find jobs or as an employer to hire skilled workers.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
