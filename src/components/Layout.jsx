import { useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Icon } from './Icons';
import { categories, products } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { siteAssets } from '../data/siteAssets';
import { brandLogo } from '../data/brand';

const nav = [
  ['/shop', 'Բոլոր ապրանքները'],
  ['/category/water', 'Ջուր'],
  ['/category/coffee', 'Սուրճ'],
  ['/category/stationery', 'Գրենական'],
  ['/category/household', 'Տնտեսական'],
  ['/discounts', 'Զեղչեր'],
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { itemCount, language, setLanguage, toast } = useStore();

  const suggestions = useMemo(() => {
    const q = search.trim().toLocaleLowerCase('hy-AM');
    if (!q) return [];
    return products.filter((p) => `${p.name} ${p.description}`.toLocaleLowerCase('hy-AM').includes(q)).slice(0, 6);
  }, [search]);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    setSearchOpen(false);
    navigate(`/shop?q=${encodeURIComponent(q)}`);
  };

  const openProduct = (product) => {
    setSearch('');
    setSearchOpen(false);
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="app-shell market-shell">
      <a className="skip-link" href="#main">Անցնել հիմնական բովանդակությանը</a>

      <div className="announcement market-announcement">
        <div className="container announcement-inner">
          <span><i className="announcement-dot"/> Անվճար առաքում՝ 18,9 լ Ապարան ջրով պատվերի դեպքում</span>
          <div className="announcement-links"><a href="tel:+37410338833">010 33 88 33</a><span>Երկ–Շաբ · 09:00–18:00</span></div>
        </div>
      </div>

      <header className="site-header market-site-header">
        <div className="container market-header-main">
          <button className="icon-btn mobile-only market-mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Բացել մենյուն"><Icon name="menu"/></button>

          <Link to="/" className="brand market-brand" aria-label="OfficeStore գլխավոր էջ">
            <img className="market-brand-logo" src={brandLogo} alt="OfficeStore"/>
          </Link>

          <div className="market-search-wrap desktop-only">
            <form className="market-search" onSubmit={submitSearch}>
              <Icon name="search" size={18}/>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Որոնել ապրանքներ, բրենդներ և կատեգորիաներ" aria-label="Որոնում"/>
              <button type="submit" aria-label="Որոնել"><Icon name="arrow" size={16}/></button>
            </form>
            {suggestions.length > 0 && <div className="market-search-suggestions">
              {suggestions.map((p) => <button key={p.id} onClick={() => openProduct(p)}><span><small>{p.unit}</small><strong>{p.name}</strong></span><b>{p.price.toLocaleString('hy-AM')} ֏</b></button>)}
            </div>}
          </div>

          <div className="header-actions market-header-actions">
            <button className="header-round-btn mobile-only" onClick={() => setSearchOpen(true)} aria-label="Որոնել"><Icon name="search" size={18}/></button>
            <Link className="market-action-link desktop-only" to="/account"><Icon name="user" size={18}/><span>Իմ էջը</span></Link>
            <Link className="market-action-link cart-action" to="/cart"><Icon name="cart" size={19}/><span className="desktop-only">Զամբյուղ</span>{itemCount > 0 && <b>{itemCount}</b>}</Link>
          </div>
        </div>

        <div className="container market-nav-row desktop-only">
          <button className="market-category-trigger" onClick={() => setMenuOpen(true)}><Icon name="grid" size={17}/> Կատեգորիաներ <Icon name="chevron" size={14}/></button>
          <nav aria-label="Հիմնական նավիգացիա">{nav.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'is-active' : ''}>{label}</NavLink>)}</nav>
          <Link className="market-service-link" to="/services/dispenser-maintenance"><Icon name="spark" size={15}/> Դիսպենսերի սպասարկում</Link>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer market-footer">
        <div className="container market-footer-word">OfficeStore</div>
        <div className="container footer-grid market-footer-grid">
          <div className="footer-brand-col">
            <Link to="/" className="brand market-brand market-brand-footer"><img className="market-brand-logo market-brand-logo-footer" src={brandLogo} alt="OfficeStore"/></Link>
            <p>Ամենօրյա գրասենյակային գնումներ՝ պարզ, արագ և կանխատեսելի փորձով։</p>
            <div className="footer-social-pills"><span>Instagram</span><span>Facebook</span><span>LinkedIn</span></div>
          </div>
          <div><h3>Խանութ</h3><Link to="/shop">Բոլոր ապրանքները</Link><Link to="/category/water">Ջուր</Link><Link to="/category/coffee">Սուրճ</Link><Link to="/discounts">Զեղչեր</Link></div>
          <div><h3>Օգնություն</h3><Link to="/delivery">Առաքում</Link><Link to="/services/dispenser-maintenance">Սպասարկում</Link><Link to="/contact">Կապ մեզ հետ</Link><Link to="/blog">Բլոգ</Link></div>
          <div><h3>Կապ</h3><a href="tel:+37410338833">010 33 88 33</a><span>Երկ–Շաբ · 09:00–18:00</span><span>Երևան, Հայաստան</span><div className="footer-payments v5-payment-logos"><img src={siteAssets.payments.idram} alt="Idram"/><img src={siteAssets.payments.telcell} alt="Telcell"/><img src={siteAssets.payments.arca} alt="ArCa"/><img src={siteAssets.payments.visa} alt="Visa"/><img src={siteAssets.payments.mastercard} alt="Mastercard"/></div></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 OfficeStore</span><div><Link to="/privacy">Գաղտնիություն</Link><Link to="/terms">Պայմաններ</Link></div></div>
      </footer>

      <nav className="mobile-bottom-nav mobile-only" aria-label="Mobile navigation">
        <NavLink to="/"><Icon name="home" size={19}/><span>Գլխավոր</span></NavLink>
        <NavLink to="/shop"><Icon name="grid" size={19}/><span>Խանութ</span></NavLink>
        <NavLink to="/cart" className="mobile-cart"><Icon name="cart" size={19}/><span>Զամբյուղ</span>{itemCount > 0 && <b>{itemCount}</b>}</NavLink>
        <NavLink to="/account"><Icon name="user" size={19}/><span>Իմ էջը</span></NavLink>
      </nav>

      {menuOpen && <div className="drawer-layer" role="dialog" aria-modal="true" aria-label="Կատեգորիաներ">
        <button className="drawer-backdrop" onClick={() => setMenuOpen(false)} aria-label="Փակել"/>
        <aside className="drawer market-drawer">
          <div className="drawer-head"><div><img className="drawer-brand-logo" src={brandLogo} alt="OfficeStore"/><h2>Կատեգորիաներ</h2></div><button className="icon-btn" onClick={() => setMenuOpen(false)}><Icon name="close"/></button></div>
          <div className="drawer-categories">{categories.map((c, index) => <Link key={c.slug} to={`/category/${c.slug}`} onClick={() => setMenuOpen(false)}><span className={`drawer-category-icon tone-${c.tone}`}>{c.icon}</span><span><strong>{c.name}</strong><small>{c.count} ապրանք</small></span><Icon name="arrow" size={18}/></Link>)}</div>
          <div className="drawer-footer"><Link to="/about" onClick={() => setMenuOpen(false)}>Մեր մասին</Link><Link to="/contact" onClick={() => setMenuOpen(false)}>Կապ</Link><Link to="/delivery" onClick={() => setMenuOpen(false)}>Առաքում</Link><div className="language-switch">{['HY','EN','RU'].map((l) => <button className={language === l ? 'is-active' : ''} onClick={() => setLanguage(l)} key={l}>{l}</button>)}</div></div>
        </aside>
      </div>}

      {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Որոնում">
        <button className="search-overlay-backdrop" onClick={() => setSearchOpen(false)} aria-label="Փակել որոնումը"/>
        <div className="search-modal">
          <div className="search-modal-top"><span>Ի՞նչ եք փնտրում</span><button className="icon-btn" onClick={() => setSearchOpen(false)}><Icon name="close"/></button></div>
          <form className="search-modal-form" onSubmit={submitSearch}><Icon name="search" size={23}/><input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Օր.՝ Ապարան ջուր, A4 թուղթ, սուրճ…"/><button className="search-submit" aria-label="Որոնել"><Icon name="arrow"/></button></form>
          <div className="search-modal-content">{suggestions.length ? suggestions.map((p) => <button key={p.id} onClick={() => openProduct(p)}><span><small>{p.unit}</small><strong>{p.name}</strong></span><b>{p.price.toLocaleString('hy-AM')} ֏</b><Icon name="arrow" size={17}/></button>) : <div className="search-start"><span>Արագ բաժիններ</span><div><Link to="/category/water" onClick={() => setSearchOpen(false)}>Ջուր</Link><Link to="/category/coffee" onClick={() => setSearchOpen(false)}>Սուրճ</Link><Link to="/category/stationery" onClick={() => setSearchOpen(false)}>Գրենական</Link><Link to="/category/household" onClick={() => setSearchOpen(false)}>Տնտեսական</Link></div></div>}</div>
        </div>
      </div>}

      {toast && <div className="toast"><span><Icon name="check" size={17}/></span>{toast}</div>}
    </div>
  );
}
