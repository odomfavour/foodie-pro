'use client';
import { ChefHat, Menu, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'LOCATIONS', path: '/locations' },
    { label: 'MENU', path: '/menu' },
    { label: 'EXPERIENCE', path: '/experience' },
    { label: 'REVIEWS', path: '/reviews' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl border-b border-white/10"></div>

      <div className="relative max-w-[1440px] mx-auto">
        <div className="w-11/12 mx-auto">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <ChefHat className="w-10 h-10 text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text transform group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
                SUNDRY FOODS
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-12">
              {navItems.map(({ label, path }) => (
                <Link
                  key={label}
                  href={path}
                  className="relative text-white/80 hover:text-white font-bold tracking-wider group transition-all duration-300"
                >
                  {label}
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}

              <div className="flex items-center space-x-4 ml-4">
                <button className="text-white/80 hover:text-white transition-colors duration-300 relative">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></div>
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </div>
                </button>
              </div>

              <Link
                href="/signup"
                className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-bold tracking-wider hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 group"
              >
                <span className="relative z-10">Signup</span>
                <Sparkles className="absolute top-1 right-1 w-4 h-4 text-white/60 animate-pulse" />
              </Link>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
