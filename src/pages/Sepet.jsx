import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronRight, Truck } from 'lucide-react';
import { useSepet } from '../context/SepetContext';
import { ayarlar as ayarlarApi } from '../services/api';

const Sepet = () => {
  const { sepet, sepettenCikar, adetGuncelle, toplamTutar } = useSepet();
  const navigate = useNavigate();
  const [kargoAyarlari, setKargoAyarlari] = useState(null);

  useEffect(() => {
    ayarlarApi.kargoGetir()
      .then(res => setKargoAyarlari(res.data))
      .catch(() => setKargoAyarlari({ kargoUcreti: 150, ucretsizKargoLimiti: 0, ucretsizKargoAktif: false }));
  }, []);

  const kargoUcreti = kargoAyarlari
    ? (kargoAyarlari.ucretsizKargoAktif && toplamTutar >= kargoAyarlari.ucretsizKargoLimiti ? 0 : kargoAyarlari.kargoUcreti)
    : 150;

  const ucretsizKargoaKalan = kargoAyarlari?.ucretsizKargoAktif
    ? Math.max(0, kargoAyarlari.ucretsizKargoLimiti - toplamTutar)
    : 0;

  if (sepet.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={80} className="text-gray-200 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-navy mb-4">Sepetiniz Boş</h2>
          <p className="text-gray-400 mb-8">Henüz sepetinize ürün eklemediniz.</p>
          <Link
            to="/urunler"
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
          >
            Ürünlere Git
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Sepetim</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ÜRÜNLER */}
          <div className="lg:col-span-2 space-y-4">
            {sepet.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-6">
                <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                  {item.resimUrl ? (
                    <img src={item.resimUrl} alt={item.ad} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-3xl opacity-20">🐛</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-navy">{item.ad}</h3>
                  <p className="text-primary font-semibold mt-1">₺{item.fiyat?.toFixed(2)}</p>
                </div>

                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => adetGuncelle(item.id, item.adet - 1)}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-bold text-gray-600"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold text-navy">{item.adet}</span>
                  <button
                    onClick={() => adetGuncelle(item.id, item.adet + 1)}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors font-bold text-gray-600"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-bold text-navy">₺{(item.fiyat * item.adet).toFixed(2)}</p>
                  <button
                    onClick={() => sepettenCikar(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ÖZET */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-navy mb-6">Sipariş Özeti</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Ara Toplam</span>
                  <span>₺{toplamTutar.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Kargo</span>
                  {kargoUcreti === 0 ? (
                    <span className="text-green-600 font-semibold">Ücretsiz ✓</span>
                  ) : (
                    <span>₺{kargoUcreti.toFixed(2)}</span>
                  )}
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-navy text-lg">
                  <span>Toplam</span>
                  <span>₺{(toplamTutar + kargoUcreti).toFixed(2)}</span>
                </div>
              </div>

              {/* Ücretsiz Kargo Bilgisi */}
              {kargoAyarlari?.ucretsizKargoAktif && ucretsizKargoaKalan > 0 && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
                    <Truck size={16} />
                    <span>Ücretsiz kargoya ₺{ucretsizKargoaKalan.toFixed(0)} kaldı!</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (toplamTutar / kargoAyarlari.ucretsizKargoLimiti) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {kargoAyarlari?.ucretsizKargoAktif && kargoUcreti === 0 && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg flex items-center gap-2 text-green-700 text-sm font-medium">
                  <Truck size={16} />
                  <span>🎉 Ücretsiz kargo kazandınız!</span>
                </div>
              )}

              <button
                onClick={() => navigate('/odeme')}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Ödemeye Git <ChevronRight size={18} />
              </button>

              <Link
                to="/urunler"
                className="block text-center text-gray-400 hover:text-primary transition-colors mt-4 text-sm"
              >
                Alışverişe Devam Et
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sepet;