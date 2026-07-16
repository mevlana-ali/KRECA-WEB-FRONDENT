import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GizlilikPolitikasi = () => {
  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="bg-navy text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Gizlilik Politikası ve KVKK</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Kişisel verilerinizin korunması bizim için önemlidir.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">

          <div className="flex items-center gap-3 mb-8 p-4 bg-primary/5 rounded-xl">
            <Shield size={24} className="text-primary shrink-0" />
            <p className="text-sm text-gray-600">
              Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında hazırlanmıştır.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">1. Veri Sorumlusu</h2>
            <div className="text-gray-500 space-y-1">
              <p><strong>Unvan:</strong> K-RECA Tıbbi Sülük</p>
              <p><strong>Adres:</strong> Dereboğazı, Osman Yılmaz Cd. No:107, 54300 Hendek/Sakarya</p>
              <p><strong>E-posta:</strong> krecasuluk@outlook.com</p>
              <p><strong>Telefon:</strong> +90 541 614 87 91</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">2. Toplanan Kişisel Veriler</h2>
            <p className="text-gray-500 leading-relaxed mb-3">
              Web sitemiz üzerinden aşağıdaki kişisel verileriniz toplanmaktadır:
            </p>
            <ul className="list-disc list-inside text-gray-500 space-y-2 ml-4">
              <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
              <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, adres</li>
              <li><strong>Sipariş Bilgileri:</strong> Sipariş detayları, ödeme bilgileri (kart bilgileri tarafımızda saklanmaz)</li>
              <li><strong>İletişim Formu:</strong> Gönderdiğiniz mesajlar</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">3. Verilerin İşlenme Amaçları</h2>
            <ul className="list-disc list-inside text-gray-500 space-y-2 ml-4">
              <li>Sipariş ve teslimat işlemlerinin gerçekleştirilmesi</li>
              <li>Fatura düzenlenmesi</li>
              <li>Müşteri hizmetleri ve iletişim</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Hizmet kalitesinin artırılması</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">4. Verilerin Paylaşılması</h2>
            <p className="text-gray-500 leading-relaxed mb-3">
              Kişisel verileriniz aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmaz:
            </p>
            <ul className="list-disc list-inside text-gray-500 space-y-2 ml-4">
              <li><strong>Ödeme altyapısı:</strong> PayTR güvenli ödeme sistemi (ödeme işlemi için)</li>
              <li><strong>Kargo firmaları:</strong> Teslimat işlemi için</li>
              <li><strong>Yasal zorunluluk:</strong> Mahkeme kararı veya yasal düzenlemeler gereği</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">5. Veri Güvenliği</h2>
            <p className="text-gray-500 leading-relaxed">
              Kişisel verileriniz, teknik ve idari tedbirlerle korunmaktadır. Web sitemiz SSL sertifikası ile şifrelenmektedir. Ödeme bilgileriniz PayTR altyapısı üzerinden işlenmekte olup, kart bilgileriniz sunucularımızda saklanmamaktadır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-navy mb-4">6. Çerezler (Cookies)</h2>
            <p className="text-gray-500 leading-relaxed">
              Web sitemizde oturum yönetimi ve sepet işlevselliği için çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz. Çerezlerin devre dışı bırakılması site işlevselliğini etkileyebilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-4">7. Haklarınız (KVKK Madde 11)</h2>
            <p className="text-gray-500 leading-relaxed mb-3">
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc list-inside text-gray-500 space-y-2 ml-4">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li>
              <li>Kişisel verilerin silinmesini veya yok edilmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
            </ul>
            <p className="text-gray-500 leading-relaxed mt-4">
              Bu haklarınızı kullanmak için <strong>krecasuluk@outlook.com</strong> adresine başvurabilirsiniz.
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

export default GizlilikPolitikasi;
