import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Truck } from 'lucide-react';
import { useSepet } from '../context/SepetContext';

const OdemeBasarili = () => {
  const [searchParams] = useSearchParams();
  const { sepetiBosalt } = useSepet();

  // PayTR başarılı redirect sonrası sepeti boşalt ve iframe'den çık
  useEffect(() => {
    if (window.self !== window.top) {
      window.top.location.href = window.location.href;
    } else {
      sepetiBosalt();
    }
  }, [sepetiBosalt]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-navy mb-4">Siparişiniz Alındı!</h1>
        <p className="text-gray-500 mb-2">
          Ödemeniz başarıyla tamamlandı.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Siparişiniz hazırlandıktan sonra kargoya verilecek ve tarafınıza bildirim yapılacaktır.
        </p>

        {/* Sipariş Adımları */}
        <div className="flex items-center justify-center gap-4 mb-8 text-sm">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <span className="text-green-600 font-medium">Ödeme</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-200" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Package size={20} className="text-primary" />
            </div>
            <span className="text-gray-500">Hazırlık</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-200" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Truck size={20} className="text-gray-400" />
            </div>
            <span className="text-gray-400">Kargo</span>
          </div>
        </div>

        <Link
          to="/"
          className="block w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          Ana Sayfaya Dön
        </Link>
        <Link
          to="/urunler"
          className="block w-full border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary font-semibold py-3 rounded-xl transition-all duration-300 mt-3"
        >
          Alışverişe Devam Et
        </Link>
      </div>
    </div>
  );
};

export default OdemeBasarili;