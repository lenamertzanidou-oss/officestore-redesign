export const categories = [
  { slug: 'bulk', name: 'Բլոկով ապրանքներ', short: 'Բլոկով', icon: '▦', tone: 'blue', count: 24 },
  { slug: 'water', name: 'Ջուր', short: 'Ջուր', icon: '◉', tone: 'aqua', count: 13 },
  { slug: 'dispenser', name: 'Դիսպենսեր', short: 'Դիսպենսեր', icon: '⌁', tone: 'violet', count: 1 },
  { slug: 'coffee', name: 'Սուրճ', short: 'Սուրճ', icon: '◒', tone: 'amber', count: 9 },
  { slug: 'tea', name: 'Թեյ', short: 'Թեյ', icon: '⌇', tone: 'green', count: 22 },
  { slug: 'sweets', name: 'Քաղցրավենիք', short: 'Քաղցրավենիք', icon: '✦', tone: 'rose', count: 53 },
  { slug: 'stationery', name: 'Գրենական պիտույք', short: 'Գրենական', icon: '✎', tone: 'indigo', count: 66 },
  { slug: 'household', name: 'Տնտեսական ապրանք', short: 'Տնտեսական', icon: '⌂', tone: 'mint', count: 64 },
  { slug: 'disposable', name: 'Մեկանգամյա օգտագործման սպասք', short: 'Սպասք', icon: '◌', tone: 'orange', count: 3 },
];

export const subcategories = [
  { slug: 'ground-coffee', name: 'Աղացած սուրճ', parent: 'coffee' },
  { slug: 'instant-coffee', name: 'Լուծվող սուրճ 3ը 1ում', parent: 'coffee' },
  { slug: 'sugar', name: 'Շաքարավազ', parent: 'coffee' },
  { slug: 'wafer', name: 'Վաֆլի', parent: 'sweets' },
  { slug: 'cookies', name: 'Թխվածքաբլիթ', parent: 'sweets' },
  { slug: 'candy', name: 'Կոնֆետներ', parent: 'sweets' },
  { slug: 'zefir', name: 'Զեֆիր', parent: 'sweets' },
  { slug: 'halva', name: 'Հալվա', parent: 'sweets' },
  { slug: 'pen-pencil-marker', name: 'Գրիչ, Մատիտ, Մարկեր', parent: 'stationery' },
  { slug: 'eraser-clip-sharpener', name: 'Ռետին, Սեղմակ, Սրիչ', parent: 'stationery' },
  { slug: 'paper', name: 'Թուղթ', parent: 'stationery' },
  { slug: 'file', name: 'Ֆայլ', parent: 'stationery' },
  { slug: 'folder', name: 'Թղթապանակ', parent: 'stationery' },
  { slug: 'notebook', name: 'Նոթատետր', parent: 'stationery' },
  { slug: 'staple', name: 'Ամրակ, Կոճգամ, Կարիչ', parent: 'stationery' },
  { slug: 'thermal-paper', name: 'Ջերմային թուղթ', parent: 'stationery' },
  { slug: 'napkin', name: 'Անձեռոցիկ', parent: 'household' },
  { slug: 'paper-towel', name: 'Թղթյա սրբիչ', parent: 'household' },
  { slug: 'hand-soap', name: 'Ձեռքի օճառ', parent: 'household' },
  { slug: 'dishwashing', name: 'Սպասք լվանալու հեղուկ', parent: 'household' },
  { slug: 'rag', name: 'Լաթ', parent: 'household' },
  { slug: 'gloves', name: 'Ձեռնոց', parent: 'household' },
  { slug: 'trash-bag', name: 'Աղբի պարկ', parent: 'household' },
  { slug: 'cups', name: 'Բաժակ', parent: 'disposable' },
];

