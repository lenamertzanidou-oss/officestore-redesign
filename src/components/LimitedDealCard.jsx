import { Link } from 'react-router-dom';
import ProductVisual from './ProductVisual';
import { Icon } from './Icons';
import { formatPrice } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export default function LimitedDealCard({ product, time }) {
  const { addToCart } = useStore();
  const available = Math.max(1, Math.min(product.stock || 1, 99));

  return (
    <article className="limited-deal-card">
      <div className="limited-deal-media">
        <Link to={`/product/${product.slug}`} aria-label={product.name}>
          <ProductVisual type={product.visual} alt={product.name}/>
        </Link>
        {product.badge && <span className="limited-deal-badge">{product.badge}</span>}
      </div>

      <div className="limited-deal-body">
        <Link className="limited-deal-title" to={`/product/${product.slug}`}>{product.name}</Link>
        <div className="limited-deal-rating"><span>★★★★★</span><small>4.9</small></div>

        <div className="limited-deal-timer" aria-label="Առաջարկի ավարտին մնացել է">
          <div><small>DAY</small><strong>{time.days}</strong></div>
          <div><small>HOUR</small><strong>{time.hours}</strong></div>
          <div><small>MIN</small><strong>{time.minutes}</strong></div>
          <div><small>SEC</small><strong>{time.seconds}</strong></div>
        </div>

        <div className="limited-deal-price">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>

        <button className="limited-deal-add" disabled={product.stock === 0} onClick={() => addToCart(product, product.minQty || 1)}>
          <Icon name="cart" size={15}/>
          <span>{product.stock === 0 ? 'Սպառված է' : 'Ավելացնել զամբյուղ'}</span>
        </button>

        <div className="limited-deal-divider"/>
        <p>Այս առաջարկի քանակը սահմանափակ է</p>
        <div className="limited-deal-stock"><span>Առկա է միայն՝</span><strong>{available}</strong></div>
      </div>
    </article>
  );
}
