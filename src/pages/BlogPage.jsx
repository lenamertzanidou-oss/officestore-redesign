import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';
import PageSeo from '../components/PageSeo';
import { blogCategories, blogPosts, featuredBlogPost } from '../data/blog';

const blogDescription = 'OfficeStore բլոգ՝ գրասենյակային ապրանքների, ջրի, սուրճի, թղթի, հիգիենայի և կորպորատիվ գնումների գործնական ուղեցույցներով։';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Բոլորը');

  const visiblePosts = useMemo(
    () => blogPosts.filter(post => !post.featured && (activeCategory === 'Բոլորը' || post.category === activeCategory)),
    [activeCategory]
  );

  const blogJsonLd = {
    '@context':'https://schema.org',
    '@type':'Blog',
    name:'OfficeStore Բլոգ',
    description:blogDescription,
    url:'https://officestore.am/blog/',
    publisher:{
      '@type':'Organization',
      name:'OfficeStore',
      url:'https://officestore.am/'
    },
    blogPost:blogPosts.map(post => ({
      '@type':'BlogPosting',
      headline:post.title,
      description:post.excerpt,
      datePublished:post.published,
      dateModified:post.updated,
      image:post.image,
      url:`https://officestore.am/blog/${post.slug}/`
    }))
  };

  return <>
    <PageSeo
      title="OfficeStore Բլոգ — Գրասենյակային գնումներ, ջուր, սուրճ և հիգիենա"
      description={blogDescription}
      canonical="https://officestore.am/blog/"
      image={featuredBlogPost.image}
      jsonLd={blogJsonLd}
    />

    <PageHero
      variant="blog"
      eyebrow="OfficeStore Բլոգ"
      title="Գործնական գաղափարներ՝ ավելի կազմակերպված գրասենյակի համար"
      text="Ուղեցույցներ ջրի, սուրճի, գրենական, հիգիենայի և կորպորատիվ գնումների մասին՝ հենց այն թեմաներով, որոնք ամեն օր պետք են գրասենյակին։"
      benefits={['Գործնական ուղեցույցներ','Ապրանքային խորհուրդներ','B2B գնումների գաղափարներ']}
    >
      <div className="blog-hero-visual" aria-hidden="true">
        <div className="blog-hero-sheet blog-hero-sheet--back"/>
        <div className="blog-hero-sheet blog-hero-sheet--front">
          <span className="blog-hero-sheet-tag">OfficeStore Journal</span>
          <strong>Work smarter.</strong>
          <span>Ջուր · Սուրճ · Թուղթ · Հիգիենա</span>
          <div className="blog-hero-lines"><i/><i/><i/></div>
        </div>
        <div className="blog-hero-badge"><Icon name="edit" size={17}/><span>Օգտակար նյութեր</span></div>
      </div>
    </PageHero>

    <main className="container blog-page">
      <Breadcrumbs items={[{label:'Բլոգ'}]}/>

      <section className="blog-featured" aria-labelledby="blog-featured-title">
        <Link className="blog-featured-media" to={`/blog/${featuredBlogPost.slug}`}>
          <img src={featuredBlogPost.image} alt={featuredBlogPost.imageAlt} loading="eager"/>
          <span className="blog-featured-badge">Ընտրված նյութ</span>
        </Link>

        <div className="blog-featured-copy">
          <span className="blog-topic-tag">{featuredBlogPost.category}</span>
          <h2 id="blog-featured-title">
            <Link to={`/blog/${featuredBlogPost.slug}`}>{featuredBlogPost.title}</Link>
          </h2>
          <p>{featuredBlogPost.excerpt}</p>
          <div className="blog-post-meta">
            <span><Icon name="clock" size={14}/>{featuredBlogPost.readTime}</span>
            <span><Icon name="calendar" size={14}/>24 նոյեմբերի, 2026</span>
          </div>
          <Link className="blog-read-link" to={`/blog/${featuredBlogPost.slug}`}>
            Կարդալ ուղեցույցը <Icon name="arrow" size={16}/>
          </Link>
        </div>
      </section>

      <section className="blog-explore" aria-labelledby="blog-explore-title">
        <div className="blog-section-head">
          <div>
            <span className="blog-section-kicker">Թեմաներ</span>
            <h2 id="blog-explore-title">Բացահայտեք ըստ թեմայի</h2>
            <p>Ընտրեք այն թեման, որն այժմ ամենաարդիականն է ձեր գրասենյակի համար։</p>
          </div>
        </div>

        <div className="blog-category-filter" role="group" aria-label="Բլոգի թեմաներ">
          {blogCategories.map(category => (
            <button
              type="button"
              className={activeCategory === category ? 'is-active' : ''}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="blog-grid blog-grid--seo">
          {visiblePosts.map(post => (
            <article className="blog-card" key={post.slug}>
              <Link className="blog-card-media" to={`/blog/${post.slug}`}>
                <img src={post.image} alt={post.imageAlt} loading="lazy"/>
                <span>{post.category}</span>
              </Link>

              <div className="blog-card-body">
                <div className="blog-card-meta">
                  <span>{post.readTime}</span>
                  <span>{post.published.split('-').reverse().join('.')}</span>
                </div>
                <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
                <p>{post.excerpt}</p>
                <Link className="blog-card-link" to={`/blog/${post.slug}`} aria-label={`Կարդալ՝ ${post.title}`}>
                  Կարդալ ավելին <Icon name="arrow" size={14}/>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {!visiblePosts.length && (
          <div className="blog-filter-empty">
            <Icon name="edit" size={22}/>
            <span>Այս թեմայով նոր նյութեր շուտով կավելացվեն։</span>
          </div>
        )}
      </section>

      <section className="blog-topic-links" aria-labelledby="blog-topic-links-title">
        <div className="blog-topic-links-copy">
          <span className="blog-section-kicker">Գնումների ուղեցույց</span>
          <h2 id="blog-topic-links-title">Հոդվածից անմիջապես անցեք անհրաժեշտ ապրանքներին</h2>
          <p>Բլոգի թեմաները կապված են OfficeStore-ի հիմնական կատեգորիաների հետ, որպեսզի տեղեկատվությունից գնում անցնելը լինի արագ ու բնական։</p>
        </div>

        <div className="blog-topic-link-grid">
          <Link to="/category/water"><span><Icon name="droplet" size={18}/></span><strong>Ջուր</strong><Icon name="arrow" size={14}/></Link>
          <Link to="/category/coffee"><span><Icon name="coffee" size={18}/></span><strong>Սուրճ</strong><Icon name="arrow" size={14}/></Link>
          <Link to="/category/stationery"><span><Icon name="edit" size={18}/></span><strong>Գրենական</strong><Icon name="arrow" size={14}/></Link>
          <Link to="/category/household"><span><Icon name="cleaning" size={18}/></span><strong>Տնտեսական</strong><Icon name="arrow" size={14}/></Link>
        </div>
      </section>

      <section className="blog-newsletter-cta">
        <div className="blog-newsletter-icon"><Icon name="mail" size={21}/></div>
        <div>
          <span>Նոր թեմայի առաջարկ</span>
          <h2>Չգտա՞ք ձեր հարցի պատասխանը</h2>
          <p>Գրեք մեզ, և ձեր հարցը կարող է դառնալ հաջորդ օգտակար ուղեցույցի թեման։</p>
        </div>
        <Link className="btn btn-primary" to="/contact">Առաջարկել թեմա <Icon name="arrow" size={15}/></Link>
      </section>
    </main>
  </>;
}