export const products = [
  {
    id: 1, slug: 'aparan-water-18-9', name: 'Ապարան Ջուր 18,9լ', category: 'water', subcategory: 'water',
    price: 1800, oldPrice: null, badge: 'Հիթ', stock: 38, unit: '1 տարա', minQty: 2,
    description: 'Դիսպենսերի համար նախատեսված 18,9 լ Ապարան ջուր։ Այս ապրանքը պատվերում ներառելու դեպքում առաքումն անվճար է։',
    specs: ['18,9 լ', 'Մինիմալ քանակ՝ 2 հատ', 'Անվճար առաքում'], visual: 'water'
  },
  {
    id: 2, slug: 'aparan-water-05-block', name: 'Ապարան Ջուր 0,5լ (բլոկ)', category: 'water', subcategory: 'water',
    price: 1920, oldPrice: null, badge: null, stock: 22, unit: '12 հատ',
    description: 'Խմելու ջուր՝ հարմար գրասենյակային և միջոցառումների օգտագործման համար։',
    specs: ['0,5 լ × 12 հատ', 'Բլոկով'], visual: 'water'
  },
  {
    id: 3, slug: 'aparan-water-033-block', name: 'Ապարան Ջուր 0,33լ (բլոկ)', category: 'water', subcategory: 'water',
    price: 1680, oldPrice: null, badge: null, stock: 17, unit: '12 հատ', description: 'Փոքր ձևաչափով շշալցված ջուր։', specs: ['0,33 լ × 12 հատ'], visual: 'water'
  },
  {
    id: 4, slug: 'sugar-4g-500', name: 'Շաքարավազ 4 գ', category: 'coffee', subcategory: 'sugar',
    price: 4250, oldPrice: null, badge: 'Նոր', stock: 3, unit: '500 հատ', description: 'Տուփի մեջ 500 հատ է։ Քաշը՝ 4 գրամ։', specs: ['4 գ', '500 հատ տուփում'], visual: 'sugar'
  },
  {
    id: 5, slug: 'coffesso-jezva-gold-100', name: 'Սուրճ Coffesso Jezva Gold աղացած 100գ', category: 'coffee', subcategory: 'ground-coffee',
    price: 980, oldPrice: null, badge: null, stock: 14, unit: '100 գ', description: 'Աղացած սուրճ՝ ամենօրյա օգտագործման համար։', specs: ['100 գ', 'Աղացած'], visual: 'coffee'
  },
  {
    id: 6, slug: 'coffesso-jezva-gold-200', name: 'Սուրճ Coffesso Jezva Gold աղացած 200գ', category: 'coffee', subcategory: 'ground-coffee',
    price: 1840, oldPrice: null, badge: null, stock: 11, unit: '200 գ', description: 'Աղացած սուրճ՝ 200 գրամ փաթեթավորմամբ։', specs: ['200 գ', 'Աղացած'], visual: 'coffee'
  },
  {
    id: 7, slug: 'richard-ceylon', name: 'Սև թեյ Richard Ռոյալ Ցեյլոն 50գր.', category: 'tea', subcategory: 'tea',
    price: 770, oldPrice: 860, badge: '-10%', stock: 27, unit: '25 թեյապարկ', description: 'Դասական սև թեյ։ 2գ × 25 հատ։', specs: ['50 գ', '25 հատ'], visual: 'tea'
  },
  {
    id: 8, slug: 'curtis-mango-berries', name: 'Սև Թեյ Curtis Մանգո և Բերրիս 34գր.', category: 'tea', subcategory: 'tea',
    price: 750, oldPrice: 860, badge: '-13%', stock: 19, unit: 'փաթեթ', description: 'Մրգային նոտաներով սև թեյ։', specs: ['34 գ'], visual: 'tea'
  },
  {
    id: 9, slug: 'vitba-wafer-milk', name: 'Վաֆլի «Վիտբա» կաթնային 150 գ', category: 'sweets', subcategory: 'wafer',
    price: 490, oldPrice: null, badge: 'Նոր', stock: 24, unit: '150 գ', description: 'Կաթնային միջուկով խրթխրթան վաֆլի։', specs: ['150 գ'], visual: 'sweet'
  },
  {
    id: 10, slug: 'zefir-vanilla', name: 'Զեֆիր «Վանիլային» 250գ․', category: 'sweets', subcategory: 'zefir',
    price: 820, oldPrice: null, badge: 'Նոր', stock: 0, unit: '250 գ', description: 'Վանիլային զեֆիր՝ 250 գ փաթեթավորմամբ։', specs: ['250 գ', 'Ժամանակավորապես առկա չէ'], visual: 'sweet'
  },
  {
    id: 11, slug: 'a4-svetocopy', name: 'Թուղթ A4 Svetocopy Classic 80 գր 500 թերթ', category: 'stationery', subcategory: 'paper',
    price: 1750, oldPrice: null, badge: 'Հիթ', stock: 46, unit: '500 թերթ', description: 'A4 գրասենյակային թուղթ՝ 80գ/մ², 500 թերթ։', specs: ['A4', '80 գ/մ²', '500 թերթ'], visual: 'paper'
  },
  {
    id: 12, slug: 'kangaro-staple', name: 'Կարիչ ասեղ Kangaro 24/6-1M', category: 'stationery', subcategory: 'staple',
    price: 140, oldPrice: null, badge: null, stock: 53, unit: 'տուփ', description: 'Կարիչի ասեղներ՝ 24/6-1M։', specs: ['24/6-1M'], visual: 'stationery'
  },
  {
    id: 13, slug: 'leather-notebook', name: 'Նոթատետր կաշվե Կոճգամով', category: 'stationery', subcategory: 'notebook',
    price: 2300, oldPrice: 2800, badge: '-18%', stock: 8, unit: '1 հատ', description: 'Կաշվե կազմով նոթատետր՝ կոճգամով։', specs: ['Կաշվե կազմ'], visual: 'notebook'
  },
  {
    id: 14, slug: 'silk-soft-napkin', name: 'Անձեռոցիկ Silk Soft 3շ 100 հատ', category: 'household', subcategory: 'napkin',
    price: 490, oldPrice: null, badge: null, stock: 31, unit: '100 հատ', description: 'Եռաշերտ անձեռոցիկ՝ 100 հատ։', specs: ['3 շերտ', '100 հատ'], visual: 'household'
  },
  {
    id: 15, slug: 'morning-fresh-apple-900', name: '«Morning Fresh» Խնձոր 900 մլ․', category: 'household', subcategory: 'dishwashing',
    price: 1900, oldPrice: null, badge: null, stock: 10, unit: '900 մլ', description: 'Սպասք լվանալու հեղուկ՝ խնձորի բույրով։', specs: ['900 մլ'], visual: 'household'
  },
  {
    id: 16, slug: 'veiro-roll-towel', name: 'Սրբիչ գլանափաթեթով Veiro', category: 'household', subcategory: 'paper-towel',
    price: 4120, oldPrice: null, badge: 'B2B', stock: 6, unit: '150 մ', description: 'Երկշերտ սպիտակ թղթյա սրբիչ՝ գլանափաթեթով։', specs: ['150 մ', '20 սմ լայնություն', '38 մմ անցք'], visual: 'household'
  },
  {
    id: 17, slug: 'plastic-cup-170', name: 'Պլաստիկ բաժակ 170մլ', category: 'disposable', subcategory: 'cups',
    price: 350, oldPrice: null, badge: null, stock: 64, unit: '50 հատ', description: 'Բլոկում 50 հատ է։ 1 հատի գինը՝ 7 դրամ։', specs: ['170 մլ', '50 հատ'], visual: 'cup'
  },
  {
    id: 18, slug: 'paper-cup-180', name: 'Թղթե բաժակ 180 մլ', category: 'disposable', subcategory: 'cups',
    price: 800, oldPrice: null, badge: null, stock: 44, unit: '50 հատ', description: 'Թղթե բաժակ՝ 180 մլ։', specs: ['180 մլ', '50 հատ'], visual: 'cup'
  },
  {
    id: 19, slug: 'dorf-dispenser', name: 'Ջրի դիսպենսեր DORF', category: 'dispenser', subcategory: 'dispenser',
    price: 55000, oldPrice: null, badge: 'Պրո', stock: 4, unit: '1 հատ', description: 'Ջրի դիսպենսեր DORF՝ գրասենյակային կամ տնային օգտագործման համար։', specs: ['DORF', 'Պաշտոնական վաճառք'], visual: 'dispenser'
  },
  {
    id: 20, slug: 'aparan-water-6l-block', name: 'Ապարան Ջուր 6լ (բլոկ)', category: 'bulk', subcategory: 'water',
    price: 850, oldPrice: null, badge: null, stock: 13, unit: '2 հատ', description: 'Բլոկում 2 հատ է։', specs: ['6 լ × 2 հատ'], visual: 'water'
  },
];

