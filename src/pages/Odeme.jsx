import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle, Truck } from 'lucide-react';
import { useSepet } from '../context/SepetContext';
import { siparisler, paytr, ayarlar as ayarlarApi } from '../services/api';
import toast from 'react-hot-toast';

const Odeme = () => {
  const { sepet, toplamTutar } = useSepet();
  const navigate = useNavigate();
  const [kargoAyarlari, setKargoAyarlari] = useState(null);

  const [form, setForm] = useState({
    adSoyad: '', email: '', telefon: '',
    adres: '', sehir: '', postaKodu: '',
    faturaAdresiFarkli: false, faturaAdresi: '', faturaSehri: '', tcVeyaVergiNo: '', firmaAdi: ''
  });
  const [yukleniyor, setYukleniyor] = useState(false);
  const [paytrToken, setPaytrToken] = useState(null);
  const [formHatalari, setFormHatalari] = useState({});

  // Kargo ayarlarını API'den çek
  useEffect(() => {
    ayarlarApi.kargoGetir()
      .then(res => setKargoAyarlari(res.data))
      .catch(() => setKargoAyarlari({ kargoUcreti: 150, ucretsizKargoLimiti: 0, ucretsizKargoAktif: false }));
  }, []);

  const kargoUcreti = kargoAyarlari
    ? (kargoAyarlari.ucretsizKargoAktif && toplamTutar >= kargoAyarlari.ucretsizKargoLimiti ? 0 : kargoAyarlari.kargoUcreti)
    : 150;

  // Boş sepet ile ödeme sayfasına gelinirse sepete yönlendir
  useEffect(() => {
    if (sepet.length === 0 && !paytrToken) {
      navigate('/sepet');
    }
  }, [sepet, navigate, paytrToken]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [e.target.name]: value }));
  };

  // Form validasyonu
  const formDogrula = () => {
    const hatalar = {};
    if (!form.adSoyad.trim() || form.adSoyad.trim().length < 3) {
      hatalar.adSoyad = 'Ad Soyad en az 3 karakter olmalı';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      hatalar.email = 'Geçerli bir e-posta adresi girin';
    }
    if (!form.telefon.trim() || !/^(05\d{9}|\+905\d{9})$/.test(form.telefon.replace(/\s/g, ''))) {
      hatalar.telefon = 'Geçerli bir telefon numarası girin (05xx xxx xx xx)';
    }
    if (!form.adres.trim() || form.adres.trim().length < 10) {
      hatalar.adres = 'Adres en az 10 karakter olmalı';
    }
    if (!form.sehir.trim()) {
      hatalar.sehir = 'Şehir seçiniz';
    }
    if (!form.postaKodu.trim() || !/^\d{5}$/.test(form.postaKodu.trim())) {
      hatalar.postaKodu = 'Geçerli bir posta kodu girin (5 haneli)';
    }

    if (form.faturaAdresiFarkli) {
      if (!form.faturaAdresi.trim() || form.faturaAdresi.trim().length < 10) {
        hatalar.faturaAdresi = 'Fatura adresi en az 10 karakter olmalı';
      }
      if (!form.faturaSehri.trim()) {
        hatalar.faturaSehri = 'Fatura şehri seçiniz';
      }
    }

    setFormHatalari(hatalar);
    return Object.keys(hatalar).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sepet.length === 0) {
      toast.error('Sepetiniz boş!');
      navigate('/sepet');
      return;
    }

    if (!formDogrula()) {
      toast.error('Lütfen tüm alanları doğru şekilde doldurun.');
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
      // ✅ Sepet artık burada boşaltılmıyor — ödeme başarılı olunca OdemeBasarili sayfasında boşaltılacak
    } catch (err) {
      const mesaj = err.response?.data?.message || err.response?.data || 'Bir hata oluştu, lütfen tekrar deneyin.';
      toast.error(typeof mesaj === 'string' ? mesaj : 'Bir hata oluştu, lütfen tekrar deneyin.');
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
              style={{ width: '100%', height: '750px' }}
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
                      className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 transition-colors ${
                        formHatalari[name]
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                          : 'border-gray-200 focus:border-primary focus:ring-primary'
                      }`}
                    />
                    {formHatalari[name] && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertTriangle size={12} />
                        {formHatalari[name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Fatura Adresi Checkbox */}
              <div className="mt-8 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="faturaAdresiFarkli"
                      checked={form.faturaAdresiFarkli}
                      onChange={handleChange}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray-700 font-medium select-none">Fatura adresim, teslimat adresimden farklı</span>
                </label>
              </div>

              {/* Fatura Bilgileri Alanı (Şartlı Gösterim) */}
              {form.faturaAdresiFarkli && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6 animate-fade-in">
                  <h3 className="text-lg font-bold text-navy mb-5">Fatura Bilgileri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { name: 'firmaAdi', label: 'Firma Adı (Opsiyonel)', type: 'text', col: 2 },
                      { name: 'tcVeyaVergiNo', label: 'TC Kimlik / Vergi No (Opsiyonel)', type: 'text', col: 2 },
                      { name: 'faturaAdresi', label: 'Fatura Adresi', type: 'text', col: 2 },
                      { name: 'faturaSehri', label: 'Fatura Şehri', type: 'text', col: 1 },
                    ].map(({ name, label, type, col }) => (
                      <div key={name} className={col === 2 ? 'md:col-span-2' : ''}>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
                        <input
                          type={type}
                          name={name}
                          value={form[name]}
                          onChange={handleChange}
                          required={name === 'faturaAdresi' || name === 'faturaSehri'}
                          className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-1 transition-colors ${
                            formHatalari[name]
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                              : 'border-gray-200 focus:border-primary focus:ring-primary'
                          }`}
                        />
                        {formHatalari[name] && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertTriangle size={12} />
                            {formHatalari[name]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                  {kargoUcreti === 0 ? (
                    <span className="text-green-600 font-semibold">Ücretsiz ✓</span>
                  ) : (
                    <span>₺{kargoUcreti.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between font-bold text-navy text-lg">
                  <span>Toplam</span>
                  <span>₺{(toplamTutar + kargoUcreti).toFixed(2)}</span>
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