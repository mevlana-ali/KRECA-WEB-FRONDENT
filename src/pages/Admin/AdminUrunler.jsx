import { useEffect, useState } from 'react';
import { urunler as urunlerApi, kategoriler as kategorilerApi, resim as resimApi } from '../../services/api';
import { Trash2, Plus, Pencil, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const boslForm = {
  ad: '', aciklama: '', fiyat: '', stokAdedi: '', resimUrl: '', kategoriId: '', aktifMi: true
};

const AdminUrunler = () => {
  const [urunler, setUrunler] = useState([]);
  const [kategoriler, setKategoriler] = useState([]);
  const [form, setForm] = useState(boslForm);
  const [duzenleId, setDuzenleId] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [modalAcik, setModalAcik] = useState(false);
  const [resimYukleniyor, setResimYukleniyor] = useState(false);

  const getirUrunler = () => {
    urunlerApi.hepsiniGetir()
      .then(res => setUrunler(res.data))
      .catch(() => toast.error('Ürünler yüklenemedi.'));
  };

  useEffect(() => {
    getirUrunler();
    kategorilerApi.hepsiniGetir()
      .then(res => setKategoriler(res.data))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    try {
      const data = {
        ...form,
        fiyat: parseFloat(form.fiyat),
        stokAdedi: parseInt(form.stokAdedi),
        kategoriId: parseInt(form.kategoriId),
      };
      if (duzenleId) {
        await urunlerApi.guncelle(duzenleId, data);
        toast.success('Ürün güncellendi!');
      } else {
        await urunlerApi.ekle(data);
        toast.success('Ürün eklendi!');
      }
      setForm(boslForm);
      setDuzenleId(null);
      setModalAcik(false);
      getirUrunler();
    } catch {
      toast.error('İşlem başarısız.');
    } finally {
      setYukleniyor(false);
    }
  };

  const handleResimSil = () => {
  setForm(p => ({ ...p, resimUrl: '' }));
};

  const handleResimYukle = async (e) => {
    const dosya = e.target.files[0];
    if (!dosya) return;
    setResimYukleniyor(true);
    try {
      const formData = new FormData();
      formData.append('dosya', dosya);
      const res = await resimApi.yukle(formData);
      setForm(p => ({ ...p, resimUrl: res.data.url }));
      toast.success('Resim yüklendi!');
    } catch {
      toast.error('Resim yüklenemedi.');
    } finally {
      setResimYukleniyor(false);
    }
  };

  const handleDuzenle = (urun) => {
    setForm({
      ad: urun.ad,
      aciklama: urun.aciklama || '',
      fiyat: urun.fiyat,
      stokAdedi: urun.stokAdedi,
      resimUrl: urun.resimUrl || '',
      kategoriId: urun.kategoriId,
      aktifMi: urun.aktifMi,
    });
    setDuzenleId(urun.id);
    setModalAcik(true);
  };

  const handleSil = async (id) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    try {
      await urunlerApi.sil(id);
      toast.success('Ürün silindi!');
      getirUrunler();
    } catch {
      toast.error('Ürün silinemedi.');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-navy">Ürün Yönetimi</h1>
        <button
          onClick={() => { setForm(boslForm); setDuzenleId(null); setModalAcik(true); }}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200"
        >
          <Plus size={18} /> Yeni Ürün
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Ürün</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Kategori</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Fiyat</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Stok</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Durum</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {urunler.map(urun => (
              <tr key={urun.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-navy">{urun.ad}</p>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{urun.aciklama}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                    {urun.kategoriAd}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-navy">₺{urun.fiyat?.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-600">{urun.stokAdedi}</td>
                <td className="px-6 py-4">
                  {urun.aktifMi ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <Check size={14} /> Aktif
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">Pasif</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleDuzenle(urun)} className="text-blue-400 hover:text-blue-600 transition-colors">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleSil(urun.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {urunler.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">Henüz ürün eklenmemiş.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalAcik && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-navy">
                {duzenleId ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
              </h2>
              <button onClick={() => setModalAcik(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              {[
                { name: 'ad', label: 'Ürün Adı', type: 'text' },
                { name: 'fiyat', label: 'Fiyat (₺)', type: 'number' },
                { name: 'stokAdedi', label: 'Stok Adedi', type: 'number' },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[name]}
                    onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              ))}

              <div>
  <label className="block text-sm font-medium text-gray-600 mb-1.5">Resim</label>
  <div className="space-y-2">
    {form.resimUrl ? (
      <div className="relative w-32 h-32">
        <img
          src={form.resimUrl}
          alt="Önizleme"
          className="w-32 h-32 object-cover rounded-lg border border-gray-200"
        />
        <button
          type="button"
          onClick={handleResimSil}
          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    ) : (
      <input
        type="file"
        accept="image/*"
        onChange={handleResimYukle}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
    )}
    {resimYukleniyor && (
      <p className="text-sm text-primary">Yükleniyor...</p>
    )}
  </div>
</div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Kategori</label>
                <select
                  value={form.kategoriId}
                  onChange={e => setForm(p => ({ ...p, kategoriId: e.target.value }))}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Kategori Seçin</option>
                  {kategoriler.map(kat => (
                    <option key={kat.id} value={kat.id}>{kat.ad}</option>
                  ))}
                </select>
              </div>

              {duzenleId && (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="aktifMi"
                    checked={form.aktifMi}
                    onChange={e => setForm(p => ({ ...p, aktifMi: e.target.checked }))}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="aktifMi" className="text-sm font-medium text-gray-600">Aktif</label>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalAcik(false)}
                  className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg hover:border-gray-300 transition-all duration-200"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={yukleniyor}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold py-2.5 rounded-lg transition-all duration-200"
                >
                  {yukleniyor ? 'Kaydediliyor...' : duzenleId ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUrunler;