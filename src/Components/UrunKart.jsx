import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useSepet } from '../context/SepetContext';
import toast from 'react-hot-toast';

const UrunKart = ({ urun }) => {
  const { sepeteEkle } = useSepet();

  const handleEkle = (e) => {
    e.preventDefault();
    sepeteEkle(urun);
    toast.success(`${urun.ad} sepete eklendi!`);
  };

  return (
    <Link to={`/urunler/${urun.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="bg-gray-50 h-48 flex items-center justify-center">
          {urun.resimUrl ? (
            <img src={urun.resimUrl} alt={urun.ad} className="h-full w-full object-cover" />
          ) : (
            <div className="text-6xl opacity-20">🐛</div>
          )}
        </div>
        <div className="p-5">
          <span className="text-xs text-primary font-semibold bg-primary/10 px-2 py-1 rounded-full">
            {urun.kategoriAd}
          </span>
          <h3 className="font-bold text-navy mt-2 mb-1">{urun.ad}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{urun.aciklama}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              ₺{urun.fiyat?.toFixed(2)}
            </span>
            <button
              onClick={handleEkle}
              className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-all duration-200 hover:scale-110"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UrunKart;