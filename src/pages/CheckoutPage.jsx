import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, EmptyState } from '../components/Common';
import ProductVisual from '../components/ProductVisual';
import { Icon } from '../components/Icons';
import { formatPrice } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { saveStoredProfile } from '../utils/accountProfile';

const paymentMethods = [
  ['card','Բանկային քարտ','ArCa · Visa · MasterCard'],
  ['idram','Idram','Արագ վճարում դրամապանակով'],
  ['telcell','TelCell','Վճարում TelCell-ով'],
  ['bank','Բանկային փոխանցում','Հարմար է նաև իրավաբանական անձանց համար'],
  ['cash','Կանխիկ','Վճարում ստանալիս'],
];

export default function CheckoutPage() {
  const { cartLines, subtotal, deliveryFee, total, hasFreeDelivery, clearCart } = useStore();
  const [payment, setPayment] = useState('card');
  const [delivery, setDelivery] = useState('courier');
  const [ordered, setOrdered] = useState(false);
  const [saveAsAccount, setSaveAsAccount] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

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
    window.scrollTo({top:0,behavior:'smooth'});
  };

  if (ordered) {
    return (
      <div className="container order-success">
        <div className="success-icon big"><Icon name="check" size={38}/></div>
        <div className="eyebrow">Պատվերն ընդունված է</div>
        <h1>Շնորհակալություն ձեր պատվերի համար</h1>
        <p>Պատվերը ձևակերպվել է {accountCreated ? 'և ձեր տվյալներով ստեղծվել է OfficeStore հաշվի demo պրոֆիլ։' : 'առանց պարտադիր գրանցման՝ որպես հյուր։'}</p>

        <div className="order-success-card">
          <span>Պատվերի demo համարը</span>
          <strong>#OS-2027-1048</strong>
          <small>Հաստատումը կուղարկվի էլ. հասցեին և հեռախոսահամարին</small>
        </div>

        <div className="order-success-actions">
          <Link className="btn btn-primary" to="/shop">Վերադառնալ խանութ <Icon name="arrow"/></Link>
          {accountCreated && <Link className="btn btn-secondary" to="/account">Մուտք գործել իմ էջ</Link>}
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <Breadcrumbs items={[{label:'Զամբյուղ',to:'/cart'},{label:'Վճարում'}]}/>

      <div className="checkout-progress">
        <span className="is-done"><b><Icon name="check" size={14}/></b>Զամբյուղ</span>
        <i/>
        <span className="is-active"><b>2</b>Վճարում</span>
        <i/>
        <span><b>3</b>Հաստատում</span>
      </div>

      {!cartLines.length ? (
        <EmptyState title="Checkout-ի համար զամբյուղը դատարկ է" text="Ավելացրեք առնվազն մեկ ապրանք և վերադարձեք վճարման էջ։"/>
      ) : (
        <form className="checkout-layout" onSubmit={submit}>
          <div className="checkout-form">
            <div className="guest-checkout-note">
              <span className="guest-checkout-icon"><Icon name="user" size={17}/></span>
              <div>
                <strong>Պատվիրեք առանց գրանցվելու</strong>
                <p>Հաշիվ ստեղծելը պարտադիր չէ։ Լրացրեք միայն պատվերի և առաքման համար անհրաժեշտ տվյալները։</p>
              </div>
              <Link to="/account">Արդեն ունե՞ք հաշիվ</Link>
            </div>

            <section className="checkout-section">
              <div className="checkout-section-head">
                <span>01</span>
                <div><h2>Կոնտակտային տվյալներ</h2><p>Պատվերի հաստատման և առաքման կապի համար։</p></div>
              </div>
              <div className="form-grid">
                <label><span>Անուն *</span><input name="firstName" required autoComplete="given-name"/></label>
                <label><span>Ազգանուն *</span><input name="lastName" required autoComplete="family-name"/></label>
                <label><span>Հեռախոս *</span><input name="phone" required type="tel" autoComplete="tel" placeholder="0XX XX XX XX"/></label>
                <label><span>Էլ. հասցե *</span><input name="email" required type="email" autoComplete="email"/></label>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-head">
                <span>02</span>
                <div><h2>Առաքման եղանակ</h2><p>Ընտրեք, թե ինչպես եք ցանկանում ստանալ պատվերը։</p></div>
              </div>

              <div className="delivery-choice">
                <button type="button" className={delivery==='courier'?'is-active':''} onClick={()=>setDelivery('courier')}>
                  <span className="choice-icon"><Icon name="truck"/></span>
                  <span><strong>Առաքում հասցեով</strong><small>{hasFreeDelivery?'Անվճար':'600 ֏'} · հաջորդ աշխատանքային օրը</small></span>
                  <span className="radio-dot"/>
                </button>
                <button type="button" className={delivery==='pickup'?'is-active':''} onClick={()=>setDelivery('pickup')}>
                  <span className="choice-icon"><Icon name="location"/></span>
                  <span><strong>Ինքնուրույն վերցնել</strong><small>Ֆուչիկ փ. 27/52 · ըստ հաստատման</small></span>
                  <span className="radio-dot"/>
                </button>
              </div>

              {delivery==='courier' && (
                <div className="form-grid address-grid">
                  <label className="span-2"><span>Հասցե *</span><input name="address" required placeholder="Փողոց, շենք, բնակարան/գրասենյակ"/></label>
                  <label><span>Քաղաք *</span><select name="city" required><option>Երևան</option><option>Փարաքար</option><option>Աբովյան</option><option>Աշտարակ</option><option>Այլ</option></select></label>
                  <label><span>Փոստային ինդեքս</span><input name="postalCode" inputMode="numeric"/></label>
                  <label className="span-2"><span>Առաքման նշումներ</span><textarea name="deliveryNotes" rows="3" placeholder="Մուտք, հարկ, զանգի ցուցում…"/></label>
                </div>
              )}
            </section>

            <section className="checkout-section">
              <div className="checkout-section-head">
                <span>03</span>
                <div><h2>Վճարման եղանակ</h2><p>Ընտրեք ձեզ հարմար վճարման տարբերակը։</p></div>
              </div>

              <div className="payment-list">
                {paymentMethods.map(([id,title,text]) => (
                  <button type="button" key={id} className={payment===id?'is-active':''} onClick={()=>setPayment(id)}>
                    <span className={`payment-logo payment-${id}`}>{id==='card'?'CARD':id.toUpperCase()}</span>
                    <span><strong>{title}</strong><small>{text}</small></span>
                    <span className="radio-dot"/>
                  </button>
                ))}
              </div>

              {payment==='card' && (
                <div className="card-security-note">
                  <Icon name="lock"/>
                  <div>
                    <strong>Քարտային տվյալները չպետք է պահվեն OfficeStore-ի սերվերում</strong>
                    <p>Production տարբերակում քարտային ձևը պետք է սպասարկվի PCI-compliant վճարային պրովայդերի անվտանգ դաշտերով կամ redirect-ով։</p>
                  </div>
                </div>
              )}
            </section>

            <section className="checkout-section checkout-account-option">
              <div className="checkout-section-head">
                <span>04</span>
                <div><h2>Հաջորդ գնումը դարձնել ավելի արագ</h2><p>Այս քայլը կամավոր է և չի ազդում պատվերի ձևակերպման վրա։</p></div>
              </div>

              <label className={`checkout-create-account ${saveAsAccount ? 'is-active' : ''}`}>
                <input type="checkbox" checked={saveAsAccount} onChange={e=>setSaveAsAccount(e.target.checked)}/>
                <span className="checkout-create-account-icon"><Icon name="user" size={17}/></span>
                <span className="checkout-create-account-copy">
                  <strong>Պահպանել տվյալները և ստեղծել հաշիվ</strong>
                  <small>Հաջորդ անգամ հասցեն և կոնտակտային տվյալները լրացնելու կարիք չի լինի։</small>
                </span>
                <span className="checkout-create-account-check"><Icon name="check" size={14}/></span>
              </label>

              {saveAsAccount && (
                <div className="checkout-account-password">
                  <label>
                    <span>Ստեղծեք գաղտնաբառ *</span>
                    <input name="newPassword" required type="password" minLength="8" autoComplete="new-password" placeholder="Առնվազն 8 նիշ"/>
                  </label>
                  <p><Icon name="shield" size={14}/> Գաղտնաբառը demo տարբերակում browser storage-ում չի պահպանվում։ Production-ում այն պետք է մշակվի անվտանգ backend auth համակարգով։</p>
                </div>
              )}
            </section>
          </div>

          <aside className="order-summary checkout-summary">
            <div className="checkout-summary-head">
              <div>
                <span className="checkout-summary-kicker">Guest checkout</span>
                <h2>Ձեր պատվերը</h2>
              </div>
              <span className="guest-badge"><Icon name="check" size={13}/> Գրանցում չի պահանջվում</span>
            </div>

            <div className="checkout-lines">
              {cartLines.map(line => (
                <div className="checkout-line" key={line.id}>
                  <div className="checkout-line-visual"><ProductVisual type={line.product.visual}/><b>{line.quantity}</b></div>
                  <div><strong>{line.product.name}</strong><span>{line.product.unit}</span></div>
                  <em>{formatPrice(line.product.price*line.quantity)}</em>
                </div>
              ))}
            </div>

            <div className="summary-divider"/>
            <div className="summary-row"><span>Ապրանքներ</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="summary-row"><span>Առաքում</span><strong className={deliveryFee===0?'success-text':''}>{delivery==='pickup'||deliveryFee===0?'Անվճար':formatPrice(deliveryFee)}</strong></div>
            <div className="summary-divider"/>
            <div className="summary-total"><span>Վճարման ենթակա</span><strong>{formatPrice(delivery==='pickup'?subtotal:total)}</strong></div>

            <label className="terms-check">
              <input type="checkbox" required/>
              <span>Համաձայն եմ <Link to="/terms">ծառայության պայմաններին</Link> և <Link to="/privacy">գաղտնիության քաղաքականությանը</Link>։</span>
            </label>

            <button className="btn btn-primary btn-lg full-width">Հաստատել պատվերը <Icon name="lock" size={18}/></button>
            <div className="summary-trust">
              <span><Icon name="shield"/> Անվտանգ checkout</span>
              <span><Icon name="user"/> Առանց պարտադիր հաշվի</span>
            </div>
          </aside>
        </form>
      )}
    </div>
  );
}
