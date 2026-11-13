import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, products, subcategories } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

const categoryIcons = {
  water: 'droplet',
  dispenser: 'dispenser',
  coffee: 'coffee',
  tea: 'tea',
  sweets: 'cookie',
  stationery: 'edit',
  household: 'cleaning',
  disposable: 'cup',
};

const pricePresets = [10000, 25000, 40000, 60000];

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

  const baseCategory = forcedCategory || 'all';
  const activeFilterCount = Number(category !== baseCategory) + Number(maxPrice < 60000);
  const categoryCount = (slug) => products.filter((p) => p.category === slug).length;

  const clear = () => {
    setQuery('');
    setCategory(baseCategory);
    setMaxPrice(60000);
    setParams({});
  };

  const selectCategory = (slug) => {
    setCategory(slug);
  };

  return <>
    <PageHero eyebrow="Կատալոգ" title="Ապրանքներ" text="Արագ որոնում, հստակ ֆիլտրեր և նույնական ապրանքային քարտեր՝ desktop-ից մինչև mobile։" />

    <div className="container shop-shell">
      <Breadcrumbs items={[{label:'Ապրանքներ'}]}/>

      <div className="shop-toolbar">
        <div className="shop-search">
          <Icon name="search" size={18}/>
          <input
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setParams(e.target.value ? {q:e.target.value}:{});
            }}
            placeholder="Որոնել կատալոգում…"
          />
        </div>

        <button className="btn btn-secondary mobile-filter-btn" onClick={() => setFiltersOpen(true)}>
          <Icon name="filter" size={18}/>
          Ֆիլտրեր
          {activeFilterCount > 0 && <span className="mobile-filter-count">{activeFilterCount}</span>}
        </button>

        <div className="toolbar-spacer"/>

        <div className="shop-toolbar-meta">
          <span className="result-count"><strong>{filtered.length}</strong> արդյունք</span>
          <label className="shop-sort">
            <span>Դասավորել</span>
            <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Դասավորել">
              <option value="featured">Առաջարկվող</option>
              <option value="new">Նորերը սկզբում</option>
              <option value="price-asc">Գին՝ ցածրից բարձր</option>
              <option value="price-desc">Գին՝ բարձրից ցածր</option>
            </select>
          </label>
        </div>
      </div>

      <div className="shop-layout">
        {filtersOpen && <button className="shop-filter-backdrop" aria-label="Փակել ֆիլտրերը" onClick={() => setFiltersOpen(false)}/>}

        <aside className={`filter-panel ${filtersOpen ? 'is-mobile-open' : ''}`}>
          <div className="filter-panel-head">
            <div>
              <span className="filter-kicker">Կատալոգ</span>
              <div className="filter-title-row">
                <h2>Ֆիլտրեր</h2>
                {activeFilterCount > 0 && <span className="filter-count-badge">{activeFilterCount}</span>}
              </div>
              <p>Սահմանափակեք արդյունքները ձեր պահանջներին համապատասխան։</p>
            </div>
            <button className="icon-btn filter-close" onClick={() => setFiltersOpen(false)} aria-label="Փակել">
              <Icon name="close" size={19}/>
            </button>
          </div>

          <div className="filter-group filter-category-group">
            <div className="filter-section-head">
              <div>
                <span className="filter-section-icon"><Icon name="grid" size={16}/></span>
                <strong>Կատեգորիա</strong>
              </div>
              {category !== baseCategory && <button className="filter-reset-inline" onClick={() => setCategory(baseCategory)}>Մաքրել</button>}
            </div>

            {!forcedCategory && (
              <button className={`filter-category-row ${category === 'all' ? 'is-active' : ''}`} onClick={() => selectCategory('all')}>
                <span className="filter-category-icon"><Icon name="grid" size={17}/></span>
                <span className="filter-category-name">Բոլոր ապրանքները</span>
                <small>{products.length}</small>
                <span className="filter-category-state">{category === 'all' ? <Icon name="check" size={14}/> : null}</span>
              </button>
            )}

            {categories.map(c => (
              <button
                className={`filter-category-row ${category === c.slug ? 'is-active' : ''}`}
                onClick={() => selectCategory(c.slug)}
                key={c.slug}
              >
                <span className="filter-category-icon"><Icon name={categoryIcons[c.slug] || 'grid'} size={17}/></span>
                <span className="filter-category-name">{c.short}</span>
                <small>{categoryCount(c.slug)}</small>
                <span className="filter-category-state">{category === c.slug ? <Icon name="check" size={14}/> : null}</span>
              </button>
            ))}
          </div>

          <div className="filter-group filter-price-group">
            <div className="filter-section-head">
              <div>
                <span className="filter-section-icon"><Icon name="tag" size={16}/></span>
                <strong>Գնի սահմանաչափ</strong>
              </div>
              {maxPrice < 60000 && <button className="filter-reset-inline" onClick={() => setMaxPrice(60000)}>Մաքրել</button>}
            </div>

            <div className="filter-price-value">
              <span>Մինչև</span>
              <strong>{maxPrice.toLocaleString('hy-AM')} ֏</strong>
            </div>

            <input
              className="price-range"
              type="range"
              min="500"
              max="60000"
              step="500"
              value={maxPrice}
              aria-label="Առավելագույն գին"
              onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ '--range-progress': `${((maxPrice - 500) / (60000 - 500)) * 100}%` }}
            />

            <div className="range-labels">
              <span>500 ֏</span>
              <span>60,000 ֏</span>
            </div>

            <div className="filter-price-presets">
              {pricePresets.map(price => (
                <button
                  key={price}
                  className={maxPrice === price ? 'is-active' : ''}
                  onClick={() => setMaxPrice(price)}
                >
                  {price === 60000 ? 'Բոլորը' : `≤ ${(price / 1000).toFixed(0)}K`}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group filter-subcats">
            <div className="filter-section-head">
              <div>
                <span className="filter-section-icon"><Icon name="sparkles" size={16}/></span>
                <strong>Հաճախ ընտրվող</strong>
              </div>
            </div>

            <div className="filter-chip-grid">
              {subcategories.slice(0,8).map(s => (
                <button
                  className={category === s.slug ? 'is-active' : ''}
                  onClick={() => setCategory(s.slug)}
                  key={s.slug}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-panel-actions">
            <button className="filter-clear-btn" onClick={clear} disabled={!query && activeFilterCount === 0}>
              <Icon name="refresh" size={15}/>
              Մաքրել բոլորը
            </button>
            <button className="btn btn-primary full-width mobile-only" onClick={() => setFiltersOpen(false)}>
              Ցույց տալ {filtered.length} արդյունք
            </button>
          </div>
        </aside>

        <section className="shop-results" aria-live="polite">
          {filtered.length
            ? <div className="product-grid product-grid-shop">{filtered.map(p => <ProductCard key={p.id} product={p}/>)}</div>
            : <div className="no-results">
                <div className="empty-icon"><Icon name="search" size={28}/></div>
                <h2>Ապրանքներ չեն գտնվել</h2>
                <p>Փորձեք փոխել որոնումը կամ մաքրել ակտիվ ֆիլտրերը։</p>
                <button className="btn btn-primary" onClick={clear}>Մաքրել ֆիլտրերը</button>
              </div>}
        </section>
      </div>
    </div>
  </>;
}