export const services = [
  {
    id: 'wash', name: 'Դիսպենսերի լվացում', eyebrow: 'Սպասարկում', icon: '✦',
    description: 'Պատվիրեք այց, և մասնագետը կապ կհաստատի՝ ծառայության արժեքը և հարմար ժամը համաձայնեցնելու համար։',
    phone: '055 76 76 11', specialist: 'Սպարտակ', duration: 'մոտ 45–60 րոպե'
  },
  {
    id: 'repair', name: 'Դիսպենսերի նորոգում', eyebrow: 'Վերանորոգում', icon: '⌁',
    description: 'Ախտորոշում և նորոգում՝ այցով։ Վերջնական արժեքը հաստատվում է խնդիրը գնահատելուց հետո։',
    phone: '055 76 76 11', specialist: 'Սպարտակ', duration: 'կախված խնդրից'
  }
];

export const deliveryFaq = [
  { q: 'Վճարման ի՞նչ եղանակներ են հասանելի', a: 'Բանկային քարտեր (ArCa, Visa, MasterCard), Idram, TelCell, բանկային փոխանցում, իրավաբանական անձանց համար բանկային փոխանցում և կանխիկ վճարում։' },
  { q: 'Ունե՞ք անվճար առաքում, և ինչ պայմաններով', a: 'Այո։ 18,9 լ տարայով Ապարան ջուր պատվիրելու դեպքում առաքումն անվճար է։ Միայն այլ ապրանքների կամ այլ լիտրաժի ջրի դեպքում ցուցադրական առաքման արժեքը 600 դրամ է։' },
  { q: 'Առաքումն իրականացվու՞մ է նույն օրը', a: 'Նույն օրը առաքում չի իրականացվում։ Պատվերը սովորաբար մշակվում և առաքվում է հաջորդ աշխատանքային օրը։' },
  { q: 'Ինչպե՞ս է վերադարձվում առցանց վճարված գումարը չեղարկման դեպքում', a: 'Կայքի ներկայիս տեղեկատվության համաձայն՝ գումարը վերադարձվում է 2–3 աշխատանքային օրվա ընթացքում նույն հաշվին։' },
  { q: 'Ինչպե՞ս կարող եմ կրկնել նախորդ պատվերը', a: 'Անձնական էջում բացեք «Պատվերներ» բաժինը և ընտրեք կրկնելու գործողությունը։ Այս prototype-ում ցուցադրված է այդ հոսքի UI-ը։' },
  { q: 'Իրականացվու՞մ է մեծածախ վաճառք', a: 'Այո, OfficeStore-ը սպասարկում է նաև մեծածախ և կորպորատիվ պատվերներ։' },
];

