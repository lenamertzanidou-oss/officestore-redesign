import { useEffect } from 'react';

const ensureMeta = (selector, attrs = {}) => {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    Object.entries(attrs).forEach(([key,value]) => node.setAttribute(key,value));
    document.head.appendChild(node);
  }
  return node;
};

const ensureLink = (rel) => {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', rel);
    document.head.appendChild(node);
  }
  return node;
};

export default function PageSeo({
  title,
  description,
  canonical,
  image,
  type = 'website',
  jsonLd,
}) {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = ensureMeta('meta[name="description"]',{name:'description'});
    const previousDescription = descriptionMeta.getAttribute('content') || '';

    const canonicalLink = canonical ? ensureLink('canonical') : null;
    const previousCanonical = canonicalLink?.getAttribute('href') || '';

    if (title) document.title = title;
    if (description) descriptionMeta.setAttribute('content', description);

    const ogTitle = ensureMeta('meta[property="og:title"]',{property:'og:title'});
    const ogDescription = ensureMeta('meta[property="og:description"]',{property:'og:description'});
    const ogType = ensureMeta('meta[property="og:type"]',{property:'og:type'});
    const ogImage = ensureMeta('meta[property="og:image"]',{property:'og:image'});
    const twitterCard = ensureMeta('meta[name="twitter:card"]',{name:'twitter:card'});

    if (title) ogTitle.setAttribute('content', title);
    if (description) ogDescription.setAttribute('content', description);
    ogType.setAttribute('content', type);
    twitterCard.setAttribute('content', 'summary_large_image');

    if (image) ogImage.setAttribute('content', image);

    if (canonical && canonicalLink) {
      canonicalLink.setAttribute('href', canonical);
      const ogUrl = ensureMeta('meta[property="og:url"]',{property:'og:url'});
      ogUrl.setAttribute('content', canonical);
    }

    const scriptId = 'page-json-ld';
    let script = document.getElementById(scriptId);
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      document.title = previousTitle;
      descriptionMeta.setAttribute('content', previousDescription);

      if (canonicalLink) {
        if (previousCanonical) canonicalLink.setAttribute('href', previousCanonical);
        else canonicalLink.remove();
      }

      const currentScript = document.getElementById(scriptId);
      if (currentScript) currentScript.remove();
    };
  }, [title,description,canonical,image,type,jsonLd]);

  return null;
}
