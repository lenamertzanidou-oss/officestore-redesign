import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products, categories, formatPrice } from '../data/catalog';
import ProductVisual from '../components/ProductVisual';
import ProductCard from '../components/ProductCard';
import { Breadcrumbs, Quantity } from '../components/Common';
import { Icon } from '../components/Icons';
import { useStore } from '../context/StoreContext';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [qty, setQty] = useState(product?.minQty || 1);
  const [tab, setTab] = useState('details');
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const related = useMemo(() => product ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0,4) : [], [product]);
  if (!product) return <div className="container missing-product"><h1>Ապրանքը չի գտնվել</h1><Link className="btn btn-primary" to="/shop">Վերադառնալ խանութ</Link></div>;
  const category = categories.find(c => c.slug === product.category);
  const wished = wishlist.includes(product.id);

  return <>
    <div className="container product-page">
      <Breadcrumbs items={[{label:'Ապրանքներ',to:'/shop'},{label:category?.name || 'Կատեգորիա',to:`/category/${product.category}`},{label:product.name}]}/>
      <div className="product-detail-grid">
        <div className="product-gallery">
          <div className="product-gallery-main"><ProductVisual type={product.visual} size="detail"/><div className="gallery-badges">{product.badge && <span className="badge">{product.badge}</span>}{product.stock === 0 && <span className="badge badge-muted">Առկա չէ</span>}</div></div>
          <div className="gallery-thumbs"><button className="is-active"><ProductVisual type={product.visual}/></button><button><ProductVisual type={product.visual}/></button><button><ProductVisual type={product.visual}/></button></div>
        </div>
        <div className="purchase-panel">
          <div className="product-detail-meta"><Link to={`/category/${product.category}`}>{category?.name}</Link><span>SKU OS-{String(product.id).padStart(4,'0')}</span></div>
          <h1>{product.name}</h1>
          <div className="rating-row"><span className="stars">★★★★★</span><span>4.9 · 28 կարծիք</span></div>
          <div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div>
          <p className="detail-description">{product.description}</p>
          <div className={`stock-line ${product.stock === 0 ? 'out' : ''}`}><span className="stock-dot"/>{product.stock > 0 ? `Առկա է · ${product.stock} հատ պահեստում` : 'Ժամանակավորապես առկա չէ'}</div>
          {product.minQty && <div className="notice"><Icon name="info" size={18}/><span>Այս ապրանքի նվազագույն պատվերը՝ <strong>{product.minQty} հատ</strong>։</span></div>}
          <div className="buy-row"><Quantity value={qty} onChange={setQty} min={product.minQty || 1}/><button className="btn btn-primary btn-lg buy-btn" disabled={product.stock===0} onClick={() => addToCart(product, qty)}><Icon name="cart"/> {product.stock===0?'Սպառված է':'Ավելացնել զամբյուղ'}</button><button className={`icon-btn icon-btn-lg ${wished?'is-active':''}`} onClick={() => toggleWishlist(product.id)} aria-label="Ցանկ"><Icon name="heart"/></button></div>
          <div className="delivery-card"><div><Icon name="truck"/><span><strong>{product.slug === 'aparan-water-18-9' ? 'Անվճար առաքում' : 'Առաքում՝ հաջորդ աշխատանքային օրը'}</strong><small>{product.slug === 'aparan-water-18-9' ? 'Այս ապրանքը զամբյուղում ունենալու դեպքում' : 'Երկուշաբթի–շաբաթ, ըստ հասանելիության'}</small></span></div><Link to="/delivery">Պայմաններ</Link></div>
          <div className="payment-note"><Icon name="shield" size={18}/><span>Անվտանգ վճարում · ArCa · Visa · MasterCard · Idram · TelCell</span></div>
        </div>
      </div>

      <div className="product-info-tabs">
        <div className="tabs" role="tablist"><button className={tab==='details'?'is-active':''} onClick={() => setTab('details')}>Նկարագրություն</button><button className={tab==='specs'?'is-active':''} onClick={() => setTab('specs')}>Բնութագրեր</button><button className={tab==='delivery'?'is-active':''} onClick={() => setTab('delivery')}>Առաքում</button></div>
        <div className="tab-panel">{tab==='details' && <div><h2>Ապրանքի մասին</h2><p>{product.description}</p><p>Ռեդիզայնում նկարագրությունը պահվում է ընթեռնելի լայնության մեջ, իսկ կարևոր գնման տվյալները տեղափոխված են վերև՝ որոշումը արագացնելու համար։</p></div>}{tab==='specs' && <div><h2>Բնութագրեր</h2><dl className="spec-list">{product.specs.map((s,i) => <div key={s}><dt>Բնութագիր {i+1}</dt><dd>{s}</dd></div>)}<div><dt>Կատեգորիա</dt><dd>{category?.name}</dd></div></dl></div>}{tab==='delivery' && <div><h2>Առաքման պայմաններ</h2><p>Մինչև ժամը 18:00-ը ձևակերպված պատվերները սովորաբար առաքվում են հաջորդ աշխատանքային օրը։ Շաբաթ և կիրակի ձևակերպված պատվերների ընթացքը կախված է գործող գրաֆիկից։</p><Link className="text-link" to="/delivery">Դիտել ամբողջական առաքման էջը <Icon name="arrow" size={17}/></Link></div>}</div>
      </div>
    </div>
    {related.length > 0 && <section className="section section-soft"><div className="container"><div className="section-heading"><div><div className="eyebrow">Հարակից</div><h2>Կարող է նաև պետք գալ</h2></div></div><div className="product-grid product-grid-4">{related.map(p => <ProductCard key={p.id} product={p}/>)}</div></div></section>}
  </>;
}
