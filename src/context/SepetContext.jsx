import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SepetContext = createContext();

export const SepetProvider = ({ children }) => {
  const [sepet, setSepet] = useState(() => {
    const kayitli = localStorage.getItem('sepet');
    return kayitli ? JSON.parse(kayitli) : [];
  });

  useEffect(() => {
    localStorage.setItem('sepet', JSON.stringify(sepet));
  }, [sepet]);

  const sepeteEkle = useCallback((urun, adet = 1) => {
    setSepet(prev => {
      const mevcut = prev.find(item => item.id === urun.id);
      if (mevcut) {
        return prev.map(item =>
          item.id === urun.id
            ? { ...item, adet: item.adet + adet }
            : item
        );
      }
      return [...prev, { ...urun, adet }];
    });
  }, []);

  const sepettenCikar = useCallback((urunId) => {
    setSepet(prev => prev.filter(item => item.id !== urunId));
  }, []);

  const adetGuncelle = useCallback((urunId, adet) => {
    if (adet < 1) return;
    setSepet(prev =>
      prev.map(item =>
        item.id === urunId ? { ...item, adet } : item
      )
    );
  }, []);

  const sepetiBosalt = useCallback(() => setSepet([]), []);

  const toplamTutar = sepet.reduce(
    (toplam, item) => toplam + item.fiyat * item.adet, 0
  );

  const toplamUrun = sepet.reduce(
    (toplam, item) => toplam + item.adet, 0
  );

  return (
    <SepetContext.Provider value={{
      sepet,
      sepeteEkle,
      sepettenCikar,
      adetGuncelle,
      sepetiBosalt,
      toplamTutar,
      toplamUrun
    }}>
      {children}
    </SepetContext.Provider>
  );
};

export const useSepet = () => useContext(SepetContext);