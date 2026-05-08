import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - HireMitra',
    default: 'Authentication - HireMitra',
  },
  description: 'Sign in or create your HireMitra account to find blue-collar jobs or hire skilled workers.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
