import { PRODUCT_PLACEHOLDER } from '../data/productPlaceholder';

export default function ProductVisual({ type = 'stationery', size = 'card', alt = '' }) {
  return (
    <div className={`product-visual product-visual-${size} type-${type} product-visual-placeholder`}>
      <img
        className="product-placeholder-image"
        src={PRODUCT_PLACEHOLDER}
        alt={alt || 'Ապրանքի նկար'}
        loading={size === 'detail' ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}
