import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';
export default function NotFoundPage(){return <div className="container not-found"><div className="not-found-code">404</div><div className="eyebrow">Էջը չի գտնվել</div><h1>Այս հղումը կարծես այլևս այստեղ չէ</h1><p>Վերադարձեք գլխավոր էջ կամ անցեք կատալոգ՝ անհրաժեշտ ապրանքը գտնելու համար։</p><div><Link className="btn btn-primary" to="/">Գլխավոր էջ</Link><Link className="btn btn-secondary" to="/shop">Ապրանքներ <Icon name="arrow" size={17}/></Link></div></div>}
