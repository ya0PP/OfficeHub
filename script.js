function revealAll(){var e=document.querySelectorAll('.reveal');for(var i=0;i<e.length;i++)e[i].classList.add('in');}
window.addEventListener('error',revealAll);

var CDN="https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/ru-ru/";
var CAT={"365":"Microsoft 365","2024":"Office 2024","2021":"Office 2021"};
var ITEMS=[
{c:"365",n:"Microsoft 365 ProPlus",d:"Полный пакет по подписке (Microsoft 365 Apps for enterprise) — всегда актуальные версии приложений.",a:["Word","Excel","PowerPoint","Outlook","OneNote","Access","OneDrive"],f:"O365ProPlusRetail.img",i:"365"},
{c:"2024",n:"Office 2024 Professional Plus",d:"Максимальный пакет разовой покупки: все основные приложения для работы и учёбы.",a:["Access","Excel","OneNote","Outlook","PowerPoint","Word","OneDrive"],f:"ProPlus2024Retail.img",i:"O"},
{c:"2024",n:"Office 2024 Home",d:"Домашний пакет для учёбы и повседневных задач. Без Outlook и Access.",a:["Excel","OneNote","PowerPoint","Word","OneDrive"],f:"Home2024Retail.img",i:"O"},
{c:"2024",n:"Microsoft Word 2024",d:"Текстовый процессор — отдельное приложение.",a:[],f:"Word2024Retail.img",i:"W"},
{c:"2024",n:"Microsoft PowerPoint 2024",d:"Презентации: слайды, анимация, переходы — отдельное приложение.",a:[],f:"PowerPoint2024Retail.img",i:"P"},
{c:"2024",n:"Microsoft Excel 2024",d:"Таблицы, формулы и анализ данных — отдельное приложение.",a:[],f:"Excel2024Retail.img",i:"E"},
{c:"2024",n:"Microsoft Outlook 2024",d:"Почта, календарь и контакты — отдельное приложение.",a:[],f:"Outlook2024Retail.img",i:"O"},
{c:"2024",n:"Microsoft Visio 2024",d:"Профессиональные схемы, блок-схемы и диаграммы.",a:[],f:"VisioPro2024Retail.img",i:"V"},
{c:"2024",n:"Microsoft Project 2024",d:"Управление проектами: диаграммы Ганта, ресурсы, сроки.",a:[],f:"ProjectPro2024Retail.img",i:"Pj"},
{c:"2021",n:"Office 2021 Professional Plus",d:"Максимальный пакет 2021 года, включая Publisher и Access.",a:["Access","Excel","OneNote","Outlook","PowerPoint","Publisher","Word","OneDrive"],f:"ProPlus2021Retail.img",i:"O"},
{c:"2021",n:"Office 2021 Home & Student",d:"Для дома и учёбы: базовые приложения без Outlook.",a:["Excel","OneNote","PowerPoint","Word","OneDrive"],f:"HomeStudent2021Retail.img",i:"O"},
{c:"2021",n:"Office 2021 Home & Business",d:"Для дома и малого бизнеса: добавлен Outlook.",a:["Excel","OneNote","Outlook","PowerPoint","Word","OneDrive"],f:"HomeBusiness2021Retail.img",i:"O"},
{c:"2021",n:"Microsoft Word 2021",d:"Текстовый процессор, версия 2021 года.",a:[],f:"Word2021Retail.img",i:"W"},
{c:"2021",n:"Microsoft PowerPoint 2021",d:"Редактор презентаций, версия 2021 года.",a:[],f:"PowerPoint2021Retail.img",i:"P"},
{c:"2021",n:"Microsoft Excel 2021",d:"Таблицы и расчёты, версия 2021 года.",a:[],f:"Excel2021Retail.img",i:"E"},
{c:"2021",n:"Microsoft Access 2021",d:"Создание и управление базами данных.",a:[],f:"Access2021Retail.img",i:"A"},
{c:"2021",n:"Microsoft Publisher 2021",d:"Вёрстка буклетов и публикаций. Поддержка приложения завершена в октябре 2026.",a:[],f:"Publisher2021Retail.img",i:"Pb"},
{c:"2021",n:"Microsoft Visio 2021",d:"Схемы и диаграммы, версия 2021 года.",a:[],f:"VisioPro2021Retail.img",i:"V"},
{c:"2021",n:"Microsoft Project 2021",d:"Управление проектами, версия 2021 года.",a:[],f:"ProjectPro2021Retail.img",i:"Pj"}];

