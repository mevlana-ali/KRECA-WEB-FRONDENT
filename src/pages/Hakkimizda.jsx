import { Shield, Award, Users, Leaf } from 'lucide-react';
import SEO from '../Components/SEO';

const Hakkimizda = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Hakkımızda" 
        description="Sakarya Hendek'te kurulu olan Tarım Bakanlığı onaylı K-RECA Tıbbi Sülük, yılların deneyimiyle doğal ve steril tıbbi sülük üretim işletmesidir." 
        keywords="hakkımızda, k-reca, kreca sülük, hendek sülük üretimi, sakarya tıbbi sülük tesisi"
      />

      {/* HEADER */}
      <div className="bg-navy text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            K-RECA Tıbbi Sülük olarak yılların deneyimiyle kaliteli ve güvenilir hizmet sunuyoruz.
          </p>
        </div>
      </div>

      {/* HIKAYE */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-navy mb-6">Biz Kimiz?</h2>
          <p className="text-gray-500 leading-relaxed mb-4">
            K-RECA Tıbbi Sülük, Sakarya'nın Hendek ilçesinde kurulmuş, 
            Tarım Bakanlığı tarafından onaylanmış resmi bir tıbbi sülük üretim işletmesidir.
          </p>
          <p className="text-gray-500 leading-relaxed mb-4">
            Doğal ortamda yetiştirilen sülüklerimiz, hijyenik koşullarda paketlenerek 
            toptan ve perakende olarak müşterilerimize ulaştırılmaktadır.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Müşteri memnuniyetini her şeyin önünde tutan anlayışımızla, 
            güvenilir ve kaliteli hizmet sunmaya devam ediyoruz.
          </p>
        </div>
      </section>

      {/* DEGERLER */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy mb-4">Değerlerimiz</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Her üründe kalite, güven ve doğallığı ön planda tutuyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                baslik: 'Güvenilirlik',
                aciklama: 'Tarım Bakanlığı onaylı resmi işletme belgesiyle hizmet veriyoruz.'
              },
              {
                icon: Award,
                baslik: 'Kalite',
                aciklama: 'Her sülük özenle seçilir ve hijyenik koşullarda paketlenir.'
              },
              {
                icon: Leaf,
                baslik: 'Doğallık',
                aciklama: 'Sülüklerimiz tamamen doğal ortamda, kimyasal kullanılmadan yetiştirilir.'
              },
              {
                icon: Users,
                baslik: 'Müşteri Odaklılık',
                aciklama: 'Müşteri memnuniyeti bizim için her şeyin önünde gelir.'
              },
            ].map(({ icon: Icon, baslik, aciklama }, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-3">{baslik}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{aciklama}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONAY */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-12 text-white">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Award size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Resmi Onaylı İşletme</h2>
            <p className="text-gray-300 leading-relaxed">
              İşletmemiz Tarım Bakanlığı tarafından onaylanmış olup, 
              ödemeleriniz PayTR güvenli ödeme altyapısı ile şifrelenmektedir. 
              Güvenle alışveriş yapabilirsiniz.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Hakkimizda;