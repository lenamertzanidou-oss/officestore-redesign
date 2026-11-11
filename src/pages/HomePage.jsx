import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, products } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import LimitedDealCard from '../components/LimitedDealCard';
import { Icon } from '../components/Icons';
import { SectionHeading } from '../components/Common';
import { siteAssets } from '../data/siteAssets';

const categoryOrder = ['water', 'coffee', 'stationery', 'household', 'sweets'];

function CategoryCard({ category }) {
  return (
    <Link className="fig-category-card" to={`/category/${category.slug}`}>
      <div className="fig-category-image">
        <img src={siteAssets.category[category.slug]} alt={category.name} loading="lazy"/>
      </div>
      <strong>{category.short}</strong>
      <span>{category.count} ապրանք</span>
    </Link>
  );
}

function pad(value) {
  return String(value).padStart(2, '0');
}

export default function HomePage() {
  const [dealSeconds, setDealSeconds] = useState((20 * 24 * 60 * 60) + (17 * 60 * 60) + (29 * 60) + 57);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDealSeconds((current) => current > 0 ? current - 1 : (20 * 24 * 60 * 60) + (17 * 60 * 60) + (29 * 60) + 57);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const dealTime = useMemo(() => {
    const days = Math.floor(dealSeconds / 86400);
    const hours = Math.floor((dealSeconds % 86400) / 3600);
    const minutes = Math.floor((dealSeconds % 3600) / 60);
    const seconds = dealSeconds % 60;
    return { days: pad(days), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
  }, [dealSeconds]);

  const categoryItems = categoryOrder.map((slug) => categories.find((c) => c.slug === slug)).filter(Boolean);
  const featured = [products[0], products[10], products[4], products[13], products[14], products[6], products[8], products[17]].filter(Boolean);
  const discounted = [products[12], products[6], products[7], products[14]].filter(Boolean);
  const weekly = [products[0], products[10], products[4], products[13]].filter(Boolean);
  const limited = [products[6], products[12]].filter(Boolean);

  return (
    <div className="fig-home">
      <section className="fig-hero-section">
        <div className="container">
          <div className="fig-hero">
            <div className="fig-hero-info">
              <small>ԱՌԱՔՈՒՄ · ԳՐԱՍԵՆՅԱԿ · ԱՄԵՆ ՕՐ</small>
              <strong>Ամեն ինչ գրասենյակի համար՝ մեկ պատվերով</strong>
              <Link to="/shop">Գնել հիմա <Icon name="arrow" size={13}/></Link>
            </div>

            <Link to="/product/aparan-water-18-9" className="fig-hero-product">
              <div className="fig-hero-product-image">
                <img src={siteAssets.category.water} alt="Ապարան ջուր 18,9 լ"/>
              </div>
              <strong>Ապարան ջուր 18,9 լ</strong>
              <span>1,800 ֏</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="fig-section fig-categories-section">
        <div className="container">
          <SectionHeading title="Բացահայտեք կատեգորիաները" action="Բոլորը" actionTo="/shop" />
          <div className="fig-category-grid">{categoryItems.map((c) => <CategoryCard category={c} key={c.slug}/>)}</div>
        </div>
      </section>

      <section className="fig-section fig-deals-section">
        <div className="container">
          <SectionHeading title="Լավագույն առաջարկները ձեզ համար" action="Դիտել բոլորը" actionTo="/shop" />
          <div className="market-filter-pills">
            <button className="is-active">Բոլորը</button>
            <button>Ջուր</button>
            <button>Սուրճ</button>
            <button>Գրենական</button>
            <button>Տնտեսական</button>
          </div>
          <div className="product-grid fig-product-grid">{featured.map((p) => <ProductCard key={p.id} product={p}/>)}</div>
        </div>
      </section>

      <section className="fig-section fig-promo-section">
        <div className="container fig-promo-grid">
          <div className="fig-promo-stack">
            <Link to="/category/coffee" className="fig-promo-card fig-promo-teal">
              <div>
                <h3>Click. Shop. Smile</h3>
                <p>Սուրճ, քաղցրավենիք և փոքր հաճույքներ։</p>
                <span>Գնել հիմա <Icon name="arrow" size={12}/></span>
              </div>
            </Link>
            <Link to="/category/stationery" className="fig-promo-card fig-promo-sand">
              <div>
                <h3>Your Daily Store</h3>
                <p>Գրենական և ամենօրյա անհրաժեշտ ապրանքներ։</p>
                <span>Գնել հիմա <Icon name="arrow" size={12}/></span>
              </div>
            </Link>
          </div>

          <Link to="/category/water" className="fig-promo-card fig-promo-sky fig-promo-large">
            <div>
              <small>ԱՆՎՃԱՐ ԱՌԱՔՈՒՄ՝ 18,9 Լ ՋՐՈՎ</small>
              <h2>Թարմ ջուր՝ ձեր գրասենյակ</h2>
              <p>Պարզ պատվեր, հստակ պայմաններ և արագ սպասարկում։</p>
              <span>Պատվիրել <Icon name="arrow" size={12}/></span>
            </div>
          </Link>
        </div>
      </section>

      <section className="fig-section fig-discount-section">
        <div className="container">
          <SectionHeading title="Զեղչված ապրանքներ" action="Բոլոր զեղչերը" actionTo="/discounts" />
          <div className="fig-horizontal-grid">{discounted.map((p) => <ProductCard key={p.id} product={p} compact/>)}</div>
        </div>
      </section>

      <section className="fig-section fig-banner-section">
        <div className="container">
          <div className="fig-fresh-banner">
            <div>
              <h2>Պատրա՞ստ եք լցնել զամբյուղը թարմ առաջարկներով</h2>
              <p>Ջուր, թուղթ, սուրճ և մաքրության ապրանքներ՝ մեկ պատվերում։</p>
              <Link to="/shop">Գնել հիմա</Link>
            </div>
            <img src={siteAssets.promo.office} alt="OfficeStore ապրանքներ"/>
          </div>
        </div>
      </section>

      <section className="fig-section fig-weekly-section">
        <div className="container">
          <SectionHeading title="Շաբաթվա ամենաշատ վաճառվողները" action="Դիտել բոլորը" actionTo="/shop" />
          <div className="market-filter-pills">
            <button className="is-active">Բոլորը</button>
            <button>Ջուր</button>
            <button>Սուրճ</button>
            <button>Գրենական</button>
          </div>
          <div className="product-grid fig-product-grid fig-product-grid-4">{weekly.map((p) => <ProductCard key={p.id} product={p}/>)}</div>
        </div>
      </section>

      <section className="fig-section fig-duo-section">
        <div className="container fig-duo-grid">
          <Link to="/category/household" className="fig-duo-card fig-duo-teal">
            <small>QUALITY OFFICE</small>
            <h3>Մաքրության և հիգիենայի ապրանքներ</h3>
            <span>Դիտել <Icon name="arrow" size={12}/></span>
          </Link>
          <Link to="/category/coffee" className="fig-duo-card fig-duo-sky">
            <small>DAILY BREAK</small>
            <h3>Սուրճ և քաղցրավենիք՝ ամեն օրվա համար</h3>
            <span>Դիտել <Icon name="arrow" size={12}/></span>
          </Link>
        </div>
      </section>

      <section className="fig-section fig-limited-section">
        <div className="container">
          <div className="limited-deals-heading">
            <h2>Սահմանափակ առաջարկներ</h2>
            <div className="limited-deals-controls">
              <div className="limited-deals-end">Ավարտին՝ <strong>{dealTime.hours} : {dealTime.minutes} : {dealTime.seconds}</strong></div>
              <button className="limited-nav limited-nav-prev" aria-label="Նախորդ առաջարկ"><Icon name="chevron" size={17}/></button>
              <Link className="limited-nav limited-nav-next" to="/shop" aria-label="Բոլոր առաջարկները"><Icon name="arrow" size={17}/></Link>
            </div>
          </div>
          <div className="limited-deals-grid">{limited.map((p) => <LimitedDealCard key={p.id} product={p} time={dealTime}/>)}</div>
        </div>
      </section>
    </div>
  );
}
