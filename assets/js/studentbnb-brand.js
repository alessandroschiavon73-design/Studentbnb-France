document.addEventListener('DOMContentLoaded',()=>{
  const hero=document.querySelector('.home-hero .hero-copy');
  const brand=document.querySelector('.site-header .brand');if(brand)brand.setAttribute('aria-label','StudentBnB home');
  if(hero){
    document.title='StudentBnB — Logement étudiant temporaire | 1 semaine, 2 semaines ou 1 mois';
    const meta=document.querySelector('meta[name="description"]');if(meta)meta.setAttribute('content','Logement étudiant temporaire en résidence, colocation ou appartement étudiant. Trouvez une chambre pour une semaine, deux semaines ou un mois pour Erasmus, stage, cours ou séjour universitaire court.');
    const h=hero.querySelector('h1'),p=hero.querySelector(':scope > p');hero.querySelectorAll('.studentbnb-tagline,.studentbnb-duration-options').forEach(el=>el.remove());
    if(h){h.innerHTML='Vivez quelque temps au cœur de la <span>vie étudiante.</span>';const t=document.createElement('div');t.className='studentbnb-tagline';t.textContent='Votre séjour temporaire, entre étudiants.';h.before(t);}
    if(p){p.classList.add('studentbnb-concept');p.textContent='Trouvez une chambre en résidence étudiante, dans une colocation ou un appartement étudiant pour Erasmus, un stage, des cours, des examens ou quelques semaines dans une autre ville.';const d=document.createElement('div');d.className='studentbnb-duration-options';d.innerHTML='<strong>1 semaine</strong><span>•</span><strong>2 semaines</strong><span>•</span><strong>1 mois</strong>';p.after(d);}
    const sh=hero.querySelector('.search-card h2');if(sh)sh.textContent='Où souhaitez-vous séjourner ?';
  }
  const intl=document.querySelector('.footer-international > strong');if(intl)intl.textContent='Pour un séjour plus long : CasaStudent';
  const copy=document.querySelector('.footer-bottom span:first-child');if(copy)copy.textContent='© 2026 StudentBnB';
  const login=document.querySelector('#login-title');if(login)login.textContent='Se connecter à StudentBnB';
  const f=document.querySelector('.site-footer .container')||document.querySelector('footer');if(f&&!f.querySelector('.casastudent-family')){const b=document.createElement('div');b.className='casastudent-family';b.innerHTML='StudentBnB est dédié aux séjours temporaires au sein de la communauté étudiante. Pour un logement plus durable, visitez <a href="https://casastudent.fr/">CasaStudent ↗</a>.';f.appendChild(b)}
});
