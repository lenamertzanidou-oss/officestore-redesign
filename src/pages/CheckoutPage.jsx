import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, EmptyState, OrderProgress } from '../components/Common';
import ProductVisual from '../components/ProductVisual';
import { Icon } from '../components/Icons';
import { formatPrice } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { saveStoredProfile } from '../utils/accountProfile';

const paymentMethods = [
  ['cash','Կանխիկ','Վճարում ստանալիս'],
  ['card','Բանկային քարտ','Visa · MasterCard'],
  ['idram','Idram','Արագ վճարում'],
  ['telcell','TelCell','Վճարում TelCell-ով'],
  ['bank','Բանկային փոխանցում','Հարմար է կազմակերպությունների համար'],
];

function PaymentMark({ id }) {
  const iconName = {
    cash: 'banknote',
    card: 'card',
    idram: 'wallet',
    telcell: 'mobile',
    bank: 'building',
  }[id] || 'card';

  const label = {
    cash: 'CASH',
    card: 'VISA',
    idram: 'IDRAM',
    telcell: 'TELCELL',
    bank: 'BANK',
  }[id] || id.toUpperCase();

  return (
    <span className={`payment-method-mark payment-method-mark--${id}`} aria-hidden="true">
      <Icon name={iconName} size={15}/>
      <b>{label}</b>
    </span>
  );
}

