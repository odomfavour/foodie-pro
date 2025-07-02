import Footer from '@/components/public/Footer';
import Header from '@/components/public/Header';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
