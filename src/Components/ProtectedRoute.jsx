import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { token, isAdmin } = useAuth();

  // Token yoksa anasayfaya yönlendir (Login sayfasının varlığını gizlemek için)
  if (!token || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Token varsa içeriği göster
  return children;
};

export default ProtectedRoute;
