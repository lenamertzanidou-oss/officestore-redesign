import { Link } from 'react-router-dom';
import ProductVisual from './ProductVisual';
import { Icon } from './Icons';
import { formatPrice } from '../data/catalog';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product, compact = false }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const stockLevel = Math.max(2, Math.min(8, Math.ceil(product.stock / 8)));

  return (
    <article className={`product-card market-product-card ${compact ? 'product-card-compact' : ''}`}>
      <div className="product-media">
        <Link to={`/product/${product.slug}`} aria-label={product.name}><ProductVisual type={product.visual} alt={product.name}/></Link>
        <div className="product-badges">
          {product.badge && <span className={`badge ${product.badge.includes('%') ? 'badge-sale' : ''}`}>{product.badge}</span>}
          {product.stock === 0 && <span className="badge badge-muted">Առկա չէ</span>}
        </div>
        <button className={`wishlist-btn ${wished ? 'is-active' : ''}`} onClick={() => toggleWishlist(product.id)} aria-label={wished ? 'Հեռացնել ցանկից' : 'Ավելացնել ցանկին'}><Icon name="heart" size={16}/></button>
      </div>

      <div className="product-card-body">
        <div className="product-rating-row"><span>★★★★★</span><small>4.9</small></div>
        <Link className="product-title" to={`/product/${product.slug}`}>{product.name}</Link>
        <div className="product-meta">{product.unit}</div>
        <div className="price-row"><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div>
        {compact && <div className="stock-meter" aria-label="Պահեստի առկայություն">{Array.from({ length: 8 }).map((_, i) => <i key={i} className={i < stockLevel ? 'is-filled' : ''}/>)}</div>}
        <button className="product-add-btn market-add-btn" disabled={product.stock === 0} onClick={() => addToCart(product, product.minQty || 1)}>
          <Icon name="cart" size={15}/><span>{product.stock === 0 ? 'Սպառված է' : 'Ավելացնել զամբյուղ'}</span>
        </button>
      </div>
    </article>
  );
}
