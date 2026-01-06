import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage?: string;
  schema?: object | object[];
}

export const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical,
  schema 
}: SEOHeadProps) => {
  const fullTitle = `${title} | DocuTools Pro`;
  const baseUrl = "https://yourdomain.com";
  const fullCanonical = `${baseUrl}${canonical}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="DocuTools Pro" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />

      {schema && (
        <>
          {Array.isArray(schema) ? (
            schema.map((s, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(s)}
              </script>
            ))
          ) : (
            <script type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          )}
        </>
      )}
    </Helmet>
  );
};
