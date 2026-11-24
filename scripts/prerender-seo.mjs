import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPosts, featuredBlogPost } from '../src/data/blog.js';
import { categories, products } from '../src/data/catalog.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const baseUrl = 'https://officestore.am';

const htmlEscape = (value='') => String(value)
  .replaceAll('&','&amp;')
  .replaceAll('<','&lt;')
  .replaceAll('>','&gt;')
  .replaceAll('"','&quot;')
  .replaceAll("'","&#39;");

const xmlEscape = (value='') => htmlEscape(value);

const jsonForHtml = (value) => JSON.stringify(value).replaceAll('<','\\u003c');

const injectSeo = (html, { title, description, canonical, image, type='website', jsonLd }) => {
  let output = html
    .replace(/<title>.*?<\/title>/s, `<title>${htmlEscape(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/i, `<meta name="description" content="${htmlEscape(description)}" />`);

  const tags = [
    `<link rel="canonical" href="${htmlEscape(canonical)}" />`,
    `<meta property="og:site_name" content="OfficeStore" />`,
    `<meta property="og:title" content="${htmlEscape(title)}" />`,
    `<meta property="og:description" content="${htmlEscape(description)}" />`,
    `<meta property="og:type" content="${htmlEscape(type)}" />`,
    `<meta property="og:url" content="${htmlEscape(canonical)}" />`,
    image ? `<meta property="og:image" content="${htmlEscape(image)}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${htmlEscape(title)}" />`,
    `<meta name="twitter:description" content="${htmlEscape(description)}" />`,
    image ? `<meta name="twitter:image" content="${htmlEscape(image)}" />` : '',
    jsonLd ? `<script type="application/ld+json">${jsonForHtml(jsonLd)}</script>` : ''
  ].filter(Boolean).join('\n    ');

  return output.replace('</head>', `    ${tags}\n  </head>`);
};

const writeSnapshot = async (route, seo) => {
  const source = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
  const output = injectSeo(source, seo);
  const targetDir = path.join(dist, route.replace(/^\//,''));
  await fs.mkdir(targetDir, { recursive:true });
  await fs.writeFile(path.join(targetDir, 'index.html'), output, 'utf8');
};

const blogDescription = 'OfficeStore բլոգ՝ գրասենյակային ապրանքների, ջրի, սուրճի, թղթի, հիգիենայի և կորպորատիվ գնումների գործնական ուղեցույցներով։';

await writeSnapshot('/blog', {
  title:'OfficeStore Բլոգ — Գրասենյակային գնումներ, ջուր, սուրճ և հիգիենա',
  description:blogDescription,
  canonical:`${baseUrl}/blog/`,
  image:featuredBlogPost.image,
  type:'website',
  jsonLd:{
    '@context':'https://schema.org',
    '@type':'Blog',
    name:'OfficeStore Բլոգ',
    description:blogDescription,
    url:`${baseUrl}/blog/`,
    publisher:{'@type':'Organization',name:'OfficeStore',url:`${baseUrl}/`},
    blogPost:blogPosts.map(post => ({
      '@type':'BlogPosting',
      headline:post.title,
      description:post.excerpt,
      datePublished:post.published,
      dateModified:post.updated,
      image:post.image,
      url:`${baseUrl}/blog/${post.slug}/`
    }))
  }
});

for (const post of blogPosts) {
  const canonical = `${baseUrl}/blog/${post.slug}/`;
  await writeSnapshot(`/blog/${post.slug}`, {
    title:`${post.title} | OfficeStore Բլոգ`,
    description:post.excerpt,
    canonical,
    image:post.image,
    type:'article',
    jsonLd:{
      '@context':'https://schema.org',
      '@type':'Article',
      headline:post.title,
      description:post.excerpt,
      image:[post.image],
      datePublished:post.published,
      dateModified:post.updated,
      mainEntityOfPage:canonical,
      author:{'@type':'Organization',name:'OfficeStore',url:`${baseUrl}/`},
      publisher:{'@type':'Organization',name:'OfficeStore',url:`${baseUrl}/`},
      keywords:post.keywords.join(', ')
    }
  });
}

const staticRoutes = [
  '/',
  '/shop/',
  '/services/dispenser-maintenance/',
  '/about/',
  '/contact/',
  '/delivery/',
  '/blog/',
  '/discounts/',
  '/privacy/',
  '/terms/'
];

const sitemapEntries = [
  ...staticRoutes.map(url => ({ url, lastmod:'2026-11-24' })),
  ...categories.map(category => ({ url:`/category/${category.slug}/`, lastmod:'2026-11-24' })),
  ...products.map(product => ({ url:`/product/${product.slug}/`, lastmod:'2026-11-24' })),
  ...blogPosts.map(post => ({ url:`/blog/${post.slug}/`, lastmod:post.updated }))
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries.map(entry => [
    '  <url>',
    `    <loc>${xmlEscape(baseUrl + entry.url)}</loc>`,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    '  </url>'
  ].join('\n')),
  '</urlset>',
  ''
].join('\n');

await fs.writeFile(path.join(dist,'sitemap.xml'), sitemap, 'utf8');
await fs.writeFile(path.join(dist,'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`, 'utf8');

console.log(`SEO snapshots generated for blog + ${blogPosts.length} articles, plus sitemap.xml and robots.txt`);
