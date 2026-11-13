import { Link } from 'react-router-dom';
import { Icon } from './Icons';
import { useState } from 'react';

export function SectionHeading({ eyebrow, title, text, action, actionTo = '/shop' }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <div className="eyebrow"><i/>{eyebrow}</div>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action && <Link className="text-link" to={actionTo}>{action}<span><Icon name="arrow" size={16}/></span></Link>}
    </div>
  );
}

export function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Գլխավոր</Link>
      {items.map((item, i) => <span key={`${item.label}-${i}`}><span className="crumb-sep">/</span>{item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}
    </nav>
  );
}

export function Quantity({ value, onChange, min = 1 }) {
  return (
    <div className="quantity" role="group" aria-label="Քանակ">
      <button onClick={() => onChange(Math.max(min, value - 1))} aria-label="Պակասեցնել"><Icon name="minus" size={15}/></button>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="Ավելացնել"><Icon name="plus" size={15}/></button>
    </div>
  );
}

export function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return <div className="accordion">{items.map((item, i) => (
    <div className={`accordion-item ${open === i ? 'is-open' : ''}`} key={item.q || item[0]}>
      <button className="accordion-trigger" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
        <span>{item.q || item[0]}</span><Icon name="chevron" size={18}/>
      </button>
      {open === i && <div className="accordion-panel"><p>{item.a || item[1]}</p></div>}
    </div>
  ))}</div>;
}

export function EmptyState({ title, text, action = 'Դիտել ապրանքները', to = '/shop', icon = 'package' }) {
  return <div className="empty-state"><div className="empty-icon"><Icon name={icon} size={30}/></div><h2>{title}</h2><p>{text}</p><Link className="btn btn-primary" to={to}>{action}<Icon name="arrow" size={18}/></Link></div>;
}

export function PageHero({ eyebrow, title, text, children, variant = 'default', benefits = ['Արագ ընտրություն', 'Հարմար պատվեր', 'Վստահելի առաքում'] }) {
  return (
    <section className={`page-hero page-hero--${variant}`}>
      <div className="container page-hero-inner">
        <div className="page-hero-copy">
          {eyebrow && <div className="eyebrow"><i/>{eyebrow}</div>}
          <h1>{title}</h1>
          {text && <p>{text}</p>}
          {benefits?.length > 0 && (
            <div className="page-hero-benefits" aria-label="OfficeStore առավելություններ">
              {benefits.map((benefit) => <span key={benefit}><Icon name="check" size={13}/> {benefit}</span>)}
            </div>
          )}
        </div>
        {children || (
          <div className="page-hero-visual" aria-hidden="true">
            <div className="page-hero-glow"/>
            <div className="page-hero-ring page-hero-ring-a"/>
            <div className="page-hero-ring page-hero-ring-b"/>
            <div className="page-hero-mini-card page-hero-mini-card-a">
              <span><Icon name="grid" size={17}/></span>
              <div><strong>OfficeStore</strong><small>Ամեն ինչ մեկ տեղում</small></div>
            </div>
            <div className="page-hero-mini-card page-hero-mini-card-b">
              <span><Icon name="package" size={16}/></span>
              <div><strong>Արագ</strong><small>պատվեր և առաքում</small></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
