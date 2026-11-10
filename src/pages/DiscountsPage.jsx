import { products } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

export default function DiscountsPage() {
  const sale = products.filter(p=>p.oldPrice);
  return <><PageHero eyebrow="Հատուկ առաջարկներ" title="Զեղչեր" text="Զեղչված ապրանքները մեկ էջում՝ հին և նոր գների հստակ համեմատությամբ։"><div className="discount-hero-badge">-18%<small>մինչև</small></div></PageHero><div className="container discounts-page"><Breadcrumbs items={[{label:'Զեղչեր'}]}/><div className="discounts-head"><div><h2>Ակտիվ առաջարկներ</h2><p>{sale.length} ցուցադրական զեղչված ապրանք</p></div><div className="discount-note"><Icon name="spark" size={18}/> Գները demo տվյալներ են՝ ներկայիս կայքի օրինակների հիման վրա</div></div><div className="product-grid product-grid-shop">{sale.map(p=><ProductCard key={p.id} product={p}/>)}</div></div></>;
}
