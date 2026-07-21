import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Award, ChevronRight, Activity, HeartPulse, Droplets, Brain, Bone, Eye, Sparkles, Stethoscope } from 'lucide-react';
import { urunler as urunlerApi } from '../services/api';
import UrunKart from '../Components/UrunKart';
import logo from '../assets/Logo.jpeg';
import SEO from '../Components/SEO';

const Anasayfa = () => {
  const [urunler, setUrunler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    urunlerApi.hepsiniGetir(true)
      .then(res => setUrunler(res.data.slice(0, 4)))
      .catch(() => setUrunler([]))
      .finally(() => setYukleniyor(false));
  }, []);

  return (
    <div>
      <SEO 
        title="Ana Sayfa" 
        description="Sakarya ve Hendek başta olmak üzere tüm Türkiye'ye Tarım Bakanlığı onaylı tıbbi sülük satışı. Toptan ve perakende sülük siparişi." 
        keywords="sülük satışı, tıbbi sülük, sakarya sülük, hendek sülük satışı, adapazarı sülük, akyazı sülük, toptan sülük, sülük tedavisi"
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-navy to-navy-light text-white py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <span className="inline-block bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Resmi Onaylı İşletme
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              K-RECA <span className="text-primary">Tıbbi Sülük</span> Üretim ve Satış
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Tarım Bakanlığı onaylı işletmemizde üretilen tıbbi sülükler,
              toptan ve perakende olarak güvenle satışa sunulmaktadır.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/urunler"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
              >
                Ürünleri İncele <ChevronRight size={18} />
              </Link>
              <Link
                to="/hakkimizda"
                className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-3 rounded-lg transition-all duration-300"
              >
                Hakkımızda
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-80 h-80 bg-navy-light rounded-2xl flex items-center justify-center border border-primary/30 overflow-hidden shadow-2xl">
              <img src={logo} alt="K-RECA Logo" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* GÜVENLİ ALIŞVERİŞ */}
      <section className="py-8 bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} />
              <span className="font-semibold">%100 Güvenli Alışveriş</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck size={24} />
              <span className="font-semibold">Hızlı Kargo</span>
            </div>
            <div className="flex items-center gap-3">
              <Award size={24} />
              <span className="font-semibold">Tarım Bakanlığı Onaylı</span>
            </div>
          </div>
        </div>
      </section>

      {/* ÖZELLIKLER */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy mb-4">Neden K-RECA?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Kaliteli üretim, güvenli teslimat ve müşteri memnuniyeti odaklı hizmet anlayışımızla fark yaratıyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏆',
                baslik: 'Resmi Onaylı',
                aciklama: 'Tarım Bakanlığı tarafından onaylanmış resmi işletme belgesine sahibiz.'
              },
              {
                icon: '🔒',
                baslik: 'Güvenli Ödeme',
                aciklama: 'PayTR altyapısı ile ödemeleriniz 256-bit SSL şifrelemesiyle korunmaktadır.'
              },
              {
                icon: '📦',
                baslik: 'Hızlı Teslimat',
                aciklama: 'Siparişleriniz özenle paketlenerek en kısa sürede kargoya verilmektedir.'
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3">{item.baslik}</h3>
                <p className="text-gray-500 leading-relaxed">{item.aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SÜLÜK TEDAVİSİNİN FAYDALARI */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full mb-4">
              Doğal Şifa Kaynağı
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">Sülük Tedavisi (Hirudoterapi) Hangi Hastalıklara İyi Gelir?</h2>
            <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed text-lg">
              Tıbbi sülüklerin salgıladığı 100'den fazla biyoaktif enzim (Hirudin, Calin, Eglin vb.) kanı sulandırır, ağrıları keser ve doku yenilenmesini hızlandırır. İşte sülük tedavisinin en çok kullanıldığı alanlar:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Activity,
                baslik: 'Kalp ve Damar Hastalıkları',
                aciklama: 'Varis, venöz yetmezlik, damar tıkanıklıkları ve pıhtılaşma sorunlarında kanı incelterek kan akışını düzenler ve damarları rahatlatır.'
              },
              {
                icon: Bone,
                baslik: 'Eklem ve Romatizma',
                aciklama: 'Kireçlenme (Osteoartrit), romatoid artrit, bel ve boyun fıtığı gibi iskelet sistemi rahatsızlıklarında doğal ağrı kesici (analjezik) etki sağlar.'
              },
              {
                icon: HeartPulse,
                baslik: 'Yüksek Tansiyon',
                aciklama: 'Kılcal damarları açıp spazmları çözerek kan basıncının doğal yollarla düşürülmesine ve dengelenmesine yardımcı olur.'
              },
              {
                icon: Brain,
                baslik: 'Nörolojik Rahatsızlıklar',
                aciklama: 'Migren, gerilim tipi baş ağrıları, kulak çınlaması (Tinnitus) ve sinir sıkışması gibi problemlerde sinirleri gevşetip rahatlatır.'
              },
              {
                icon: Eye,
                baslik: 'Göz Hastalıkları',
                aciklama: 'Glokom (Göz tansiyonu), diyabetik retinopati ve göz içi kanamalarda göz çevresindeki basıncı azaltarak görme kalitesini destekler.'
              },
              {
                icon: Sparkles,
                baslik: 'Cilt ve Güzellik (Anti-Aging)',
                aciklama: 'Egzama, sedef, akne izleri ve cilt kırışıklıklarında doku yenileyici enzimleri sayesinde cilde parlaklık ve gençlik katar.'
              },
              {
                icon: Droplets,
                baslik: 'Bağışıklık ve Detoks',
                aciklama: 'Lenf sistemini çalıştırarak vücuttaki toksinlerin atılmasını hızlandırır (Detoksifikasyon) ve genel bağışıklık direncini artırır.'
              },
              {
                icon: Stethoscope,
                baslik: 'Cerrahi Sonrası İyileşme',
                aciklama: 'Plastik cerrahi ve mikrocerrahi (kopan uzuvların dikilmesi vb.) sonrasında dokunun kanlanmasını ve canlı kalmasını sağlar.'
              }
            ].map(({ icon: Icon, baslik, aciklama }, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
                <div className="w-16 h-16 bg-blue-50/50 group-hover:bg-primary transition-colors duration-300 rounded-2xl flex items-center justify-center mb-6">
                  <Icon size={32} className="text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-3">{baslik}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{aciklama}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-yellow-50 rounded-xl p-6 border border-yellow-100">
            <p className="text-yellow-800 text-sm">
              <strong className="font-bold">Önemli Not:</strong> Hirudoterapi (Sülük Tedavisi) hamilelerde, kanama bozukluğu olanlarda (Hemofili) ve ağır anemi hastalarında uygulanmamalıdır. Tedavi mutlaka uzman kontrolünde gerçekleştirilmelidir.
            </p>
          </div>
        </div>
      </section>

      {/* ÜRÜNLER */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-2">Öne Çıkan Ürünler</h2>
              <p className="text-gray-500">En çok tercih edilen sülük çeşitlerimiz</p>
            </div>
            <Link
              to="/urunler"
              className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
            >
              Tümünü Gör <ChevronRight size={18} />
            </Link>
          </div>

          {yukleniyor ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          ) : urunler.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {urunler.map(urun => (
                <UrunKart key={urun.id} urun={urun} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <p>Henüz ürün eklenmemiş.</p>
            </div>
          )}

          <div className="text-center mt-10 md:hidden">
            <Link to="/urunler" className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
              Tüm Ürünleri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-navy text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Toptan Alım İçin Bize Ulaşın</h2>
          <p className="text-gray-300 mb-8">
            Toptan sipariş ve özel fiyatlandırma için WhatsApp veya telefon ile iletişime geçin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* DÜZELTİLEN KISIM BURASI */}
            <a
              href="https://wa.me/905416148791"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              WhatsApp ile Yaz
            </a>
            <Link
              to="/iletisim"
              className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              İletişim Sayfası
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Anasayfa;