var grid=document.getElementById("grid"),countEl=document.getElementById("count"),emptyEl=document.getElementById("empty"),
searchEl=document.getElementById("search"),prog=document.getElementById("progress"),toTop=document.getElementById("toTop"),
themeBtn=document.getElementById("themeToggle"),metaTheme=document.getElementById("metaTheme"),burger=document.getElementById("burger"),
nav=document.getElementById("nav"),toast=document.getElementById("toast");
var navLinks=[].slice.call(document.querySelectorAll(".nav a"));
var sections=[].slice.call(document.querySelectorAll("section[id]"));
var cat="all",q="";
var svgDown='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/></svg>';
var svgCopy='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>';
var LOGO_KEY={W:"word",E:"excel",P:"powerpoint",O:"outlook",V:"visio",Pj:"project",A:"access",Pb:"publisher"};
var LOGO_SYM={W:"i-word",E:"i-excel",P:"i-ppt",O:"i-out",V:"i-vis",Pj:"i-prj",A:"i-acc",Pb:"i-pub"};
var BRAND={office:1,m365:1};
var logoSrc={},logoWait={},logoBusy={};

function logoSpan(k,s,ex,vb){return '<span class="'+ex+' brand-logo'+(BRAND[k]?" is-brand":"")+'" data-logo="'+k+'"><svg viewBox="'+vb+'"><use href="#'+s+'"/></svg></span>';}
function logoSVG(it){
  if(it.c==="365")return logoSpan("m365","i-m365","app-logo","0 0 24 24");
  if(it.a.length)return logoSpan("office","i-office","app-logo","0 0 78.799 96");
  return logoSpan(LOGO_KEY[it.i]||"office",LOGO_SYM[it.i]||"i-office","app-logo","0 0 48 48");
}
function paint(sp,src){
  if(sp.getAttribute("data-painted"))return;
  sp.setAttribute("data-painted","1");
  var im=new Image();im.alt="";
  im.onload=function(){sp.appendChild(im);sp.classList.add("has-img");};
  im.src=src;
}
function attachLogos(scope){
  [].forEach.call(scope.querySelectorAll("[data-logo]"),function(sp){
    if(sp.getAttribute("data-painted"))return;
    var k=sp.getAttribute("data-logo");
    if(logoSrc[k]){paint(sp,logoSrc[k]);return;}
    (logoWait[k]=logoWait[k]||[]).push(sp);
    if(logoBusy[k])return;
    logoBusy[k]=1;
    var list=[k+".svg",k+".png",k+".webp",k+".jpg"],i=0;
    (function next(){
      if(i>=list.length)return;
      var p=new Image();
      p.onload=function(){
        logoSrc[k]=list[i];
        var wait=logoWait[k]||[];logoWait[k]=[];
        for(var j=0;j<wait.length;j++)paint(wait[j],list[i]);
      };
      p.onerror=function(){i++;next();};
      p.src=list[i];
    })();
  });
}
function cardHTML(it,idx){
  var url=CDN+it.f;
  var chips=it.a.length?it.a.map(function(x){return '<span class="chip">'+x+'</span>';}).join(""):'<span class="chip chip--dim">Отдельное приложение</span>';
  return '<article class="card reveal" style="--rd:'+(idx*35)+'ms"><div class="card-top">'+logoSVG(it)+
  '<div><div class="cat">'+CAT[it.c]+'</div><h3>'+it.n+'</h3></div></div><p>'+it.d+'</p><div class="chips">'+chips+
  '</div><div class="meta">Формат: .img · язык: русский · источник: Microsoft CDN</div><div class="card-foot">'+
  '<a class="btn btn--primary btn--sm" href="'+url+'" rel="noopener">'+svgDown+' Скачать .img</a>'+
  '<button class="icon-btn" data-copy="'+url+'" title="Скопировать ссылку">'+svgCopy+'</button></div></article>';
}

