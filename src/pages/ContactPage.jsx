import { useState } from 'react';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return <>
    <PageHero eyebrow="Կապ մեզ հետ" title="Հարց ունե՞ք։ Մենք այստեղ ենք օգնելու" text="Պատվերի, համագործակցության կամ ապրանքի հարցով կապ հաստատեք ձեզ հարմար ձևով։" />
    <div className="container contact-page"><Breadcrumbs items={[{label:'Կապ մեզ հետ'}]}/>
      <div className="contact-grid">
        <div className="contact-cards"><a href="tel:+37410338833" className="contact-card"><span className="contact-icon"><Icon name="phone"/></span><div><small>Հեռախոս</small><strong>(010) 33 88 33</strong><p>Երկուշաբթի–շաբաթ · 09:00–18:00</p></div><Icon name="arrow"/></a><a href="mailto:info@officestore.am" className="contact-card"><span className="contact-icon"><Icon name="mail"/></span><div><small>Էլ. հասցե</small><strong>info@officestore.am</strong><p>Գրեք ցանկացած հարցով</p></div><Icon name="arrow"/></a><div className="contact-card"><span className="contact-icon"><Icon name="location"/></span><div><small>Հասցե</small><strong>Ֆուչիկ փ. 27/52</strong><p>Երևան, Հայաստան</p></div></div><div className="contact-hours"><div><Icon name="clock"/><strong>Աշխատանքային ժամեր</strong></div><span>Երկուշաբթի — Շաբաթ <b>09:00 — 18:00</b></span><span>Կիրակի <b>Հանգստյան օր</b></span></div></div>
        <div className="contact-form-card"><div className="eyebrow">Հետադարձ կապ</div><h2>Գրեք մեզ</h2><p>Ներկայիս կայքում contact form-ի փոխարեն plugin-ի սխալի հաղորդագրություն է երևում։ Այս ռեդիզայնում ձևը ամբողջական և պարզ է։</p>{sent ? <div className="success-state compact"><div className="success-icon"><Icon name="check"/></div><h3>Շնորհակալություն</h3><p>Prototype-ում հաղորդագրությունը չի ուղարկվում, բայց UI հոսքն ամբողջությամբ պատրաստ է backend-ին միացնելու համար։</p><button className="btn btn-secondary" onClick={() => setSent(false)}>Նոր հաղորդագրություն</button></div> : <form className="form-stack" onSubmit={e => {e.preventDefault(); setSent(true);}}><div className="form-row"><label><span>Անուն *</span><input required/></label><label><span>Հեռախոս</span><input type="tel"/></label></div><label><span>Էլ. հասցե *</span><input required type="email"/></label><label><span>Թեմա</span><select><option>Պատվերի հարց</option><option>Կորպորատիվ համագործակցություն</option><option>Ապրանքի հարց</option><option>Այլ</option></select></label><label><span>Հաղորդագրություն *</span><textarea rows="5" required/></label><button className="btn btn-primary btn-lg">Ուղարկել հաղորդագրությունը <Icon name="arrow"/></button></form>}</div>
      </div>
      <div className="map-placeholder"><div className="map-grid-lines"/><div className="map-pin"><Icon name="location" size={28}/></div><div className="map-label"><strong>OfficeStore</strong><span>Ֆուչիկ փ. 27/52, Երևան</span></div></div>
    </div>
  </>;
}
