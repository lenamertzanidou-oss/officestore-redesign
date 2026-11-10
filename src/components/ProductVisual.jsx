import { siteAssets, visualToCategory } from '../data/siteAssets';

export default function ProductVisual({ type = 'stationery', size = 'card', alt = '' }) {
  const category = visualToCategory[type] || type || 'stationery';
  const src = siteAssets.category[category] || siteAssets.category.stationery;

  return (
    <div className={`product-visual product-visual-${size} type-${type}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}
