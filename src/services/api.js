// K-RECA — Supabase API Katmanı
// Mevcut api.js'in Supabase karşılığı. Fonksiyon isimleri aynı tutuldu (uyumluluk).
import { supabase } from './supabase';

// =============================================
// ÜRÜNLER — Doğrudan Supabase Client
// =============================================
export const urunler = {
  hepsiniGetir: async () => {
    const { data, error } = await supabase
      .from('urunler')
      .select('*, kategoriler(ad)')
      .order('olusturulma_tarihi', { ascending: false });
    if (error) throw error;
    // Frontend'in beklediği formata dönüştür
    return { data: data.map(u => ({
      id: u.id,
      ad: u.ad,
      aciklama: u.aciklama,
      fiyat: u.fiyat,
      stokAdedi: u.stok_adedi,
      resimUrl: u.resim_url,
      aktifMi: u.aktif_mi,
      olusturulmaTarihi: u.olusturulma_tarihi,
      kategoriId: u.kategori_id,
      kategoriAd: u.kategoriler?.ad || '',
    })) };
  },

  idIleGetir: async (id) => {
    const { data, error } = await supabase
      .from('urunler')
      .select('*, kategoriler(ad)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return { data: {
      id: data.id,
      ad: data.ad,
      aciklama: data.aciklama,
      fiyat: data.fiyat,
      stokAdedi: data.stok_adedi,
      resimUrl: data.resim_url,
      aktifMi: data.aktif_mi,
      olusturulmaTarihi: data.olusturulma_tarihi,
      kategoriId: data.kategori_id,
      kategoriAd: data.kategoriler?.ad || '',
    } };
  },

  kategoriIleGetir: async (kategoriId) => {
    const { data, error } = await supabase
      .from('urunler')
      .select('*, kategoriler(ad)')
      .eq('kategori_id', kategoriId)
      .order('olusturulma_tarihi', { ascending: false });
    if (error) throw error;
    return { data: data.map(u => ({
      id: u.id,
      ad: u.ad,
      aciklama: u.aciklama,
      fiyat: u.fiyat,
      stokAdedi: u.stok_adedi,
      resimUrl: u.resim_url,
      aktifMi: u.aktif_mi,
      olusturulmaTarihi: u.olusturulma_tarihi,
      kategoriId: u.kategori_id,
      kategoriAd: u.kategoriler?.ad || '',
    })) };
  },

  ekle: async (data) => {
    const { data: result, error } = await supabase
      .from('urunler')
      .insert({
        ad: data.ad,
        aciklama: data.aciklama,
        fiyat: data.fiyat,
        stok_adedi: data.stokAdedi,
        resim_url: data.resimUrl,
        kategori_id: data.kategoriId,
        aktif_mi: data.aktifMi ?? true,
      })
      .select()
      .single();
    if (error) throw error;
    return { data: result };
  },

  guncelle: async (id, data) => {
    const { error } = await supabase
      .from('urunler')
      .update({
        ad: data.ad,
        aciklama: data.aciklama,
        fiyat: data.fiyat,
        stok_adedi: data.stokAdedi,
        resim_url: data.resimUrl,
        kategori_id: data.kategoriId,
        aktif_mi: data.aktifMi,
      })
      .eq('id', id);
    if (error) throw error;
    return { data: null };
  },

  sil: async (id) => {
    const { error } = await supabase
      .from('urunler')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { data: null };
  },
};

// =============================================
// KATEGORİLER — Doğrudan Supabase Client
// =============================================
export const kategoriler = {
  hepsiniGetir: async () => {
    const { data, error } = await supabase
      .from('kategoriler')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw error;
    return { data };
  },

  ekle: async (data) => {
    const { data: result, error } = await supabase
      .from('kategoriler')
      .insert({ ad: data.ad, aciklama: data.aciklama })
      .select()
      .single();
    if (error) throw error;
    return { data: result };
  },

  sil: async (id) => {
    const { error } = await supabase
      .from('kategoriler')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { data: null };
  },
};

// =============================================
// SİPARİŞLER — Edge Functions
// =============================================
export const siparisler = {
  olustur: async (data) => {
    const { data: result, error } = await supabase.functions.invoke('siparis-olustur', {
      body: data,
    });
    if (error) throw error;
    return { data: result };
  },

  idIleGetir: async (id) => {
    const { data, error } = await supabase
      .from('siparisler')
      .select('*, siparis_detaylar(*, urunler(ad))')
      .eq('id', id)
      .single();
    if (error) throw error;
    return { data: formatSiparis(data) };
  },

  hepsiniGetir: async () => {
    const { data, error } = await supabase
      .from('siparisler')
      .select('*, siparis_detaylar(*, urunler(ad))')
      .neq('durum', 'Beklemede')
      .order('olusturulma_tarihi', { ascending: false });
    if (error) throw error;
    return { data: data.map(formatSiparis) };
  },

  durumGuncelle: async (id, durum) => {
    const { data: result, error } = await supabase.functions.invoke(`siparis-durum-guncelle/${id}`, {
      body: { durum },
    });
    if (error) throw error;
    return { data: result };
  },
};

