import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.kreca.com.tr/api',
});

// Her istekte token varsa ekle
api.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Eğer token geçersizse (401) otomatik çıkış yap ve login'e at
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/yonetim-girisi-kreca';
    }
    return Promise.reject(error);
  }
);

export const urunler = {
  hepsiniGetir: () => api.get('/urunler'),
  idIleGetir: (id) => api.get(`/urunler/${id}`),
  kategoriIleGetir: (kategoriId) => api.get(`/urunler/kategori/${kategoriId}`),
  ekle: (data) => api.post('/urunler', data),
  guncelle: (id, data) => api.put(`/urunler/${id}`, data),
  sil: (id) => api.delete(`/urunler/${id}`),
};

export const kategoriler = {
  hepsiniGetir: () => api.get('/kategoriler'),
  ekle: (data) => api.post('/kategoriler', data),
  sil: (id) => api.delete(`/kategoriler/${id}`),
};

export const siparisler = {
  olustur: (data) => api.post('/siparisler', data),
  idIleGetir: (id) => api.get(`/siparisler/${id}`),
  hepsiniGetir: () => api.get('/siparisler'),
  durumGuncelle: (id, durum) => api.put(`/siparisler/${id}/durum`, { durum }),
};

export const auth = {
  login: (data) => api.post('/auth/login', data),
};

export const paytr = {
  tokenAl: (data) => api.post('/paytr/token-al', data),
};

export const resim = {
  yukle: (formData) => api.post('/resim/yukle', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const ayarlar = {
  getir: () => api.get('/ayarlar'),
  guncelle: (data) => api.put('/ayarlar', data),
  kargoGetir: () => api.get('/ayarlar/kargo'),
};

export const iletisim = {
  gonder: (data) => api.post('/iletisim', data),
  hepsiniGetir: () => api.get('/iletisim'),
  okunduIsaretle: (id) => api.put(`/iletisim/${id}/okundu`),
};

export default api;