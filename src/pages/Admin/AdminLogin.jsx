import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../services/api';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [yukleniyor, setYukleniyor] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setYukleniyor(true);
    try {
      const res = await auth.login(form);
      login(res.data.token);
      toast.success('Giriş başarılı!');
      navigate('/admin');
    } catch (err) {
      if (!err.response) {
        toast.error('Sunucuya (API) bağlanılamadı. Backend çalışmıyor olabilir.');
      } else if (err.response.status === 401 || err.response.status === 400) {
        toast.error('Kullanıcı adı veya şifre hatalı!');
      } else {
        toast.error('Bir hata oluştu: ' + err.message);
      }
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">KR</span>
          </div>
          <h1 className="text-2xl font-bold text-navy">Admin Girişi</h1>
          <p className="text-gray-400 text-sm mt-1">K-RECA Yönetim Paneli</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Şifre
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={yukleniyor}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;