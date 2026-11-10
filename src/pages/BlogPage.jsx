import { Link } from 'react-router-dom';
import { Breadcrumbs, PageHero } from '../components/Common';
import { Icon } from '../components/Icons';

const posts = [
  {tag:'Գրասենյակ', title:'Ինչպես կառուցել կրկնվող մատակարարումների պարզ ցուցակ', text:'Գործնական ուղեցույց՝ ջրի, սուրճի, թղթի և հիգիենայի ապրանքների պաշարը կանխատեսելու համար։', time:'5 րոպե'},
  {tag:'Ջուր', title:'Դիսպենսերի մաքրման հաճախականությունը և ինչին ուշադրություն դարձնել', text:'Մաքուր համակարգ, ճիշտ սպասարկում և հարմար այցի կազմակերպում։', time:'4 րոպե'},
  {tag:'B2B', title:'Գրասենյակային գնումների 7 փոքր ավտոմատացում', text:'Ինչպես նվազեցնել ձեռքով կրկնվող աշխատանքը՝ պահպանված ցուցակներով և կրկնվող պատվերներով։', time:'6 րոպե'},
];

export default function BlogPage() {
  return <>
    <PageHero eyebrow="Բլոգ" title="Օգտակար նյութեր՝ գրասենյակի առօրյան հեշտացնելու համար" text="Ներկայիս կայքի բլոգը դատարկ է։ Ռեդիզայնը տալիս է պատրաստ editorial համակարգ՝ SEO-ի և օգտակար բովանդակության համար։" />
    <div className="container blog-page"><Breadcrumbs items={[{label:'Բլոգ'}]}/>
      <article className="featured-post"><div className="featured-post-art"><span>OS</span><div className="editorial-lines"><i/><i/><i/></div></div><div><span className="post-tag">Ուղեցույց</span><h2>Գրասենյակի մատակարարումների checklist՝ 2027-ի համար</h2><p>Մեկ միասնական ցուցակ՝ ջուր, սուրճ, գրենական, տնտեսական և մեկանգամյա օգտագործման ապրանքներ կառավարելու համար։</p><div className="post-meta"><span>8 րոպե ընթերցում</span><span>Թարմացվել է՝ սեպտեմբեր 2026</span></div><button className="text-link">Կարդալ հոդվածը <Icon name="arrow" size={17}/></button></div></article>
      <div className="blog-grid">{posts.map((p,i) => <article className="post-card" key={p.title}><div className={`post-art post-art-${i+1}`}><span>0{i+1}</span></div><div><span className="post-tag">{p.tag}</span><h3>{p.title}</h3><p>{p.text}</p><div className="post-bottom"><span>{p.time}</span><button aria-label="Կարդալ"><Icon name="arrow"/></button></div></div></article>)}</div>
      <section className="blog-empty-note"><div className="empty-icon"><Icon name="edit"/></div><div><h3>Բովանդակության CMS-ready կառուցվածք</h3><p>Այս քարտերը կարող են սնուցվել WordPress posts API-ից՝ նույն դիզայնը պահելով category, search և single article էջերում։</p></div><Link className="btn btn-secondary" to="/contact">Առաջարկել թեմա</Link></section>
    </div>
  </>;
}
