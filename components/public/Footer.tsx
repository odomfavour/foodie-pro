import { ChefHat } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <ChefHat className="w-12 h-12 text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text" />
            <span className="text-4xl font-black bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">
              SUNDRY FOODS
            </span>
          </div>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Where culinary artistry meets exceptional service. Every meal is a
            celebration of flavor.
          </p>
          <div className="text-white/40">
            <p>&copy; 2025 Sundry Foods. Crafting Memories Through Food.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
