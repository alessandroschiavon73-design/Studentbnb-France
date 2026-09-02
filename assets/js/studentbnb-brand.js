document.addEventListener('DOMContentLoaded',()=>{
  const base='https://studentbnb.fr/';

  const removeHeaderFaqAndContacts=()=>{
    document.querySelectorAll('.main-nav a').forEach(link=>{
      const href=(link.getAttribute('href')||'').toLowerCase();
      const label=(link.textContent||'').trim().toLowerCase();
      if(/#(?:faq|contact|contacts)$/.test(href)||['faq','contact'].includes(label)) link.remove();
    });
  };

  const replaceBrand=()=>{
    const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
    while((n=w.nextNode())) if(!n.parentElement?.closest('.dual-portal-footer')) n.nodeValue=n.nodeValue.replaceAll('CasaStudent','StudentBnB');
    document.querySelectorAll('[aria-label]').forEach(e=>{if(!e.closest('.dual-portal-footer'))e.setAttribute('aria-label',e.getAttribute('aria-label').replaceAll('CasaStudent','StudentBnB'))});
    document.querySelectorAll('.brand').forEach(b=>{
      const labels=[...b.children].filter(e=>e.tagName==='SPAN'&&!e.classList.contains('brand-icon'));
      const l=labels[labels.length-1];if(l)l.innerHTML='Student<strong>BnB</strong><small>Teste avant de choisir</small>';
    });
  };

  const adaptRequestPage=()=>{
    const form=document.querySelector('#student-request-form');if(!form)return;
    const budget=document.querySelector('label[for="request-budget"]');if(budget)budget.textContent='Budget maximum pour le séjour (EUR) *';
    const grid=form.querySelector('.form-grid.three');
    if(grid&&!document.querySelector('#request-duration')){
      const field=document.createElement('div');field.className='field';field.innerHTML='<label for="request-duration">Durée du séjour *</label><select id="request-duration" name="duration" required><option value="1 semaine">1 semaine</option><option value="2 semaines">2 semaines</option><option value="1 mois">1 mois</option></select>';grid.appendChild(field);
    }
    const heading=document.querySelector('.form-heading h1');if(heading)heading.textContent='Trouve un logement et des colocataires pour ton séjour test';
    const intro=document.querySelector('.form-heading p');if(intro)intro.textContent='Indique la ville, ton budget et si tu souhaites rester une semaine, deux semaines ou un mois.';
  };

  const money=value=>new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value||0);

  const adaptPublishPage=()=>{
    const form=document.querySelector('#publish-form');if(!form)return;
    const heading=document.querySelector('.form-heading h1');if(heading)heading.textContent='Publie un séjour StudentBnB';
    const intro=document.querySelector('.form-heading p');if(intro)intro.textContent='Propose le logement pour une période test d’une semaine, deux semaines ou un mois, avec des prix et des règles clairs.';
    const price=document.querySelector('#price');
    const priceLabel=document.querySelector('label[for="price"]');if(priceLabel)priceLabel.textContent='Loyer mensuel de référence (EUR) *';
    const minLabel=document.querySelector('label[for="minimumStay"]');if(minLabel)minLabel.textContent='Durée disponible *';
    const minimum=document.querySelector('#minimumStay');if(minimum){minimum.placeholder='1 semaine / 2 semaines / 1 mois';minimum.value=minimum.value||'1 semaine / 2 semaines / 1 mois';}

    if(price&&!document.querySelector('#studentbnb-pricing-panel')){
      const box=document.createElement('div');box.id='studentbnb-pricing-panel';box.className='studentbnb-crosspublish';box.style.cssText='margin:22px 0 18px;padding:18px;border:1px solid #9fd8d2;border-radius:14px;background:#f0fbf9';
      box.innerHTML='<h3 style="margin-top:0">Tarifs StudentBnB</h3><p>Définis le prix pour 1 semaine, 2 semaines et 1 mois. Le calcul part du loyer mensuel de référence avec une majoration modifiable.</p><div class="form-grid three"><div class="field"><label for="studentbnb-uplift">Majoration</label><select id="studentbnb-uplift"><option value="20">+20%</option><option value="25" selected>+25% recommandé</option><option value="30">+30%</option></select></div><div class="field"><label for="studentbnb-price-7">7 jours (EUR) *</label><input id="studentbnb-price-7" name="studentbnbPrice7" type="number" min="1" required></div><div class="field"><label for="studentbnb-price-14">14 jours (EUR) *</label><input id="studentbnb-price-14" name="studentbnbPrice14" type="number" min="1" required></div><div class="field"><label for="studentbnb-price-30">30 jours (EUR) *</label><input id="studentbnb-price-30" name="studentbnbPrice30" type="number" min="1" required></div></div><p id="studentbnb-price-summary" class="micro-note" style="margin-top:8px"></p>';
      price.closest('.form-grid')?.after(box);
      const uplift=box.querySelector('#studentbnb-uplift'),p7=box.querySelector('#studentbnb-price-7'),p14=box.querySelector('#studentbnb-price-14'),p30=box.querySelector('#studentbnb-price-30'),summary=box.querySelector('#studentbnb-price-summary');
      const calc=()=>{const monthly=Number(price.value||0),pct=Number(uplift.value||25);if(!monthly){summary.textContent='Indique d’abord le loyer mensuel de référence.';return;}const month=Math.round(monthly*(1+pct/100)),v7=Math.round(month/4),v14=Math.round(month/2);if(!p7.dataset.edited)p7.value=v7;if(!p14.dataset.edited)p14.value=v14;if(!p30.dataset.edited)p30.value=month;summary.textContent=`Référence ${money(monthly)} → StudentBnB +${pct}% : ${money(v7)} / 7 jours, ${money(v14)} / 14 jours, ${money(month)} / 30 jours.`;};
      price.addEventListener('input',calc);uplift.addEventListener('change',()=>{[p7,p14,p30].forEach(x=>delete x.dataset.edited);calc()});[p7,p14,p30].forEach(x=>x.addEventListener('input',()=>x.dataset.edited='1'));calc();
    }
  };

  const adaptSolidarityPage=()=>{
    if(!/habitat-solidaire\.html$/i.test(location.pathname))return;
    const heading=document.querySelector('main h1');if(heading)heading.textContent='Habitat solidaire temporaire';
    const p=[...document.querySelectorAll('main p')].find(x=>/personne|étudiant|logement/i.test(x.textContent||''));
    if(p)p.textContent='StudentBnB met en relation des personnes disposant d’une chambre libre et des étudiants intéressés par une cohabitation temporaire, claire et respectueuse. Le loyer réduit et toute petite aide éventuelle sont convenus à l’avance avec des limites précises.';
  };

  replaceBrand();removeHeaderFaqAndContacts();adaptRequestPage();adaptPublishPage();adaptSolidarityPage();

  const hero=document.querySelector('.home-hero .hero-copy');if(hero){document.title='StudentBnB — Teste avant de choisir';const m=document.querySelector('meta[name="description"]');if(m)m.content='Trouve un logement et des colocataires, reste une semaine, deux semaines ou un mois, puis décide si tu veux continuer.';const h=hero.querySelector('h1'),p=hero.querySelector(':scope > p');hero.querySelectorAll('.studentbnb-tagline,.studentbnb-duration-options').forEach(el=>el.remove());if(h)h.innerHTML='D’abord les personnes,<br><span>ensuite la chambre.</span>';if(p){p.classList.add('studentbnb-concept');p.textContent='Une semaine, deux semaines ou un mois pour connaître le logement et les personnes avant de décider.';}}

  let c=document.querySelector('link[rel="canonical"]');if(!c){c=document.createElement('link');c.rel='canonical';document.head.appendChild(c)}c.href=base+(location.pathname==='/'?'':location.pathname.replace(/^\//,''))+location.search;
  const schema=document.querySelector('#studentbnb-website-schema');if(schema)schema.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebSite',name:'StudentBnB',url:base,inLanguage:'fr-FR'});
  const og=document.querySelector('meta[property="og:site_name"]');if(og)og.content='StudentBnB — Teste avant de choisir';
  const links=document.querySelector('.footer-international .footer-country-links');if(links)links.innerHTML='<a href="https://studentbnb.it/">🇮🇹 Italia</a><a href="https://studentbnb.es/">🇪🇸 España</a><a href="https://studentbnb.fr/" aria-current="page">🇫🇷 France</a><a href="https://student-bnb.de/">🇩🇪 Deutschland</a><a href="https://studentbnb.pl/">🇵🇱 Polska</a><a href="https://studentbnb.pt/">🇵🇹 Portugal</a>';
  const intl=document.querySelector('.footer-international > strong');if(intl)intl.textContent='Pour les séjours plus longs : CasaStudent';const copy=document.querySelector('.footer-bottom span:first-child');if(copy)copy.textContent='© 2026 StudentBnB';const login=document.querySelector('#login-title');if(login)login.textContent='Se connecter à StudentBnB';
  const f=document.querySelector('.site-footer .container')||document.querySelector('footer');if(f&&!f.querySelector('.casastudent-family')){const b=document.createElement('div');b.className='casastudent-family';b.innerHTML='StudentBnB est dédié aux séjours temporaires au sein de la communauté étudiante. Pour un logement plus durable, consultez <a href="https://casastudent.fr/">CasaStudent ↗</a>.';f.appendChild(b)}
});
