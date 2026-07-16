import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useSepet } from '../context/SepetContext';
import logo from '../assets/Logo.jpeg';

const Navbar = () => {
  const { toplamUrun } = useSepet();
  const [menuAcik, setMenuAcik] = useState(false);

  const menuItems = [
    { to: '/', label: 'Ana Sayfa' },
    { to: '/urunler', label: 'Ürünler' },
    { to: '/hakkimizda', label: 'Hakkımızda' },
    { to: '/iletisim', label: 'İletişim' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="K-RECA Logo" className="h-16 w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 relative pb-1
                after:absolute after:bottom-0 after:left-0 after:h-0.5 
                after:bg-primary after:transition-all after:duration-200
                ${isActive
                  ? 'text-primary after:w-full'
                  : 'text-gray-600 hover:text-primary after:w-0 hover:after:w-full'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Sepet + Hamburger */}
        <div className="flex items-center gap-3">
          <Link
            to="/sepet"
            className="relative flex items-center gap-2 bg-primary hover:bg-primary-dark 
                       text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300
                       hover:-translate-y-0.5 hover:shadow-lg"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">Sepet</span>
            {toplamUrun > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white 
                             text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {toplamUrun}
              </span>
            )}
          </Link>

          {/* Hamburger Button — Mobile Only */}
          <button
            onClick={() => setMenuAcik(!menuAcik)}
            className="md:hidden p-2 text-navy hover:text-primary transition-colors"
            aria-label="Menüyü aç/kapat"
          >
            {menuAcik ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuAcik ? 'max-h-80 border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1 bg-white">
          {menuItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuAcik(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;