import { useEffect, useState } from 'react';
import { kategoriler as kategorilerApi } from '../../services/api';
import { Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminKategoriler = () => {
  const [kategoriler, setKategoriler] = useState([]);
  const [form, setForm] = useState({ ad: '', aciklama: '' });
  const [yukleniyor, setYukleniyor] = useState(false);

  const getirKategoriler = () => {
    kategorilerApi.hepsiniGetir()
      .then(res => setKategoriler(res.data))
      .catch(() => toast.error('Kategoriler yüklenemedi.'));
  };

  useEffect(() => { getirKategoriler(); }, []);

  const handleEkle = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    try {
      await kategorilerApi.ekle(form);
      toast.success('Kategori eklendi!');
      setForm({ ad: '', aciklama: '' });
      getirKategoriler();
    } catch {
      toast.error('Kategori eklenemedi.');
    } finally {
      setYukleniyor(false);
    }
  };

  const handleSil = async (id) => {
    if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;
    try {
      await kategorilerApi.sil(id);
      toast.success('Kategori silindi!');
      getirKategoriler();
    } catch {
      toast.error('Kategori silinemedi.');
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-navy mb-8">Kategori Yönetimi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-navy mb-5 flex items-center gap-2">
            <Plus size={20} className="text-primary" /> Yeni Kategori
          </h2>
          <form onSubmit={handleEkle} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Ad</label>
              <input
                type="text"
                value={form.ad}
                onChange={e => setForm(p => ({ ...p, ad: e.target.value }))}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Açıklama</label>
              <input
                type="text"
                value={form.aciklama}
                onChange={e => setForm(p => ({ ...p, aciklama: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={yukleniyor}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold py-2.5 rounded-lg transition-all duration-200"
            >
              {yukleniyor ? 'Ekleniyor...' : 'Ekle'}
            </button>
          </form>
        </div>

        {/* LİSTE */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-x-auto w-full">
          <table className="w-full min-w-[500px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Ad</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Açıklama</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {kategoriler.map(kat => (
                <tr key={kat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 text-sm">#{kat.id}</td>
                  <td className="px-6 py-4 font-medium text-navy">{kat.ad}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{kat.aciklama || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleSil(kat.id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {kategoriler.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">
                    Henüz kategori eklenmemiş.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminKategoriler;