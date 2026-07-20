import { useEffect, useState } from 'react';
import { Filter, X, Search } from 'lucide-react';
import { urunler as urunlerApi, kategoriler as kategorilerApi } from '../services/api';
import UrunKart from '../Components/UrunKart';
import SEO from '../Components/SEO';

const Urunler = () => {
  const [tumUrunler, setTumUrunler] = useState([]);
  const [kategoriler, setKategoriler] = useState([]);
  const [seciliKategori, setSeciliKategori] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setYukleniyor(true);
      try {
        const [katRes, urunRes] = await Promise.all([
          kategorilerApi.hepsiniGetir(),
          urunlerApi.hepsiniGetir()
        ]);
        setKategoriler(katRes.data || []);
        setTumUrunler(urunRes.data || []);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setYukleniyor(false);
      }
    };
    fetchData();
  }, []);

  const urunler = seciliKategori 
    ? tumUrunler.filter(u => u.kategoriId === seciliKategori)
    : tumUrunler;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Ürünlerimiz" 
        description="Steril koşullarda üretilmiş tıbbi sülükler. İhtiyacınıza uygun boy (küçük, orta, büyük) sülük fiyatları ve toptan sülük siparişi." 
        keywords="sülük fiyatları, toptan sülük fiyatları, sülük siparişi, küçük boy sülük, orta boy sülük, büyük boy sülük, sakarya sülük fiyatları"
      />

      {/* HEADER */}
      <div className="bg-navy text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Ürünlerimiz</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Tarım Bakanlığı onaylı işletmemizde üretilen tıbbi sülük çeşitlerimizi inceleyin.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* KATEGORİ FİLTRE */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setSeciliKategori(null)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
              seciliKategori === null
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary shadow-sm'
            }`}
          >
            Tümü
          </button>
          {kategoriler.map(kat => {
            const urunSayisi = tumUrunler.filter(u => u.kategoriId === kat.id).length;
            const bosMu = urunSayisi === 0;

            return (
              <button
                key={kat.id}
                onClick={() => !bosMu && setSeciliKategori(kat.id)}
                disabled={bosMu}
                className={`relative px-5 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                  bosMu 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                    : seciliKategori === kat.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary shadow-sm border border-transparent'
                }`}
              >
                {kat.ad}
                {bosMu && (
                  <span className="text-[10px] bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Çok Yakında
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ÜRÜN LİSTESİ */}
        {yukleniyor ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : urunler.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {urunler.map(urun => (
              <UrunKart key={urun.id} urun={urun} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-lg">Bu kategoride ürün bulunamadı.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Urunler;