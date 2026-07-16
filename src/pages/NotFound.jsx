import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <div className="text-[150px] font-bold text-gray-100 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search size={64} className="text-primary/30" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-navy mb-4">Sayfa Bulunamadı</h1>
        <p className="text-gray-500 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <Home size={18} /> Ana Sayfa
          </Link>
          <Link
            to="/urunler"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary font-semibold px-6 py-3 rounded-xl transition-all duration-300"
          >
            <ArrowLeft size={18} /> Ürünlere Git
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