export default function CheckoutPage() {
  const { cartLines, subtotal, deliveryFee, total, hasFreeDelivery, clearCart } = useStore();
  const [payment, setPayment] = useState('cash');
  const [delivery, setDelivery] = useState('courier');
  const [ordered, setOrdered] = useState(false);
  const [saveAsAccount, setSaveAsAccount] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const itemCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const payable = delivery === 'pickup' ? subtotal : total;

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (saveAsAccount) {
      saveStoredProfile({
        type: 'personal',
        firstName: String(data.get('firstName') || '').trim(),
        lastName: String(data.get('lastName') || '').trim(),
        phone: String(data.get('phone') || '').trim(),
        email: String(data.get('email') || '').trim(),
      });
      setAccountCreated(true);
    }

    setOrdered(true);
    clearCart();
    window.scrollTo({top:0, behavior:'smooth'});
  };

  if (ordered) {
    return (
      <div className="container checkout-confirmation-page">
        <Breadcrumbs items={[{label:'Զամբյուղ',to:'/cart'},{label:'Հաստատում'}]}/>
        <OrderProgress step={3}/>

        <section className="checkout-confirmation">
          <span className="checkout-confirmation-icon"><Icon name="check" size={24}/></span>
          <span className="checkout-confirmation-kicker">Պատվերն ընդունված է</span>
          <h1>Շնորհակալություն ձեր պատվերի համար</h1>
          <p>Պատվերի հաստատման համար մենք կկապվենք նշված հեռախոսահամարով։</p>

          <div className="checkout-confirmation-number">
            <small>Պատվերի համարը</small>
            <strong>#OS-2027-1048</strong>
          </div>

          {accountCreated && (
            <div className="checkout-confirmation-account">
              <Icon name="user" size={16}/>
              <span>Ձեր տվյալներով ստեղծվել է OfficeStore հաշիվ՝ հաջորդ գնումները արագացնելու համար։</span>
            </div>
          )}

          <div className="checkout-confirmation-actions">
            <Link className="btn btn-primary" to="/shop">Վերադառնալ խանութ <Icon name="arrow" size={15}/></Link>
            {accountCreated && <Link className="btn btn-secondary" to="/account">Իմ էջը</Link>}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <Breadcrumbs items={[{label:'Զամբյուղ',to:'/cart'},{label:'Վճարում'}]}/>
      <OrderProgress step={2}/>

      {!cartLines.length ? (
        <EmptyState title="Զամբյուղը դատարկ է" text="Ավելացրեք ապրանք և վերադարձեք վճարման էջ։"/>
      ) : (
        <>
          <header className="checkout-page-head">
            <span>Պատվերի ձևակերպում</span>
            <h1>Վճարում և առաքում</h1>
            <p>Լրացրեք միայն պատվերի համար անհրաժեշտ տվյալները։ Գրանցվելը պարտադիր չէ։</p>
          </header>

          <form className="checkout-layout" onSubmit={submit}>
            <div className="checkout-form">
              <div className="checkout-login-note">
                <span><Icon name="user" size={16}/></span>
                <p><strong>Պատվիրեք որպես հյուր</strong> կամ <Link to="/account">մուտք գործեք</Link>՝ պահպանված տվյալներն օգտագործելու համար։</p>
              </div>

              <section className="checkout-section">
                <header className="checkout-section-head">
                  <span className="checkout-section-icon"><Icon name="user" size={17}/></span>
                  <div>
                    <h2>Կոնտակտային տվյալներ</h2>
                    <p>Պատվերի հաստատման և առաքման կապի համար</p>
                  </div>
                </header>

                <div className="form-grid">
                  <label><span>Անուն *</span><input name="firstName" required autoComplete="given-name"/></label>
                  <label><span>Ազգանուն *</span><input name="lastName" required autoComplete="family-name"/></label>
                  <label><span>Հեռախոս *</span><input name="phone" required type="tel" autoComplete="tel" placeholder="0XX XX XX XX"/></label>
                  <label><span>Էլ․ հասցե <small className="field-optional">ըստ ցանկության</small></span><input name="email" required={saveAsAccount} type="email" autoComplete="email" placeholder="name@example.com"/></label>
                </div>
              </section>

              <section className="checkout-section">
                <header className="checkout-section-head">
                  <span className="checkout-section-icon"><Icon name="truck" size={17}/></span>
                  <div>
                    <h2>Առաքման եղանակ</h2>
                    <p>Ընտրեք ձեզ հարմար տարբերակը</p>
                  </div>
                </header>

                <div className="delivery-choice">
                  <button type="button" className={delivery==='courier'?'is-active':''} onClick={()=>setDelivery('courier')}>
                    <span className="choice-icon"><Icon name="truck" size={18}/></span>
                    <span><strong>Առաքում հասցեով</strong><small>{hasFreeDelivery ? 'Անվճար' : '600 ֏'} · հաջորդ աշխատանքային օրը</small></span>
                    <span className="radio-dot"/>
                  </button>

                  <button type="button" className={delivery==='pickup'?'is-active':''} onClick={()=>setDelivery('pickup')}>
                    <span className="choice-icon"><Icon name="location" size={18}/></span>
                    <span><strong>Ինքնուրույն վերցնել</strong><small>Ֆուչիկ փ. 27/52 · ըստ հաստատման</small></span>
                    <span className="radio-dot"/>
                  </button>
                </div>

                {delivery==='courier' && (
                  <div className="checkout-subform form-grid address-grid">
                    <label className="span-2"><span>Հասցե *</span><input name="address" required placeholder="Փողոց, շենք, բնակարան/գրասենյակ"/></label>
                    <label className="span-2"><span>Քաղաք *</span><select name="city" required><option>Երևան</option><option>Փարաքար</option><option>Աբովյան</option><option>Աշտարակ</option><option>Այլ</option></select></label>
                    <label className="span-2"><span>Առաքման նշումներ</span><textarea name="deliveryNotes" rows="2" placeholder="Մուտք, հարկ կամ այլ օգտակար նշում"/></label>
                  </div>
                )}
              </section>

              <section className="checkout-section">
                <header className="checkout-section-head">
                  <span className="checkout-section-icon"><Icon name="lock" size={17}/></span>
                  <div>
                    <h2>Վճարման եղանակ</h2>
                    <p>Ընտրեք մեկ տարբերակ</p>
                  </div>
                </header>

                <div className="payment-list">
                  {paymentMethods.map(([id,title,text]) => (
                    <button type="button" key={id} className={payment===id?'is-active':''} onClick={()=>setPayment(id)}>
                      <PaymentMark id={id}/>
                      <span><strong>{title}</strong><small>{text}</small></span>
                      <span className="radio-dot"/>
                    </button>
                  ))}
                </div>
              </section>

              <section className="checkout-save-section">
                <label className={`checkout-account-choice ${saveAsAccount ? 'is-active' : ''}`}>
                  <input
                    className="checkout-account-choice-input"
                    type="checkbox"
                    checked={saveAsAccount}
                    onChange={e=>setSaveAsAccount(e.target.checked)}
                  />
                  <span className="checkout-account-choice-icon"><Icon name="user" size={16}/></span>
                  <span className="checkout-account-choice-copy">
                    <span className="checkout-account-choice-title">
                      <strong>Ստեղծել հաշիվ և պահպանել տվյալները</strong>
                      <em>Ըստ ցանկության</em>
                    </span>
                    <small>Հաջորդ գնումների ժամանակ կոնտակտային տվյալները նորից լրացնելու կարիք չի լինի։</small>
                  </span>
                  <span className="checkout-account-choice-check" aria-hidden="true"><Icon name="check" size={13}/></span>
                </label>

                {saveAsAccount && (
                  <div className="checkout-account-password">
                    <label>
                      <span>Ստեղծեք գաղտնաբառ *</span>
                      <input name="newPassword" required type="password" minLength="8" autoComplete="new-password" placeholder="Առնվազն 8 նիշ"/>
                    </label>
                  </div>
                )}
              </section>
            </div>

            <aside className="order-summary checkout-summary">
              <div className="checkout-summary-head">
                <div>
                  <span className="checkout-summary-kicker">Պատվեր</span>
                  <h2>Ամփոփում</h2>
                </div>
                <span className="checkout-item-count">{itemCount} ապրանք</span>
              </div>

              <div className="checkout-lines">
                {cartLines.map(line => (
                  <div className="checkout-line" key={line.id}>
                    <div className="checkout-line-visual">
                      <ProductVisual type={line.product.visual} alt={line.product.name}/>
                      <b>{line.quantity}</b>
                    </div>
                    <div><strong>{line.product.name}</strong><span>{line.product.unit}</span></div>
                    <em>{formatPrice(line.product.price*line.quantity)}</em>
                  </div>
                ))}
              </div>

              <div className="summary-divider"/>
              <div className="summary-row"><span>Ապրանքներ</span><strong>{formatPrice(subtotal)}</strong></div>
              <div className="summary-row"><span>Առաքում</span><strong className={deliveryFee===0?'checkout-free':''}>{delivery==='pickup'||deliveryFee===0?'Անվճար':formatPrice(deliveryFee)}</strong></div>
              <div className="summary-divider"/>
              <div className="summary-total"><span>Ընդհանուր</span><strong>{formatPrice(payable)}</strong></div>

              <button className="btn btn-primary btn-lg full-width checkout-submit">
                Հաստատել պատվերը
                <Icon name="arrow" size={16}/>
              </button>

              <p className="checkout-guest-footnote"><Icon name="user" size={13}/> Գրանցում չի պահանջվում</p>
            </aside>
          </form>
        </>
      )}
    </div>
  );
}
