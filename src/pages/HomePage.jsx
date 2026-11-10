import { Link } from 'react-router-dom';
import { categories, products } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import { Icon } from '../components/Icons';
import { SectionHeading } from '../components/Common';
import { siteAssets } from '../data/siteAssets';

const categoryOrder = ['water', 'sweets', 'coffee', 'stationery', 'dispenser', 'household', 'disposable'];

function CategoryCard({ category }) {
  return (
    <Link className="v5-category-card" to={`/category/${category.slug}`}>
      <div className="v5-category-image"><img src={siteAssets.category[category.slug]} alt={category.name} loading="lazy"/></div>
      <div><strong>{category.short}</strong><span>{category.count} ապրանք</span></div>
    </Link>
  );
}

export default function HomePage() {
  const categoryItems = categoryOrder.map((slug) => categories.find((c) => c.slug === slug)).filter(Boolean);
  const featured = [products[0], products[10], products[4], products[13], products[14], products[6], products[8], products[17]].filter(Boolean);
  const discounted = products.filter((p) => p.oldPrice).slice(0, 4);
  const weekly = [products[0], products[10], products[4], products[13]].filter(Boolean);
  const limited = [products[6], products[12], products[14], products[18]].filter(Boolean);

  return (
    <div className="v5-home">
      <section className="v5-hero-wrap">
        <div className="container">
          <div className="v5-hero">
            <div className="v5-hero-copy">
              <span className="v5-eyebrow">OFFICESTORE · OFFICE SUPPLY</span>
              <h1>Ամեն ինչ գրասենյակի համար՝ <em>մեկ պարզ պատվերով</em></h1>
              <p>Ջուր, սուրճ, գրենական, տնտեսական և ամենօրյա անհրաժեշտ ապրանքներ՝ արագ ընտրությամբ ու հստակ առաքմամբ։</p>
              <div className="v5-hero-actions">
                <Link className="v5-btn v5-btn-light" to="/shop">Գնել հիմա <Icon name="arrow" size={16}/></Link>
                <Link className="v5-hero-link" to="/delivery">Առաքման պայմաններ <Icon name="arrow" size={15}/></Link>
              </div>
              <div className="v5-hero-meta">
                <span><Icon name="truck" size={16}/> 18,9 լ Ապարան ջրով՝ անվճար առաքում</span>
                <span><Icon name="check" size={15}/> Պատվերը՝ հաջորդ աշխատանքային օրը</span>
              </div>
            </div>
            <div className="v5-hero-media">
              <img src={siteAssets.promo.water} alt="OfficeStore ջրի առաջարկ" />
              <div className="v5-hero-badge"><small>Հատուկ առաջարկ</small><strong>Ապարան 18,9 լ</strong><span>1,800 ֏</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="v5-section v5-categories-section">
        <div className="container">
          <SectionHeading title="Բացահայտեք կատեգորիաները" action="Բոլորը" actionTo="/shop" />
          <div className="v5-category-grid">{categoryItems.map((c) => <CategoryCard category={c} key={c.slug}/>)}</div>
        </div>
      </section>

      <section className="v5-section">
        <div className="container">
          <SectionHeading title="Լավագույն առաջարկները ձեզ համար" text="Ամենապահանջված ապրանքները՝ արագ ավելացնելու հնարավորությամբ։" action="Դիտել բոլորը" actionTo="/shop" />
          <div className="market-filter-pills"><button className="is-active">Բոլորը</button><button>Ջուր</button><button>Սուրճ</button><button>Գրենական</button><button>Տնտեսական</button></div>
          <div className="product-grid market-product-grid">{featured.map((p) => <ProductCard key={p.id} product={p}/>)}</div>
        </div>
      </section>

      <section className="v5-section v5-promo-section">
        <div className="container v5-promo-grid">
          <div className="v5-promo-stack">
            <Link to="/category/coffee" className="v5-mini-banner v5-mini-banner-purple">
              <div><span>COFFEE BREAK</span><h3>Սուրճ ու քաղցրավենիք</h3><b>Գնել հիմա <Icon name="arrow" size={14}/></b></div>
              <img src={siteAssets.category.coffee} alt="Սուրճ" />
            </Link>
            <Link to="/category/stationery" className="v5-mini-banner v5-mini-banner-sand">
              <div><span>DAILY OFFICE</span><h3>Գրենական ամեն օրվա համար</h3><b>Դիտել <Icon name="arrow" size={14}/></b></div>
              <img src={siteAssets.promo.stationery} alt="Գրենական" />
            </Link>
          </div>
          <Link to="/category/water" className="v5-wide-banner">
            <div><span>ԱՌԱՔՄԱՆ ՀԱՏՈՒԿ ԱՌԱՎԵԼՈՒԹՅՈՒՆ</span><h2>Թարմ ջուր՝ ձեր գրասենյակ</h2><p>18,9 լ Ապարան ջուրը պատվիրելիս առաքումն անվճար է։</p><b>Պատվիրել հիմա <Icon name="arrow" size={15}/></b></div>
            <img src={siteAssets.promo.water} alt="Ապարան ջուր" />
          </Link>
        </div>
      </section>

      <section className="v5-section">
        <div className="container">
          <SectionHeading title="Զեղչված ապրանքներ" action="Բոլոր զեղչերը" actionTo="/discounts" />
          <div className="product-grid product-grid-4 market-product-grid">{discounted.map((p) => <ProductCard key={p.id} product={p} compact/>)}</div>
        </div>
      </section>

      <section className="v5-section">
        <div className="container">
          <div className="v5-service-banner">
            <div><span>OFFICE ROUTINE</span><h2>Լցրեք զամբյուղը շաբաթվա անհրաժեշտ ամեն ինչով</h2><p>Ջուր, թուղթ, սուրճ և մաքրության ապրանքներ՝ մեկ պատվերում։</p><div><Link to="/shop">Գնել հիմա</Link><Link to="/category/stationery">Գրենական</Link></div></div>
            <img src={siteAssets.promo.office} alt="OfficeStore տեսականի" />
          </div>
        </div>
      </section>

      <section className="v5-section">
        <div className="container">
          <SectionHeading title="Շաբաթվա ամենաշատ վաճառվողները" action="Դիտել բոլորը" actionTo="/shop" />
          <div className="product-grid product-grid-4 market-product-grid">{weekly.map((p) => <ProductCard key={p.id} product={p}/>)}</div>
        </div>
      </section>

      <section className="v5-section">
        <div className="container v5-duo-grid">
          <Link to="/category/household" className="v5-duo v5-duo-mint"><div><span>KEEP IT CLEAN</span><h3>Մաքրության ապրանքներ գրասենյակի համար</h3><b>Տեսնել առաջարկները</b></div><img src={siteAssets.category.household} alt="Տնտեսական ապրանքներ" /></Link>
          <Link to="/services/dispenser-maintenance" className="v5-duo v5-duo-pink"><div><span>SERVICE</span><h3>Դիսպենսերի սպասարկում՝ առանց ավելորդ հոգսի</h3><b>Պատվիրել այց</b></div><img src={siteAssets.promo.service} alt="Դիսպենսերի սպասարկում" /></Link>
        </div>
      </section>

      <section className="v5-section v5-last-section">
        <div className="container">
          <SectionHeading title="Սահմանափակ առաջարկներ" text="Որոշ ապրանքների գինն ու առկայությունը կարող են արագ փոխվել։" action="Գնել հիմա" actionTo="/shop" />
          <div className="product-grid product-grid-4 market-product-grid">{limited.map((p) => <ProductCard key={p.id} product={p} compact/>)}</div>
        </div>
      </section>
    </div>
  );
}
