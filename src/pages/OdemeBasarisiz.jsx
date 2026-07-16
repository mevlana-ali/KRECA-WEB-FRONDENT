import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XCircle, RefreshCw, MessageCircle } from 'lucide-react';

const OdemeBasarisiz = () => {
  useEffect(() => {
    if (window.self !== window.top) {
      window.top.location.href = window.location.href;
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} className="text-red-400" />
        </div>
        <h1 className="text-3xl font-bold text-navy mb-4">Ödeme Başarısız</h1>
        <p className="text-gray-500 mb-2">
          Ödemeniz işlenirken bir sorun oluştu.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Kart limiti, yetersiz bakiye veya banka kaynaklı bir sorun olabilir. Lütfen tekrar deneyin veya farklı bir kart kullanın.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to="/sepet"
            className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            <RefreshCw size={18} /> Tekrar Dene
          </Link>
          <a
            href="https://wa.me/905416148791"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            <MessageCircle size={18} /> WhatsApp ile Yardım Al
          </a>
          <Link
            to="/iletisim"
            className="block w-full border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary font-semibold py-3 rounded-xl transition-all duration-300"
          >
            İletişime Geç
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OdemeBasarisiz;