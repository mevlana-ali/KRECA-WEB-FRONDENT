import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { iletisim as iletisimApi } from '../services/api';
import toast from 'react-hot-toast';
import SEO from '../Components/SEO';

const Iletisim = () => {
  const [form, setForm] = useState({
    adSoyad: '',
    email: '',
    telefon: '',
    mesaj: '',
  });
  const [gonderiliyor, setGonderiliyor] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGonderiliyor(true);
    try {
      await iletisimApi.gonder(form);
      toast.success('Mesajınız alındı! En kısa sürede dönüş yapacağız.');
      setForm({ adSoyad: '', email: '', telefon: '', mesaj: '' });
    } catch (err) {
      const mesaj = err.response?.data?.message || 'Mesaj gönderilemedi, lütfen tekrar deneyin.';
      toast.error(typeof mesaj === 'string' ? mesaj : 'Bir hata oluştu.');
    } finally {
      setGonderiliyor(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="İletişim & Yol Tarifi" 
        description="K-RECA Tıbbi Sülük iletişim bilgileri. Sakarya, Hendek'teki sülük üretim tesisimizle iletişime geçin, toptan sülük siparişi ve yol tarifi alın." 
        keywords="iletişim, k-reca adres, hendek sülük nerede, sakarya tıbbi sülük yol tarifi, sülük sipariş telefon"
      />

      {/* HEADER */}
      <div className="bg-navy text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">İletişim</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Sorularınız için bize ulaşın, en kısa sürede dönüş yapalım.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* BİLGİLER */}
          <div>
            <h2 className="text-2xl font-bold text-navy mb-8">Bize Ulaşın</h2>
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  baslik: 'Adres',
                  icerik: 'Dereboğazı, Osman Yılmaz Cd. No:107, 54300 Hendek/Sakarya'
                },
                {
                  icon: Phone,
                  baslik: 'Telefon',
                  icerik: '+90 541 614 87 91',
                  href: 'tel:+905416148791'
                },
                {
                  icon: Mail,
                  baslik: 'E-posta',
                  icerik: 'krecasuluk54@gmail.com',
                  href: 'mailto:krecasuluk54@gmail.com'
                },
                {
                  icon: Clock,
                  baslik: 'Çalışma Saatleri',
                  icerik: 'Pazartesi - Cumartesi: 09:00 - 18:00'
                },
              ].map(({ icon: Icon, baslik, icerik, href }) => (
                <div key={baslik} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{baslik}</h3>
                    {href ? (
                      <a href={href} className="text-gray-500 hover:text-primary transition-colors">
                        {icerik}
                      </a>
                    ) : (
                      <p className="text-gray-500">{icerik}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* DÜZELTİLEN KISIM BURASI */}
            <a 
              href="https://wa.me/905416148791"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.528 5.855L.057 23.882l6.186-1.443A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.878 9.878 0 01-5.031-1.378l-.36-.214-3.733.871.938-3.43-.235-.372A9.845 9.845 0 012.106 12C2.106 6.57 6.57 2.106 12 2.106c5.43 0 9.894 4.464 9.894 9.894 0 5.43-4.464 9.894-9.894 9.894z"/>
              </svg>
              WhatsApp ile Yazın
            </a>
          </div>

          {/* FORM */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-navy mb-6">Mesaj Gönderin</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: 'adSoyad', label: 'Ad Soyad', type: 'text' },
                { name: 'email', label: 'E-posta', type: 'email' },
                { name: 'telefon', label: 'Telefon', type: 'tel' },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Mesaj
                </label>
                <textarea
                  name="mesaj"
                  value={form.mesaj}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={gonderiliyor}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {gonderiliyor ? 'Gönderiliyor...' : (<><Send size={18} /> Gönder</>)}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Iletisim;