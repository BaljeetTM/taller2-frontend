'use client';

import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <a href="/">
            <span className="text-xl font-bold text-gray-800 hover:text-black cursor-pointer">
              MiTienda
            </span>
          </a>

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

          {/* Botón Login */}
          <div>
            <Link href="/login">
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
