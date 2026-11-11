import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, products, formatPrice } from '../data/catalog';
import ProductCard from '../components/ProductCard';
import ProductVisual from '../components/ProductVisual';
import LimitedDealCard from '../components/LimitedDealCard';
import { Icon } from '../components/Icons';
import { SectionHeading } from '../components/Common';
import { siteAssets } from '../data/siteAssets';
import { useStore } from '../context/StoreContext';

const categoryOrder = ['water', 'coffee', 'stationery', 'household', 'sweets'];

function CategoryCard({ category }) {
  return (
    <Link className="fig-category-card" to={`/category/${category.slug}`}>
      <div className="fig-category-image">
        <img src={siteAssets.category[category.slug]} alt={category.name} loading="lazy"/>
      </div>
      <div className="fig-category-content">
        <div>
          <strong>{category.short}</strong>
          <span>{category.count} ապրանք</span>
        </div>
        <span className="fig-category-arrow" aria-hidden="true"><Icon name="arrow" size={14}/></span>
      </div>
    </Link>
  );
}

function pad(value) {
  return String(value).padStart(2, '0');
}

export default function HomePage() {
  const { addToCart } = useStore();
  const heroProducts = useMemo(() => [products[0], products[10], products[4], products[13], products[6]].filter(Boolean), []);
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [dealSeconds, setDealSeconds] = useState((20 * 24 * 60 * 60) + (17 * 60 * 60) + (29 * 60) + 57);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDealSeconds((current) => current > 0 ? current - 1 : (20 * 24 * 60 * 60) + (17 * 60 * 60) + (29 * 60) + 57);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (heroPaused || heroProducts.length < 2) return undefined;
    const slider = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroProducts.length);
    }, 4500);
    return () => window.clearInterval(slider);
  }, [heroPaused, heroProducts.length]);

  const dealTime = useMemo(() => {
    const days = Math.floor(dealSeconds / 86400);
    const hours = Math.floor((dealSeconds % 86400) / 3600);
    const minutes = Math.floor((dealSeconds % 3600) / 60);
    const seconds = dealSeconds % 60;
    return { days: pad(days), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
  }, [dealSeconds]);

  const activeHeroProduct = heroProducts[heroSlide] || heroProducts[0];

  const goToHeroSlide = (index) => {
    const total = heroProducts.length;
    if (!total) return;
    setHeroSlide((index + total) % total);
  };

  const categoryItems = categoryOrder.map((slug) => categories.find((c) => c.slug === slug)).filter(Boolean);
  const featured = [products[0], products[10], products[4], products[13], products[14], products[6], products[8], products[17]].filter(Boolean);
  const discounted = [products[12], products[6], products[7], products[14]].filter(Boolean);
  const weekly = [products[0], products[10], products[4], products[13]].filter(Boolean);
  const limited = [products[6], products[12]].filter(Boolean);

  return (
    <div className="fig-home">
      <section className="fig-hero-section">
        <div className="container">
          <div
            className="fig-hero fig-hero-premium"
            onMouseEnter={() => setHeroPaused(true)}
            onMouseLeave={() => setHeroPaused(false)}
          >
            <div className="fig-hero-copy-premium">
              <small>ԱՌԱՔՈՒՄ · ԳՐԱՍԵՆՅԱԿ · ԱՄԵՆ ՕՐ</small>
              <h1>Ամեն ինչ գրասենյակի համար՝ մեկ պատվերով</h1>
              <p>Ջուր, սուրճ, գրենական և ամենօրյա անհրաժեշտ ապրանքներ՝ արագ, հարմար և վստահելի առաքմամբ։</p>

              <div className="fig-hero-actions-premium">
                <Link className="fig-hero-primary" to="/shop">Գնել հիմա <Icon name="arrow" size={15}/></Link>
                <Link className="fig-hero-secondary" to="/shop">Տեսնել կատեգորիաները</Link>
              </div>

              <div className="fig-hero-trust">
                <span><Icon name="check" size={14}/> Արագ առաքում</span>
                <span><Icon name="check" size={14}/> Կորպորատիվ պատվերներ</span>
                <span><Icon name="check" size={14}/> Հուսալի սպասարկում</span>
              </div>
            </div>

            {activeHeroProduct && (
              <div className="fig-hero-slider" aria-roledescription="carousel" aria-label="Առաջարկվող ապրանքներ">
                <div className="fig-hero-slider-top">
                  <span className="fig-hero-slider-badge">Առաջարկվող</span>
                  <div className="fig-hero-slider-nav">
                    <button type="button" onClick={() => goToHeroSlide(heroSlide - 1)} aria-label="Նախորդ ապրանքը">
                      <Icon name="arrow" size={16}/>
                    </button>
                    <button type="button" onClick={() => goToHeroSlide(heroSlide + 1)} aria-label="Հաջորդ ապրանքը">
                      <Icon name="arrow" size={16}/>
                    </button>
                  </div>
                </div>

                <Link className="fig-hero-slider-image" to={`/product/${activeHeroProduct.slug}`}>
                  <ProductVisual type={activeHeroProduct.visual} alt={activeHeroProduct.name}/>
                </Link>

                <div className="fig-hero-slider-copy">
                  <Link className="fig-hero-slider-title" to={`/product/${activeHeroProduct.slug}`}>{activeHeroProduct.name}</Link>
                  <div className="fig-hero-slider-price">
                    <strong>{formatPrice(activeHeroProduct.price)}</strong>
                    {activeHeroProduct.oldPrice && <del>{formatPrice(activeHeroProduct.oldPrice)}</del>}
                  </div>
                  <button
                    type="button"
                    className="fig-hero-slider-add"
                    disabled={activeHeroProduct.stock === 0}
                    onClick={() => addToCart(activeHeroProduct, activeHeroProduct.minQty || 1)}
                  >
                    <Icon name="cart" size={15}/>
                    {activeHeroProduct.stock === 0 ? 'Սպառված է' : 'Ավելացնել զամբյուղ'}
                  </button>
                </div>

                <div className="fig-hero-slider-dots" role="tablist" aria-label="Սլայդերի էջեր">
                  {heroProducts.map((product, index) => (
                    <button
                      key={product.id}
                      type="button"
                      className={index === heroSlide ? 'is-active' : ''}
                      onClick={() => goToHeroSlide(index)}
                      aria-label={`${index + 1}-րդ ապրանքը`}
                      aria-current={index === heroSlide ? 'true' : undefined}
                    />
                  ))}
                </div>
              </div>
            )}
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
    </div>
  );
}
