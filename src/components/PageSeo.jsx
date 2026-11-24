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
    if (title) document.title = title;

    const descriptionMeta = ensureMeta('meta[name="description"]',{name:'description'});
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

    if (image) {
      ogImage.setAttribute('content', image);
    } else {
      ogImage.removeAttribute('content');
    }

    if (canonical) {
      const canonicalLink = ensureLink('canonical');
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
    } else if (script) {
      script.remove();
    }

    return () => {
      const currentScript = document.getElementById(scriptId);
      if (currentScript) currentScript.remove();
    };
  }, [title,description,canonical,image,type,jsonLd]);

  return null;
}
