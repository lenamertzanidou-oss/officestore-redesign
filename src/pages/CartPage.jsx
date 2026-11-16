import { Link } from 'react-router-dom';
import { Breadcrumbs, EmptyState, OrderProgress, Quantity } from '../components/Common';
import ProductVisual from '../components/ProductVisual';
import { Icon } from '../components/Icons';
import { formatPrice } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export default function CartPage() {
  const { cartLines, updateQty, removeFromCart, subtotal, deliveryFee, hasFreeDelivery, total, deliveryDate, setDeliveryDate, deliveryOptions } = useStore();
  const itemCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const selectedDelivery = deliveryOptions.find((option) => option.value === deliveryDate) || deliveryOptions[0];

  return (
    <div className="container cart-page">
      <Breadcrumbs items={[{label:'Զամբյուղ'}]}/>

      <OrderProgress step={1}/>

      {!cartLines.length ? (
        <EmptyState
          title="Ձեր զամբյուղը դատարկ է"
          text="Ընտրեք անհրաժեշտ ապրանքները և ավելացրեք զամբյուղ։"
        />
      ) : (
        <>
          <header className="cart-page-head">
            <div>
              <span className="cart-page-kicker">Ձեր ընտրած ապրանքները</span>
              <h1>Զամբյուղ</h1>
              <p>{itemCount} ապրանք</p>
            </div>
            <Link className="cart-continue-link" to="/shop">
              <Icon name="arrow" size={15}/>
              Շարունակել գնումները
            </Link>
          </header>

          <div className="cart-layout">
            <section className="cart-items" aria-label="Զամբյուղի ապրանքներ">
              {cartLines.map(line => (
                <article className="cart-line" key={line.id}>
                  <Link className="cart-line-image" to={`/product/${line.product.slug}`} aria-label={line.product.name}>
                    <ProductVisual type={line.product.visual} alt={line.product.name}/>
                  </Link>

                  <div className="cart-line-info">
                    <span className="cart-line-meta">{line.product.unit}</span>
                    <Link className="cart-line-name" to={`/product/${line.product.slug}`}>
                      {line.product.name}
                    </Link>
                    {line.quantity > 1 && (
                      <span className="cart-unit-price">{formatPrice(line.product.price)} / հատ</span>
                    )}
                  </div>

                  <div className="cart-line-qty">
                    <span className="cart-line-label">Քանակ</span>
                    <Quantity
                      value={line.quantity}
                      min={line.product.minQty || 1}
                      onChange={(q)=>updateQty(line.id,q)}
                    />
                  </div>

                  <div className="cart-line-price">
                    <span className="cart-line-label">Գումար</span>
                    <strong>{formatPrice(line.product.price * line.quantity)}</strong>
                  </div>

                  <button
                    type="button"
                    className="cart-remove-btn"
                    onClick={()=>removeFromCart(line.id)}
                    aria-label={`Հեռացնել ${line.product.name}`}
                    title="Հեռացնել"
                  >
                    <Icon name="trash" size={17}/>
                  </button>
                </article>
              ))}

              {hasFreeDelivery && (
                <div className="free-delivery-banner">
                  <span className="free-delivery-icon"><Icon name="truck" size={18}/></span>
                  <div>
                    <strong>Անվճար առաքում</strong>
                    <span>Այս պատվերի համար առաքման վճար չի գանձվի։</span>
                  </div>
                </div>
              )}

              <div className="cart-delivery-planner">
                <div className="cart-delivery-planner-head">
                  <span className="cart-delivery-planner-icon"><Icon name="calendar" size={18}/></span>
                  <div>
                    <strong>Ընտրեք առաքման օրը</strong>
                    <span>Նույն օրը առաքում չի իրականացվում։</span>
                  </div>
                </div>

                <div className="delivery-date-options" role="radiogroup" aria-label="Առաքման օր">
                  {deliveryOptions.map((option) => (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={deliveryDate === option.value}
                      className={deliveryDate === option.value ? 'is-active' : ''}
                      key={option.value}
                      onClick={() => setDeliveryDate(option.value)}
                    >
                      <small>{option.isEarliest ? 'Ամենաարագ' : 'Հասանելի'}</small>
                      <strong>{option.shortLabel}</strong>
                      <span className="delivery-date-check"><Icon name="check" size={12}/></span>
                    </button>
                  ))}
                </div>

                <div className="delivery-policy-note">
                  <span><Icon name="info" size={17}/></span>
                  <div>
                    <strong>Առաքման պայմաններ</strong>
                    <p>Մինչև ժամը 18:00-ը ձևակերպված պատվերները կառաքվեն հաջորդ աշխատանքային օրը։ Շաբաթ և կիրակի օրերին ձևակերպված պատվերները կառաքվեն երկուշաբթի։ Ծանրաբեռնվածության դեպքում առաքումը կարող է իրականացվել մինչև 2 աշխատանքային օրվա ընթացքում։ Առաքման մասին ծանուցումը կուղարկվի Ձեր նշած հեռախոսահամարին։</p>
                  </div>
                </div>
              </div>
            </section>

            <aside className="order-summary cart-summary">
              <div className="cart-summary-head">
                <span>Պատվերի ամփոփում</span>
                <strong>{itemCount} ապրանք</strong>
              </div>

              <div className="cart-summary-rows">
                <div className="summary-row">
                  <span>Ապրանքներ</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <div className="summary-row">
                  <span>Առաքում</span>
                  <strong className={deliveryFee===0?'cart-delivery-free':''}>
                    {deliveryFee===0?'Անվճար':formatPrice(deliveryFee)}
                  </strong>
                </div>
                <div className="summary-row cart-delivery-date-row">
                  <span>Առաքման օր</span>
                  <strong>{selectedDelivery?.shortLabel || '—'}</strong>
                </div>
              </div>

              <div className="summary-divider"/>

              <div className="summary-total">
                <span>Ընդհանուր</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <Link className="btn btn-primary btn-lg full-width cart-checkout-btn" to="/checkout">
                Անցնել վճարմանը
                <Icon name="arrow" size={16}/>
              </Link>

              <div className="guest-cart-note">
                <Icon name="user" size={15}/>
                <span>
                  <strong>Գրանցում չի պահանջվում</strong>
                  <small>Կարող եք շարունակել որպես հյուր։</small>
                </span>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
