import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black">
      {/* Left Side - Image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/chef.jpg')",
          backgroundPosition: 'center center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{' '}
        {/* Dark Overlay */}
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-900 p-4">
        <div className="w-full max-w-md p-8 rounded-xl bg-gray-800 border border-gray-700 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
