import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';
import ProductVisual from '../components/ProductVisual';
import PageSeo from '../components/PageSeo';
import { products } from '../data/catalog';
import { loadStoredProfile } from '../utils/accountProfile';
import {
  buildUpcomingDeliveries,
  createWaterSubscription,
  formatSubscriptionDate,
  loadWaterSubscriptions,
  saveWaterSubscription,
} from '../utils/waterSubscriptions';

const weekdays = [
  { value:1, label:'Երկ', full:'Երկուշաբթի' },
  { value:2, label:'Երք', full:'Երեքշաբթի' },
  { value:3, label:'Չրք', full:'Չորեքշաբթի' },
  { value:4, label:'Հնգ', full:'Հինգշաբթի' },
  { value:5, label:'Ուրբ', full:'Ուրբաթ' },
  { value:6, label:'Շբթ', full:'Շաբաթ' },
];

const monthDays = Array.from({length:31},(_,index) => index+1);
const waterProduct = products.find(product => product.slug === 'aparan-water-18-9');

export default function WaterSubscriptionPage(){
  const storedProfile = useMemo(() => loadStoredProfile(), []);
  const existingSubscription = useMemo(
    () => loadWaterSubscriptions().find(item => item.status === 'active') || null,
    []
  );
  const initialType = existingSubscription?.customerType || (storedProfile?.type === 'corporate' ? 'corporate' : 'personal');

  const [customerType,setCustomerType] = useState(initialType);
  const [quantity,setQuantity] = useState(existingSubscription?.quantity || Math.max(2, waterProduct?.minQty || 2));
  const [scheduleType,setScheduleType] = useState(existingSubscription?.schedule?.type || 'monthly');
  const [selectedWeekdays,setSelectedWeekdays] = useState(existingSubscription?.schedule?.weekdays || [1]);
  const [selectedMonthDays,setSelectedMonthDays] = useState(existingSubscription?.schedule?.monthDays || [5,15,25]);
  const [customer,setCustomer] = useState({
    firstName:existingSubscription?.customer?.firstName || storedProfile?.firstName || '',
    lastName:existingSubscription?.customer?.lastName || storedProfile?.lastName || '',
    phone:existingSubscription?.customer?.phone || storedProfile?.phone || '',
    email:existingSubscription?.customer?.email || storedProfile?.email || '',
  });
  const [organization,setOrganization] = useState({
    name:existingSubscription?.organization?.name || storedProfile?.organization || '',
    taxId:existingSubscription?.organization?.taxId || storedProfile?.taxId || '',
  });
  const [address,setAddress] = useState(existingSubscription?.address || storedProfile?.legalAddress || '');
  const [submitted,setSubmitted] = useState(null);
  const [error,setError] = useState('');

  const schedule = useMemo(() => (
    scheduleType === 'weekly'
      ? { type:'weekly', weekdays:selectedWeekdays }
      : { type:'monthly', monthDays:selectedMonthDays }
  ), [scheduleType,selectedWeekdays,selectedMonthDays]);

  const upcoming = useMemo(() => buildUpcomingDeliveries(schedule), [schedule]);

  const toggleWeekday = (day) => {
    setSelectedWeekdays(current => current.includes(day)
      ? current.filter(item => item !== day)
      : [...current,day].sort((a,b) => a-b));
  };

  const toggleMonthDay = (day) => {
    setSelectedMonthDays(current => current.includes(day)
      ? current.filter(item => item !== day)
      : [...current,day].sort((a,b) => a-b));
  };

  const submit = (event) => {
    event.preventDefault();
    setError('');

    const hasSchedule = scheduleType === 'weekly' ? selectedWeekdays.length > 0 : selectedMonthDays.length > 0;
    if (!hasSchedule) {
      setError('Ընտրեք առնվազն մեկ առաքման օր։');
      return;
    }

    if (!customer.firstName.trim() || !customer.phone.trim() || !address.trim()) {
      setError('Լրացրեք անունը, հեռախոսահամարը և առաքման հասցեն։');
      return;
    }

    if (customerType === 'corporate' && (!organization.name.trim() || !organization.taxId.trim())) {
      setError('Իրավաբանական անձի համար լրացրեք կազմակերպության անվանումը և ՀՎՀՀ-ն։');
      return;
    }

    const subscription = createWaterSubscription({
      id:existingSubscription?.id,
      createdAt:existingSubscription?.createdAt,
      customerType,
      quantity,
      customer,
      organization,
      address,
      schedule,
    });

    saveWaterSubscription(subscription);
    setSubmitted(subscription);
  };

  const pricePerDelivery = (waterProduct?.price || 1800) * quantity;

  return <>
    <PageSeo
      title="Պարբերական ջրի առաքում | OfficeStore"
      description="Պլանավորեք Ապարան 18,9 լ ջրի պարբերական առաքումը՝ ընտրելով շաբաթվա կամ ամսվա ձեզ հարմար օրերը։"
      canonical="https://officestore.am/water-subscription/"
      image="https://officestore.am/wp-content/uploads/2025/08/323-2.jpg"
    />

    <PageHero
      variant="water-subscription"
      eyebrow="OfficeStore Auto Water"
      title="Նշեք առաքման օրերը մեկ անգամ"
      text="Պլանավորեք 18,9 լ ջրի պարբերական առաքումը՝ շաբաթվա կամ ամսվա ձեզ հարմար օրերով։ Կիրակի օրը առաքում չի իրականացվում։"
      benefits={['Անվճար առաքում 18,9 լ ջրով','Երկ–Շաբ','Փոփոխելի գրաֆիկ']}
    >
      <div className="water-sub-hero" aria-hidden="true">
        <div className="water-sub-hero-card">
          <span><Icon name="calendar" size={18}/></span>
          <div><small>Պարբերական գրաֆիկ</small><strong>5 · 15 · 25</strong></div>
        </div>
        <div className="water-sub-hero-route"/>
        <div className="water-sub-hero-bottle"><Icon name="droplet" size={34}/></div>
        <div className="water-sub-hero-truck"><Icon name="truck" size={22}/></div>
        <div className="water-sub-hero-note"><Icon name="check" size={13}/><span>Գրաֆիկը պահպանված է</span></div>
      </div>
    </PageHero>

    <main className="container water-subscription-page">
      <Breadcrumbs items={[{label:'Պարբերական ջրի առաքում'}]}/>

      {submitted ? (
        <section className="water-sub-success">
          <div className="water-sub-success-icon"><Icon name="check" size={28}/></div>
          <span>Գրաֆիկը պահպանված է</span>
          <h1>Պարբերական ջրի առաքումը պատրաստ է</h1>
          <p>Ձեր ընտրած օրերն ու տվյալները պահպանվել են։ Հաջորդ փուլում այս նույն տվյալները կուղարկվեն server-side ավտոմատ պատվերի համակարգին։</p>

          <div className="water-sub-success-grid">
            <div><small>Քանակ</small><strong>{submitted.quantity} × 18,9 լ</strong></div>
            <div><small>Վճարում</small><strong>{submitted.paymentMethod === 'cash' ? 'Կանխիկ' : 'Բանկային փոխանցում'}</strong></div>
            <div><small>Հաջորդ առաքում</small><strong>{formatSubscriptionDate(submitted.nextDeliveryDate)}</strong></div>
          </div>

          <div className="water-sub-upcoming water-sub-upcoming--success">
            <span>Առաջիկա պլանավորված առաքումներ</span>
            <div>{submitted.upcomingDeliveries.slice(0,5).map(date => <b key={date}>{formatSubscriptionDate(date)}</b>)}</div>
          </div>

          <div className="water-sub-success-actions">
            <button className="btn btn-secondary" onClick={() => setSubmitted(null)}>Փոփոխել գրաֆիկը</button>
            <Link className="btn btn-primary" to="/shop">Շարունակել գնումները <Icon name="arrow" size={15}/></Link>
          </div>

          <div className="water-sub-backend-note">
            <Icon name="info" size={16}/>
            <span><strong>Կարևոր․</strong> իրական ավտոմատ պատվերի ստեղծումն ու քեզ ուղարկելը backend scheduler/API է պահանջում։ Frontend տվյալային կառուցվածքն արդեն պատրաստ է այդ ինտեգրման համար։</span>
          </div>
        </section>
      ) : (
        <>
          {existingSubscription && (
            <div className="water-sub-existing">
              <span><Icon name="refresh" size={16}/></span>
              <div><strong>Ակտիվ գրաֆիկը բեռնված է</strong><small>Փոփոխությունները պահպանելիս նույն պարբերական առաքման գրաֆիկը կթարմացվի։</small></div>
            </div>
          )}

          <section className="water-sub-intro">
            <div>
              <span className="water-sub-kicker">Ինչպես է աշխատում</span>
              <h2>Մի անգամ ընտրեք գրաֆիկը, հետո կառավարեք միայն փոփոխությունները</h2>
              <p>Այս էջը նախատեսված է այն հաճախորդների համար, ովքեր պարբերաբար պատվիրում են 18,9 լ ջուր և չեն ցանկանում ամեն անգամ նույն պատվերը ձեռքով հավաքել։</p>
            </div>
            <div className="water-sub-intro-steps">
              <span><b>01</b>Ընտրեք քանակը</span>
              <span><b>02</b>Նշեք օրերը</span>
              <span><b>03</b>Հաստատեք տվյալները</span>
            </div>
          </section>

          <form className="water-sub-layout" onSubmit={submit}>
            <div className="water-sub-main">
              <section className="water-sub-section">
                <div className="water-sub-section-head">
                  <span><Icon name="droplet" size={18}/></span>
                  <div><small>Քայլ 1</small><h2>Ջուր և քանակ</h2></div>
                </div>

                <div className="water-sub-product">
                  <ProductVisual type="water" size="card" alt="Ապարան Ջուր 18,9 լ"/>
                  <div className="water-sub-product-copy">
                    <span>Պարբերական առաքման ապրանք</span>
                    <h3>{waterProduct?.name || 'Ապարան Ջուր 18,9լ'}</h3>
                    <p>18,9 լ ջրի առաքումն անվճար է։ Մինիմալ քանակ՝ 2 տարա։</p>
                    <strong>{(waterProduct?.price || 1800).toLocaleString('hy-AM')} ֏ / տարա</strong>
                  </div>
                  <div className="water-sub-qty">
                    <button type="button" onClick={() => setQuantity(value => Math.max(2,value-1))} aria-label="Պակասեցնել"><Icon name="minus" size={15}/></button>
                    <strong>{quantity}</strong>
                    <button type="button" onClick={() => setQuantity(value => value+1)} aria-label="Ավելացնել"><Icon name="plus" size={15}/></button>
                  </div>
                </div>
              </section>

              <section className="water-sub-section">
                <div className="water-sub-section-head">
                  <span><Icon name="calendar" size={18}/></span>
                  <div><small>Քայլ 2</small><h2>Ընտրեք առաքման գրաֆիկը</h2></div>
                </div>

                <div className="water-sub-schedule-tabs">
                  <button type="button" className={scheduleType === 'monthly' ? 'is-active' : ''} onClick={() => setScheduleType('monthly')}>
                    <Icon name="calendar" size={16}/>
                    <span><strong>Ամսվա օրերով</strong><small>օր.՝ 5, 15, 25</small></span>
                  </button>
                  <button type="button" className={scheduleType === 'weekly' ? 'is-active' : ''} onClick={() => setScheduleType('weekly')}>
                    <Icon name="refresh" size={16}/>
                    <span><strong>Շաբաթվա օրերով</strong><small>օր.՝ Երկ, Հնգ</small></span>
                  </button>
                </div>

                {scheduleType === 'monthly' ? (
                  <div className="water-sub-month-picker">
                    <div className="water-sub-picker-label">
                      <strong>Նշեք ամսվա օրերը</strong>
                      <span>Եթե ընտրված ամսաթիվը կիրակի է, առաքումը տեղափոխվում է երկուշաբթի։</span>
                    </div>
                    <div className="water-sub-month-grid">
                      {monthDays.map(day => (
                        <button
                          type="button"
                          key={day}
                          className={selectedMonthDays.includes(day) ? 'is-active' : ''}
                          onClick={() => toggleMonthDay(day)}
                          aria-pressed={selectedMonthDays.includes(day)}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="water-sub-week-picker">
                    <div className="water-sub-picker-label">
                      <strong>Նշեք շաբաթվա օրերը</strong>
                      <span>Կիրակին հասանելի չէ առաքման համար։</span>
                    </div>
                    <div className="water-sub-week-grid">
                      {weekdays.map(day => (
                        <button
                          type="button"
                          key={day.value}
                          className={selectedWeekdays.includes(day.value) ? 'is-active' : ''}
                          onClick={() => toggleWeekday(day.value)}
                          aria-pressed={selectedWeekdays.includes(day.value)}
                          title={day.full}
                        >
                          <span>{day.label}</span>
                          <Icon name={selectedWeekdays.includes(day.value) ? 'check' : 'calendar'} size={14}/>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="water-sub-upcoming">
                  <span>Առաջիկա առաքումները</span>
                  <div>
                    {upcoming.slice(0,5).map(date => <b key={date}>{formatSubscriptionDate(date)}</b>)}
                  </div>
                </div>
              </section>

              <section className="water-sub-section">
                <div className="water-sub-section-head">
                  <span><Icon name="user" size={18}/></span>
                  <div><small>Քայլ 3</small><h2>Հաճախորդ և հասցե</h2></div>
                </div>

                <div className="water-sub-type-switch">
                  <button type="button" className={customerType === 'personal' ? 'is-active' : ''} onClick={() => setCustomerType('personal')}>
                    <Icon name="user" size={17}/><span><strong>Ֆիզիկական անձ</strong><small>Վճարում՝ կանխիկ</small></span>
                  </button>
                  <button type="button" className={customerType === 'corporate' ? 'is-active' : ''} onClick={() => setCustomerType('corporate')}>
                    <Icon name="building" size={17}/><span><strong>Իրավաբանական անձ</strong><small>Բանկային փոխանցում</small></span>
                  </button>
                </div>

                <div className="water-sub-form-grid">
                  <label><span>Անուն *</span><input value={customer.firstName} onChange={e => setCustomer({...customer,firstName:e.target.value})} autoComplete="given-name"/></label>
                  <label><span>Ազգանուն</span><input value={customer.lastName} onChange={e => setCustomer({...customer,lastName:e.target.value})} autoComplete="family-name"/></label>
                  <label><span>Հեռախոս *</span><input type="tel" value={customer.phone} onChange={e => setCustomer({...customer,phone:e.target.value})} placeholder="0XX XX XX XX" autoComplete="tel"/></label>
                  <label><span>Էլ. հասցե</span><input type="email" value={customer.email} onChange={e => setCustomer({...customer,email:e.target.value})} autoComplete="email"/></label>
                  {customerType === 'corporate' && <>
                    <label><span>Կազմակերպության անվանում *</span><input value={organization.name} onChange={e => setOrganization({...organization,name:e.target.value})}/></label>
                    <label><span>ՀՎՀՀ *</span><input value={organization.taxId} onChange={e => setOrganization({...organization,taxId:e.target.value})}/></label>
                  </>}
                  <label className="span-2"><span>Առաքման հասցե *</span><input value={address} onChange={e => setAddress(e.target.value)} placeholder="Փողոց, շենք, բնակարան/գրասենյակ" autoComplete="street-address"/></label>
                </div>
              </section>

              <section className="water-sub-section">
                <div className="water-sub-section-head">
                  <span><Icon name={customerType === 'corporate' ? 'banknote' : 'wallet'} size={18}/></span>
                  <div><small>Քայլ 4</small><h2>Վճարման եղանակ</h2></div>
                </div>

                <div className="water-sub-payment">
                  <span><Icon name={customerType === 'corporate' ? 'banknote' : 'wallet'} size={18}/></span>
                  <div>
                    <small>{customerType === 'corporate' ? 'Իրավաբանական անձ' : 'Ֆիզիկական անձ'}</small>
                    <strong>{customerType === 'corporate' ? 'Բանկային փոխանցում' : 'Կանխիկ վճարում'}</strong>
                    <p>{customerType === 'corporate' ? 'Յուրաքանչյուր ավտոմատ պատվեր կստեղծվի բանկային փոխանցման վճարման եղանակով։' : 'Յուրաքանչյուր պլանավորված առաքման վճարումը նախատեսվում է կանխիկ։'}</p>
                  </div>
                  <Icon name="check" size={17}/>
                </div>
              </section>
            </div>

            <aside className="water-sub-summary">
              <div className="water-sub-summary-head">
                <span>Ձեր գրաֆիկը</span>
                <strong>Ամփոփում</strong>
              </div>

              <div className="water-sub-summary-product">
                <span><Icon name="droplet" size={18}/></span>
                <div><small>Ապարան 18,9 լ</small><strong>{quantity} տարա × {(waterProduct?.price || 1800).toLocaleString('hy-AM')} ֏</strong></div>
              </div>

              <div className="water-sub-summary-row"><span>Մեկ առաքման արժեք</span><strong>{pricePerDelivery.toLocaleString('hy-AM')} ֏</strong></div>
              <div className="water-sub-summary-row"><span>Առաքում</span><strong className="is-free">0 ֏</strong></div>
              <div className="water-sub-summary-row"><span>Վճարում</span><strong>{customerType === 'corporate' ? 'Բանկային փոխանցում' : 'Կանխիկ'}</strong></div>
              <div className="water-sub-summary-row"><span>Գրաֆիկ</span><strong>{scheduleType === 'monthly' ? `${selectedMonthDays.length} օր / ամիս` : `${selectedWeekdays.length} օր / շաբաթ`}</strong></div>

              <div className="water-sub-summary-next">
                <span><Icon name="calendar" size={15}/></span>
                <div><small>Հաջորդ հաշվարկված առաքում</small><strong>{upcoming[0] ? formatSubscriptionDate(upcoming[0]) : 'Ընտրեք օր'}</strong></div>
              </div>

              {error && <div className="water-sub-error"><Icon name="info" size={15}/>{error}</div>}

              <button className="btn btn-primary water-sub-submit" type="submit">
                {existingSubscription ? 'Պահպանել փոփոխությունները' : 'Ակտիվացնել գրաֆիկը'} <Icon name="arrow" size={16}/>
              </button>

              <div className="water-sub-summary-note">
                <Icon name="shield" size={15}/>
                <span>Գրաֆիկը հնարավոր կլինի փոխել կամ դադարեցնել account-ից՝ backend integration-ից հետո։</span>
              </div>
            </aside>
          </form>
        </>
      )}
    </main>
  </>;
}
