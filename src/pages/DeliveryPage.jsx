import { Link } from 'react-router-dom';
import { deliveryFaq } from '../data/catalog';
import { Accordion, Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

const steps = [
  ['01','Ընտրեք ապրանքները','Ավելացրեք անհրաժեշտ ապրանքները զամբյուղ և ընտրեք հարմար առաքման օրը։','cart'],
  ['02','Հաստատեք պատվերը','Լրացրեք հասցեն, կոնտակտային տվյալները և ընտրեք վճարման եղանակը։','check'],
  ['03','Մենք պատրաստում ենք','Պատվերը հավաքվում և պատրաստվում է առաքման՝ ըստ ընտրված օրվա։','package'],
  ['04','Ստացեք պատվերը','Պատվերը կհասցնենք ձեր նշած հասցեով և նախապես կկապվենք ձեզ հետ։','truck'],
];

const regions = [
  ['ԵՐԿ','Երկուշաբթի','Փարաքար · Գեղանիստ · Էջմիածին · Արմավիր · Աբովյան · Գառնի · Ձորաղբյուր · Պտղնի'],
  ['ՀՆԳ','Հինգշաբթի','Աշտարակ · Եղվարդ · Զովունի'],
  ['ՇԲԹ','Շաբաթ','Արարատի մարզ · Մասիս · Նորագավիթ'],
];

export default function DeliveryPage() {
  return <>
    <PageHero
      variant="delivery"
      eyebrow="Առաքում"
      title="Առաքում՝ պարզ, հստակ և կանխատեսելի"
      text="Պատվերը ձևակերպեք մինչև ժամը 18:00-ը և ընտրեք հաջորդ հասանելի առաքման օրը։ Առաքում իրականացվում է երկուշաբթիից շաբաթ։"
      benefits={['Երկ–Շաբ առաքում','Հասցեով առաքում','18,9 լ ջրով՝ անվճար']}
    >
      <div className="delivery-hero-visual" aria-hidden="true">
        <div className="delivery-hero-orbit delivery-hero-orbit--a"/>
        <div className="delivery-hero-orbit delivery-hero-orbit--b"/>
        <div className="delivery-hero-route"/>
        <span className="delivery-hero-pin delivery-hero-pin--start"><Icon name="package" size={15}/></span>
        <span className="delivery-hero-pin delivery-hero-pin--finish"><Icon name="location" size={15}/></span>
        <div className="delivery-hero-truck"><Icon name="truck" size={25}/></div>
        <div className="delivery-hero-status">
          <span><Icon name="check" size={12}/></span>
          <div><small>Պատվերը հաստատված է</small><strong>Առաքումը պլանավորված է</strong></div>
        </div>
        <div className="delivery-hero-date">
          <span><Icon name="calendar" size={15}/></span>
          <div><small>Առաքման օրեր</small><strong>Երկ–Շաբ</strong></div>
        </div>
      </div>
    </PageHero>

    <div className="container delivery-page">
      <Breadcrumbs items={[{label:'Առաքում'}]}/>

      <section className="delivery-overview" aria-labelledby="delivery-overview-title">
        <div className="delivery-overview-copy">
          <span className="delivery-overview-icon"><Icon name="truck" size={24}/></span>
          <div>
            <span className="delivery-overview-kicker">OfficeStore առաքում</span>
            <h2 id="delivery-overview-title">Ամեն ինչ՝ մեկ հստակ առաքման համակարգով</h2>
            <p>Ընտրեք առաքման հասանելի օրը զամբյուղում։ Ծանրաբեռնվածության դեպքում առաքումը կարող է իրականացվել մինչև 2 առաքման օրվա ընթացքում, իսկ առաքումից առաջ կստանաք հաստատում նշված հեռախոսահամարով։</p>
          </div>
        </div>

        <div className="delivery-overview-stats" aria-label="Առաքման հիմնական պայմաններ">
          <div className="delivery-stat delivery-stat--featured">
            <span className="delivery-stat-icon"><Icon name="truck" size={17}/></span>
            <div><small>Ստանդարտ առաքում</small><strong>600 ֏</strong><span>Երևան և հասանելի ուղղություններ</span></div>
          </div>
          <div className="delivery-stat">
            <span className="delivery-stat-icon"><Icon name="package" size={16}/></span>
            <div><small>18,9 լ ջրով</small><strong>0 ֏</strong><span>Առաքման վճարը չի գանձվում</span></div>
          </div>
          <div className="delivery-stat">
            <span className="delivery-stat-icon"><Icon name="calendar" size={16}/></span>
            <div><small>Առաքման օրեր</small><strong>Երկ–Շաբ</strong><span>Կիրակի՝ հանգստյան օր</span></div>
          </div>
        </div>
      </section>

      <div className="delivery-policy-strip">
        <span><Icon name="info" size={16}/></span>
        <p><strong>Կիրակի օրը առաքում չի իրականացվում։</strong> Մինչև 18:00-ը ձևակերպված պատվերի համար առաջարկվում է հաջորդ հասանելի առաքման օրը։</p>
        <div className="delivery-cutoff-chip"><Icon name="clock" size={14}/><span>Cut-off՝ 18:00</span></div>
      </div>

      <section className="delivery-steps">
        <div className="delivery-section-heading">
          <div>
            <span className="delivery-section-kicker">Ինչպես է աշխատում</span>
            <h2>Պատվերից մինչև դուռ՝ 4 պարզ քայլ</h2>
            <p>Պատվերի ամբողջ ընթացքը կառուցված է այնպես, որ հաջորդ քայլը միշտ պարզ լինի։</p>
          </div>
        </div>

        <div className="steps-grid delivery-timeline">
          {steps.map(([num,title,text,icon], index) => (
            <article key={num}>
              <div className="delivery-step-top">
                <span className="step-number">{num}</span>
                <span className="step-icon"><Icon name={icon} size={19}/></span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              {index < steps.length - 1 && <span className="delivery-step-connector" aria-hidden="true"><Icon name="arrow" size={13}/></span>}
            </article>
          ))}
        </div>
      </section>

      <section className="region-section">
        <div className="region-section-intro">
          <span className="delivery-section-kicker">Մոտակա ուղղություններ</span>
          <h2>Առաքման հատուկ օրեր</h2>
          <p>Որոշ հարակից քաղաքների և համայնքների առաքումները կազմակերպվում են շաբաթվա ֆիքսված օրերին։ Պատվերը հաստատելիս վերջնական օրը ճշտվում է ձեր հասցեի համար։</p>
          <div className="region-section-note">
            <Icon name="calendar" size={16}/>
            <span>Երևանի առաքման հասանելի օրերը կարող եք ընտրել անմիջապես զամբյուղում։</span>
          </div>
        </div>

        <div className="region-grid">
          {regions.map(([shortDay,day,places]) => (
            <article className="region-card" key={shortDay}>
              <div className="region-card-head">
                <span>{shortDay}</span>
                <Icon name="arrow" size={15}/>
              </div>
              <h3>{day}</h3>
              <p>{places}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section delivery-faq">
        <div className="delivery-section-heading">
          <div>
            <span className="delivery-section-kicker">ՀՏՀ</span>
            <h2>Հաճախ տրվող հարցեր</h2>
            <p>Առաքման պայմանների մասին ամենակարևոր պատասխանները՝ մեկ տեղում։</p>
          </div>
        </div>
        <Accordion items={deliveryFaq}/>
      </section>

      <section className="delivery-cta">
        <div className="delivery-cta-decor delivery-cta-decor--a"/>
        <div className="delivery-cta-decor delivery-cta-decor--b"/>
        <div className="delivery-cta-icon"><Icon name="truck" size={23}/></div>
        <div className="delivery-cta-copy">
          <span>Պատրա՞ստ եք պատվիրել</span>
          <h2>Ընտրեք ապրանքները, իսկ առաքման օրը՝ զամբյուղում</h2>
          <p>Մինչև հաստատելը կտեսնեք առաքման արժեքը, հասանելի օրը և պատվերի ամբողջ ամփոփումը։</p>
        </div>
        <div className="delivery-cta-actions">
          <Link className="btn btn-primary" to="/shop">Դիտել ապրանքները <Icon name="arrow" size={15}/></Link>
          <Link className="delivery-contact-link" to="/contact">Կապ մեզ հետ</Link>
        </div>
      </section>
    </div>
  </>;
}
