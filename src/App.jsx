import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Anasayfa from './pages/Anasayfa';
import Urunler from './pages/Urunler';
import UrunDetay from './pages/UrunDetay';
import Hakkimizda from './pages/Hakkimizda';
import Iletisim from './pages/Iletisim';
import Sepet from './pages/Sepet';
import Odeme from './pages/Odeme';
import OdemeBasarili from './pages/OdemeBasarili';
import OdemeBasarisiz from './pages/OdemeBasarisiz';
import SSS from './pages/SSS';
import IadePolitikasi from './pages/IadePolitikasi';
import SatisSozlesmesi from './pages/SatisSozlesmesi';
import GizlilikPolitikasi from './pages/GizlilikPolitikasi';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPanel from './pages/admin/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Admin rotaları — Navbar/Footer yok */}
      <Route path="/yonetim-girisi-kreca" element={<AdminLogin />} />
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      } />

      {/* Normal rotalar */}
      <Route path="/*" element={
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Anasayfa />} />
              <Route path="/urunler" element={<Urunler />} />
              <Route path="/urunler/:id" element={<UrunDetay />} />
              <Route path="/hakkimizda" element={<Hakkimizda />} />
              <Route path="/iletisim" element={<Iletisim />} />
              <Route path="/sepet" element={<Sepet />} />
              <Route path="/odeme" element={<Odeme />} />
              <Route path="/odeme-basarili" element={<OdemeBasarili />} />
              <Route path="/odeme-basarisiz" element={<OdemeBasarisiz />} />
              <Route path="/sss" element={<SSS />} />
              <Route path="/iade-politikasi" element={<IadePolitikasi />} />
              <Route path="/satis-sozlesmesi" element={<SatisSozlesmesi />} />
              <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  );
}

export default App;