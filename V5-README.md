# OfficeStore V5

V5-ը ամբողջ կայքի միասնական UI/UX redesign-ն է՝ առաջին էջի design language-ը տարածված բոլոր route-երի վրա։

## Ինչ է փոխվել
- միասնական emerald / white / soft-gray design system
- նոր search-first header և compact category navigation
- իրական OfficeStore.am live asset-ների օգտագործում category/promo պատկերների համար
- նոր գլխավոր էջ՝ hero, categories, product grids, promo banners, discount/weekly/limited sections
- ProductCard/ProductVisual ամբողջական վերամշակում
- Shop/Category/Product/Cart/Checkout/Account/About/Contact/Delivery/Service/Blog/Legal էջերի նույն visual language
- desktop/tablet/mobile responsive overrides
- իրական payment logo asset-ներ footer-ում

## Սկսելու քայլերը
```bash
npm.cmd install
npm.cmd run dev
```
Բացեք՝ http://localhost:5173/

## Նկարների մասին
Պատկերների URL-ները ուղղակի կապվում են `officestore.am/wp-content/uploads/...` asset-ներին։ Դրանք պահվում են `src/data/siteAssets.js`-ում։ Եթե live կայքում asset-ի անունը/ուղին փոխվի, կարելի է մեկ տեղում փոխել URL-ը։

## Validation
- JS/JSX source parse errors: 0
- Missing relative imports: 0
- CSS braces: balanced
- Full npm build-ը այս միջավայրում չի ավարտվել package download timeout-ի պատճառով։
