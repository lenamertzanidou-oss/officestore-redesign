import { Link } from 'react-router-dom';
import { Breadcrumbs, EmptyState, Quantity } from '../components/Common';
import ProductVisual from '../components/ProductVisual';
import { Icon } from '../components/Icons';
import { formatPrice } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export default function CartPage() {
  const { cartLines, updateQty, removeFromCart, subtotal, deliveryFee, hasFreeDelivery, total } = useStore();
  return <div className="container cart-page"><Breadcrumbs items={[{label:'Զամբյուղ'}]}/><div className="checkout-progress"><span className="is-active"><b>1</b>Զամբյուղ</span><i/><span><b>2</b>Վճարում</span><i/><span><b>3</b>Հաստատում</span></div>
    {!cartLines.length ? <EmptyState title="Ձեր զամբյուղը դատարկ է" text="Ավելացրեք անհրաժեշտ ապրանքները։ Մենք այստեղ կպահպանենք դրանք, իսկ ստորև checkout-ը կդառնա հասանելի։"/> : <div className="cart-layout">
      <section className="cart-items"><div className="cart-title"><div><h1>Ձեր զամբյուղը</h1><p>{cartLines.length} տեսակի ապրանք</p></div><Link className="text-link" to="/shop">Շարունակել գնումները <Icon name="arrow" size={17}/></Link></div>
      {cartLines.map(line => <article className="cart-line" key={line.id}><div className="cart-line-image"><ProductVisual type={line.product.visual}/></div><div className="cart-line-info"><span>{line.product.unit}</span><Link to={`/product/${line.product.slug}`}>{line.product.name}</Link><small className="stock-ok"><Icon name="check" size={14}/> Առկա է</small></div><div className="cart-line-qty"><Quantity value={line.quantity} min={line.product.minQty || 1} onChange={(q)=>updateQty(line.id,q)}/></div><div className="cart-line-price"><strong>{formatPrice(line.product.price*line.quantity)}</strong>{line.quantity>1 && <small>{formatPrice(line.product.price)} / հատ</small>}</div><button className="icon-btn" onClick={()=>removeFromCart(line.id)} aria-label="Հեռացնել"><Icon name="trash" size={18}/></button></article>)}
      {hasFreeDelivery && <div className="free-delivery-banner"><Icon name="truck"/><div><strong>Անվճար առաքումը ակտիվ է 🎉</strong><span>Զամբյուղում կա 18,9 լ Ապարան ջուր։</span></div></div>}</section>
      <aside className="order-summary"><h2>Պատվերի ամփոփում</h2><div className="summary-row"><span>Ապրանքներ</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-row"><span>Առաքում</span><strong className={deliveryFee===0?'success-text':''}>{deliveryFee===0?'Անվճար':formatPrice(deliveryFee)}</strong></div><div className="summary-divider"/><div className="summary-total"><span>Ընդհանուր</span><strong>{formatPrice(total)}</strong></div><Link className="btn btn-primary btn-lg full-width" to="/checkout">Անցնել վճարմանը <Icon name="arrow"/></Link><div className="guest-cart-note"><Icon name="user" size={15}/><span><strong>Կարող եք պատվիրել առանց գրանցվելու</strong><small>Հաշիվ ստեղծելը պարտադիր չէ։</small></span></div><div className="summary-trust"><span><Icon name="lock"/> Անվտանգ checkout</span><span><Icon name="truck"/> Հստակ առաքման պայմաններ</span></div><div className="coupon-box"><label htmlFor="coupon">Զեղչի կոդ</label><div><input id="coupon" placeholder="Օր. OFFICE10"/><button>Կիրառել</button></div></div></aside>
    </div>}
  </div>;
}
