import { useState, useEffect } from 'react';
import { Save, Truck, AlertCircle, CheckCircle } from 'lucide-react';
import { ayarlar as ayarlarApi } from '../../services/api';
import toast from 'react-hot-toast';

const AdminAyarlar = () => {
  const [form, setForm] = useState({
    kargoUcreti: 150,
    ucretsizKargoLimiti: 1000,
    ucretsizKargoAktif: false,
    duyuruMetni: '',
  });
  const [yukleniyor, setYukleniyor] = useState(true);
  const [kaydediliyor, setKaydediliyor] = useState(false);

  useEffect(() => {
    ayarlarApi.getir()
      .then(res => {
        setForm({
          kargoUcreti: res.data.kargoUcreti,
          ucretsizKargoLimiti: res.data.ucretsizKargoLimiti,
          ucretsizKargoAktif: res.data.ucretsizKargoAktif,
          duyuruMetni: res.data.duyuruMetni || '',
        });
      })
      .catch(() => toast.error('Ayarlar yüklenemedi'))
      .finally(() => setYukleniyor(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setKaydediliyor(true);
    try {
      await ayarlarApi.guncelle(form);
      toast.success('Ayarlar başarıyla kaydedildi!');
    } catch {
      toast.error('Ayarlar kaydedilemedi.');
    } finally {
      setKaydediliyor(false);
    }
  };

  if (yukleniyor) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-navy mb-6">Site Ayarları</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">

        {/* KARGO AYARLARI */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Truck size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Kargo Ayarları</h2>
              <p className="text-sm text-gray-400">Kargo ücreti ve ücretsiz kargo limiti</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Kargo Ücreti */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Kargo Ücreti (₺)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.kargoUcreti}
                onChange={(e) => setForm(prev => ({ ...prev, kargoUcreti: parseFloat(e.target.value) || 0 }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">
                Sipariş başına uygulanan standart kargo ücreti
              </p>
            </div>

            {/* Ücretsiz Kargo Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-navy">Ücretsiz Kargo</p>
                <p className="text-sm text-gray-400">Belirli tutarın üzerinde ücretsiz kargo</p>
              </div>
              <button
                type="button"
                onClick={() => setForm(prev => ({ ...prev, ucretsizKargoAktif: !prev.ucretsizKargoAktif }))}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                  form.ucretsizKargoAktif ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                    form.ucretsizKargoAktif ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Ücretsiz Kargo Limiti */}
            {form.ucretsizKargoAktif && (
              <div className="ml-4 pl-4 border-l-2 border-primary/20">
                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                  Ücretsiz Kargo Limiti (₺)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={form.ucretsizKargoLimiti}
                  onChange={(e) => setForm(prev => ({ ...prev, ucretsizKargoLimiti: parseFloat(e.target.value) || 0 }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Bu tutarın üzerindeki siparişlerde kargo ücretsiz olacak
                </p>
              </div>
            )}
          </div>
        </div>

        {/* DUYURU */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <AlertCircle size={20} className="text-orange-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy">Duyuru Metni</h2>
              <p className="text-sm text-gray-400">Üst banner'da gösterilecek mesaj (opsiyonel)</p>
            </div>
          </div>

          <textarea
            value={form.duyuruMetni}
            onChange={(e) => setForm(prev => ({ ...prev, duyuruMetni: e.target.value }))}
            rows={3}
            maxLength={500}
            placeholder="Örn: Yaz kampanyası! Tüm ürünlerde %20 indirim."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">
            {form.duyuruMetni.length}/500 — Boş bırakılırsa banner gösterilmez
          </p>
        </div>

        {/* KAYDET */}
        <button
          type="submit"
          disabled={kaydediliyor}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          {kaydediliyor ? (
            <>İşleniyor...</>
          ) : (
            <><Save size={18} /> Ayarları Kaydet</>
          )}
        </button>

      </form>
    </div>
  );
};

export default AdminAyarlar;
