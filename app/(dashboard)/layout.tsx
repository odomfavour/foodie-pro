import DashboardWrapper from '@/components/public/DashboardWrapper';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardWrapper>{children}</DashboardWrapper>
    </>
  );
}
