import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

const contactMethods = [
  {
    href: 'tel:+37410338833',
    icon: 'phone',
    label: 'Հեռախոս',
    value: '010 33 88 33',
    note: 'Երկուշաբթի–շաբաթ · 09:00–18:00',
  },
  {
    href: 'mailto:info@officestore.am',
    icon: 'mail',
    label: 'Էլ. հասցե',
    value: 'info@officestore.am',
    note: 'Գրեք պատվերի, ապրանքի կամ համագործակցության հարցով',
  },
  {
    icon: 'location',
    label: 'Հասցե',
    value: 'Ֆուչիկ փ. 27/52',
    note: 'Երևան, Հայաստան',
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return <>
    <PageHero
      variant="contact"
      eyebrow="Կապ մեզ հետ"
      title="Հարց ունե՞ք։ Մենք այստեղ ենք օգնելու"
      text="Պատվերի, ապրանքի կամ կորպորատիվ համագործակցության հարցով կապ հաստատեք ձեզ հարմար ձևով։"
      benefits={['Երկ–Շաբ · 09:00–18:00','Հեռախոս և էլ. հասցե','Կորպորատիվ սպասարկում']}
    />

    <div className="container contact-page">
      <Breadcrumbs items={[{label:'Կապ մեզ հետ'}]}/>

      <section className="contact-methods" aria-label="Կապի եղանակներ">
        {contactMethods.map((method) => {
          const body = <>
            <span className="contact-method-icon"><Icon name={method.icon} size={19}/></span>
            <span className="contact-method-copy">
              <small>{method.label}</small>
              <strong>{method.value}</strong>
              <span>{method.note}</span>
            </span>
            {method.href && <span className="contact-method-arrow"><Icon name="arrow" size={15}/></span>}
          </>;

          return method.href
            ? <a className="contact-method-card" href={method.href} key={method.label}>{body}</a>
            : <div className="contact-method-card" key={method.label}>{body}</div>;
        })}
      </section>

      <div className="contact-main-grid">
        <section className="contact-form-card contact-form-panel">
          <div className="contact-section-head">
            <span className="contact-section-icon"><Icon name="mail" size={18}/></span>
            <div>
              <span className="contact-section-kicker">Հետադարձ կապ</span>
              <h2>Գրեք մեզ</h2>
              <p>Լրացրեք ձևը, և մեր թիմը կկապվի ձեզ հետ աշխատանքային ժամերին։</p>
            </div>
          </div>

          {sent ? (
            <div className="success-state compact contact-success-state">
              <div className="success-icon"><Icon name="check"/></div>
              <h3>Շնորհակալություն</h3>
              <p>Հաղորդագրության ձևը հաջողությամբ լրացվել է։ Այս ցուցադրական տարբերակում տվյալները դեռ չեն ուղարկվում սերվեր։</p>
              <button className="btn btn-secondary" onClick={() => setSent(false)}>Նոր հաղորդագրություն</button>
            </div>
          ) : (
            <form className="form-stack contact-form" onSubmit={e => {e.preventDefault(); setSent(true);}}>
              <div className="form-row">
                <label>
                  <span>Անուն *</span>
                  <input required autoComplete="name" placeholder="Ձեր անունը"/>
                </label>
                <label>
                  <span>Հեռախոս</span>
                  <input type="tel" autoComplete="tel" placeholder="0XX XX XX XX"/>
                </label>
              </div>

              <label>
                <span>Էլ. հասցե *</span>
                <input required type="email" autoComplete="email" placeholder="name@example.com"/>
              </label>

              <label>
                <span>Թեմա</span>
                <select defaultValue="Պատվերի հարց">
                  <option>Պատվերի հարց</option>
                  <option>Կորպորատիվ համագործակցություն</option>
                  <option>Ապրանքի հարց</option>
                  <option>Այլ</option>
                </select>
              </label>

              <label>
                <span>Հաղորդագրություն *</span>
                <textarea rows="5" required placeholder="Գրեք ձեր հարցը կամ հաղորդագրությունը…"/>
              </label>

              <button className="btn btn-primary btn-lg contact-submit">
                Ուղարկել հաղորդագրությունը
                <Icon name="arrow" size={16}/>
              </button>
            </form>
          )}
        </section>

        <aside className="contact-side-panel">
          <section className="contact-hours">
            <div className="contact-side-head">
              <span><Icon name="clock" size={18}/></span>
              <div>
                <small>Աշխատանքային գրաֆիկ</small>
                <h2>Ե՞րբ ենք հասանելի</h2>
              </div>
            </div>

            <div className="contact-hours-list">
              <div><span>Երկուշաբթի — ուրբաթ</span><strong>09:00 — 18:00</strong></div>
              <div><span>Շաբաթ</span><strong>09:00 — 18:00</strong></div>
              <div className="is-closed"><span>Կիրակի</span><strong>Հանգստյան օր</strong></div>
            </div>
          </section>

          <section className="contact-help-card">
            <span className="contact-help-icon"><Icon name="building" size={18}/></span>
            <div>
              <small>Բիզնես հաճախորդների համար</small>
              <h3>Կորպորատիվ սպասարկում</h3>
              <p>Գրասենյակային կանոնավոր մատակարարումների և անհատական պայմանների համար գրեք կամ զանգահարեք մեզ։</p>
              <Link to="/about">Իմանալ ավելին <Icon name="arrow" size={14}/></Link>
            </div>
          </section>
        </aside>
      </div>

      <section className="contact-location">
        <div className="contact-location-map" aria-hidden="true">
          <div className="map-grid-lines"/>
          <div className="map-pin"><Icon name="location" size={24}/></div>
          <div className="map-label">
            <strong>OfficeStore</strong>
            <span>Ֆուչիկ փ. 27/52, Երևան</span>
          </div>
        </div>

        <div className="contact-location-info">
          <span className="contact-section-kicker">Մեր հասցեն</span>
          <h2>OfficeStore · Երևան</h2>
          <p>Ֆուչիկ փ. 27/52։ Եթե հարցը կապված է առաքման հասցեի կամ հասանելի օրերի հետ, նախ կարող եք դիտել առաքման պայմանները։</p>
          <div className="contact-location-meta">
            <span><Icon name="location" size={15}/> Ֆուչիկ փ. 27/52</span>
            <span><Icon name="clock" size={15}/> Երկ–Շաբ · 09:00–18:00</span>
          </div>
          <div className="contact-location-actions">
            <Link className="btn btn-primary" to="/delivery">Առաքման պայմաններ <Icon name="arrow" size={15}/></Link>
            <a className="contact-location-phone" href="tel:+37410338833">010 33 88 33</a>
          </div>
        </div>
      </section>
    </div>
  </>;
}
