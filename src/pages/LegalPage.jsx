import { useState } from 'react';
import { legalContent } from '../data/catalog';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

export default function LegalPage({ type }) {
  const data = legalContent[type];
  const [active, setActive] = useState(0);
  return <>
    <PageHero eyebrow="Իրավական տեղեկատվություն" title={data.title} text={data.intro}/>
    <div className="container legal-page"><Breadcrumbs items={[{label:data.title}]}/><div className="legal-layout"><aside className="legal-toc"><small>Բովանդակություն</small>{data.sections.map((s,i)=><button className={active===i?'is-active':''} onClick={()=>{setActive(i);document.getElementById(`section-${i}`)?.scrollIntoView({behavior:'smooth',block:'start'});}} key={s[0]}><span>{String(i+1).padStart(2,'0')}</span>{s[0]}</button>)}<div className="legal-help"><Icon name="info"/><strong>Հարց ունե՞ք</strong><p>Իրավական կամ տվյալների հարցով կապվեք OfficeStore-ի հետ։</p></div></aside><article className="legal-article"><div className="legal-note"><Icon name="info"/><p>Այս redesign prototype-ի տեքստը կառուցվածքային UI օրինակ է և չի փոխարինում իրավաբանական խորհրդատվությանը կամ կայքի պաշտոնական գործող քաղաքականությանը։</p></div>{data.sections.map((s,i)=><section id={`section-${i}`} key={s[0]}><span className="legal-section-number">{String(i+1).padStart(2,'0')}</span><h2>{s[0]}</h2><p>{s[1]}</p>{i===0 && type==='deletion' && <div className="deletion-contact"><Icon name="mail"/><div><strong>Հարցման ալիք</strong><span>info@officestore.am</span></div></div>}</section>)}</article></div></div>
  </>;
}
