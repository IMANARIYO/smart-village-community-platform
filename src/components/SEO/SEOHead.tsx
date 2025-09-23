import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultSEO = {
  title: import.meta.env.VITE_SITE_NAME || "Smart Village Community Platform - Connect, Engage, Thrive Together",
  description: import.meta.env.VITE_SITE_DESCRIPTION || "Join your local community on Smart Village Platform. Connect with residents, participate in events, volunteer for causes, and strengthen community bonds. Digital platform for modern village life.",
  keywords: "community platform, village community, local events, volunteering, resident engagement, community management, digital village, social platform, local government, community activities",
  image: import.meta.env.VITE_OG_IMAGE || "/images/smart-village-og.jpg",
  url: import.meta.env.VITE_SITE_URL || "https://smartvillage.community"
};

export function SEOHead({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = "website"
}: SEOProps) {
  const fullTitle = title === defaultSEO.title ? title : `${title} | Smart Village Platform`;
  const fullUrl = url.startsWith('http') ? url : `${defaultSEO.url}${url}`;
  const fullImage = image.startsWith('http') ? image : `${defaultSEO.url}${image}`;

  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Smart Village Community Platform",
      "description": description,
      "url": fullUrl,
      "applicationCategory": "SocialNetworkingApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "potentialAction": [
        {
          "@type": "RegisterAction",
          "target": `${import.meta.env.VITE_SITE_URL || defaultSEO.url}/auth/signup`,
          "name": "Register for Smart Village Platform"
        },
        {
          "@type": "JoinAction",
          "target": `${import.meta.env.VITE_SITE_URL || defaultSEO.url}/events`,
          "name": "Join Community Event"
        }
      ],
      "creator": {
        "@type": "Organization",
        "name": "Smart Village Initiative"
      }
    };

    document.title = fullTitle;
    
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) meta.setAttribute('property', name);
        else meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', 'index, follow');
    setMeta('theme-color', '#2e7d32');
    
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', fullImage, true);
    setMeta('og:url', fullUrl, true);
    setMeta('og:type', type, true);
    setMeta('og:site_name', 'Smart Village Community Platform', true);
    
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', fullImage);

    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, [fullTitle, description, keywords, fullImage, fullUrl, type]);

  return null;
}