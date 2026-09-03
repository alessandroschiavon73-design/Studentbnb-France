(function(){
  if(window.__STUDENTBNB_FR_CITY_VISUALS__)return;window.__STUDENTBNB_FR_CITY_VISUALS__=true;
  const file=name=>'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(name);
  const images={
    paris:file('Paris Skyline from La Seine - panoramio.jpg'),
    lyon:file('Lyon vue depuis fourviere.jpg'),
    toulouse:file('Toulouse Garonne panorama.jpg'),
    bordeaux:file('Panorama Place de la Bourse Bordeaux.jpg'),
    lille:file('Lille grand place pano.jpg'),
    nantes:file('Nantes - Place Graslin - 02.jpg'),
    rennes:'assets/img/city-rennes.webp',
    montpellier:file('Montpellier ecusson.jpg')
  };
  const st=document.createElement('style');st.id='studentbnb-fr-city-visuals';st.textContent='.city-hero{position:relative!important;height:clamp(410px,44vw,560px)!important;min-height:410px!important;overflow:hidden!important;color:#fff!important;background:#0F766E!important}.city-hero-bg{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;background-size:cover!important;background-repeat:no-repeat!important;background-position:center 46%!important}.city-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(9,18,24,.08) 12%,rgba(9,18,24,.24) 52%,rgba(9,18,24,.78) 100%);z-index:1;pointer-events:none}.city-hero>.container{position:relative!important;z-index:2!important;height:100%!important;display:flex!important;flex-direction:column!important;justify-content:flex-end!important;padding-top:42px!important;padding-bottom:46px!important}.city-hero h1{font-size:clamp(42px,6vw,72px)!important;line-height:.98!important;color:#fff!important;text-shadow:0 3px 18px rgba(0,0,0,.3)!important}.city-hero h2,.city-hero p,.city-hero .kicker{color:#fff!important;text-shadow:0 2px 12px rgba(0,0,0,.35)!important}@media(max-width:700px){.city-hero{height:430px!important;min-height:430px!important}.city-hero-bg{background-position:center center!important}.city-hero>.container{padding:28px 20px 32px!important}.city-hero h1{font-size:clamp(38px,12vw,52px)!important}}';document.head.appendChild(st);
  function slugFromHref(href){try{return new URL(href,location.href).searchParams.get('city')||''}catch(_){return''}}
  function apply(){
    document.querySelectorAll('.city-card').forEach(card=>{const slug=slugFromHref(card.getAttribute('href')||'');const src=images[slug];if(!src)return;const img=card.querySelector(':scope > img');if(img){img.src=src;img.removeAttribute('srcset');img.alt=(card.querySelector(':scope > strong')?.textContent||slug).trim();img.style.objectFit='cover';img.style.objectPosition='center';}});
    const slug=new URLSearchParams(location.search).get('city')||'';const src=images[slug];if(!src)return;const bg=document.querySelector('.city-hero-bg');if(bg){bg.style.backgroundImage='url("'+src.replace(/"/g,'%22')+'")';bg.setAttribute('role','img');bg.setAttribute('aria-label','Panorama de '+slug.replace(/-/g,' '));}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();window.addEventListener('load',apply);setTimeout(apply,180);
})();
