import { useEffect, useState } from 'react';
import { siparisler as siparislerApi } from '../../services/api';
import { Eye, X, Package, Truck, CheckCircle, XCircle, Clock, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const durumlar = [
  { value: 0, label: 'Beklemede', enum: 'Beklemede', renk: 'bg-yellow-100 text-yellow-700', icon: Clock },
  { value: 1, label: 'Onaylandı', enum: 'Onaylandi', renk: 'bg-green-100 text-green-700', icon: CheckCircle },
  { value: 2, label: 'Kargoda', enum: 'Kargoda', renk: 'bg-orange-100 text-orange-700', icon: Truck },
  { value: 3, label: 'Teslim Edildi', enum: 'TeslimEdildi', renk: 'bg-blue-100 text-blue-700', icon: Package },
  { value: 4, label: 'İptal', enum: 'Iptal', renk: 'bg-red-100 text-red-700', icon: XCircle },
];

const durumBul = (durumStr) =>
  durumlar.find(d => d.enum === durumStr || d.label === durumStr) || durumlar[0];

const AdminSiparisler = () => {
  const [siparisler, setSiparisler] = useState([]);
  const [seciliSiparis, setSeciliSiparis] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [filtre, setFiltre] = useState('hepsi');
  const [durumGuncelleniyor, setDurumGuncelleniyor] = useState(false);
  const [onayModal, setOnayModal] = useState(null); // { siparisId, durumValue, durumLabel }

  const getirSiparisler = () => {
    siparislerApi.hepsiniGetir()
      .then(res => setSiparisler(res.data))
      .catch(() => toast.error('Siparişler yüklenemedi.'))
      .finally(() => setYukleniyor(false));
  };

  useEffect(() => { getirSiparisler(); }, []);

  // Onay modalını aç
  const durumDegistirmeIste = (id, durumValue) => {
    const durum = durumlar.find(d => d.value === durumValue);
    setOnayModal({ siparisId: id, durumValue, durumLabel: durum?.label });
  };

  // Onaylandıktan sonra güncelle
  const handleDurumOnayla = async () => {
    if (!onayModal) return;
    setDurumGuncelleniyor(true);
    try {
      await siparislerApi.durumGuncelle(onayModal.siparisId, onayModal.durumValue);
      toast.success(`Durum "${onayModal.durumLabel}" olarak güncellendi!`);
      getirSiparisler();
      if (seciliSiparis?.id === onayModal.siparisId) {
        const yeniDurum = durumlar.find(d => d.value === onayModal.durumValue);
        setSeciliSiparis(prev => ({ ...prev, durum: yeniDurum?.enum || prev.durum }));
      }
    } catch {
      toast.error('Durum güncellenemedi.');
    } finally {
      setDurumGuncelleniyor(false);
      setOnayModal(null);
    }
  };

  const filtrelenmis = filtre === 'hepsi'
    ? siparisler
    : siparisler.filter(s => durumBul(s.durum).enum === filtre);

  const istatistik = durumlar.map(d => ({
    ...d,
    sayi: siparisler.filter(s => durumBul(s.durum).enum === d.enum).length
  }));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-navy mb-8">Sipariş Yönetimi</h1>

      {/* İSTATİSTİK KARTLARI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Toplam', sayi: siparisler.length, renk: 'bg-navy', text: 'text-white' },
          { label: 'Bekleyen', sayi: istatistik.find(d => d.enum === 'Beklemede')?.sayi || 0, renk: 'bg-yellow-50', text: 'text-yellow-700' },
          { label: 'Kargoda', sayi: istatistik.find(d => d.enum === 'Kargoda')?.sayi || 0, renk: 'bg-orange-50', text: 'text-orange-700' },
          { label: 'Teslim', sayi: istatistik.find(d => d.enum === 'TeslimEdildi')?.sayi || 0, renk: 'bg-green-50', text: 'text-green-700' },
        ].map((k, i) => (
          <div key={i} className={`${k.renk} rounded-xl p-5 shadow-sm`}>
            <p className={`text-3xl font-bold ${k.text}`}>{k.sayi}</p>
            <p className={`text-sm ${k.text} opacity-80 mt-1`}>{k.label} Sipariş</p>
          </div>
        ))}
      </div>

      {/* FİLTRE */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFiltre('hepsi')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filtre === 'hepsi' ? 'bg-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
          }`}
        >
          Tümü ({siparisler.length})
        </button>
        {durumlar.map(d => (
          <button
            key={d.enum}
            onClick={() => setFiltre(d.enum)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filtre === d.enum ? 'bg-navy text-white' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
            }`}
          >
            {d.label} ({istatistik.find(i => i.enum === d.enum)?.sayi || 0})
          </button>
        ))}
      </div>

      {/* TABLO */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Sipariş</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Müşteri</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Tutar</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Durum</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Tarih</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {yukleniyor ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="px-6 py-4">
                    <div className="bg-gray-100 rounded h-4 animate-pulse" />
                  </td>
                </tr>
              ))
            ) : filtrelenmis.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400">
                  Bu filtrede sipariş yok.
                </td>
              </tr>
            ) : (
              filtrelenmis.map(siparis => {
                const durum = durumBul(siparis.durum);
                const Icon = durum.icon;
                return (
                  <tr key={siparis.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-navy">#{siparis.id}</p>
                      <p className="text-gray-400 text-xs">{siparis.detaylar?.length} ürün</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-navy">{siparis.adSoyad}</p>
                      <p className="text-gray-400 text-xs">{siparis.email}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-navy">
                      ₺{siparis.genelToplam?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${durum.renk}`}>
                        <Icon size={12} />
                        {durum.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(siparis.olusturulmaTarihi).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSeciliSiparis(siparis)}
                        className="bg-navy/5 hover:bg-navy text-navy hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ml-auto"
                      >
                        <Eye size={14} /> Detay
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* DETAY MODAL */}
      {seciliSiparis && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-navy">Sipariş #{seciliSiparis.id}</h2>
                <p className="text-gray-400 text-sm mt-0.5">
                  {new Date(seciliSiparis.olusturulmaTarihi).toLocaleString('tr-TR')}
                </p>
              </div>
              <button onClick={() => setSeciliSiparis(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">

              {/* MÜŞTERİ VE FATURA BİLGİLERİ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Teslimat Adresi */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-navy mb-3 flex items-center gap-2 text-sm border-b pb-2">
                    <Truck size={16} className="text-primary" />
                    Teslimat Bilgileri
                  </h3>
                  <div className="space-y-3">
                    <div><p className="text-xs text-gray-400">Ad Soyad</p><p className="font-medium text-navy text-sm">{seciliSiparis.adSoyad}</p></div>
                    <div><p className="text-xs text-gray-400">İletişim</p><p className="font-medium text-navy text-sm">{seciliSiparis.telefon} <br/><span className="text-xs font-normal text-gray-500">{seciliSiparis.email}</span></p></div>
                    <div><p className="text-xs text-gray-400">Adres</p><p className="font-medium text-navy text-sm">{seciliSiparis.adres}</p><p className="text-xs text-gray-500">{seciliSiparis.sehir}</p></div>
                    <div><p className="text-xs text-gray-400">Ödeme Durumu</p><p className="font-medium text-navy text-sm">{seciliSiparis.odemeTamamlandi ? '✅ Tamamlandı' : '⏳ Bekliyor'}</p></div>
                  </div>
                </div>

                {/* Fatura Adresi */}
                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                  <h3 className="font-semibold text-navy mb-3 flex items-center gap-2 text-sm border-b pb-2">
                    <Package size={16} className="text-primary" />
                    Fatura Bilgileri
                  </h3>
                  <div className="space-y-3">
                    {seciliSiparis.firmaAdi && (
                      <div><p className="text-xs text-gray-400">Firma Adı</p><p className="font-medium text-navy text-sm">{seciliSiparis.firmaAdi}</p></div>
                    )}
                    {seciliSiparis.tcVeyaVergiNo && (
                      <div><p className="text-xs text-gray-400">TC / Vergi No</p><p className="font-medium text-navy text-sm">{seciliSiparis.tcVeyaVergiNo}</p></div>
                    )}
                    <div>
                      <p className="text-xs text-gray-400">Fatura Adresi</p>
                      <p className="font-medium text-navy text-sm">{seciliSiparis.faturaAdresi || seciliSiparis.adres}</p>
                      <p className="text-xs text-gray-500">{seciliSiparis.faturaSehri || seciliSiparis.sehir}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* ÜRÜNLER */}
              <div>
                <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs">2</span>
                  Sipariş Ürünleri
                </h3>
                <div className="space-y-2">
                  {seciliSiparis.detaylar?.map((detay, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                      <div>
                        <p className="font-medium text-navy text-sm">{detay.urunAd}</p>
                        <p className="text-gray-400 text-xs">{detay.adet} adet × ₺{detay.birimFiyat?.toFixed(2)}</p>
                      </div>
                      <p className="font-semibold text-navy">₺{detay.toplamFiyat?.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-navy/5 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Ara Toplam</span>
                    <span>₺{seciliSiparis.toplamTutar?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Kargo</span>
                    <span>₺{seciliSiparis.kargoUcreti?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-navy border-t border-gray-200 pt-2">
                    <span>Genel Toplam</span>
                    <span>₺{seciliSiparis.genelToplam?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* DURUM GÜNCELLE */}
              <div>
                <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs">3</span>
                  Durum Güncelle
                  <span className="text-xs text-gray-400 font-normal">(Müşteriye otomatik e-posta gönderilir)</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {durumlar.map(durum => {
                    const Icon = durum.icon;
                    const aktif = durumBul(seciliSiparis.durum).value === durum.value;
                    return (
                      <button
                        key={durum.value}
                        onClick={() => durumDegistirmeIste(seciliSiparis.id, durum.value)}
                        disabled={durumGuncelleniyor || aktif}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          aktif
                            ? 'bg-primary text-white cursor-default shadow-md'
                            : 'bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 border border-gray-200'
                        }`}
                      >
                        <Icon size={16} />
                        {durum.label}
                        {aktif && <span className="ml-auto text-xs">✓ Mevcut</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
      {/* ONAY MODALI */}
      {onayModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
            {durumGuncelleniyor ? (
              /* YÜKLENİYOR SPİNNER */
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
                <p className="text-navy font-semibold text-lg">Güncelleniyor...</p>
                <p className="text-gray-400 text-sm">Müşteriye bilgilendirme e-postası gönderiliyor</p>
              </div>
            ) : (
              /* ONAY SORUSU */
              <>
                <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">Durum Değişikliği</h3>
                <p className="text-gray-500 mb-6">
                  Sipariş durumunu <span className="font-semibold text-navy">"{onayModal.durumLabel}"</span> olarak güncellemek istediğinize emin misiniz?
                </p>
                <p className="text-xs text-gray-400 mb-6">Müşteriye otomatik bilgilendirme e-postası gönderilecektir.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setOnayModal(null)}
                    className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Vazgeç
                  </button>
                  <button
                    onClick={handleDurumOnayla}
                    className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-all"
                  >
                    Onayla
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSiparisler;