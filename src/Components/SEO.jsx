import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title ? `${title} | K-RECA (Kreca) Hendek Sülük` : 'K-RECA (Kreca) Tıbbi Sülük | Sakarya Hendek Sülük Satışı'}</title>
      <meta name="description" content={description || "Kreca Tıbbi Sülük. Sakarya Hendek merkezli Tarım Bakanlığı onaylı üretim tesisimizden tüm Türkiye'ye toptan ve perakende tıbbi sülük satışı. Sülük tedavisi ve kreca sülük siparişi."} />
      <meta name="keywords" content={keywords || 'kreca, kreca sülük, hendek sülük, sakarya sülük, hendek sülük satışı, adapazarı sülük, tıbbi sülük, sülük tedavisi, toptan sülük, k-reca'} />
      <meta property="og:title" content={title ? `${title} | Kreca Hendek Sülük` : 'K-RECA (Kreca) Tıbbi Sülük | Sakarya Hendek Sülük Satışı'} />
      <meta property="og:description" content={description || "Kreca Tıbbi Sülük: Sakarya, Hendek ve tüm Türkiye'ye toptan ve perakende tıbbi sülük satışı. Tarım Bakanlığı onaylı resmi işletme."} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
