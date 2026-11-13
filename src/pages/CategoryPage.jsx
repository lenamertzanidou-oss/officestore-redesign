import { useParams, Link } from 'react-router-dom';
import { categories, products, subcategories } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import { Breadcrumbs, EmptyState, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

export default function CategoryPage() {
  const { slug } = useParams();
  const main = categories.find(c => c.slug === slug);
  const sub = subcategories.find(s => s.slug === slug);
  const title = main?.name || sub?.name || 'Կատեգորիա';
  const parent = sub ? categories.find(c => c.slug === sub.parent) : main;
  const list = products.filter(p => p.category === slug || p.subcategory === slug || (main && p.category === main.slug));
  const childCats = subcategories.filter(s => s.parent === (main?.slug || sub?.parent));

  return <>
    <PageHero
      variant="category"
      eyebrow="OfficeStore կատեգորիա"
      title={title}
      text="Ընտրեք անհրաժեշտ ապրանքները, համեմատեք տարբերակները և արագ ավելացրեք զամբյուղ։"
    />

    <div className="container category-page">
      <Breadcrumbs items={[{label:'Ապրանքներ',to:'/shop'}, ...(sub && parent ? [{label:parent.name,to:`/category/${parent.slug}`}] : []), {label:title}]}/>

      {childCats.length > 0 && (
        <nav className="subcategory-strip" aria-label="Ենթակատեգորիաներ">
          {childCats.map(c => (
            <Link className="subcategory-chip" key={c.slug} to={`/category/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </nav>
      )}

      <div className="category-content-head">
        <div>
          <h2>{title}</h2>
          <p>{list.length ? `Գտնվել է ${list.length} ապրանք։` : 'Այս կատեգորիայում հիմա ապրանք չկա։'}</p>
        </div>
        <Link className="btn btn-secondary" to="/shop"><Icon name="filter" size={18}/> Բոլոր ֆիլտրերը</Link>
      </div>

      {list.length
        ? <div className="product-grid product-grid-shop">{list.map(p => <ProductCard key={p.id} product={p}/>)}</div>
        : <EmptyState title="Այս կատեգորիան դեռ դատարկ է" text="Փորձեք դիտել մյուս կատեգորիաները կամ վերադառնալ ամբողջ կատալոգին։"/>}

      {slug === 'water' && (
        <div className="category-callout">
          <div className="callout-icon"><Icon name="truck" size={28}/></div>
          <div><strong>Անվճար առաքման պայման</strong><p>18,9 լ Ապարան ջուրը զամբյուղում ունենալու դեպքում առաքման արժեքը ավտոմատ դառնում է 0 ֏։</p></div>
          <Link className="btn btn-primary" to="/product/aparan-water-18-9">Դիտել 18,9 լ ջուրը</Link>
        </div>
      )}
    </div>
  </>;
}
