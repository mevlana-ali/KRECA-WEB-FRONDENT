import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import AdminUrunler from './AdminUrunler';
import AdminKategoriler from './AdminKategoriler';
import AdminSiparisler from './AdminSiparisler';
import AdminAyarlar from './AdminAyarlar';
import AdminMesajlar from './AdminMesajlar';
import { LayoutDashboard, Package, Tag, ShoppingBag, Settings, MessageSquare, LogOut, Menu, X } from 'lucide-react';

const AdminPanel = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) navigate('/yonetim-girisi-kreca');
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/yonetim-girisi-kreca');
  };

  const menuItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/admin/urunler', label: 'Ürünler', icon: Package },
    { to: '/admin/kategoriler', label: 'Kategoriler', icon: Tag },
    { to: '/admin/siparisler', label: 'Siparişler', icon: ShoppingBag },
    { to: '/admin/mesajlar', label: 'Mesajlar', icon: MessageSquare },
    { to: '/admin/ayarlar', label: 'Ayarlar', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row overflow-hidden">
      
      {/* MOBİL HEADER (Hamburger Menu) */}
      <div className="md:hidden bg-navy text-white flex items-center justify-between p-4 sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="font-bold text-xs">KR</span>
          </div>
          <span className="font-bold">Yönetim Paneli</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBİL ARKA PLAN KARARTMASI */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-navy text-white flex flex-col shrink-0 z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-navy-light">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="font-bold text-sm">KR</span>
            </div>
            <div>
              <p className="font-bold">K-RECA</p>
              <p className="text-xs text-gray-400">Yönetim Paneli</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map(({ to, label, icon: Icon, exact }) => {
            const isActive = exact
              ? location.pathname === to
              : location.pathname.startsWith(to) && to !== '/admin';
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:bg-navy-light hover:text-white'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy-light mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-navy-light hover:text-white transition-all duration-200 w-full"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
        <Routes>
          <Route path="/" element={
            <div className="p-4 md:p-8">
              <h1 className="text-2xl font-bold text-navy mb-6">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Ürünler', icon: Package, to: '/admin/urunler', renk: 'bg-primary' },
                  { label: 'Kategoriler', icon: Tag, to: '/admin/kategoriler', renk: 'bg-navy' },
                  { label: 'Siparişler', icon: ShoppingBag, to: '/admin/siparisler', renk: 'bg-green-600' },
                  { label: 'Mesajlar', icon: MessageSquare, to: '/admin/mesajlar', renk: 'bg-blue-600' },
                  { label: 'Ayarlar', icon: Settings, to: '/admin/ayarlar', renk: 'bg-orange-500' },
                ].map(({ label, icon: Icon, to, renk }) => (
                  <Link key={to} to={to}>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4">
                      <div className={`w-12 h-12 ${renk} rounded-xl flex items-center justify-center`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="font-semibold text-navy">{label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          } />
          <Route path="/urunler" element={<AdminUrunler />} />
          <Route path="/kategoriler" element={<AdminKategoriler />} />
          <Route path="/siparisler" element={<AdminSiparisler />} />
          <Route path="/mesajlar" element={<AdminMesajlar />} />
          <Route path="/ayarlar" element={<AdminAyarlar />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;