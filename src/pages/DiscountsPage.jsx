import { products } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

export default function DiscountsPage() {
  const sale = products.filter(p=>p.oldPrice);
  return <><PageHero variant="catalog" eyebrow="Հատուկ առաջարկներ" title="Զեղչեր" text="Բացահայտեք գործող առաջարկները և համեմատեք նոր ու նախկին գները մեկ պարզ էջում։"><div className="discount-hero-summary" aria-label="Առավելագույն զեղչը մինչև 18 տոկոս">
    <span className="discount-hero-summary-kicker"><Icon name="tag" size={14}/> Հատուկ գին</span>
    <div className="discount-hero-summary-value"><small>մինչև</small><strong>18%</strong></div>
    <p>{sale.length} ակտիվ առաջարկ</p>
  </div></PageHero><div className="container discounts-page"><Breadcrumbs items={[{label:'Զեղչեր'}]}/><div className="discounts-head"><div><h2>Ակտիվ առաջարկներ</h2><p>{sale.length} ակտիվ առաջարկ</p></div><div className="discount-note"><Icon name="spark" size={18}/> Առաջարկները ներկայացված են պարզ և համեմատելի ձևաչափով</div></div><div className="product-grid product-grid-shop">{sale.map(p=><ProductCard key={p.id} product={p}/>)}</div></div></>;
}
