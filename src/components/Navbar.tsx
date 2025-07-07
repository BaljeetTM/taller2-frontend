'use client';

import { useAuth } from '@/hooks/useAuth';
import { useCartStore } from '@/stores/CartStore';
import { ShoppingCartIcon, User, UserIcon } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {

  const {items: cart} = useCartStore();
  const {user} = useAuth();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/">
            <span className="text-xl font-bold text-gray-800 hover:text-black cursor-pointer">
              MiTienda
            </span>
          </Link>

          {/* Enlaces */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-black">
              Productos
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              Ofertas
            </a>
            <a href="#" className="text-gray-700 hover:text-black">
              Sobre Nosotros
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
            <div>
              <Link href={'/profile'} className="flex items-center hover:bg-blue-400 rounded-full p-2 transition">
                <UserIcon className="h-5 w-5 mr-2" />
                <span className="ml-2">{user.firtsName}</span>
              </Link>
            </div>
          ):
          <div>
            <Link href="/login">
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                Login
              </button>
            </Link>
          </div>
          }

          <div>
            <Link href={'/cart'} className="relative flex item-center hover:bg-blue-400 rounded-full p-2 transition-all">
              <ShoppingCartIcon className="w-6 h-6"/>
              {
                totalItems > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                    {totalItems}
                  </span>
                )
              }
            </Link>
          </div>
          </div>

        </div>
      </div>
    </nav>
  );
};
