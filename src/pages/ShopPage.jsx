import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, products, subcategories } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

export default function ShopPage({ forcedCategory = null }) {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get('q') || '';
  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState(forcedCategory || 'all');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(60000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('hy-AM');
    let result = products.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category || p.subcategory === category;
      const matchesPrice = p.price <= maxPrice;
      const searchable = `${p.name} ${p.description}`.toLocaleLowerCase('hy-AM');
      const matchesQuery = !q || searchable.includes(q);
      return matchesCategory && matchesPrice && matchesQuery;
    });
    if (sort === 'price-asc') result = [...result].sort((a,b) => a.price-b.price);
    if (sort === 'price-desc') result = [...result].sort((a,b) => b.price-a.price);
    if (sort === 'new') result = [...result].sort((a,b) => (b.badge === 'Նոր') - (a.badge === 'Նոր'));
    return result;
  }, [query, category, sort, maxPrice]);

  const clear = () => { setQuery(''); setCategory(forcedCategory || 'all'); setMaxPrice(60000); setParams({}); };

  return <>
    <PageHero eyebrow="Կատալոգ" title="Ապրանքներ" text="Արագ որոնում, հստակ ֆիլտրեր և նույնական ապրանքային քարտեր՝ desktop-ից մինչև mobile։" />
    <div className="container shop-shell">
      <Breadcrumbs items={[{label:'Ապրանքներ'}]}/>
      <div className="shop-toolbar">
        <div className="shop-search"><Icon name="search" size={18}/><input value={query} onChange={e => { setQuery(e.target.value); setParams(e.target.value ? {q:e.target.value}:{}); }} placeholder="Որոնել կատալոգում…"/></div>
        <button className="btn btn-secondary mobile-filter-btn" onClick={() => setFiltersOpen(true)}><Icon name="filter" size={18}/> Ֆիլտրեր</button>
        <div className="toolbar-spacer"/>
        <span className="result-count">{filtered.length} արդյունք</span>
        <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Դասավորել"><option value="featured">Առաջարկվող</option><option value="new">Նորերը սկզբում</option><option value="price-asc">Գին՝ ցածրից բարձր</option><option value="price-desc">Գին՝ բարձրից ցածր</option></select>
      </div>

      <div className="shop-layout">
        <aside className={`filter-panel ${filtersOpen ? 'is-mobile-open' : ''}`}>
          <div className="filter-mobile-head"><strong>Ֆիլտրեր</strong><button className="icon-btn" onClick={() => setFiltersOpen(false)}><Icon name="close"/></button></div>
          <div className="filter-group"><div className="filter-label">Կատեգորիա</div><button className={category==='all'?'is-active':''} onClick={() => setCategory('all')}><span>Բոլորը</span><small>{products.length}</small></button>{categories.map(c => <button className={category===c.slug?'is-active':''} onClick={() => setCategory(c.slug)} key={c.slug}><span>{c.short}</span><small>{products.filter(p=>p.category===c.slug).length}</small></button>)}</div>
          <div className="filter-group"><div className="filter-label">Գին մինչև <strong>{maxPrice.toLocaleString('hy-AM')} ֏</strong></div><input className="price-range" type="range" min="500" max="60000" step="500" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}/><div className="range-labels"><span>500 ֏</span><span>60,000 ֏</span></div></div>
          <div className="filter-group filter-subcats"><div className="filter-label">Հաճախ ընտրվող</div>{subcategories.slice(0,8).map(s => <button className={category===s.slug?'is-active':''} onClick={() => setCategory(s.slug)} key={s.slug}>{s.name}</button>)}</div>
          <button className="btn btn-ghost full-width" onClick={clear}>Մաքրել ֆիլտրերը</button>
          <button className="btn btn-primary full-width mobile-only" onClick={() => setFiltersOpen(false)}>Ցույց տալ {filtered.length} արդյունք</button>
        </aside>

        <section className="shop-results" aria-live="polite">
          {filtered.length ? <div className="product-grid product-grid-shop">{filtered.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <div className="no-results"><div className="empty-icon"><Icon name="search" size={28}/></div><h2>Ապրանքներ չեն գտնվել</h2><p>Փորձեք փոխել որոնումը կամ մաքրել ակտիվ ֆիլտրերը։</p><button className="btn btn-primary" onClick={clear}>Մաքրել ֆիլտրերը</button></div>}
        </section>
      </div>
    </div>
  </>;
}
