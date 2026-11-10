import { useState } from 'react';
import { services } from '../data/catalog';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

export default function ServicePage() {
  const [selected, setSelected] = useState('wash');
  const [sent, setSent] = useState(false);
  const current = services.find(s => s.id === selected);
  const submit = (e) => { e.preventDefault(); setSent(true); e.currentTarget.reset(); };
  return <>
    <PageHero eyebrow="Դիսպենսերի սպասարկում" title="Մաքուր ջուրն սկսվում է մաքուր դիսպենսերից" text="Լվացում և նորոգում՝ հասկանալի հայտի ձևով։ Մասնագետը կապվում է՝ գինը և այցի ժամը համաձայնեցնելու համար։">
      <div className="page-hero-icon"><Icon name="spark" size={48}/></div>
    </PageHero>
    <div className="container service-page"><Breadcrumbs items={[{label:'Դիսպենսերի սպասարկում'}]}/>
      <div className="service-grid">
        <div className="service-options"><div className="eyebrow">Ընտրեք ծառայությունը</div><h2>Ինչո՞վ կարող ենք օգնել</h2>{services.map(s => <button key={s.id} className={`service-option ${selected===s.id?'is-active':''}`} onClick={() => { setSelected(s.id); setSent(false); }}><span className="service-option-icon">{s.icon}</span><span><small>{s.eyebrow}</small><strong>{s.name}</strong><p>{s.description}</p><em><Icon name="clock" size={16}/>{s.duration}</em></span><span className="radio-dot"/></button>)}
          <div className="specialist-card"><div className="avatar">Ս</div><div><small>Համագործակցող մասնագետ</small><strong>{current.specialist}</strong><a href={`tel:${current.phone.replaceAll(' ','')}`}><Icon name="phone" size={16}/>{current.phone}</a></div></div>
        </div>
        <div className="booking-card"><div className="booking-head"><span className="step-chip">1 րոպե</span><h2>Պատվիրել այց</h2><p>Թողեք կոնտակտային տվյալները։ Վճարում այս փուլում չի պահանջվում։</p></div>{sent ? <div className="success-state"><div className="success-icon"><Icon name="check" size={30}/></div><h3>Հայտը գրանցված է</h3><p>Սա prototype է, ուստի տվյալները սերվեր չեն ուղարկվել։ Իրական տարբերակում այստեղ կերևա հայտի համարը և SMS հաստատումը։</p><button className="btn btn-secondary" onClick={() => setSent(false)}>Նոր հայտ</button></div> : <form className="form-stack" onSubmit={submit}><label><span>Ծառայություն</span><select value={selected} onChange={e => setSelected(e.target.value)}>{services.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}</select></label><div className="form-row"><label><span>Անուն *</span><input required placeholder="Օր.՝ Անի"/></label><label><span>Հեռախոս *</span><input required type="tel" placeholder="0XX XX XX XX"/></label></div><label><span>Հասցե *</span><input required placeholder="Երևան, փողոց, շենք"/></label><label><span>Նշումներ</span><textarea rows="4" placeholder="Նկարագրեք խնդիրը կամ ցանկալի ժամը…"/></label><button className="btn btn-primary btn-lg full-width">Ուղարկել հայտը <Icon name="arrow"/></button><div className="privacy-inline"><Icon name="lock" size={15}/> Ուղարկելով հայտը՝ համաձայնում եք, որ մասնագետը կապ հաստատի նշված համարով։</div></form>}</div>
      </div>
      <div className="service-process"><div><span>01</span><strong>Հայտ</strong><p>Ընտրեք ծառայությունը և թողեք տվյալները։</p></div><div><span>02</span><strong>Կապ</strong><p>Մասնագետը ճշտում է խնդիրը, գինը և ժամը։</p></div><div><span>03</span><strong>Այց</strong><p>Ծառայությունն իրականացվում է համաձայնեցված հասցեում։</p></div></div>
    </div>
  </>;
}
