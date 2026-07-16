import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SatisSozlesmesi = () => {
  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="bg-navy text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Mesafeli Satış Sözleşmesi</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Satış koşulları ve yasal bilgilendirme
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">

          <div className="flex items-center gap-3 mb-8 p-4 bg-primary/5 rounded-xl">
            <Shield size={24} className="text-primary shrink-0" />
            <p className="text-sm text-gray-600">
              Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamında düzenlenmiştir.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">Madde 1 — Taraflar</h2>
            <div className="text-gray-500 space-y-2">
              <p><strong>SATICI:</strong></p>
              <p>Unvan: K-RECA Tıbbi Sülük</p>
              <p>Adres: Dereboğazı, Osman Yılmaz Cd. No:107, 54300 Hendek/Sakarya</p>
              <p>Telefon: +90 541 614 87 91</p>
              <p>E-posta: krecasuluk@outlook.com</p>
              <br />
              <p><strong>ALICI:</strong></p>
              <p>Sipariş esnasında belirtilen bilgilerdeki kişidir.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">Madde 2 — Sözleşme Konusu</h2>
            <p className="text-gray-500 leading-relaxed">
              İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">Madde 3 — Ürün Bilgileri</h2>
            <p className="text-gray-500 leading-relaxed">
              Ürünlerin cinsi, adedi, miktarı, marka/modeli, rengi, satış bedeli sipariş formunda ve faturada belirtildiği gibidir. Tüm vergiler dahil satış fiyatı ürün sayfasında gösterilmektedir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">Madde 4 — Genel Hükümler</h2>
            <ul className="list-disc list-inside text-gray-500 space-y-2 ml-4">
              <li>ALICI, SATICI'ya ait internet sitesinde ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu kabul eder.</li>
              <li>Sipariş konusu ürün, yasal 30 günlük süreyi aşmamak koşulu ile her bir ürün için ALICI'nın yerleşim yerinin uzaklığına bağlı olarak internet sitesinde ön bilgiler içinde açıklanan süre içinde ALICI veya ALICI'nın gösterdiği adresteki kişi/kuruluşa teslim edilir.</li>
              <li>Sipariş konusu ürün, ALICI'dan başka bir kişi/kuruluşa teslim edilecek ise, teslim edilecek kişi/kuruluşun teslimatı kabul etmemesinden SATICI sorumlu tutulamaz.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">Madde 5 — Teslimat</h2>
            <p className="text-gray-500 leading-relaxed mb-3">
              Ürünler, sipariş onayından itibaren en geç 3 iş günü içinde kargoya teslim edilir. Canlı ürün olması sebebiyle özel paketleme ve hızlı kargo ile gönderilmektedir.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Kargo teslimat süresi bölgeye göre 1-3 iş günüdür. Teslimat sırasında ALICI'nın adresinde bulunmaması durumunda dahi SATICI edimini tam ve eksiksiz olarak yerine getirmiş olarak kabul edilecektir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">Madde 6 — Cayma Hakkı</h2>
            <p className="text-gray-500 leading-relaxed mb-3">
              ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren 14 (on dört) gün içinde cayma hakkını kullanabilir.
            </p>
            <p className="text-gray-500 leading-relaxed mb-3">
              Ancak, canlı hayvan (tıbbi sülük) satışlarında ürünün niteliği gereği iade edilememesi halinde cayma hakkı kullanılamaz. Hasarlı, ölü veya kusurlu teslim edilen ürünler bu kapsam dışındadır ve iade/değişim süreci uygulanır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">Madde 7 — Ödeme</h2>
            <p className="text-gray-500 leading-relaxed">
              Ödemeler PayTR güvenli ödeme altyapısı üzerinden kredi kartı, banka kartı veya sanal kart ile yapılmaktadır. Tüm ödemeler 256-bit SSL şifrelemesi ile korunmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-4">Madde 8 — Yetkili Mahkeme</h2>
            <p className="text-gray-500 leading-relaxed">
              İşbu sözleşmeden doğan uyuşmazlıklarda, Gümrük ve Ticaret Bakanlığı tarafından ilan edilen değere kadar Tüketici Hakem Heyetleri, aşan değerlerde Tüketici Mahkemeleri yetkilidir. SATICI'nın yerleşim yerindeki mahkemeler yetkilidir.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft size={18} /> Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SatisSozlesmesi;
