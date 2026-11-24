import { useEffect } from 'react';

const getOrCreateMeta = (selector, attrs = {}) => {
  let node = document.head.querySelector(selector);
  const created = !node;
  if (!node) {
    node = document.createElement('meta');
    Object.entries(attrs).forEach(([key,value]) => node.setAttribute(key,value));
    document.head.appendChild(node);
  }
  return { node, created };
};

const getOrCreateLink = (rel) => {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  const created = !node;
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', rel);
    document.head.appendChild(node);
  }
  return { node, created };
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
    const managed = [];

    const setMeta = (selector, attrs, content) => {
      const { node, created } = getOrCreateMeta(selector, attrs);
      const previous = node.getAttribute('content');
      if (content) node.setAttribute('content', content);
      managed.push({ node, created, previous });
      return node;
    };

    setMeta('meta[name="description"]',{name:'description'},description);
    setMeta('meta[property="og:site_name"]',{property:'og:site_name'},'OfficeStore');
    setMeta('meta[property="og:title"]',{property:'og:title'},title);
    setMeta('meta[property="og:description"]',{property:'og:description'},description);
    setMeta('meta[property="og:type"]',{property:'og:type'},type);
    setMeta('meta[property="og:url"]',{property:'og:url'},canonical);
    setMeta('meta[property="og:image"]',{property:'og:image'},image);
    setMeta('meta[name="twitter:card"]',{name:'twitter:card'},'summary_large_image');
    setMeta('meta[name="twitter:title"]',{name:'twitter:title'},title);
    setMeta('meta[name="twitter:description"]',{name:'twitter:description'},description);
    setMeta('meta[name="twitter:image"]',{name:'twitter:image'},image);

    if (title) document.title = title;

    let canonicalState = null;
    if (canonical) {
      const { node, created } = getOrCreateLink('canonical');
      canonicalState = { node, created, previous:node.getAttribute('href') };
      node.setAttribute('href', canonical);
    }

    const scriptId = 'page-json-ld';
    let script = document.getElementById(scriptId);
    const scriptCreated = !script;
    const previousJsonLd = script?.textContent || '';

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

      managed.forEach(({ node, created, previous }) => {
        if (created) node.remove();
        else if (previous !== null) node.setAttribute('content', previous);
        else node.removeAttribute('content');
      });

      if (canonicalState) {
        if (canonicalState.created) canonicalState.node.remove();
        else if (canonicalState.previous) canonicalState.node.setAttribute('href', canonicalState.previous);
        else canonicalState.node.removeAttribute('href');
      }

      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        if (scriptCreated) currentScript.remove();
        else currentScript.textContent = previousJsonLd;
      }
    };
  }, [title,description,canonical,image,type,jsonLd]);

  return null;
}
