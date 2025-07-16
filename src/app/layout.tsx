import type { Metadata } from 'next';
import './globals.css';
import MainLayout from '@/components/layout/main-layout';

export const metadata: Metadata = {
  title: 'Gena Dashboards',
  description: 'Create and manage interactive dashboards',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