var light=true;try{light=localStorage.getItem("oh-theme")!=="dark";}catch(e){}
function setTheme(v,notify){
  light=v;document.documentElement.classList.toggle("light",light);
  themeBtn.setAttribute("aria-pressed",String(light));
  themeBtn.innerHTML=(light?"☀️":"🌙")+" <span>Тема: "+(light?"светлая":"тёмная")+"</span>";
  metaTheme.setAttribute("content",light?"#FFFFFF":"#0A1430");
  try{localStorage.setItem("oh-theme",light?"light":"dark");}catch(e){}
  if(notify)showToast(light?"Светлая тема ☀️":"Тёмная тема 🌙");
}
themeBtn.addEventListener("click",function(){setTheme(!light,true);});

var hasIO="IntersectionObserver" in window,revealIO=null;
if(hasIO){revealIO=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");revealIO.unobserve(en.target);}});},{rootMargin:"0px 0px -4% 0px",threshold:.05});}
function observeReveals(scope){
  var e=scope.querySelectorAll(".reveal:not(.in)");
  if(!hasIO){for(var i=0;i<e.length;i++)e[i].classList.add("in");return;}
  for(var j=0;j<e.length;j++)revealIO.observe(e[j]);
}
function headerOffset(){return document.querySelector(".header").offsetHeight+14;}
function setActive(id){for(var i=0;i<navLinks.length;i++)navLinks[i].classList.toggle("active",navLinks[i].getAttribute("href")==="#"+id);}
function updateSpy(){
  var y=(window.scrollY||0)+headerOffset()+40,cur=null;
  for(var i=0;i<sections.length;i++){if(sections[i].offsetTop<=y)cur=sections[i];}
  setActive(cur?cur.id:"");
}
var maxScroll=1;
function refreshMax(){var h=document.documentElement;maxScroll=Math.max(1,h.scrollHeight-h.clientHeight);}
function apply(){
  var list=ITEMS.filter(function(it){return (cat==="all"||it.c===cat)&&(it.n+" "+it.d+" "+it.a.join(" ")+" "+CAT[it.c]).toLowerCase().indexOf(q)!==-1;});
  grid.innerHTML=list.map(cardHTML).join("");
  countEl.textContent="Показано "+list.length+" из "+ITEMS.length;
  emptyEl.hidden=list.length>0;
  observeReveals(grid);attachLogos(grid);refreshMax();onScroll();
}
var tabs=document.querySelectorAll(".tab");
[].forEach.call(tabs,function(b){b.addEventListener("click",function(){[].forEach.call(tabs,function(x){x.classList.remove("active");});b.classList.add("active");cat=b.getAttribute("data-cat");apply();});});
searchEl.addEventListener("input",function(){q=searchEl.value.trim().toLowerCase();apply();});
var toastTimer;
function showToast(m){toast.textContent=m;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(function(){toast.classList.remove("show");},2200);}
grid.addEventListener("click",function(e){
  var b=e.target.closest?e.target.closest("[data-copy]"):null;if(!b)return;
  var t=b.getAttribute("data-copy");
  function fb(){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove();showToast("Ссылка скопирована ✓");}
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(function(){showToast("Ссылка скопирована ✓");}).catch(fb);else fb();
});
burger.addEventListener("click",function(){var o=nav.classList.toggle("open");burger.setAttribute("aria-expanded",o);burger.textContent=o?"✕":"☰";});
[].forEach.call(document.querySelectorAll(".mini-grid,.act-grid,.choose,.timeline,.steps,.faq"),function(g){
  [].forEach.call(g.children,function(c,i){if(c.classList.contains("reveal"))c.style.setProperty("--rd",(i*55)+"ms");});
});
var ticking=false;
function onScroll(){
  var y=window.scrollY||document.documentElement.scrollTop;
  prog.style.transform="scaleX("+Math.min(1,y/maxScroll)+")";
  toTop.classList.toggle("show",y>600);
  updateSpy();artTarget();ticking=false;
}
window.addEventListener("scroll",function(){if(!ticking){requestAnimationFrame(onScroll);ticking=true;}},{passive:true});
window.addEventListener("resize",function(){refreshMax();onScroll();},{passive:true});
window.addEventListener("load",function(){refreshMax();onScroll();});

var boxes=[].slice.call(document.querySelectorAll(".art-box"));
var mx=0,my=0,sy=0,cx=0,cy=0,cs=0,artRAF=null;
function artTarget(){sy=Math.min((window.scrollY||0)*0.16,(window.innerHeight||800)*1.2);artKick();}
function artKick(){if(!artRAF&&boxes.length)artRAF=requestAnimationFrame(artStep);}
function artStep(){
  cx+=(mx-cx)*.07;cy+=(my-cy)*.07;cs+=(sy-cs)*.12;
  for(var i=0;i<boxes.length;i++){
    var d=parseFloat(boxes[i].getAttribute("data-depth"))||20,dir=i%2?-1:1;
    boxes[i].style.transform="translate3d("+(cx*d*dir).toFixed(2)+"px,"+(cy*d-cs).toFixed(2)+"px,0)";
  }
  if(Math.abs(mx-cx)>.001||Math.abs(my-cy)>.001||Math.abs(sy-cs)>.05)artRAF=requestAnimationFrame(artStep);else artRAF=null;
}
if(!window.matchMedia||window.matchMedia("(pointer: fine)").matches){
  window.addEventListener("mousemove",function(e){mx=(e.clientX/window.innerWidth-.5)*2;my=(e.clientY/window.innerHeight-.5)*2;artKick();},{passive:true});
}
var scrollRAF=null;
function smoothTo(target,dur,done){
  if(scrollRAF)cancelAnimationFrame(scrollRAF);
  var start=window.scrollY,diff=target-start;
  if(Math.abs(diff)<2){if(done)done();return;}
  var t0=performance.now();
  function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;}
  function step(now){var p=Math.min(1,(now-t0)/dur);window.scrollTo(0,start+diff*ease(p));if(p<1)scrollRAF=requestAnimationFrame(step);else{scrollRAF=null;if(done)done();}}
  scrollRAF=requestAnimationFrame(step);
}
["wheel","touchstart","keydown"].forEach(function(ev){window.addEventListener(ev,function(){if(scrollRAF){cancelAnimationFrame(scrollRAF);scrollRAF=null;}},{passive:true});});
function flash(el){if(!el||el.tagName!=="SECTION")return;el.classList.remove("landed");void el.offsetWidth;el.classList.add("landed");setTimeout(function(){el.classList.remove("landed");},1400);}
[].forEach.call(document.querySelectorAll('a[href^="#"]'),function(link){
  link.addEventListener("click",function(e){
    var id=link.getAttribute("href");if(id.length<2)return;
    var el=document.querySelector(id);if(!el)return;
    e.preventDefault();
    if(el.tagName==="SECTION")setActive(el.id);
    smoothTo(Math.max(0,el.getBoundingClientRect().top+window.scrollY-headerOffset()),850,function(){flash(el);updateSpy();});
    history.replaceState(null,"",id);
    nav.classList.remove("open");burger.textContent="☰";burger.setAttribute("aria-expanded","false");
  });
});
toTop.addEventListener("click",function(){smoothTo(0,750);});
document.getElementById("year").textContent=new Date().getFullYear();
try{setTheme(light,false);observeReveals(document);attachLogos(document);apply();refreshMax();onScroll();}catch(err){revealAll();}
setTimeout(function(){if(!document.querySelector(".reveal.in"))revealAll();},1200);