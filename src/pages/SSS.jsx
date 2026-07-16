import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const sorular = [
  {
    soru: 'Tıbbi sülük nedir?',
    cevap: 'Tıbbi sülük (Hirudo medicinalis), yüzyıllardır geleneksel tıpta kullanılan, kan emmek suretiyle antikoagülan ve anti-enflamatuar maddeler salgılayan bir canlıdır. Günümüzde modern tıpta da mikrocerrahi sonrası ve çeşitli tedavilerde kullanılmaktadır.'
  },
  {
    soru: 'Sülükleriniz hangi onaylara sahiptir?',
    cevap: 'İşletmemiz Tarım ve Orman Bakanlığı tarafından onaylanmış resmi bir su ürünleri üretim işletmesidir. Tüm sülüklerimiz hijyenik koşullarda yetiştirilmekte ve paketlenmektedir.'
  },
  {
    soru: 'Sülükler nasıl gönderiliyor?',
    cevap: 'Sülükler özel havalandırmalı kaplar içinde, uygun sıcaklık ve nem koşullarında kargoya verilmektedir. Canlı teslimat garantisi sunulmaktadır. Kargo süresi genellikle 1-3 iş günüdür.'
  },
  {
    soru: 'Toptan alım yapabilir miyim?',
    cevap: 'Evet, toptan alım için özel fiyatlandırma uygulanmaktadır. Toptan sipariş ve fiyat bilgisi için WhatsApp (+90 541 614 87 91) üzerinden veya iletişim sayfamızdan bize ulaşabilirsiniz.'
  },
  {
    soru: 'Ödeme yöntemleri nelerdir?',
    cevap: 'PayTR güvenli ödeme altyapısı üzerinden kredi kartı, banka kartı ve sanal kart ile ödeme yapabilirsiniz. Tüm ödemeleriniz 256-bit SSL şifrelemesi ile korunmaktadır.'
  },
  {
    soru: 'İade ve değişim yapılabiliyor mu?',
    cevap: 'Canlı ürün olması sebebiyle, hasarlı veya ölü olarak teslim edilen sülükler için iade ve değişim hakkınız bulunmaktadır. Teslimat anında fotoğraflı bildirim yapmanız gerekmektedir. Detaylı bilgi için İade Politikası sayfamızı inceleyebilirsiniz.'
  },
  {
    soru: 'Kargo ücreti ne kadar?',
    cevap: 'Standart kargo ücreti ₺150\'dir. Bu ücret özel canlı hayvan taşıma paketleme ve termal koruma maliyetlerini kapsamaktadır.'
  },
  {
    soru: 'Sülükleri nasıl saklamalıyım?',
    cevap: 'Sülükler serin (15-20°C), karanlık bir ortamda, klorsuz su içinde saklanmalıdır. Su 2-3 günde bir değiştirilmelidir. Direkt güneş ışığından ve aşırı sıcaktan korunmalıdır.'
  },
];

const SSS = () => {
  const [acikIndex, setAcikIndex] = useState(null);

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="bg-navy text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Sık Sorulan Sorular</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Merak ettiğiniz her şeyin cevabını burada bulabilirsiniz.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-3">
          {sorular.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setAcikIndex(acikIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={20} className="text-primary shrink-0" />
                  <span className="font-semibold text-navy">{item.soru}</span>
                </div>
                {acikIndex === index ? (
                  <ChevronUp size={20} className="text-primary shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400 shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  acikIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="px-6 pl-14 text-gray-500 leading-relaxed">
                  {item.cevap}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* İletişim CTA */}
        <div className="mt-12 bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-3">Sorunuz mu var?</h3>
          <p className="text-gray-300 mb-6">
            Aradığınız cevabı bulamadıysanız bize ulaşın.
          </p>
          <a
            href="https://wa.me/905416148791"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            WhatsApp ile Yazın
          </a>
        </div>
      </div>
    </div>
  );
};

export default SSS;
