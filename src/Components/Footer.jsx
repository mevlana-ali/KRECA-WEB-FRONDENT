import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import logo from '../assets/Logo.jpeg';

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & Açıklama */}
          <div>
            <div className="mb-6">
              <Link to="/">
                <img src={logo} alt="K-RECA Logo" className="h-16 w-auto object-contain bg-white rounded-md p-1" />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tarım Bakanlığı onaylı, güvenli ve kaliteli tıbbi sülük üretimi ve satışı yapan resmi işletme.
            </p>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-primary font-semibold text-lg mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              <li><Link to="/hakkimizda" className="text-gray-400 hover:text-primary transition-colors text-sm">Hakkımızda</Link></li>
              <li><Link to="/sss" className="text-gray-400 hover:text-primary transition-colors text-sm">S.S.S</Link></li>
              <li><Link to="/urunler" className="text-gray-400 hover:text-primary transition-colors text-sm">Ürünlerimiz</Link></li>
              <li><Link to="/iletisim" className="text-gray-400 hover:text-primary transition-colors text-sm">İletişim</Link></li>
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h3 className="text-primary font-semibold text-lg mb-4">Yasal</h3>
            <ul className="space-y-2">
              <li><Link to="/iade-politikasi" className="text-gray-400 hover:text-primary transition-colors text-sm">Geri Ödeme ve İade Politikası</Link></li>
              <li><Link to="/satis-sozlesmesi" className="text-gray-400 hover:text-primary transition-colors text-sm">Mesafeli Satış Sözleşmesi</Link></li>
              <li><Link to="/gizlilik-politikasi" className="text-gray-400 hover:text-primary transition-colors text-sm">Gizlilik Politikası & KVKK</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-primary font-semibold text-lg mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                Dereboğazı, Osman Yılmaz Cd. No:107, 54300 Hendek/Sakarya
              </li>
              <li>
                <a href="tel:+905416148791" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm">
                  <Phone size={16} className="text-primary" />
                  +90 541 614 87 91
                </a>
              </li>
              <li>
                <a href="mailto:krecasuluk54@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors text-sm">
                  <Mail size={16} className="text-primary" />
                  krecasuluk54@gmail.com
                </a>
              </li>
            </ul>

            <a 
              href="https://wa.me/905416148791"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.122 1.528 5.855L.057 23.882l6.186-1.443A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.878 9.878 0 01-5.031-1.378l-.36-.214-3.733.871.938-3.43-.235-.372A9.845 9.845 0 012.106 12C2.106 6.57 6.57 2.106 12 2.106c5.43 0 9.894 4.464 9.894 9.894 0 5.43-4.464 9.894-9.894 9.894z"/>
              </svg>
              WhatsApp ile İletişim
            </a>
          </div>

        </div>

        <div className="border-t border-[#243655] mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} K-RECA Tıbbi Sülük. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;