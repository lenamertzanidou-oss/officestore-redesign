export default function ProductVisual({ type = 'stationery', size = 'card', alt = '' }) {
  return (
    <div
      className={`product-visual product-visual-${size} type-${type} product-visual-empty`}
      role="img"
      aria-label={alt || 'Ապրանքի նկարի տեղ'}
    />
  );
}
