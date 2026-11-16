const VISUAL_META = {
  water: { label: 'Ջուր', kind: 'water' },
  coffee: { label: 'Սուրճ', kind: 'coffee' },
  tea: { label: 'Թեյ', kind: 'tea' },
  sweet: { label: 'Քաղցրավենիք', kind: 'sweet' },
  sugar: { label: 'Շաքար', kind: 'sugar' },
  paper: { label: 'Թուղթ', kind: 'paper' },
  stationery: { label: 'Գրենական', kind: 'stationery' },
  notebook: { label: 'Նոթատետր', kind: 'notebook' },
  household: { label: 'Տնտեսական', kind: 'household' },
  cup: { label: 'Մեկանգամյա սպասք', kind: 'cup' },
  dispenser: { label: 'Դիսպենսեր', kind: 'dispenser' },
};

function CategoryIcon({ kind }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.65,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  const art = {
    water: (
      <>
        <path {...common} d="M12 3.2s-4.7 5.7-4.7 9.3a4.7 4.7 0 0 0 9.4 0C16.7 8.9 12 3.2 12 3.2Z"/>
        <path {...common} d="M10 14.2c.5.8 1.2 1.2 2.2 1.2"/>
      </>
    ),
    coffee: (
      <>
        <path {...common} d="M5 9h11v5.2A4.8 4.8 0 0 1 11.2 19H9.8A4.8 4.8 0 0 1 5 14.2V9Z"/>
        <path {...common} d="M16 10.5h1.4a2.6 2.6 0 0 1 0 5.2H16"/>
        <path {...common} d="M8 5.2c0 1 1 1.2 1 2.2M12 4.5c0 1 1 1.3 1 2.4"/>
      </>
    ),
    tea: (
      <>
        <path {...common} d="M18.5 5.5C12 5.6 7.6 8.2 6.1 13.7c4.9.8 9.7-1 12.4-8.2Z"/>
        <path {...common} d="M5 19c2.1-4.8 5.3-7.8 9.6-9.6"/>
      </>
    ),
    sweet: (
      <>
        <path {...common} d="m7.4 8.2-3.2-1 .9 3.2-.9 3.2 3.2-1"/>
        <path {...common} d="m16.6 8.2 3.2-1-.9 3.2.9 3.2-3.2-1"/>
        <rect {...common} x="7.2" y="7.2" width="9.6" height="6.4" rx="2.4"/>
      </>
    ),
    sugar: (
      <>
        <path {...common} d="m6.2 8.1 5.8-3.2 5.8 3.2v7.1L12 18.5l-5.8-3.3V8.1Z"/>
        <path {...common} d="m6.2 8.1 5.8 3.3 5.8-3.3M12 11.4v7.1"/>
      </>
    ),
    paper: (
      <>
        <rect {...common} x="6.3" y="4.7" width="10.7" height="14.2" rx="1.3"/>
        <path {...common} d="M9 8h5.4M9 11h5.4M9 14h4"/>
        <path {...common} d="M4.4 7v12.2h9"/>
      </>
    ),
    stationery: (
      <>
        <path {...common} d="m6 17.8 1.2-4.4L15.7 5l3.1 3.1-8.5 8.5L6 17.8Z"/>
        <path {...common} d="m13.7 7 3.1 3.1M7.2 13.4l3.1 3.2"/>
        <path {...common} d="M5.5 20h13"/>
      </>
    ),
    notebook: (
      <>
        <rect {...common} x="6.3" y="4.2" width="12" height="15.4" rx="1.7"/>
        <path {...common} d="M9.1 4.2v15.4M4.7 7h3.2M4.7 11.8h3.2M4.7 16.5h3.2"/>
      </>
    ),
    household: (
      <>
        <path {...common} d="M9.5 7.4h6v3.2c1.8 1.2 2.7 3.1 2.7 5.6v2.2H7.7v-2.2c0-2.4.6-4.4 1.8-5.6V7.4Z"/>
        <path {...common} d="M11 7.4V5.2h5.7M16.7 5.2l2-1.1M10.1 13.4h5.7"/>
      </>
    ),
    cup: (
      <>
        <path {...common} d="M7 6.2h10l-1.1 12.2H8.1L7 6.2Z"/>
        <path {...common} d="M6 6.2h12M9 10.2h6"/>
      </>
    ),
    dispenser: (
      <>
        <path {...common} d="M9 3.8h6l1 4.4H8l1-4.4Z"/>
        <rect {...common} x="7" y="8.2" width="10" height="11.8" rx="1.5"/>
        <path {...common} d="M9.6 12h4.8M12 12v2.2M10.3 16.7h3.4"/>
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {art[kind] || art.stationery}
    </svg>
  );
}

export default function ProductVisual({ type = 'stationery', size = 'card', alt = '' }) {
  const meta = VISUAL_META[type] || VISUAL_META.stationery;
  const label = alt || `${meta.label} ապրանքի պատկեր`;

  return (
    <div
      className={`product-visual product-visual-${size} type-${type} product-visual-placeholder product-visual-branded`}
      role="img"
      aria-label={label}
    >
      <span className="product-placeholder-orbit product-placeholder-orbit-a" aria-hidden="true"/>
      <span className="product-placeholder-orbit product-placeholder-orbit-b" aria-hidden="true"/>
      <span className="product-placeholder-object" aria-hidden="true">
        <CategoryIcon kind={meta.kind}/>
      </span>
      <span className="product-placeholder-caption" aria-hidden="true">
        <strong>{meta.label}</strong>
        <small>OfficeStore ընտրանի</small>
      </span>
      <span className="product-placeholder-brand" aria-hidden="true"><b>O</b>S</span>
    </div>
  );
}
