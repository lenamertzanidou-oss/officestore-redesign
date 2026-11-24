import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Common';
import { Icon } from '../components/Icons';
import PageSeo from '../components/PageSeo';
import { blogPosts, getBlogPost } from '../data/blog';

const formatDate = (date) => new Intl.DateTimeFormat('hy-AM',{
  day:'numeric',
  month:'long',
  year:'numeric'
}).format(new Date(`${date}T12:00:00`));

export default function BlogArticlePage(){
  const { slug } = useParams();
  const post = getBlogPost(slug);

  if(!post){
    return (
      <main className="container blog-article-page">
        <Breadcrumbs items={[{label:'Բլոգ',to:'/blog'},{label:'Հոդված'}]}/>
        <div className="blog-article-not-found">
          <Icon name="edit" size={28}/>
          <h1>Հոդվածը չի գտնվել</h1>
          <p>Վերադարձեք բլոգ և ընտրեք այլ օգտակար նյութ։</p>
          <Link className="btn btn-primary" to="/blog">Վերադառնալ բլոգ</Link>
        </div>
      </main>
    );
  }

  const related = blogPosts.filter(item => item.slug !== post.slug).slice(0,3);
  const canonical = `https://officestore.am/blog/${post.slug}/`;
  const articleJsonLd = {
    '@context':'https://schema.org',
    '@type':'Article',
    headline:post.title,
    description:post.excerpt,
    image:[post.image],
    datePublished:post.published,
    dateModified:post.updated,
    mainEntityOfPage:canonical,
    author:{'@type':'Organization',name:'OfficeStore',url:'https://officestore.am/'},
    publisher:{'@type':'Organization',name:'OfficeStore',url:'https://officestore.am/'},
    keywords:post.keywords.join(', ')
  };

  return <>
    <PageSeo
      title={`${post.title} | OfficeStore Բլոգ`}
      description={post.excerpt}
      canonical={canonical}
      image={post.image}
      type="article"
      jsonLd={articleJsonLd}
    />

    <main className="container blog-article-page">
      <Breadcrumbs items={[{label:'Բլոգ',to:'/blog'},{label:post.category}]}/>

      <article className="blog-article">
        <header className="blog-article-head">
          <div className="blog-article-head-copy">
            <span className="blog-topic-tag">{post.category}</span>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <div className="blog-post-meta">
              <span><Icon name="clock" size={14}/>{post.readTime}</span>
              <span><Icon name="calendar" size={14}/>{formatDate(post.published)}</span>
              <span><Icon name="edit" size={14}/>OfficeStore խմբագրություն</span>
            </div>
          </div>
          <div className="blog-article-image">
            <img src={post.image} alt={post.imageAlt}/>
          </div>
        </header>

        <div className="blog-article-layout">
          <aside className="blog-article-toc">
            <span>Բովանդակություն</span>
            <nav>
              {post.sections.map((section,index) => (
                <a href={`#section-${index+1}`} key={section.heading}>{section.heading}</a>
              ))}
            </nav>
            <Link to={post.categoryLink}>{post.categoryCta}<Icon name="arrow" size={14}/></Link>
          </aside>

          <div className="blog-article-content">
            <p className="blog-article-intro">{post.intro}</p>

            {post.sections.map((section,index) => (
              <section id={`section-${index+1}`} key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                {section.bullets?.length > 0 && (
                  <ul>
                    {section.bullets.map(item => <li key={item}><Icon name="check" size={14}/><span>{item}</span></li>)}
                  </ul>
                )}
              </section>
            ))}

            <div className="blog-article-cta">
              <span><Icon name="cart" size={19}/></span>
              <div>
                <strong>Պետք եղած ապրանքները կարող եք գտնել OfficeStore-ում</strong>
                <p>Անցեք համապատասխան կատեգորիա և հավաքեք ձեր հաջորդ պատվերը։</p>
              </div>
              <Link className="btn btn-primary" to={post.categoryLink}>{post.categoryCta}<Icon name="arrow" size={14}/></Link>
            </div>
          </div>
        </div>
      </article>

      <section className="blog-related">
        <div className="blog-section-head">
          <div>
            <span className="blog-section-kicker">Շարունակեք կարդալ</span>
            <h2>Առնչվող նյութեր</h2>
          </div>
          <Link to="/blog">Բոլոր հոդվածները <Icon name="arrow" size={14}/></Link>
        </div>

        <div className="blog-related-grid">
          {related.map(item => (
            <Link className="blog-related-card" to={`/blog/${item.slug}`} key={item.slug}>
              <img src={item.image} alt="" loading="lazy"/>
              <span>{item.category}</span>
              <strong>{item.title}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  </>;
}
