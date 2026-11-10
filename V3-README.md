# OfficeStore V3 — Editorial Commerce Redesign

Այս տարբերակը ամբողջությամբ փոխում է կայքի visual language-ը՝ օգտվելով օգտատիրոջ տրամադրած reference-ից որպես **դիզայնային ուղղություն**, ոչ թե որպես copy։

## Դիզայնային ուղղություն

- խոշոր rounded կապույտ hero
- acid-lime CTA և micro accents
- editorial / Swiss-style typography
- մեծ whitespace և խոշոր վերնագրեր
- dashboard / mosaic cards
- մաքուր product merchandising
- բոլոր ներքին էջերի միասնական blue + lime UI համակարգ
- responsive mobile navigation և search modal

## Փոխված հիմնական ֆայլերը

- `src/components/Layout.jsx`
- `src/components/Common.jsx`
- `src/components/ProductCard.jsx`
- `src/pages/HomePage.jsx`
- `src/styles/main.css`
- `index.html`

## Գործարկում

```powershell
npm.cmd install
npm.cmd run dev
```

Հետո բացեք Vite-ի ցուցադրած հասցեն, սովորաբար՝ `http://localhost:5173/`։

## Եթե արդեն ունեք աշխատող V2 նախագիծ

Կարող եք օգտագործել նաև `officestore-v3-update-only.zip` ֆայլը և նույն անունով ֆայլերը replace անել։ Dev server-ը եթե բաց է՝ սովորաբար փոփոխությունները կտեսնեք անմիջապես։ Եթե ոչ՝ կանգնեցրեք `Ctrl + C`-ով և նորից աշխատեցրեք `npm.cmd run dev`։
