import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useSepet } from '../context/SepetContext';
import { siparisler, paytr } from '../services/api';
import toast from 'react-hot-toast';

const Odeme = () => {
  const { sepet, toplamTutar, sepetiBosalt } = useSepet();
  const navigate = useNavigate();
  const KARGO = 150;

  const [form, setForm] = useState({
    adSoyad: '', email: '', telefon: '',
    adres: '', sehir: '', postaKodu: '',
  });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [paytrToken, setPaytrToken] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sepet.length === 0) {
      toast.error('Sepetiniz boş!');
      return;
    }

    setYukleniyor(true);
    try {
      // Sipariş oluştur
      const siparisRes = await siparisler.olustur({
        ...form,
        sepetItems: sepet.map(item => ({
          urunId: item.id,
          adet: item.adet,
        })),
      });

      // PayTR token al
      const tokenRes = await paytr.tokenAl({
        siparisId: siparisRes.data.id,
      });

      setPaytrToken(tokenRes.data.token);
      sepetiBosalt();
    } catch (err) {
      toast.error('Bir hata oluştu, lütfen tekrar deneyin.');
    } finally {
      setYukleniyor(false);
    }
  };

  // PayTR iFrame göster
  if (paytrToken) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-navy text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">Ödeme</h1>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center gap-2 mb-4 text-green-600">
              <Shield size={18} />
              <span className="text-sm font-medium">PayTR Güvenli Ödeme</span>
            </div>
            <iframe
              src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
              id="paytriframe"
              frameBorder="0"
              scrolling="yes"
              style={{ width: '100%', height: '800px', minHeight: '100vh' }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Ödeme</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-navy mb-6">Teslimat Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { name: 'adSoyad', label: 'Ad Soyad', type: 'text', col: 2 },
                  { name: 'email', label: 'E-posta', type: 'email', col: 1 },
                  { name: 'telefon', label: 'Telefon', type: 'tel', col: 1 },
                  { name: 'adres', label: 'Adres', type: 'text', col: 2 },
                  { name: 'sehir', label: 'Şehir', type: 'text', col: 1 },
                  { name: 'postaKodu', label: 'Posta Kodu', type: 'text', col: 1 },
                ].map(({ name, label, type, col }) => (
                  <div key={name} className={col === 2 ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
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
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center gap-3">
                <Shield size={20} className="text-primary shrink-0" />
                <p className="text-sm text-gray-500">
                  Ödemeniz PayTR güvenli ödeme altyapısı ile işlenecektir.
                </p>
              </div>

              <button
                type="submit"
                disabled={yukleniyor}
                className="w-full mt-6 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-lg"
              >
                {yukleniyor ? 'İşleniyor...' : 'Ödemeye Geç'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-navy mb-6">Sipariş Özeti</h2>
              <div className="space-y-3 mb-6">
                {sepet.map(item => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span>{item.ad} x{item.adet}</span>
                    <span>₺{(item.fiyat * item.adet).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-3 flex justify-between text-gray-600">
                  <span>Kargo</span>
                  <span>₺{KARGO.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-navy text-lg">
                  <span>Toplam</span>
                  <span>₺{(toplamTutar + KARGO).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Odeme; 