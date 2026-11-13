import { useState } from 'react';
import { services } from '../data/catalog';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

const processSteps = [
  { number: '01', icon: 'edit', title: 'Հայտ', text: 'Ընտրեք ծառայությունը և լրացրեք կոնտակտային տվյալները։' },
  { number: '02', icon: 'phone', title: 'Կապ', text: 'Մասնագետը ճշտում է խնդիրը, արժեքը և հարմար ժամը։' },
  { number: '03', icon: 'truck', title: 'Այց', text: 'Ծառայությունն իրականացվում է նախապես համաձայնեցված հասցեում։' },
];

export default function ServicePage() {
  const [selected, setSelected] = useState('wash');
  const [sent, setSent] = useState(false);
  const current = services.find(s => s.id === selected) || services[0];

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return <>
    <PageHero
      variant="service"
      eyebrow="Դիսպենսերի սպասարկում"
      title="Մաքուր և անխափան դիսպենսեր՝ մեկ հայտով"
      text="Ընտրեք անհրաժեշտ ծառայությունը, թողեք տվյալները և մասնագետը կապ կհաստատի՝ արժեքն ու այցի ժամը համաձայնեցնելու համար։"
    />

    <div className="container service-page">
      <Breadcrumbs items={[{label:'Դիսպենսերի սպասարկում'}]}/>

      <div className="service-grid">
        <section className="service-options" aria-labelledby="service-options-title">
          <div className="service-section-head">
            <span className="service-section-kicker">Ծառայություններ</span>
            <h2 id="service-options-title">Ինչո՞վ կարող ենք օգնել</h2>
            <p>Ընտրեք համապատասխան տարբերակը։ Մասնագետը կապ կհաստատի մինչև այցը։</p>
          </div>

          <div className="service-option-list">
            {services.map(s => (
              <button
                type="button"
                key={s.id}
                className={`service-option ${selected === s.id ? 'is-active' : ''}`}
                onClick={() => { setSelected(s.id); setSent(false); }}
                aria-pressed={selected === s.id}
              >
                <span className="service-option-icon">{s.icon}</span>
                <span className="service-option-copy">
                  <small>{s.eyebrow}</small>
                  <strong>{s.name}</strong>
                  <p>{s.description}</p>
                  <em><Icon name="clock" size={15}/>{s.duration}</em>
                </span>
                <span className="service-option-state" aria-hidden="true">
                  {selected === s.id ? <Icon name="check" size={14}/> : null}
                </span>
              </button>
            ))}
          </div>

          <div className="specialist-card">
            <div className="specialist-avatar">Ս</div>
            <div className="specialist-copy">
              <small>Համագործակցող մասնագետ</small>
              <strong>{current.specialist}</strong>
              <a href={`tel:${current.phone.replaceAll(' ','')}`}>
                <Icon name="phone" size={15}/>
                {current.phone}
              </a>
            </div>
            <span className="specialist-status"><i/> հասանելի</span>
          </div>
        </section>

        <aside className="booking-card" aria-labelledby="booking-title">
          <div className="booking-head">
            <span className="booking-chip"><Icon name="clock" size={13}/> մոտ 1 րոպե</span>
            <h2 id="booking-title">Պատվիրել այց</h2>
            <p>Լրացրեք տվյալները։ Վճարում այս փուլում չի պահանջվում։</p>
          </div>

          {sent ? (
            <div className="success-state">
              <div className="success-icon"><Icon name="check" size={26}/></div>
              <h3>Հայտը պատրաստ է</h3>
              <p>Տվյալները լրացված են։ Հաջորդ քայլը մասնագետի կապն է ձեր նշած համարով։</p>
              <button className="btn btn-secondary" onClick={() => setSent(false)}>Նոր հայտ</button>
            </div>
          ) : (
            <form className="form-stack service-form" onSubmit={submit}>
              <label>
                <span>Ծառայություն</span>
                <select value={selected} onChange={e => setSelected(e.target.value)}>
                  {services.map(s => <option value={s.id} key={s.id}>{s.name}</option>)}
                </select>
              </label>

              <div className="form-row">
                <label>
                  <span>Անուն *</span>
                  <input required autoComplete="name" placeholder="Օր.՝ Անի"/>
                </label>
                <label>
                  <span>Հեռախոս *</span>
                  <input required type="tel" inputMode="tel" autoComplete="tel" placeholder="0XX XX XX XX"/>
                </label>
              </div>

              <label>
                <span>Հասցե *</span>
                <input required autoComplete="street-address" placeholder="Երևան, փողոց, շենք"/>
              </label>

              <label>
                <span>Նշումներ</span>
                <textarea rows="3" placeholder="Նկարագրեք խնդիրը կամ նշեք ցանկալի ժամը…"/>
              </label>

              <button className="btn btn-primary btn-lg full-width service-submit">
                Ուղարկել հայտը <Icon name="arrow" size={16}/>
              </button>

              <div className="privacy-inline">
                <Icon name="lock" size={14}/>
                <span>Ուղարկելով հայտը՝ համաձայնում եք, որ մասնագետը կապ հաստատի նշված համարով։</span>
              </div>
            </form>
          )}
        </aside>
      </div>

      <section className="service-process" aria-labelledby="service-process-title">
        <div className="service-process-head">
          <span>Ինչպես է աշխատում</span>
          <h2 id="service-process-title">3 պարզ քայլ</h2>
          <p>Ամբողջ գործընթացը պարզ է՝ հայտից մինչև մասնագետի այց։</p>
        </div>

        <div className="service-process-steps">
          {processSteps.map((step, index) => (
            <div className="service-process-step" key={step.number}>
              <div className="service-process-icon"><Icon name={step.icon} size={18}/></div>
              <div className="service-process-number">{step.number}</div>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
              {index < processSteps.length - 1 && <span className="service-process-connector" aria-hidden="true"/>}
            </div>
          ))}
        </div>
      </section>
    </div>
  </>;
}
