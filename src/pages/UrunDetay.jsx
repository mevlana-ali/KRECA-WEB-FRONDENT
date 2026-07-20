import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ChevronLeft, Shield, Truck, Award } from 'lucide-react';
import { urunler as urunlerApi } from '../services/api';
import { useSepet } from '../context/SepetContext';
import toast from 'react-hot-toast';
import SEO from '../Components/SEO';

const UrunDetay = () => {
  const { id } = useParams();
  const [urun, setUrun] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [adet, setAdet] = useState(1);
  const { sepeteEkle } = useSepet();

  useEffect(() => {
    urunlerApi.idIleGetir(id)
      .then(res => setUrun(res.data))
      .catch(() => setUrun(null))
      .finally(() => setYukleniyor(false));
  }, [id]);

  const handleEkle = () => {
    sepeteEkle(urun, adet);
    toast.success(`${urun.ad} sepete eklendi!`);
  };

  if (yukleniyor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-100 rounded-xl h-96 animate-pulse" />
          <div className="space-y-4">
            <div className="bg-gray-100 rounded h-8 w-3/4 animate-pulse" />
            <div className="bg-gray-100 rounded h-4 w-full animate-pulse" />
            <div className="bg-gray-100 rounded h-4 w-2/3 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!urun) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-navy mb-4">Ürün Bulunamadı</h2>
        <Link to="/urunler" className="text-primary hover:underline">
          Ürünlere Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={urun.ad} 
        description={`${urun.ad} siparişi ver. ${urun.aciklama.substring(0, 100)}... Sakarya, Hendek Tıbbi Sülük Satışı.`} 
        keywords={`${urun.ad.toLowerCase()}, sülük satın al, sakarya sülük, hendek sülük, ${urun.kategoriAd?.toLowerCase()}`}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* GERİ */}
        <Link
          to="/urunler"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft size={18} />
          Ürünlere Dön
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* GÖRSEL */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {urun.resimUrl ? (
              <img src={urun.resimUrl} alt={urun.ad} className="w-full h-96 object-cover" />
            ) : (
              <div className="h-96 flex items-center justify-center bg-gray-50">
                <span className="text-9xl opacity-20">🐛</span>
              </div>
            )}
          </div>

          {/* BİLGİ */}
          <div>
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {urun.kategoriAd}
            </span>
            <h1 className="text-3xl font-bold text-navy mb-4">{urun.ad}</h1>
            <p className="text-gray-500 leading-relaxed mb-6">{urun.aciklama}</p>

            <div className="text-4xl font-bold text-primary mb-6">
              ₺{urun.fiyat?.toFixed(2)}
            </div>

            {/* STOK */}
            <div className="mb-6">
              {urun.stokAdedi > 0 ? (
                <span className="text-green-600 font-medium text-sm bg-green-50 px-3 py-1 rounded-full">
                  ✓ Stokta Var ({urun.stokAdedi} adet)
                </span>
              ) : (
                <span className="text-red-500 font-medium text-sm bg-red-50 px-3 py-1 rounded-full">
                  Stokta Yok
                </span>
              )}
            </div>

            {/* ADET */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-600 font-medium">Adet:</span>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setAdet(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-bold text-gray-600 border-r border-gray-200"
                >
                  -
                </button>
                <input
                  type="number"
                  value={adet}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0 && val <= urun.stokAdedi) setAdet(val);
                  }}
                  className="w-20 text-center font-semibold text-navy bg-transparent outline-none focus:bg-gray-50 p-2"
                />
                <button
                  onClick={() => setAdet(prev => Math.min(urun.stokAdedi, prev + 1))}
                  disabled={adet >= urun.stokAdedi}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-bold text-gray-600 border-l border-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* SEPETE EKLE */}
            <button
              onClick={handleEkle}
              disabled={urun.stokAdedi === 0}
              className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-lg"
            >
              <ShoppingCart size={22} />
              Sepete Ekle
            </button>

            {/* GÜVENCE */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
              {[
                { icon: Shield, label: 'Güvenli Ödeme' },
                { icon: Truck, label: 'Hızlı Kargo' },
                { icon: Award, label: 'Onaylı Ürün' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <Icon size={24} className="text-primary mx-auto mb-1" />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UrunDetay;