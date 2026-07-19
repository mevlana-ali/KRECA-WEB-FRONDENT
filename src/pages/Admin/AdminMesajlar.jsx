import { useState, useEffect } from 'react';
import { Mail, Eye, Clock, User, Phone, Trash2 } from 'lucide-react';
import { iletisim as iletisimApi } from '../../services/api';
import toast from 'react-hot-toast';

const AdminMesajlar = () => {
  const [mesajlar, setMesajlar] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [seciliMesaj, setSeciliMesaj] = useState(null);

  const mesajlariYukle = () => {
    setYukleniyor(true);
    iletisimApi.hepsiniGetir()
      .then(res => setMesajlar(res.data))
      .catch(() => toast.error('Mesajlar yüklenemedi'))
      .finally(() => setYukleniyor(false));
  };

  useEffect(() => {
    mesajlariYukle();
  }, []);

  const okunduIsaretle = async (id) => {
    try {
      await iletisimApi.okunduIsaretle(id);
      setMesajlar(prev => prev.map(m => m.id === id ? { ...m, okundu: true } : m));
    } catch {
      toast.error('İşlem başarısız');
    }
  };

  const okunmamisSayisi = mesajlar.filter(m => !m.okundu).length;

  if (yukleniyor) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">İletişim Mesajları</h1>
          <p className="text-gray-400 text-sm mt-1">
            {okunmamisSayisi > 0 ? `${okunmamisSayisi} okunmamış mesaj` : 'Tüm mesajlar okundu'}
          </p>
        </div>
      </div>

      {mesajlar.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Mail size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400">Henüz mesaj yok</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mesaj Listesi */}
          <div className="lg:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto">
            {mesajlar.map(mesaj => (
              <button
                key={mesaj.id}
                onClick={() => {
                  setSeciliMesaj(mesaj);
                  if (!mesaj.okundu) okunduIsaretle(mesaj.id);
                }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  seciliMesaj?.id === mesaj.id
                    ? 'bg-primary/10 border-2 border-primary'
                    : mesaj.okundu
                      ? 'bg-white hover:bg-gray-50 border-2 border-transparent'
                      : 'bg-white hover:bg-blue-50 border-2 border-blue-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold text-sm ${mesaj.okundu ? 'text-gray-600' : 'text-navy'}`}>
                    {mesaj.adSoyad}
                  </span>
                  {!mesaj.okundu && (
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate">{mesaj.mesaj}</p>
                <p className="text-xs text-gray-300 mt-1">
                  {new Date(mesaj.olusturulmaTarihi).toLocaleDateString('tr-TR', {
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </button>
            ))}
          </div>

          {/* Mesaj Detay */}
          <div className="lg:col-span-2">
            {seciliMesaj ? (
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-navy">{seciliMesaj.adSoyad}</h2>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    seciliMesaj.okundu
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {seciliMesaj.okundu ? 'Okundu' : 'Yeni'}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <Mail size={16} className="text-primary" />
                    <a href={`mailto:${seciliMesaj.email}`} className="hover:text-primary transition-colors">
                      {seciliMesaj.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <Phone size={16} className="text-primary" />
                    <a href={`tel:${seciliMesaj.telefon}`} className="hover:text-primary transition-colors">
                      {seciliMesaj.telefon}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm">
                    <Clock size={16} className="text-primary" />
                    {new Date(seciliMesaj.olusturulmaTarihi).toLocaleDateString('tr-TR', {
                      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Mesaj</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {seciliMesaj.mesaj}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`mailto:${seciliMesaj.email}`}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 text-sm"
                  >
                    <Mail size={16} /> E-posta ile Yanıtla
                  </a>
                  <a
                    href={`https://wa.me/${seciliMesaj.telefon.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 text-sm"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center hidden lg:block">
                <Mail size={48} className="text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400">Bir mesaj seçin</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMesajlar;
