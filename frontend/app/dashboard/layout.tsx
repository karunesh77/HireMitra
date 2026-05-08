import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s - HireMitra Dashboard',
    default: 'Dashboard - HireMitra',
  },
  description: 'Manage your jobs, applications, and profile on HireMitra.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
