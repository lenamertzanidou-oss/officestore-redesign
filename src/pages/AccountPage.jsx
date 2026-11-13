import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Common';
import { Icon } from '../components/Icons';

function GoogleMark() {
  return (
    <svg className="google-mark" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.205c0-.64-.057-1.255-.164-1.845H9v3.49h4.844a4.14 4.14 0 0 1-1.797 2.716v2.258h2.909c1.703-1.568 2.684-3.88 2.684-6.619Z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.468-.806 5.956-2.176l-2.91-2.258c-.805.54-1.835.86-3.046.86-2.344 0-4.328-1.585-5.037-3.714H.956v2.332A9 9 0 0 0 9 18Z"/>
      <path fill="#FBBC05" d="M3.963 10.712A5.41 5.41 0 0 1 3.682 9c0-.594.102-1.17.281-1.712V4.956H.956A9 9 0 0 0 0 9c0 1.45.347 2.824.956 4.044l3.007-2.332Z"/>
      <path fill="#EA4335" d="M9 3.574c1.322 0 2.508.454 3.442 1.346l2.582-2.582C13.464.892 11.427 0 9 0A9 9 0 0 0 .956 4.956l3.007 2.332C4.672 5.159 6.656 3.574 9 3.574Z"/>
    </svg>
  );
}

