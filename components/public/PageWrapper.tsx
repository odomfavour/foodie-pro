'use client';

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/auth-provider';
import { ToastContainer } from 'react-toastify';

interface DashboardWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<DashboardWrapperProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div>{children}</div>
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default PageWrapper;
