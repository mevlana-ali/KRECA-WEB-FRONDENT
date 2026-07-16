import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title ? `${title} | K-RECA Tıbbi Sülük Hendek` : 'K-RECA Tıbbi Sülük | Sakarya Hendek Sülük Tedavisi ve Satışı'}</title>
      <meta name="description" content={description || "Tarım Bakanlığı onaylı K-RECA Tıbbi Sülük. Sakarya, Hendek, Adapazarı, Akyazı ve tüm Türkiye'ye toptan ve perakende tıbbi sülük satışı. Hirudoterapi (sülük tedavisi) faydaları ve steril sülük."} />
      <meta name="keywords" content={keywords || 'tıbbi sülük, sülük satışı, sakarya sülük, hendek sülük, sülük tedavisi, hirudoterapi, toptan sülük, perakende sülük, adapazarı sülük satışı, akyazı sülük, steril sülük'} />
      <meta property="og:title" content={title ? `${title} | K-RECA Tıbbi Sülük` : 'K-RECA Tıbbi Sülük | Sakarya Hendek Sülük Tedavisi ve Satışı'} />
      <meta property="og:description" content={description || "Tarım Bakanlığı onaylı K-RECA Tıbbi Sülük. Sakarya, Hendek ve tüm Türkiye'ye toptan ve perakende tıbbi sülük satışı."} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;
