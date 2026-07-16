import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const IadePolitikasi = () => {
  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="bg-navy text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Geri Ödeme ve İade Politikası</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Müşteri memnuniyeti bizim için en önemli değerdir.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 prose-style">

          <div className="flex items-center gap-3 mb-8 p-4 bg-primary/5 rounded-xl">
            <Shield size={24} className="text-primary shrink-0" />
            <p className="text-sm text-gray-600">
              Bu politika, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve ilgili mevzuat çerçevesinde hazırlanmıştır.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">1. Genel Koşullar</h2>
            <p className="text-gray-500 leading-relaxed mb-3">
              K-RECA Tıbbi Sülük olarak, müşterilerimizin memnuniyetini ön planda tutuyoruz. Satın aldığınız ürünlerle ilgili iade ve geri ödeme işlemleriniz aşağıdaki koşullar çerçevesinde değerlendirilmektedir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">2. İade Koşulları</h2>
            <p className="text-gray-500 leading-relaxed mb-3">
              Tıbbi sülük canlı bir ürün olduğundan, iade süreci aşağıdaki durumlarda geçerlidir:
            </p>
            <ul className="list-disc list-inside text-gray-500 space-y-2 ml-4">
              <li>Ürünlerin ölü veya hasarlı olarak teslim edilmesi</li>
              <li>Sipariş edilen ürün ile gönderilen ürünün farklı olması</li>
              <li>Eksik ürün gönderimi</li>
              <li>Kargo sürecinde oluşan hasar</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">3. İade Süreci</h2>
            <ol className="list-decimal list-inside text-gray-500 space-y-3 ml-4">
              <li>Ürünü teslim aldığınızda kontrol ediniz.</li>
              <li>Sorun tespit ettiğinizde, <strong>24 saat içinde</strong> fotoğraflı bildirim yapınız.</li>
              <li>WhatsApp (+90 541 614 87 91) veya e-posta (krecasuluk@outlook.com) ile bize ulaşınız.</li>
              <li>İade talebiniz onaylandıktan sonra yeni ürün gönderimi veya geri ödeme yapılacaktır.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">4. Geri Ödeme</h2>
            <p className="text-gray-500 leading-relaxed mb-3">
              İade talebinizin onaylanmasının ardından, geri ödeme işlemi aynı ödeme yöntemi üzerinden gerçekleştirilir. Geri ödeme süresi:
            </p>
            <ul className="list-disc list-inside text-gray-500 space-y-2 ml-4">
              <li>Kredi kartı ile yapılan ödemelerde: 5-10 iş günü</li>
              <li>Banka havalesi ile yapılan ödemelerde: 3-5 iş günü</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">5. İade Kabul Edilmeyen Durumlar</h2>
            <ul className="list-disc list-inside text-gray-500 space-y-2 ml-4">
              <li>Teslimattan 24 saat sonra yapılan bildirimler</li>
              <li>Müşterinin hatalı saklama koşullarından kaynaklanan sorunlar</li>
              <li>Fotoğraflı belge sunulmayan iade talepleri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-4">6. İletişim</h2>
            <p className="text-gray-500 leading-relaxed">
              İade ve geri ödeme işlemleriniz için bize aşağıdaki kanallardan ulaşabilirsiniz:
            </p>
            <div className="mt-3 space-y-1 text-gray-500">
              <p><strong>Telefon:</strong> +90 541 614 87 91</p>
              <p><strong>E-posta:</strong> krecasuluk@outlook.com</p>
              <p><strong>Adres:</strong> Dereboğazı, Osman Yılmaz Cd. No:107, 54300 Hendek/Sakarya</p>
            </div>
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

export default IadePolitikasi;
