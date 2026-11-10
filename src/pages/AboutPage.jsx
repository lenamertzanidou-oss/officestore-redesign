import { Link } from 'react-router-dom';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

export default function AboutPage() {
  return <>
    <PageHero eyebrow="Մեր մասին" title="Մատակարարում, որը չի խանգարում ձեր աշխատանքին" text="OfficeStore.am-ը միավորում է գրասենյակային և առօրյա անհրաժեշտ ապրանքները մեկ հարմար գնումների փորձի մեջ։">
      <div className="about-hero-card"><strong>OfficeStore</strong><span>Water · Coffee · Office · Care</span><div className="about-dots"><i/><i/><i/></div></div>
    </PageHero>
    <div className="container about-page"><Breadcrumbs items={[{label:'Մեր մասին'}]}/>
      <section className="about-intro"><div><div className="eyebrow">Ինչ ենք անում</div><h2>Մի հարթակ՝ ամենօրյա և կորպորատիվ գնումների համար</h2></div><p>Կայքի ներկայիս բովանդակության հիման վրա OfficeStore-ը առաջարկում է ջուր, քաղցրավենիք, կենցաղային և տնտեսական ապրանքներ, գրենական պիտույքներ, ինչպես նաև մանրածախ ու մեծածախ գնումներ։ Ռեդիզայնը այդ գաղափարը ներկայացնում է ավելի հստակ և վստահելի ձևով։</p></section>
      <div className="value-grid"><article><div className="value-icon"><Icon name="shield"/></div><h3>Որակ</h3><p>Փորձված ապրանքանիշեր և պարզ ապրանքային տեղեկատվություն՝ առանց ավելորդ աղմուկի։</p></article><article><div className="value-icon"><Icon name="spark"/></div><h3>Հարմարավետություն</h3><p>Որոնումից մինչև պատվերի կրկնում՝ հոսքերը կարճ են, կանխատեսելի և mobile-friendly։</p></article><article><div className="value-icon"><Icon name="truck"/></div><h3>Ժամանակին առաքում</h3><p>Առաքման խոստումը և գինը տեսանելի են դեռ մինչև checkout հասնելը։</p></article></div>
      <section className="about-story"><div className="story-visual"><div className="story-stack"><span>01</span><span>02</span><span>03</span></div><div className="story-copy-mini"><small>Office routine</small><strong>Պատվիրել → ստանալ → կրկնել</strong></div></div><div><div className="eyebrow">Մեր մոտեցումը</div><h2>Երկարաժամկետ վստահելի կապ՝ ոչ թե պարզապես մեկ վաճառք</h2><p>Կորպորատիվ հաճախորդների համար հատկապես կարևոր են կայուն մատակարարումը, պատվերի պատմությունը և հեշտ կրկնումը։ Նոր UX-ում դրանք դառնում են հիմնական հնարավորություններ, ոչ թե երկրորդական հղումներ։</p><ul className="clean-list"><li><Icon name="check"/> Օնլայն և հեռախոսային գնումներ</li><li><Icon name="check"/> Մանրածախ և մեծածախ պատվերներ</li><li><Icon name="check"/> Երևան և որոշ մարզային ուղղություններ</li><li><Icon name="check"/> Կորպորատիվ համագործակցություն</li></ul><Link className="btn btn-primary" to="/shop">Դիտել տեսականին</Link></div></section>
      <section className="brand-strip"><span>APARAN</span><span>COFFESSO</span><span>RICHARD</span><span>SILK SOFT</span><span>CURTIS</span><span>DORF</span></section>
    </div>
  </>;
}