export const legalContent = {
  privacy: {
    title: 'Գաղտնիության քաղաքականություն',
    intro: 'OfficeStore-ի տվյալների մշակման պարզ և ընթեռնելի ներկայացում։ Իրավական վերջնական տարբերակը պետք է հաստատվի իրավաբանի կողմից։',
    sections: [
      ['Հավաքվող տեղեկատվություն', 'Անուն, ազգանուն, էլ. հասցե, հեռախոսահամար, առաքման հասցե, պատվերի պատմություն և անհրաժեշտ տեխնիկական տվյալներ։'],
      ['Տվյալների օգտագործման նպատակ', 'Պատվերի մշակում, առաքում, հաճախորդի հետ կապ, սպասարկման բարելավում և իրավական պարտավորությունների կատարում։'],
      ['Տվյալների փոխանցում', 'Տվյալները չեն վաճառվում։ Դրանք կարող են փոխանցվել միայն ծառայություն մատուցող գործընկերներին կամ օրենքով պահանջվող դեպքերում։'],
      ['Անվտանգություն', 'Առաջարկվում է HTTPS, սահմանափակ հասանելիություն, audit logs և նվազագույն անհրաժեշտ տվյալների պահպանում։'],
      ['Ձեր իրավունքները', 'Դուք կարող եք խնդրել տվյալների հասանելիություն, ուղղում կամ ջնջում՝ կիրառելի օրենսդրության սահմաններում։'],
    ]
  },
  terms: {
    title: 'Ծառայության պայմաններ',
    intro: 'Առցանց խանութի օգտագործման և գնումների հիմնական պայմանների կառուցվածքային տարբերակ։',
    sections: [
      ['Ընդհանուր պայմաններ', 'Կայքի օգտագործմամբ օգտվողը համաձայնում է գործող պայմաններին և կայքում հրապարակված համապատասխան քաղաքականություններին։'],
      ['Ապրանքներ և հասանելիություն', 'Նկարագրությունները և պատկերները պետք է հնարավորինս ճշգրիտ լինեն, սակայն փաթեթավորումը կարող է տարբերվել։ Առկայությունը կարող է փոփոխվել։'],
      ['Գներ և վճարում', 'Գները նշվում են ՀՀ դրամով։ Վճարման եղանակները հաստատվում են checkout-ի ընթացքում։'],
      ['Առաքում', 'Առաքման արժեքն ու ժամկետը ցուցադրվում են պատվերի ձևակերպման ընթացքում՝ հասցեից և զամբյուղից կախված։'],
      ['Վերադարձ և փոխանակում', 'Վերադարձի քաղաքականությունը պետք է համապատասխանեցվի ՀՀ կիրառելի օրենսդրությանը և ապրանքի տեսակին։'],
      ['Օգտագործողի հաշիվ', 'Օգտվողը պատասխանատու է իր մուտքային տվյալների անվտանգ պահպանման համար։'],
    ]
  },
  deletion: {
    title: 'Տվյալների ջնջման կարգ',
    intro: 'Հստակ self-service հոսք՝ Facebook/կայքի տվյալների ջնջման հարցումների համար։',
    sections: [
      ['1. Ուղարկեք հարցումը', 'Գրեք support/officestore էլ. հասցեին և վերնագրում նշեք «Տվյալների ջնջման հարցում»։'],
      ['2. Նույնականացրեք հաշիվը', 'Նշեք միայն այն նվազագույն տվյալները, որոնք անհրաժեշտ են հաշիվը գտնելու համար։ Մի ուղարկեք գաղտնաբառ կամ քարտային տվյալներ։'],
      ['3. Ստացեք հաստատում', 'Հարցումը ստանալուց հետո օգտվողը պետք է ստանա ընդունման և կատարման կարգավիճակի հաստատում։'],
    ]
  }
};

export const formatPrice = (value) => new Intl.NumberFormat('hy-AM').format(value) + ' ֏';
