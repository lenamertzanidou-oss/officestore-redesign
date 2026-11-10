import { useParams, Link } from 'react-router-dom';
import { categories, products, subcategories } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import { Breadcrumbs, EmptyState } from '../components/Common';
import { Icon } from '../components/Icons';

export default function CategoryPage() {
  const { slug } = useParams();
  const main = categories.find(c => c.slug === slug);
  const sub = subcategories.find(s => s.slug === slug);
  const title = main?.name || sub?.name || 'Կատեգորիա';
  const parent = sub ? categories.find(c => c.slug === sub.parent) : main;
  const list = products.filter(p => p.category === slug || p.subcategory === slug || (main && p.category === main.slug));
  const childCats = subcategories.filter(s => s.parent === (main?.slug || sub?.parent));

  const theme = main?.tone || categories.find(c => c.slug === sub?.parent)?.tone || 'blue';
  return <>
    <section className={`category-hero category-hero-${theme}`}>
      <div className="container category-hero-inner">
        <div><Breadcrumbs items={[{label:'Ապրանքներ',to:'/shop'}, ...(sub && parent ? [{label:parent.name,to:`/category/${parent.slug}`}] : []), {label:title}]}/><div className="eyebrow">Կատեգորիա</div><h1>{title}</h1><p>Ընտրեք ապրանքները, համեմատեք գները և ավելացրեք զամբյուղ՝ առանց ավելորդ քայլերի։</p><div className="category-hero-stats"><span><strong>{list.length}</strong> demo ապրանք</span><span><Icon name="truck" size={17}/> Հաջորդ աշխատանքային օրը</span></div></div>
        <div className="category-symbol">{main?.icon || parent?.icon || '▦'}</div>
      </div>
    </section>
    <div className="container category-page">
      {childCats.length > 0 && <div className="subcategory-strip">{childCats.map(c => <Link key={c.slug} to={`/category/${c.slug}`}><span>{c.name}</span><Icon name="arrow" size={17}/></Link>)}</div>}
      <div className="category-content-head"><div><h2>{title}</h2><p>{list.length ? `Ցուցադրվում է ${list.length} օրինակ ապրանք։ Իրական WooCommerce ինտեգրման դեպքում այստեղ կբեռնվի ամբողջ կատալոգը։` : 'Այս կատեգորիայում հիմա ցուցադրական ապրանք չկա։'}</p></div><Link className="btn btn-secondary" to="/shop"><Icon name="filter" size={18}/> Բոլոր ֆիլտրերը</Link></div>
      {list.length ? <div className="product-grid product-grid-shop">{list.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <EmptyState title="Այս կատեգորիան դեռ դատարկ է" text="Ներկայիս կայքում կան նաև դատարկ ենթակատեգորիաներ։ Նոր UX-ը դրանք դարձնում է օգտակար՝ առաջարկելով հարակից բաժիններ։"/>}
      {slug === 'water' && <div className="category-callout"><div className="callout-icon"><Icon name="truck" size={28}/></div><div><strong>Անվճար առաքման կանոն</strong><p>18,9 լ Ապարան ջուրը զամբյուղում ունենալու դեպքում առաքման արժեքը ավտոմատ դառնում է 0 ֏։</p></div><Link className="btn btn-primary" to="/product/aparan-water-18-9">Դիտել 18,9 լ ջուրը</Link></div>}
    </div>
  </>;
}