function formatSiparis(s) {
  return {
    id: s.id,
    adSoyad: s.ad_soyad,
    email: s.email,
    telefon: s.telefon,
    adres: s.adres,
    sehir: s.sehir,
    toplamTutar: s.toplam_tutar,
    kargoUcreti: s.kargo_ucreti,
    genelToplam: s.genel_toplam,
    durum: s.durum,
    odemeTamamlandi: s.odeme_tamamlandi,
    olusturulmaTarihi: s.olusturulma_tarihi,
    faturaAdresi: s.fatura_adresi,
    faturaSehri: s.fatura_sehri,
    tcVeyaVergiNo: s.tc_veya_vergi_no,
    firmaAdi: s.firma_adi,
    detaylar: (s.siparis_detaylar || []).map(sd => ({
      urunId: sd.urun_id,
      urunAd: sd.urunler?.ad || '',
      adet: sd.adet,
      birimFiyat: sd.birim_fiyat,
      toplamFiyat: sd.toplam_fiyat,
    })),
  };
}

// =============================================
// AUTH — Edge Function
// =============================================
export const auth = {
  login: async (data) => {
    const { data: result, error } = await supabase.functions.invoke('auth-login', {
      body: data,
    });
    if (error) throw error;
    return { data: result };
  },
};

// =============================================
// PayTR — Edge Function
// =============================================
export const paytr = {
  tokenAl: async (data) => {
    const { data: result, error } = await supabase.functions.invoke('paytr-token', {
      body: data,
    });
    if (error) throw error;
    return { data: result };
  },
};

// =============================================
// RESİM — Edge Function
// =============================================
export const resim = {
  yukle: async (formData) => {
    const { data: result, error } = await supabase.functions.invoke('resim-yukle', {
      body: formData,
    });
    if (error) throw error;
    return { data: result };
  },
};

// =============================================
// AYARLAR — Doğrudan Supabase Client
// =============================================
export const ayarlar = {
  getir: async () => {
    const { data, error } = await supabase
      .from('site_ayarlari')
      .select('*')
      .eq('id', 1)
      .single();
    if (error) throw error;
    return { data: {
      kargoUcreti: data.kargo_ucreti,
      ucretsizKargoLimiti: data.ucretsiz_kargo_limiti,
      ucretsizKargoAktif: data.ucretsiz_kargo_aktif,
      duyuruMetni: data.duyuru_metni,
    } };
  },

  guncelle: async (data) => {
    const { error } = await supabase
      .from('site_ayarlari')
      .update({
        kargo_ucreti: data.kargoUcreti,
        ucretsiz_kargo_limiti: data.ucretsizKargoLimiti,
        ucretsiz_kargo_aktif: data.ucretsizKargoAktif,
        duyuru_metni: data.duyuruMetni,
        guncellenme_tarihi: new Date().toISOString(),
      })
      .eq('id', 1);
    if (error) throw error;
    return { data: null };
  },

  kargoGetir: async () => {
    const { data, error } = await supabase
      .from('site_ayarlari')
      .select('kargo_ucreti, ucretsiz_kargo_limiti, ucretsiz_kargo_aktif')
      .eq('id', 1)
      .single();
    if (error) throw error;
    return { data: {
      kargoUcreti: data.kargo_ucreti,
      ucretsizKargoLimiti: data.ucretsiz_kargo_limiti,
      ucretsizKargoAktif: data.ucretsiz_kargo_aktif,
    } };
  },
};

// =============================================
// İLETİŞİM — Doğrudan Supabase Client
// =============================================
export const iletisim = {
  gonder: async (data) => {
    const { data: result, error } = await supabase
      .from('iletisim_mesajlari')
      .insert({
        ad_soyad: data.adSoyad,
        email: data.email,
        telefon: data.telefon,
        mesaj: data.mesaj,
      })
      .select()
      .single();
    if (error) throw error;
    return { data: result };
  },

  hepsiniGetir: async () => {
    const { data, error } = await supabase
      .from('iletisim_mesajlari')
      .select('*')
      .order('olusturulma_tarihi', { ascending: false });
    if (error) throw error;
    return { data: data.map(m => ({
      id: m.id,
      adSoyad: m.ad_soyad,
      email: m.email,
      telefon: m.telefon,
      mesaj: m.mesaj,
      okundu: m.okundu,
      olusturulmaTarihi: m.olusturulma_tarihi,
    })) };
  },

  okunduIsaretle: async (id) => {
    const { error } = await supabase
      .from('iletisim_mesajlari')
      .update({ okundu: true })
      .eq('id', id);
    if (error) throw error;
    return { data: null };
  },
};

// Default export (uyumluluk)
export default { supabase };
