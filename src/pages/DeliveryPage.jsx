import { deliveryFaq } from '../data/catalog';
import { Accordion, Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

const steps = [
  ['01','Ընտրեք ապրանքները','Ավելացրեք անհրաժեշտ ապրանքները և անցեք զամբյուղ։','cart'],
  ['02','Հաստատեք պատվերը','Լրացրեք առաքման և վճարման տվյալները։','check'],
  ['03','Մենք պատրաստում ենք','Պատվերը հավաքվում և պատրաստվում է առաքման։','package'],
  ['04','Ստացեք պատվերը','Կստանաք այն ձեր նշած հասցեում։','truck'],
];

export default function DeliveryPage() {
  return <>
    <PageHero eyebrow="Առաքում" title="Պարզ պայմաններ, կանխատեսելի ժամկետներ" text="Մինչև ժամը 18:00-ը ձևակերպված պատվերները սովորաբար առաքվում են հաջորդ աշխատանքային օրը։" />
    <div className="container delivery-page"><Breadcrumbs items={[{label:'Առաքում'}]}/>
      <div className="delivery-highlight"><div className="delivery-highlight-icon"><Icon name="truck" size={32}/></div><div><small>OfficeStore առաքում</small><h2>Երկուշաբթի–շաբաթ</h2><p>Ծանրաբեռնվածության դեպքում առաքումը կարող է տևել մինչև 2 աշխատանքային օր։ Ծանուցումը ուղարկվում է պատվերում նշված հեռախոսահամարին։</p></div><div className="delivery-price"><span>Ստանդարտ</span><strong>600 ֏</strong><small>18,9 լ ջրով՝ 0 ֏</small></div></div>
      <section className="delivery-steps"><div className="section-heading"><div><div className="eyebrow">Ինչպես է աշխատում</div><h2>Պատվերից մինչև դուռ՝ 4 պարզ քայլ</h2></div></div><div className="steps-grid">{steps.map(([num,title,text,icon]) => <article key={num}><span className="step-number">{num}</span><div className="step-icon"><Icon name={icon}/></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
      <section className="region-section"><div><div className="eyebrow">Մոտակա մարզեր</div><h2>Առաքման հատուկ օրեր</h2><p>Գրաֆիկը ներկայացված է ներկայիս կայքի հրապարակված տեղեկատվության հիման վրա։ Իրական համակարգում հասցեն ընտրելիս համապատասխան օրը կարելի է առաջարկել ավտոմատ։</p></div><div className="region-grid"><div className="region-card"><span>ԵՐԿ</span><h3>Երկուշաբթի</h3><p>Փարաքար · Գեղանիստ · Էջմիածին · Արմավիր · Աբովյան · Գառնի · Ձորաղբյուր · Պտղնի</p></div><div className="region-card"><span>ՀՆԳ</span><h3>Հինգշաբթի</h3><p>Աշտարակ · Եղվարդ · Զովունի</p></div><div className="region-card"><span>ՇԲԹ</span><h3>Շաբաթ</h3><p>Արարատի մարզ · Մասիս · Նորագավիթ</p></div></div></section>
      <section className="faq-section"><div className="section-heading"><div><div className="eyebrow">ՀՏՀ</div><h2>Հաճախ տրվող հարցեր</h2></div></div><Accordion items={deliveryFaq}/></section>
    </div>
  </>;
}