export default function AccountPage() {
  const [mode, setMode] = useState('login');
  const [demoLogged, setDemoLogged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerType, setRegisterType] = useState('personal');

  if (demoLogged) {
    return (
      <div className="container account-dashboard">
        <Breadcrumbs items={[{label:'Իմ էջը'}]}/>
        <div className="dashboard-head">
          <div>
            <div className="eyebrow">Իմ OfficeStore</div>
            <h1>Բարի վերադարձ 👋</h1>
            <p>Սա account dashboard-ի ցուցադրական վիճակն է։</p>
          </div>
          <button className="btn btn-secondary" onClick={() => setDemoLogged(false)}>
            <Icon name="logout" size={17}/> Դուրս գալ demo-ից
          </button>
        </div>

        <div className="account-dashboard-grid">
          <aside className="account-nav">
            <button className="is-active"><Icon name="grid"/> Ամփոփում</button>
            <button><Icon name="package"/> Պատվերներ <span>12</span></button>
            <button><Icon name="heart"/> Նախընտրելիներ</button>
            <button><Icon name="location"/> Հասցեներ</button>
            <button><Icon name="user"/> Հաշվի տվյալներ</button>
          </aside>

          <main className="account-main">
            <div className="account-stat-grid">
              <div><small>Վերջին 30 օրը</small><strong>48,700 ֏</strong><span>Գնումներ</span></div>
              <div><small>Հաջող առաքումներ</small><strong>4</strong><span>Պատվեր</span></div>
              <div><small>Պահպանված</small><strong>8</strong><span>Ապրանք</span></div>
            </div>

            <section className="recent-order">
              <div className="section-mini-head">
                <div><h2>Վերջին պատվերը</h2><span>#OS-1042 · 5 ապրանք</span></div>
                <span className="status-pill">Առաքված է</span>
              </div>
              <div className="recent-order-items"><span>A4</span><span>💧</span><span>☕</span><span>+2</span></div>
              <div className="recent-order-bottom">
                <strong>26,480 ֏</strong>
                <button className="btn btn-primary">Կրկնել պատվերը</button>
              </div>
            </section>

            <section className="quick-actions">
              <h2>Արագ գործողություններ</h2>
              <div>
                <Link to="/shop"><Icon name="search"/><span><strong>Գտնել ապրանք</strong><small>Որոնել ամբողջ կատալոգում</small></span><Icon name="arrow"/></Link>
                <Link to="/delivery"><Icon name="truck"/><span><strong>Առաքման պայմաններ</strong><small>Ժամկետներ և գներ</small></span><Icon name="arrow"/></Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page account-auth-page">
      <div className="container">
        <Breadcrumbs items={[{label:'Իմ էջը'}]}/>

        <div className="account-shell">
          <section className={`account-benefit ${mode === 'register' ? `account-benefit--register ${registerType === 'corporate' ? 'account-benefit--corporate' : ''}` : 'account-benefit--login'}`} aria-labelledby="account-benefit-title">
            {mode === 'login' ? (
              <>
                <div className="account-benefit-top">
                  <div className="account-benefit-eyebrow"><span/> OfficeStore հաշիվ</div>
                  <h1 id="account-benefit-title">Ձեր գնումները՝ ավելի արագ և կազմակերպված</h1>
                  <p>Մուտք գործեք մեկ անգամ և պահեք պատվերների պատմությունը, հասցեները ու նախընտրած ապրանքները մեկ տեղում։</p>
                </div>

                <div className="account-benefit-list">
                  <span><i><Icon name="check" size={14}/></i> Կրկնել նախորդ պատվերը մեկ հպումով</span>
                  <span><i><Icon name="check" size={14}/></i> Հետևել պատվերի կարգավիճակին</span>
                  <span><i><Icon name="check" size={14}/></i> Պահպանել հաճախ օգտագործվող հասցեները</span>
                  <span><i><Icon name="check" size={14}/></i> Պահել wishlist-ը հաշվի մեջ</span>
                </div>

                <div className="account-access-panel">
                  <div className="account-access-head">
                    <span className="account-access-icon"><Icon name="user" size={17}/></span>
                    <div>
                      <small>Մուտք գործելուց հետո</small>
                      <strong>Ձեր անձնական OfficeStore տարածքը</strong>
                    </div>
                  </div>
                  <div className="account-access-grid">
                    <span><Icon name="package" size={15}/><b>Պատվերների պատմություն</b></span>
                    <span><Icon name="location" size={15}/><b>Պահպանված հասցեներ</b></span>
                    <span><Icon name="heart" size={15}/><b>Wishlist և նախընտրելիներ</b></span>
                  </div>
                </div>
              </>
            ) : registerType === 'corporate' ? (
              <>
                <div className="account-benefit-top">
                  <div className="account-benefit-eyebrow"><span/> OfficeStore Business</div>
                  <h1 id="account-benefit-title">Կորպորատիվ գնումները՝ մեկ կազմակերպված հաշվով</h1>
                  <p>Ստեղծեք կազմակերպության հաշիվ՝ պատվերների, առաքման հասցեների և հաշվարկային տվյալների կառավարումը մեկ տեղում պահելու համար։</p>
                </div>

                <div className="account-benefit-list account-benefit-list--register">
                  <span><i><Icon name="check" size={14}/></i> Կազմակերպության տվյալները՝ մեկ պրոֆիլում</span>
                  <span><i><Icon name="check" size={14}/></i> Պատվերների և առաքումների միասնական պատմություն</span>
                  <span><i><Icon name="check" size={14}/></i> Հարմար տվյալներ փաստաթղթավորման համար</span>
                </div>

                <div className="account-register-guide account-register-guide--business">
                  <div className="account-register-guide-head">
                    <span className="account-access-icon"><Icon name="building" size={17}/></span>
                    <div>
                      <small>Կորպորատիվ գրանցում</small>
                      <strong>3 քայլ՝ կազմակերպության հաշիվը պատրաստ է</strong>
                    </div>
                  </div>
                  <div className="account-register-steps">
                    <div><b>01</b><span>Կազմակերպություն և ՀՎՀՀ</span></div>
                    <div><b>02</b><span>Կոնտակտային տվյալներ</span></div>
                    <div><b>03</b><span>Հաշվի անվտանգություն</span></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="account-benefit-top">
                  <div className="account-benefit-eyebrow"><span/> Նոր OfficeStore հաշիվ</div>
                  <h1 id="account-benefit-title">Ստեղծեք հաշիվ՝ հաջորդ պատվերը ավելի արագ կատարելու համար</h1>
                  <p>Գրանցումը տևում է ընդամենը մի քանի քայլ, իսկ հետո հասցեները, պատվերներն ու նախընտրած ապրանքները միշտ հասանելի կլինեն մեկ տեղում։</p>
                </div>

                <div className="account-benefit-list account-benefit-list--register">
                  <span><i><Icon name="check" size={14}/></i> Ավելի արագ checkout՝ պահպանված տվյալներով</span>
                  <span><i><Icon name="check" size={14}/></i> Պատվերների պատմություն և կարգավիճակ</span>
                  <span><i><Icon name="check" size={14}/></i> Wishlist և հաճախ օգտագործվող հասցեներ</span>
                </div>

                <div className="account-register-guide">
                  <div className="account-register-guide-head">
                    <span className="account-access-icon"><Icon name="user" size={17}/></span>
                    <div>
                      <small>Գրանցումը պարզ է</small>
                      <strong>3 քայլ՝ ձեր հաշիվը պատրաստ է</strong>
                    </div>
                  </div>
                  <div className="account-register-steps">
                    <div><b>01</b><span>Անուն և կապ</span></div>
                    <div><b>02</b><span>Գաղտնաբառ</span></div>
                    <div><b>03</b><span>Պատրաստ է</span></div>
                  </div>
                </div>
              </>
            )}

            <div className="account-benefit-note">
              <Icon name="shield" size={16}/>
              <span>{mode === 'register' && registerType === 'corporate' ? 'Կազմակերպության և կոնտակտային տվյալները պահպանվում են անվտանգ և օգտագործվում են միայն հաշվի, պատվերների ու սպասարկման համար։' : mode === 'register' ? 'Ձեր տվյալները պահպանվում են անվտանգ և օգտագործվում են միայն հաշվի ու պատվերների սպասարկման համար։' : 'Ձեր հաշվի տվյալները օգտագործվում են միայն պատվերների և սպասարկման համար։'}</span>
            </div>
          </section>

          <section className="auth-card">
            <div className="auth-tabs" role="tablist" aria-label="Հաշվի գործողություններ">
              <button type="button" role="tab" aria-selected={mode === 'login'} className={mode==='login'?'is-active':''} onClick={() => setMode('login')}>Մուտք</button>
              <button type="button" role="tab" aria-selected={mode === 'register'} className={mode==='register'?'is-active':''} onClick={() => setMode('register')}>Գրանցվել</button>
            </div>

            {mode === 'login' ? (
              <form className="form-stack account-form" onSubmit={e => {e.preventDefault(); setDemoLogged(true);}}>
                <header className="auth-head">
                  <span className="auth-kicker">Վերադարձող հաճախորդ</span>
                  <h2>Բարի վերադարձ</h2>
                  <p>Մուտք գործեք՝ պատվերները, հասցեները և wishlist-ը կառավարելու համար։</p>
                </header>

                <label>
                  <span>Էլ․ հասցե կամ օգտվողի անուն</span>
                  <input required type="text" autoComplete="username" placeholder="name@example.com"/>
                </label>

                <label>
                  <span>Գաղտնաբառ</span>
                  <div className="input-icon-right">
                    <input required type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••"/>
                    <button type="button" className="password-toggle" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Թաքցնել գաղտնաբառը' : 'Ցույց տալ գաղտնաբառը'}>
                      <Icon name="eye" size={17}/>
                    </button>
                  </div>
                </label>

                <div className="auth-options">
                  <label className="remember-check"><input type="checkbox"/> <span>Հիշել ինձ</span></label>
                  <button type="button">Մոռացե՞լ եք գաղտնաբառը</button>
                </div>

                <button className="btn btn-primary btn-lg full-width auth-submit">Մուտք գործել</button>

                <div className="auth-divider"><span>կամ շարունակել</span></div>

                <button type="button" className="google-btn" onClick={() => setDemoLogged(true)}>
                  <GoogleMark/>
                  <span>Շարունակել Google-ով</span>
                </button>

                <p className="auth-secure-note"><Icon name="lock" size={13}/> Անվտանգ մուտք՝ ձեր տվյալները պաշտպանված են։</p>
                <button type="button" className="demo-login" onClick={() => setDemoLogged(true)}>Բացել dashboard demo-ն <Icon name="arrow" size={14}/></button>
              </form>
            ) : (
              <form className="form-stack account-form" onSubmit={e => {e.preventDefault(); setDemoLogged(true);}}>
                <header className="auth-head">
                  <span className="auth-kicker">{registerType === 'corporate' ? 'Կորպորատիվ հաճախորդ' : 'Նոր հաճախորդ'}</span>
                  <h2>{registerType === 'corporate' ? 'Ստեղծել բիզնես հաշիվ' : 'Ստեղծել հաշիվ'}</h2>
                  <p>{registerType === 'corporate' ? 'Լրացրեք կազմակերպության և հիմնական կոնտակտային տվյալները։' : 'Մի քանի տվյալ, որպեսզի հաջորդ գնումը լինի ավելի արագ և հարմար։'}</p>
                </header>

                <div className="account-type-switch" role="radiogroup" aria-label="Հաշվի տեսակ">
                  <button type="button" role="radio" aria-checked={registerType === 'personal'} className={registerType === 'personal' ? 'is-active' : ''} onClick={() => setRegisterType('personal')}>
                    <Icon name="user" size={16}/>
                    <span><strong>Անհատ</strong><small>Անձնական գնումների համար</small></span>
                  </button>
                  <button type="button" role="radio" aria-checked={registerType === 'corporate'} className={registerType === 'corporate' ? 'is-active' : ''} onClick={() => setRegisterType('corporate')}>
                    <Icon name="building" size={16}/>
                    <span><strong>Կորպորատիվ</strong><small>Կազմակերպությունների համար</small></span>
                  </button>
                </div>

                {registerType === 'corporate' ? (
                  <>
                    <div className="corporate-form-section">
                      <div className="corporate-form-section-head">
                        <span><Icon name="building" size={15}/></span>
                        <div><strong>Կազմակերպության տվյալներ</strong><small>Պարտադիր դաշտերը նշված են աստղանիշով</small></div>
                      </div>

                      <label><span>Կազմակերպության անվանում *</span><input required autoComplete="organization" placeholder="Օր.՝ «ABC Group» ՍՊԸ"/></label>

                      <div className="form-row">
                        <label><span>ՀՎՀՀ *</span><input required inputMode="numeric" autoComplete="off" placeholder="Օր.՝ 01234567"/></label>
                        <label><span>Իրավաբանական հասցե *</span><input required autoComplete="street-address" placeholder="Քաղաք, փողոց, շենք"/></label>
                      </div>
                    </div>

                    <div className="corporate-form-section">
                      <div className="corporate-form-section-head">
                        <span><Icon name="user" size={15}/></span>
                        <div><strong>Կոնտակտային անձ</strong><small>Մարդը, ում հետ կարող ենք կապ հաստատել պատվերների հարցերով</small></div>
                      </div>

                      <div className="form-row">
                        <label><span>Անուն *</span><input required autoComplete="given-name" placeholder="Անուն"/></label>
                        <label><span>Ազգանուն *</span><input required autoComplete="family-name" placeholder="Ազգանուն"/></label>
                      </div>

                      <div className="form-row">
                        <label><span>Պաշտոն</span><input autoComplete="organization-title" placeholder="Օր.՝ Office manager"/></label>
                        <label><span>Հեռախոս *</span><input required type="tel" autoComplete="tel" placeholder="0XX XX XX XX"/></label>
                      </div>

                      <label><span>Կորպորատիվ էլ․ հասցե *</span><input required type="email" autoComplete="email" placeholder="name@company.am"/></label>
                    </div>

                    <label><span>Գաղտնաբառ *</span><input required type="password" minLength="8" autoComplete="new-password" placeholder="Առնվազն 8 նիշ"/></label>
                  </>
                ) : (
                  <>
                    <div className="form-row">
                      <label><span>Անուն *</span><input required autoComplete="given-name" placeholder="Անուն"/></label>
                      <label><span>Ազգանուն *</span><input required autoComplete="family-name" placeholder="Ազգանուն"/></label>
                    </div>

                    <label><span>Էլ․ հասցե *</span><input required type="email" autoComplete="email" placeholder="name@example.com"/></label>
                    <label><span>Հեռախոս</span><input type="tel" autoComplete="tel" placeholder="0XX XX XX XX"/></label>
                    <label><span>Գաղտնաբառ *</span><input required type="password" minLength="8" autoComplete="new-password" placeholder="Առնվազն 8 նիշ"/></label>
                  </>
                )}

                <label className="terms-check">
                  <input required type="checkbox"/>
                  <span>Համաձայն եմ <Link to="/terms">օգտագործման պայմաններին</Link> և <Link to="/privacy">գաղտնիության քաղաքականությանը</Link>։</span>
                </label>

                <button className="btn btn-primary btn-lg full-width auth-submit">
                  {registerType === 'corporate' ? 'Ստեղծել կորպորատիվ հաշիվ' : 'Ստեղծել հաշիվ'}
                </button>

                {registerType === 'personal' && (
                  <>
                    <div className="auth-divider"><span>կամ գրանցվել</span></div>
                    <button type="button" className="google-btn" onClick={() => setDemoLogged(true)}>
                      <GoogleMark/>
                      <span>Շարունակել Google-ով</span>
                    </button>
                  </>
                )}
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
