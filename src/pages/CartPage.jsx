import { Link } from 'react-router-dom';
import { Breadcrumbs, EmptyState, Quantity } from '../components/Common';
import ProductVisual from '../components/ProductVisual';
import { Icon } from '../components/Icons';
import { formatPrice } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export default function CartPage() {
  const { cartLines, updateQty, removeFromCart, subtotal, deliveryFee, hasFreeDelivery, total } = useStore();
  const itemCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="container cart-page">
      <Breadcrumbs items={[{label:'Զամբյուղ'}]}/>

      <div className="checkout-progress cart-progress" aria-label="Պատվերի քայլեր">
        <span className="is-active"><b>1</b>Զամբյուղ</span>
        <i/>
        <span><b>2</b>Վճարում</span>
        <i/>
        <span><b>3</b>Հաստատում</span>
      </div>

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
