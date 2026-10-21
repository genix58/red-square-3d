(function(){
"use strict";

/* ---------- Объекты (маршрут с севера на юг). Метры: x — поперёк площади (запад −, Кремль), z — вдоль (север −) ---------- */
var LM=[
  {id:'museum',short:'Исторический музей',name:'Государственный исторический музей',year:'1875–1881',meta:'архитектор Владимир Шервуд',
   text:'Краснокирпичное здание в русском стиле замыкает площадь с севера. Музей принял первых посетителей в 1883 году. Шатровые башни с позолоченными орлами перекликаются с башнями Кремля.',
   size:'Высота башен до 46 м',t:[3,20,-200],c:[62,30,-110]},
  {id:'gate',short:'Воскресенские ворота',name:'Воскресенские ворота',year:'1680 · 1995',meta:'с Иверской часовней',
   text:'Двойные ворота с двумя шатровыми башнями ведут с площади к Манежной площади и Тверской. Иверская часовня стоит снаружи, между двумя арками проездов. Ворота снесли в 1931 году и восстановили в 1994–1995 годах.',
   size:'Две арки проезда · башни около 33 м',t:[58,9,-200],c:[66,9,-146]},
  {id:'kazan',short:'Казанский собор',name:'Казанский собор',year:'1636 · 1993',meta:'на углу Никольской улицы',
   text:'Небольшой храм в честь Казанской иконы Божией Матери. Разрушен в 1936 году и восстановлен в 1990–1993 годах по обмерам архитектора Петра Барановского.',
   size:'Высота с крестом около 28 м',t:[95,12,-161],c:[48,18,-112]},
  {id:'gum',short:'ГУМ',name:'ГУМ, Верхние торговые ряды',year:'1890–1893',meta:'архитектор Александр Померанцев',
   text:'Фасад длиной 242 метра занимает всю восточную сторону площади. Стеклянные своды над торговыми линиями рассчитал инженер Владимир Шухов. Вечером контуры фасада горят гирляндами.',
   size:'Фасад 242 м · глубина 88 м',t:[80,12,0],c:[-8,40,-118]},
  {id:'kremlin',short:'Кремлёвская стена',name:'Кремлёвская стена',year:'1485–1495',meta:'стена и башни, строители — итальянские мастера',
   text:'Кирпичная стена общей длиной 2235 метров с зубцами в форме ласточкина хвоста, в каждом зубце бойница. На Красную площадь выходят Угловая Арсенальная, Никольская, Сенатская, Спасская, Царская, Набатная, Константино-Еленинская и Беклемишевская башни.',
   size:'Стена до 19 м · Никольская 70 м',t:[-40,22,-40],c:[50,75,90]},
  {id:'mausoleum',short:'Мавзолей',name:'Мавзолей Ленина',year:'1929–1930',meta:'архитектор Алексей Щусев',
   text:'Ступенчатая пирамида из красного гранита, лабрадорита и чёрного габбро. Первый, деревянный мавзолей появился в 1924 году, каменный построен на его месте. По бокам вдоль стены стоят гостевые трибуны и голубые ели.',
   size:'Длина фасада 24 м · высота 12 м',t:[-26,6,0],c:[20,13,30]},
  {id:'spasskaya',short:'Спасская башня',name:'Спасская башня',year:'1491',meta:'Пьетро Антонио Солари · шатёр 1624–1625',
   text:'Главная проездная башня Кремля. В XVII веке Бажен Огурцов и Христофор Галовей надстроили шатёр и установили часы. Нынешний механизм курантов сделан в 1851–1852 годах, рубиновая звезда горит с 1937 года. Стрелки на модели показывают текущее московское время.',
   size:'Высота 71 м · циферблат 6,12 м',t:[-40,40,125],c:[34,30,68]},
  {id:'lobnoe',short:'Лобное место',name:'Лобное место',year:'XVI век',meta:'каменное — 1786, Матвей Казаков',
   text:'Круглый каменный помост, с которого объявляли царские указы и проводили церковные церемонии. Вопреки легенде, казни здесь проходили редко.',
   size:'Диаметр 13 м',t:[5,1,170],c:[26,11,150]},
  {id:'minin',short:'Минин и Пожарский',name:'Памятник Минину и Пожарскому',year:'1818',meta:'скульптор Иван Мартос',
   text:'Первый скульптурный памятник Москвы, поставлен в честь освобождения города в 1612 году. Сначала стоял в центре площади, в 1931 году перенесён к собору Василия Блаженного.',
   size:'Высота около 8,8 м',t:[28,5,184],c:[9,7,171]},
  {id:'basil',short:'Василий Блаженный',name:'Собор Василия Блаженного',year:'1555–1561',meta:'Покровский собор на Рву · зодчие Барма и Постник',
   text:'Построен по приказу Ивана Грозного в честь взятия Казани. Девять храмов на одном основании: восемь глав вокруг центрального шатра, у каждой свой узор — спирали, ромбы и зигзаги.',
   size:'Высота 65 м',t:[30,24,218],c:[-28,24,134]}
];
var IDX={};LM.forEach(function(l,i){IDX[l.id]=i;});
var DEF={t:[55,0,25],c:[430,330,-400]};
var EYE={t:[30,22,218],c:[22,1.7,-145]};

/* ---------- Список объектов на странице ---------- */
var list=document.getElementById('objList'),chips=document.getElementById('chips');
LM.forEach(function(l){
  var li=document.createElement('li');li.className='obj';
  li.innerHTML='<p class="obj-year mono">'+l.year+'</p><div><h3>'+l.name+'</h3><p class="obj-meta">'+l.meta+'</p></div><p class="obj-text">'+l.text+'</p><button class="obj-btn" type="button" data-lm="'+l.id+'">На модели →</button>';
  list.appendChild(li);
  var b=document.createElement('button');b.className='chip';b.type='button';b.textContent=l.short;b.dataset.lm=l.id;b.setAttribute('aria-pressed','false');
  chips.appendChild(b);
});
list.addEventListener('click',function(e){
  var b=e.target.closest('[data-lm]');if(!b)return;
  document.getElementById('model').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  document.dispatchEvent(new CustomEvent('rs:select',{detail:b.dataset.lm}));
});

/* ---------- 3D ---------- */
var viewer=document.getElementById('viewer'),canvas=document.getElementById('scene'),msg=document.getElementById('vMsg');
function fail(t){msg.hidden=false;msg.textContent=t;}
if(!window.THREE||!THREE.OrbitControls||!THREE.BufferGeometryUtils){fail('Не удалось загрузить 3D-движок. Проверьте подключение к интернету и обновите страницу.');return;}
var renderer;
try{renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,powerPreference:'high-performance'});}
catch(e){fail('Ваш браузер не поддерживает WebGL, поэтому 3D-модель недоступна.');return;}
setTimeout(init,30);

function init(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var small=Math.min(screen.width,screen.height)<700;
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,small?1.5:2));
renderer.outputEncoding=THREE.sRGBEncoding;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.setClearColor(0x0a0909,1);
var ANISO=Math.min(8,renderer.capabilities.getMaxAnisotropy());
var scene=new THREE.Scene(),V3=THREE.Vector3;
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
var RND=rng(1493);

/* ===== Процедурные текстуры: цвет, рельеф, свечение ===== */
function T(c,srgb){var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;if(srgb!==false)t.encoding=THREE.sRGBEncoding;t.anisotropy=ANISO;return t;}
function speck(g,w,h,n,cols,s){for(var i=0;i<n;i++){g.fillStyle=cols[Math.floor(RND()*cols.length)];var z=(s||1)*(1+RND()*2);g.fillRect(RND()*w,RND()*h,z,z);}}
function hsl(h,s,l){return 'hsl('+h+','+s+'%,'+l+'%)';}
function grey(l){return 'hsl(0,0%,'+l+'%)';}
function canvas2d(w,h,fn){var c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);return c;}

// «Фасад» размером wm×hm метров: рисуем сразу цвет (g), высоту для рельефа (h) и ночное свечение (e)
function Fac(wm,hm,ppm){
  var W=Math.round(wm*ppm),H=Math.round(hm*ppm),cv=[0,1,2].map(function(){var c=document.createElement('canvas');c.width=W;c.height=H;return c;});
  var g=cv[0].getContext('2d'),h=cv[1].getContext('2d'),e=cv[2].getContext('2d');
  h.fillStyle=grey(50);h.fillRect(0,0,W,H);e.fillStyle='#000';e.fillRect(0,0,W,H);
  function X(x){return x*ppm;}function Y(y){return (hm-y)*ppm;}
  function path(c,x0,y0,x1,y1,arc){c.beginPath();if(!arc){c.rect(X(x0),Y(y1),(x1-x0)*ppm,(y1-y0)*ppm);return;}
    var r=(x1-x0)/2;c.moveTo(X(x0),Y(y0));c.lineTo(X(x0),Y(y1-r));c.arc(X(x0+r),Y(y1-r),r*ppm,Math.PI,0);c.lineTo(X(x1),Y(y0));c.closePath();}
  var F={g:g,h:h,e:e,W:W,H:H,X:X,Y:Y,ppm:ppm,
    shape:function(x0,y0,x1,y1,col,ht,em,arc){
      if(col){g.fillStyle=col;path(g,x0,y0,x1,y1,arc);g.fill();}
      if(ht!=null){h.fillStyle=grey(ht);path(h,x0,y0,x1,y1,arc);h.fill();}
      if(em){e.fillStyle=em;path(e,x0,y0,x1,y1,arc);e.fill();}},
    R:function(x0,y0,x1,y1,col,ht,em){F.shape(x0,y0,x1,y1,col,ht,em,false);},
    A:function(x0,y0,x1,y1,col,ht,em){F.shape(x0,y0,x1,y1,col,ht,em,true);},
    fill:function(col){g.fillStyle=col;g.fillRect(0,0,W,H);},
    noise:function(n,cols,s){speck(g,W,H,n,cols,s);},
    bricks:function(hu,sa,li,x0,y0,x1,y1){
      x0=x0||0;y0=y0||0;x1=x1==null?wm:x1;y1=y1==null?hm:y1;
      var bw=0.26*ppm,bh=0.09*ppm,a=X(x0),b=X(x1),top=Y(y1),bot=Y(y0);
      [g,h].forEach(function(c){c.save();c.beginPath();c.rect(a,top,b-a,bot-top);c.clip();});
      g.fillStyle=hsl(hu,sa*0.35,li+20);g.fillRect(a,top,b-a,bot-top);h.fillStyle=grey(34);h.fillRect(a,top,b-a,bot-top);
      for(var r=0,y=bot-bh;y>top-bh;y-=bh,r++){var off=(r%2)*bw/2;for(var x=a-bw+off;x<b;x+=bw){
        g.fillStyle=hsl(hu+RND()*8-4,sa+RND()*12-6,li+RND()*10-5);g.fillRect(x+1,y+1,bw-2,bh-1.5);
        h.fillStyle=grey(52+RND()*10);h.fillRect(x+1,y+1,bw-2,bh-1.5);}}
      g.restore();h.restore();},
    win:function(x0,y0,x1,y1,o){o=o||{};var f=o.f==null?0.22:o.f,arc=!!o.arc;
      if(o.frame!==false)F.shape(x0-f,y0-f,x1+f,y1+f,o.frame||'#ece6d8',82,null,arc);
      F.shape(x0,y0,x1,y1,o.glass||'#25303a',10,o.lit||null,arc);
      var sp=arc?(x1-x0)/2:0,mx=(x0+x1)/2;g.fillStyle='rgba(230,228,220,.6)';
      g.fillRect(X(mx)-1,Y(y1-sp),2,(y1-sp-y0)*ppm);g.fillRect(X(x0),Y(y0+(y1-sp-y0)*0.66),(x1-x0)*ppm,2);},
    tex:function(){return {map:T(cv[0]),bump:T(cv[1],false),em:T(cv[2])};}
  };
  return F;
}

var FLOOD=[];
// Патч шейдера: затенение у земли (ao) и режим фокуса — uDim уводит цвет в ночные тона, uLift подсвечивает выбранный объект
function patch(m,ao,U){
  m.onBeforeCompile=function(s){
    s.uniforms.uDim=U.dim;s.uniforms.uLift=U.lift;
    var v=s.vertexShader,f=s.fragmentShader;
    if(ao){v='varying float vGY;\n'+v.replace('#include <project_vertex>','#include <project_vertex>\n vGY=(modelMatrix*vec4(transformed,1.0)).y;');f='varying float vGY;\n'+f;}
    f='uniform float uDim;\nuniform float uLift;\n'+f.replace('#include <tonemapping_fragment>',
      (ao?'gl_FragColor.rgb*=mix(0.52,1.0,smoothstep(0.0,4.5,vGY));\n':'')+
      'gl_FragColor.rgb*=1.0+0.35*uLift;\n'+
      'float lumF=dot(gl_FragColor.rgb,vec3(0.299,0.587,0.114));\n'+
      'gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(lumF)*vec3(0.16,0.2,0.32),uDim);\n#include <tonemapping_fragment>');
    s.vertexShader=v;s.fragmentShader=f;
  };
  m.customProgramCacheKey=function(){return ao?'rs-ao':'rs';};
  m.needsUpdate=true;
}
function M(o,su,sv,opt){
  opt=opt||{};var m=new THREE.MeshStandardMaterial(o);m.userData.su=su||4;m.userData.sv=sv||su||4;
  if(!o.metalness||o.metalness<0.5)m.envMapIntensity=0.5;
  if(opt.em){m.emissive=new THREE.Color(opt.emColor||0xffffff);m.emissiveMap=opt.em;m.emissiveIntensity=0;FLOOD.push({m:m,n:opt.n||1});}
  else if(opt.glow){m.emissive=new THREE.Color(opt.glow);m.emissiveIntensity=0;FLOOD.push({m:m,n:opt.n||0.2});}
  m.userData.ao=opt.ao!==false;
  return m;
}
function facMat(F,su,sv,o,opt){var t=F.tex();o=o||{};o.map=t.map;o.bumpMap=t.bump;if(o.bumpScale==null)o.bumpScale=0.07;if(o.roughness==null)o.roughness=0.85;opt=opt||{};if(opt.lit)opt.em=t.em;return M(o,su,sv,opt);}

// кирпич Кремля: 4×4 м
var brickF=Fac(4,4,256);brickF.bricks(4,58,31);brickF.noise(9000,['rgba(0,0,0,.12)','rgba(255,225,205,.06)','rgba(50,15,10,.15)']);
var brickT=brickF.tex();
// белый камень: 3×3 м, блоки 0,75 м
var stoneF=Fac(3,3,128);stoneF.fill('#e6e0d2');stoneF.noise(5000,['rgba(0,0,0,.05)','rgba(255,255,255,.12)','rgba(140,120,90,.07)']);
for(var sy=0;sy<4;sy++){stoneF.R(0,sy*0.75,3,sy*0.75+0.02,'rgba(110,100,85,.35)',30);for(var sx=0;sx<3;sx++)stoneF.R(sx+(sy%2)*0.5,sy*0.75,sx+(sy%2)*0.5+0.02,sy*0.75+0.75,'rgba(110,100,85,.3)',30);}
// брусчатка: 8×8 м, камни ~12 см, светлые полосы гранита через 8 м
var paveF=Fac(8,8,128);(function(){var R=rng(42),g=paveF.g,h=paveF.h,W=paveF.W;g.fillStyle='#1b1b1e';g.fillRect(0,0,W,W);h.fillStyle=grey(18);h.fillRect(0,0,W,W);
  for(var y=0;y<W;y+=16){var x=0,band=y<32;while(x<W){var sw=12+Math.floor(R()*12);if(W-x-sw<10)sw=W-x;
    var l=band?52+R()*10:25+R()*15;g.fillStyle=band?hsl(30,6,l):hsl(210+R()*40,3+R()*8,l);g.fillRect(x+1.5,y+1.5,sw-3,13);
    h.fillStyle=grey(55+R()*35);h.fillRect(x+2,y+2,sw-4,12);g.fillStyle='rgba(255,255,255,.06)';g.fillRect(x+2,y+2,sw-4,3);x+=sw;}}
  speck(g,W,W,9000,['rgba(0,0,0,.2)','rgba(255,255,255,.05)']);})();
// гранитные плиты тротуаров: 4×4 м
var slabF=Fac(4,4,64);(function(){var R=rng(3);for(var y=0;y<8;y++)for(var x=0;x<4;x++){var l=50+R()*10;slabF.R(x,y*0.5,x+1,y*0.5+0.5,hsl(30,4,l),60);slabF.R(x,y*0.5,x+1,y*0.5+0.015,'#3a3836',20);slabF.R(x,y*0.5,x+0.015,y*0.5+0.5,'#3a3836',20);}slabF.noise(5000,['rgba(0,0,0,.12)','rgba(255,255,255,.08)']);})();
var grassC=canvas2d(256,256,function(g,w,h){g.fillStyle='#4a6a37';g.fillRect(0,0,w,h);speck(g,w,h,9000,['rgba(20,40,10,.35)','rgba(150,175,90,.18)'],1.2);});
// узоры куполов (+ рельеф)
function pat(type,a,b){
  var hc=document.createElement('canvas');hc.width=hc.height=256;var hg=hc.getContext('2d'),him=hg.createImageData(256,256);
  var c=canvas2d(256,256,function(g,w,h){
    var img=g.createImageData(w,h),d=img.data,ca=new THREE.Color(a),cb=new THREE.Color(b);
    for(var y=0;y<h;y++)for(var x=0;x<w;x++){
      var on,edge=0;
      if(type==='swirl'){var q=(x+y*0.9)%64;on=q<32;edge=Math.min(q%32,32-q%32);}
      else if(type==='zig'){var q2=(y+Math.abs((x%32)-16))%28;on=q2<12;edge=Math.min(q2,Math.abs(q2-12));}
      else if(type==='check'){on=(((x+y)%64)<32)!==(((x-y+256)%64)<32);edge=Math.min((x+y)%32,(x-y+256)%32);}
      else if(type==='scale'){var row=Math.floor(y/16),cx=((x+(row%2)*8)%16)-8,cy=y%16;var dd=cx*cx+cy*cy;on=dd<80;edge=Math.abs(Math.sqrt(dd)-8.5);}
      else if(type==='stars'){var sx2=(x+((Math.floor(y/32)%2)*16))%32-16,sy2=y%32-16;on=Math.abs(sx2)+Math.abs(sy2)>5;edge=3;}
      else {on=(x%32)<16;edge=Math.min(x%16,16-x%16);}
      var col=on?ca:cb,k=0.9+Math.random()*0.12,i=(y*w+x)*4;
      d[i]=Math.min(255,col.r*255*k);d[i+1]=Math.min(255,col.g*255*k);d[i+2]=Math.min(255,col.b*255*k);d[i+3]=255;
      var hv=Math.min(1,edge/3)*200+40;him.data[i]=him.data[i+1]=him.data[i+2]=hv;him.data[i+3]=255;
    }
    g.putImageData(img,0,0);
  });
  hg.putImageData(him,0,0);return {map:T(c),bump:T(hc,false)};
}
var gumF=Fac(8,18,48);(function(F){
  F.fill('#ddd4c3');F.noise(6000,['rgba(0,0,0,.05)','rgba(255,255,255,.1)','rgba(120,100,80,.05)']);
  F.R(0,0,8,0.9,'#8e8780',62);F.R(0,0,0.5,18,'#d3c8b4',70);F.R(7.5,0,8,18,'#d3c8b4',70);
  for(var r=1.2;r<5.6;r+=0.6)F.R(0.5,r,7.5,r+0.03,'rgba(120,105,85,.3)',38);
  F.win(1.7,0.9,6.3,5.3,{arc:true,f:0.3,lit:'#ffd08a'});
  F.R(0,5.6,8,6.5,'#ece6d9',86);for(var x=0.2;x<8;x+=0.4)F.R(x,6.3,x+0.18,6.5,'#d6cdbd',92);
  F.win(1.2,7.3,3.2,10.6,{arc:true,f:0.28,lit:'#ffcf86'});F.win(4.8,7.3,6.8,10.6,{arc:true,f:0.28,lit:'#e8b26a'});
  F.A(1.0,10.4,3.4,11.3,'#ece6d9',84);F.A(4.6,10.4,7.0,11.3,'#ece6d9',84);
  F.R(0,11.6,8,12.3,'#ece6d9',86);
  F.win(1.5,13,3,15.3,{f:0.22,lit:'#ffd79a'});F.win(5,13,6.5,15.3,{f:0.22,lit:'#ffd28a'});
  F.R(1.3,15.4,3.2,15.75,'#ece6d9',85);F.R(4.8,15.4,6.7,15.75,'#ece6d9',85);
  for(var i=0;i<8;i++)F.A(i+0.15,16.1,i+0.85,16.75,'#cfc3ae',72);
  F.R(0,16.9,8,18,'#c9bea9',90);
  for(var gx=0.15;gx<8;gx+=0.3){[6.75,12.45,17.95].forEach(function(y){F.R(gx,y-0.05,gx+0.09,y+0.04,'#bdb3a2',80,'#fff3c8');});}
  for(var gy=0.6;gy<18;gy+=0.3){F.R(0.2,gy,0.29,gy+0.09,null,null,'#fff3c8');F.R(7.71,gy,7.8,gy+0.09,null,null,'#fff3c8');}
})(gumF);
var musF=Fac(6,24,48);(function(F){
  F.bricks(5,60,30);F.noise(4000,['rgba(0,0,0,.1)']);
  F.R(0,0,6,1.4,'#8f8a83',64);F.R(0,1.4,6,1.6,'#e9e2d4',80);
  [[1.3,3.0,2.6,6.9],[3.4,3.0,4.7,6.9]].forEach(function(w){F.win(w[0],w[1],w[2],w[3],{arc:true,f:0.3,lit:RND()<0.7?'#ffd08a':'#3a2a18'});});
  F.R(0,8.6,6,9.3,'#ece5d7',84);for(var x=0.1;x<6;x+=0.3)F.R(x,8.3,x+0.15,8.6,'#ece5d7',86);
  [[1.3,11,2.6,15.2],[3.4,11,4.7,15.2]].forEach(function(w){F.win(w[0],w[1],w[2],w[3],{arc:true,f:0.3,lit:RND()<0.7?'#ffd08a':'#3a2a18'});F.A(w[0]-0.5,15.3,w[2]+0.5,16.6,'#ece5d7',84);F.A(w[0]-0.2,15.5,w[2]+0.2,16.3,'#9a2e24',55);});
  F.R(0,17.4,6,18,'#ece5d7',84);
  for(var k=0;k<6;k++){F.A(k+0.12,18.6,k+0.88,20.4,'#ece5d7',80);F.A(k+0.3,18.7,k+0.7,20.0,'#82271f',40);}
  for(var j=0;j<20;j++)F.R(j*0.3+0.05,22.4,j*0.3+0.2,22.8,'#7d241c',70);
  F.R(0,23.2,6,24,'#e9e2d4',86);
})(musF);
var kazF=Fac(4,10,48);(function(F){F.bricks(6,60,33);F.R(0,0,4,0.8,'#efe9dd',80);F.R(0,0,0.35,10,'#efe9dd',80);F.R(3.65,0,4,10,'#efe9dd',80);F.R(0,8.4,4,8.9,'#efe9dd',84);
  F.win(1.3,3,2.7,6.3,{arc:true,f:0.3,lit:'#ffcf8a'});F.A(1.0,6.2,3.0,7.2,'#efe9dd',82);})(kazF);
var arcF=Fac(2.75,4.4,96);(function(F){F.fill('#e6e0d2');F.noise(2500,['rgba(0,0,0,.06)','rgba(255,255,255,.1)']);
  F.A(0.45,0.3,2.3,3.9,'#d6cfc0',70);F.A(0.75,0.3,2.0,3.5,'#2a2a2e',15);F.R(0,0,2.75,0.3,'#d6cfc0',72);F.R(0,4.1,2.75,4.4,'#d6cfc0',80);
  F.R(0.12,0.3,0.32,4.1,'#f2ede2',86);F.R(2.43,0.3,2.63,4.1,'#f2ede2',86);})(arcF);
var podF=Fac(4,6,64);(function(F){F.bricks(4,58,31);F.R(0,0,4,0.7,'#e8e2d4',80);F.R(0,5.4,4,6,'#e8e2d4',84);
  F.win(1.4,1.7,2.6,4.3,{arc:true,f:0.25,frame:'#efe9dc',lit:'#ffcf8a'});
  for(var x=0;x<4;x+=0.5){F.R(x+0.1,5.1,x+0.3,5.4,'#e8e2d4',82);}})(podF);
var bwallF=Fac(4,8,64);(function(F){F.bricks(4,60,31);F.R(0,0,0.35,8,'#ece6da',82);F.R(3.65,0,4,8,'#ece6da',82);F.R(0,0,4,0.5,'#ece6da',80);
  F.win(1.55,2.4,2.45,5.4,{arc:true,f:0.22,frame:'#efe9dc',lit:'#ffd08a'});F.A(1.2,5.3,2.8,6.4,'#ece6da',82);
  F.R(0,7.2,4,8,'#ece6da',86);for(var x=0;x<4;x+=0.4)F.R(x+0.1,6.95,x+0.28,7.2,'#ece6da',84);})(bwallF);
var tentBC=canvas2d(256,256,function(g,w,h){g.fillStyle='#efe9dc';g.fillRect(0,0,w,h);g.lineWidth=6;
  for(var i=-256;i<512;i+=64){g.strokeStyle='#b5392c';g.beginPath();g.moveTo(i,0);g.lineTo(i+256,h);g.stroke();g.strokeStyle='#2f7a55';g.beginPath();g.moveTo(i+256,0);g.lineTo(i,h);g.stroke();}
  g.fillStyle='#d9a93a';for(var y=32;y<h;y+=64)for(var x=0;x<w;x+=64)g.fillRect(x-4,y-4,8,8);speck(g,w,h,2000,['rgba(0,0,0,.06)']);});
var seamC=function(base,line){return canvas2d(256,256,function(g,w,h){g.fillStyle=base;g.fillRect(0,0,w,h);for(var x=0;x<w;x+=24){g.fillStyle=line;g.fillRect(x,0,3,h);}speck(g,w,h,1500,['rgba(0,0,0,.08)','rgba(255,255,255,.06)']);});};
var glassC=canvas2d(256,256,function(g,w,h){g.fillStyle='#a3bcc6';g.fillRect(0,0,w,h);g.fillStyle='#424c53';for(var i=0;i<w;i+=32){g.fillRect(i,0,3,h);g.fillRect(0,i,w,2);}});
var dialC=canvas2d(512,512,function(g,w,h){
  var c=w/2;g.fillStyle='#0f1b33';g.beginPath();g.arc(c,c,c,0,7);g.fill();
  g.strokeStyle='#e2b649';g.lineWidth=18;g.beginPath();g.arc(c,c,c-12,0,7);g.stroke();g.lineWidth=4;g.beginPath();g.arc(c,c,c-60,0,7);g.stroke();
  for(var i=0;i<60;i++){var a=i/60*Math.PI*2,r1=c-28,r2=i%5?c-42:c-56;g.lineWidth=i%5?3:7;g.beginPath();g.moveTo(c+Math.sin(a)*r1,c-Math.cos(a)*r1);g.lineTo(c+Math.sin(a)*r2,c-Math.cos(a)*r2);g.stroke();}
  g.fillStyle='#e2b649';g.font='bold 44px Georgia,serif';g.textAlign='center';g.textBaseline='middle';
  var N=['XII','I','II','III','IIII','V','VI','VII','VIII','IX','X','XI'];
  for(var j=0;j<12;j++){var a2=j/12*Math.PI*2;g.save();g.translate(c+Math.sin(a2)*(c-105),c-Math.cos(a2)*(c-105));g.rotate(a2);g.fillText(N[j],0,0);g.restore();}
  g.beginPath();g.arc(c,c,22,0,7);g.fill();});
var plateC=canvas2d(512,128,function(g,w,h){g.fillStyle='#16171b';g.fillRect(0,0,w,h);g.fillStyle='#7d2a22';g.font='bold 84px "Times New Roman",serif';g.textAlign='center';g.textBaseline='middle';g.fillText('ЛЕНИН',w/2,h/2+4);});
var glowC=canvas2d(128,128,function(g){var gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(0.25,'rgba(255,255,255,.55)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);});
function granite(base,cols){return canvas2d(256,256,function(g,w,h){g.fillStyle=base;g.fillRect(0,0,w,h);speck(g,w,h,9000,cols,1);for(var y=0;y<h;y+=64){g.fillStyle='rgba(0,0,0,.35)';g.fillRect(0,y,w,1);}});}

/* ===== Материалы ===== */
var MAT={};
MAT.brick=M({map:brickT.map,bumpMap:brickT.bump,bumpScale:0.06,roughness:0.88},4,4);
MAT.brickM=M({map:brickT.map,bumpMap:brickT.bump,bumpScale:0.06,roughness:0.88},4,4,{ao:false});
MAT.white=facMat(stoneF,3,3,{bumpScale:0.04,roughness:0.78});
MAT.cob=facMat(paveF,8,8,{bumpScale:0.09,roughness:0.75},{ao:false});
MAT.slab=facMat(slabF,4,4,{bumpScale:0.04,roughness:0.8},{ao:false});
MAT.grass=M({map:T(grassC),roughness:1},6,6,{ao:false});
var tiles=pat('scale','#3f7d5c','#356f50');MAT.green=M({map:tiles.map,bumpMap:tiles.bump,bumpScale:0.05,roughness:0.5,metalness:0.25},1.6,1.6);
var stl=pat('scale','#b9bec3','#a5abb0');MAT.silver=M({map:stl.map,bumpMap:stl.bump,bumpScale:0.04,roughness:0.38,metalness:0.6},1.6,1.6);
MAT.roof=M({map:T(seamC('#575a5e','rgba(0,0,0,.28)')),roughness:0.6,metalness:0.4},2,2);
MAT.gold=M({color:0xe6b24a,metalness:1,roughness:0.24},1,1,{glow:0xffa63a,n:0.22});
MAT.dark=M({color:0x15161a,roughness:0.7},1,1,{ao:false});
MAT.graniteR=M({map:T(granite('#6b2a22',['rgba(0,0,0,.25)','rgba(200,120,100,.18)','rgba(30,10,10,.3)'])),roughness:0.32,metalness:0.05},2,2);
MAT.labr=M({map:T(granite('#1e2026',['rgba(80,110,140,.3)','rgba(0,0,0,.4)'])),roughness:0.25,metalness:0.1},2,2);
MAT.graniteG=M({map:T(granite('#7a7570',['rgba(0,0,0,.2)','rgba(255,255,255,.12)'])),roughness:0.6},2,2);
MAT.gum=facMat(gumF,8,18,{},{lit:true,n:1.4});
MAT.gumStone=M({map:MAT.white.map,bumpMap:MAT.white.bumpMap,bumpScale:0.04,color:0xeee6d6,roughness:0.8},3,3);
MAT.mus=facMat(musF,6,24,{},{lit:true,n:1});
MAT.kaz=facMat(kazF,4,10,{},{lit:true,n:0.9});
MAT.arcade=facMat(arcF,2.75,4.4,{bumpScale:0.08});
MAT.pod=facMat(podF,4,6,{},{lit:true,n:0.7});
MAT.bwall=facMat(bwallF,4,8,{},{lit:true,n:0.7});
MAT.tentB=M({map:T(tentBC),roughness:0.6},3,3);
MAT.glass=M({map:T(glassC),roughness:0.12,metalness:0.5,transparent:true,opacity:0.75},6,6,{ao:false});
MAT.bronze=M({color:0x4f5a43,roughness:0.45,metalness:0.8},1,1);
MAT.spruce=new THREE.MeshStandardMaterial({color:0x2c4749,roughness:0.95,envMapIntensity:0.4});
MAT.trunk=new THREE.MeshStandardMaterial({color:0x4a3a2c,roughness:1});
MAT.ruby=new THREE.MeshStandardMaterial({color:0x9a0010,emissive:0xff1a33,emissiveIntensity:0.9,roughness:0.25,metalness:0.2});
MAT.dial=new THREE.MeshStandardMaterial({map:T(dialC),roughness:0.5,metalness:0.3});
MAT.plate=new THREE.MeshStandardMaterial({map:T(plateC),roughness:0.3});
MAT.blueWall=M({map:MAT.white.map,color:0x3d6fb8,roughness:0.7},3,3);
var bst=pat('stars','#1f4e9c','#e2b649');MAT.blueStars=M({map:bst.map,bumpMap:bst.bump,bumpScale:0.03,roughness:0.4,metalness:0.4},1,1);
var gst=pat('stars','#3a7a58','#e2b649');MAT.greenStars=M({map:gst.map,bumpMap:gst.bump,bumpScale:0.03,roughness:0.45,metalness:0.35},1,1);
MAT.slabSide=new THREE.MeshStandardMaterial({color:0x161313,roughness:0.9});
MAT.edge=new THREE.MeshBasicMaterial({color:0xe3202a});
MAT.lamp=new THREE.MeshStandardMaterial({color:0xfff2d0,emissive:0xffe0a0,emissiveIntensity:0.4});

/* ===== Геометрия: помощники ===== */
function scaleUV(g,a,b){var uv=g.attributes.uv;for(var i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)*a,uv.getY(i)*b);return g;}
function add(o,parent,cast){o.castShadow=cast!==false;o.receiveShadow=true;(parent||scene).add(o);return o;}
function su(m){return m.userData.su||4;}function sv(m){return m.userData.sv||m.userData.su||4;}
function box(w,h,d,m,x,y,z,parent){
  var g=new THREE.BoxGeometry(w,h,d),uv=g.attributes.uv,dims=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]];
  for(var f=0;f<6;f++){var mm=Array.isArray(m)?m[f]:m;for(var i=0;i<4;i++){var k=f*4+i;uv.setXY(k,uv.getX(k)*dims[f][0]/su(mm),uv.getY(k)*dims[f][1]/sv(mm));}}
  var o=new THREE.Mesh(g,m);o.position.set(x,y+h/2,z);return add(o,parent);
}
function obox(x0,z0,x1,z1,h,th,m,parent,y){
  var dx=x1-x0,dz=z1-z0,L=Math.sqrt(dx*dx+dz*dz);
  var o=box(L,h,th,m,(x0+x1)/2,y||0,(z0+z1)/2,parent);o.rotation.y=-Math.atan2(dz,dx);return o;
}
function cyl(rt,rb,h,seg,m,x,y,z,parent,open){
  var g=new THREE.CylinderGeometry(rt,rb,h,seg,1,!!open);
  scaleUV(g,Math.PI*2*Math.max(rt,rb)/su(m),h/sv(m));
  var o=new THREE.Mesh(g,m);o.position.set(x,y+h/2,z);if(seg===8)o.rotation.y=Math.PI/8;return add(o,parent);
}
// многогранник, где каждая грань получает ровно одну «ось» фасадной текстуры
function prism(r,h,seg,m,x,y,z,parent){
  var g=new THREE.CylinderGeometry(r,r,h,seg,1,true);scaleUV(g,seg,h/sv(m));
  var o=new THREE.Mesh(g,m);o.position.set(x,y+h/2,z);o.rotation.y=Math.PI/seg;add(o,parent);
  var cap=new THREE.Mesh(new THREE.CircleGeometry(r,seg),MAT.roof);cap.rotation.x=-Math.PI/2;cap.rotation.z=Math.PI/seg;cap.position.set(x,y+h,z);add(cap,parent);
  return o;
}
function cone(r,h,seg,m,x,y,z,parent){
  var g=new THREE.ConeGeometry(r,h,seg,1);
  scaleUV(g,Math.PI*2*r/su(m),Math.sqrt(h*h+r*r)/sv(m));
  var o=new THREE.Mesh(g,m);o.position.set(x,y+h/2,z);if(seg===8)o.rotation.y=Math.PI/8;if(seg===4)o.rotation.y=Math.PI/4;return add(o,parent);
}
// шатёр со слуховыми окошками
function tent(r,h,seg,m,x,y,z,parent){
  cone(r,h,seg,m,x,y,z,parent);
  for(var k=0;k<4;k++){var a=k*Math.PI/2,rr=r*0.62,yy=y+h*0.3;
    var d=box(0.7,1.1,0.7,MAT.white,x+Math.cos(a)*rr,yy,z+Math.sin(a)*rr,parent);d.rotation.y=-a;
    cone(0.6,0.9,4,m,x+Math.cos(a)*rr,yy+1.1,z+Math.sin(a)*rr,parent);}
}
function sphere(r,m,x,y,z,parent){var o=new THREE.Mesh(new THREE.SphereGeometry(r,24,16),m);o.position.set(x,y,z);return add(o,parent);}
var ONION=[[0.70,0],[0.86,0.08],[0.97,0.2],[1,0.32],[0.95,0.45],[0.8,0.58],[0.58,0.7],[0.36,0.8],[0.18,0.88],[0.07,0.95],[0.015,1]];
function onion(R,H,m,x,y,z,parent,rep){
  var g=new THREE.LatheGeometry(ONION.map(function(p){return new THREE.Vector2(p[0]*R,p[1]*H);}),64);
  scaleUV(g,rep||1,1);var o=new THREE.Mesh(g,m);o.position.set(x,y,z);return add(o,parent);
}
function cross(x,y,z,s,parent){
  box(0.16*s,2.4*s,0.16*s,MAT.gold,x,y,z,parent);
  box(1.1*s,0.14*s,0.14*s,MAT.gold,x,y+1.65*s,z,parent);
  box(0.6*s,0.12*s,0.12*s,MAT.gold,x,y+2.05*s,z,parent);
  var b=box(0.8*s,0.12*s,0.12*s,MAT.gold,x,y+0.7*s,z,parent);b.rotation.z=0.35;
}
// кокошники по кругу (полукружия у основания барабанов и шатров)
function kokoshniks(x,z,r,y,n,rk,parent,m){
  for(var i=0;i<n;i++){var a=i/n*Math.PI*2;
    var g=new THREE.CylinderGeometry(rk,rk,0.35,14,1,false,-Math.PI/2,Math.PI);scaleUV(g,0.5,0.5);
    var o=new THREE.Mesh(g,m||MAT.white);o.rotation.set(Math.PI/2,0,0);
    var p=new THREE.Group();p.position.set(x+Math.cos(a)*r,y,z+Math.sin(a)*r);p.rotation.y=-a+Math.PI/2;p.add(o);parent.add(p);o.castShadow=o.receiveShadow=true;}
}
// глухой массив с арками проездов (оболочка, сквозные проходы)
function archBlock(w,h,d,arches,m,x,y,z,parent,rotY){
  var s=new THREE.Shape();s.moveTo(-w/2,0);
  arches.forEach(function(a){var r=a.w/2;s.lineTo(a.x-r,0);s.lineTo(a.x-r,a.h-r);s.absarc(a.x,a.h-r,r,Math.PI,0,true);s.lineTo(a.x+r,0);});
  s.lineTo(w/2,0);s.lineTo(w/2,h);s.lineTo(-w/2,h);s.closePath();
  var geo=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:false,curveSegments:20});geo.translate(0,0,-d/2);scaleUV(geo,1/su(m),1/sv(m));
  var o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.rotation.y=rotY||0;return add(o,parent);
}
function pinnacle(x,y,z,s,parent,top){cyl(0.55*s,0.65*s,3.2*s,8,MAT.white,x,y,z,parent);cone(0.7*s,2.6*s,8,top||MAT.white,x,y+3.2*s,z,parent);sphere(0.22*s,MAT.gold,x,y+5.9*s,z,parent);}
var SPRITES=[];
function glow(x,y,z,size,color,parent){
  var s=new THREE.Sprite(new THREE.SpriteMaterial({map:T(glowC),color:color,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  s.position.set(x,y,z);s.scale.set(size,size,1);s.visible=false;(parent||scene).add(s);SPRITES.push(s);return s;
}
var STARS=[];
var starGeo=(function(){var s=new THREE.Shape();for(var i=0;i<10;i++){var a=i/10*Math.PI*2,r=i%2?0.75:1.875;var px=Math.sin(a)*r,py=Math.cos(a)*r;if(i===0)s.moveTo(px,py);else s.lineTo(px,py);}s.closePath();
  var g=new THREE.ExtrudeGeometry(s,{depth:0.35,bevelEnabled:true,bevelThickness:0.18,bevelSize:0.12,bevelSegments:2});g.center();return g;})();
function rubyStar(x,y,z,parent){
  box(0.25,1.6,0.25,MAT.gold,x,y-1.6,z,parent);sphere(0.45,MAT.gold,x,y-1.8,z,parent);
  var s=new THREE.Mesh(starGeo,MAT.ruby);s.userData.dyn=true;s.position.set(x,y+1.9,z);add(s,parent);STARS.push(s);
  glow(x,y+1.9,z,14,0xff3040,parent);
}
function vane(x,y,z,parent){box(0.2,3,0.2,MAT.gold,x,y,z,parent);sphere(0.5,MAT.gold,x,y+0.6,z,parent);box(1.6,0.9,0.06,MAT.gold,x+0.8,y+2,z,parent);}
function eagle(x,y,z,parent,s){s=s||1;box(0.2,1.2*s,0.2,MAT.gold,x,y,z,parent);sphere(0.45*s,MAT.gold,x,y+1.3*s,z,parent);
  [-1,1].forEach(function(k){var w=box(1.1*s,0.7*s,0.1,MAT.gold,x+k*0.6*s,y+1.75*s,z,parent);w.rotation.z=k*0.35;});}
function group(id){var g=new THREE.Group();g.userData.lm=id;scene.add(g);return g;}
var GR={};LM.forEach(function(l){GR[l.id]=group(l.id);});

/* ===== Основание-диорама и мощение ===== */
var SX0=-62,SX1=172,SZ0=-250,SZ1=300,SW=SX1-SX0,SD=SZ1-SZ0,SCX=(SX0+SX1)/2,SCZ=(SZ0+SZ1)/2;
function plane(w,d,m,x,y,z){
  var g=new THREE.PlaneGeometry(w,d);scaleUV(g,w/su(m),d/sv(m));
  var o=new THREE.Mesh(g,m);o.rotation.x=-Math.PI/2;o.position.set(x,y,z);o.receiveShadow=true;scene.add(o);return o;
}
(function(){var b=new THREE.Mesh(new THREE.BoxGeometry(SW,10,SD),MAT.slabSide);b.position.set(SCX,-5.03,SCZ);b.receiveShadow=true;scene.add(b);
  [[SW+0.3,0.35,0.3,SCX,SZ0],[SW+0.3,0.35,0.3,SCX,SZ1]].forEach(function(e){var m=new THREE.Mesh(new THREE.BoxGeometry(e[0],e[1],e[2]),MAT.edge);m.position.set(e[3],-0.2,e[4]);scene.add(m);});
  [SX0,SX1].forEach(function(x){var m=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.35,SD+0.3),MAT.edge);m.position.set(x,-0.2,SCZ);scene.add(m);});})();
plane(SW,SD,MAT.slab,SCX,0,SCZ);
plane(20,SD,MAT.grass,-52,0.01,SCZ);
plane(110,348,MAT.cob,17,0.02,-4);
plane(158,100,MAT.cob,41,0.02,220);
plane(44,52,MAT.grass,86,0.03,224);
// бордюры вдоль ГУМа
box(0.4,0.15,242,MAT.graniteG,70.4,0,0);

/* ===== Кремлёвская стена ===== */
var K=GR.kremlin,WALL_H=14,WALL_T=4.2,MER=[];
var TW=[-215,-130,0,125,150,185,235,285];
function wallLine(x0,z0,x1,z1,side,skip){
  obox(x0,z0,x1,z1,WALL_H,WALL_T,MAT.brick,K);
  var dx=x1-x0,dz=z1-z0,L=Math.sqrt(dx*dx+dz*dz),ux=dx/L,uz=dz/L,nx=-uz*side,nz=ux*side,rot=-Math.atan2(dz,dx);
  var ix=-nx*(WALL_T/2-0.3),iz=-nz*(WALL_T/2-0.3);
  obox(x0+ix,z0+iz,x1+ix,z1+iz,1.3,0.6,MAT.brick,K,WALL_H);
  obox(x0+nx*(WALL_T/2+0.05),z0+nz*(WALL_T/2+0.05),x1+nx*(WALL_T/2+0.05),z1+nz*(WALL_T/2+0.05),0.4,0.3,MAT.brick,K,WALL_H-0.6);
  for(var s=1.6;s<L-1.6;s+=2.8){
    var px=x0+ux*s+nx*(WALL_T/2-0.4),pz=z0+uz*s+nz*(WALL_T/2-0.4);
    if(skip&&skip(px,pz))continue;MER.push([px,WALL_H,pz,rot,nx,nz]);
  }
}
wallLine(-40,-215,-40,285,-1,function(x,z){return TW.some(function(t){return Math.abs(z-t)<(t===150?3:9);});});
wallLine(-40,-215,-62,-215,1,function(x){return x>-49;});
wallLine(-40,285,-62,285,-1,function(x){return x>-48;});
function ringMerlons(x,z,r,y){var n=Math.floor(Math.PI*2*r/2.8);for(var i=0;i<n;i++){var a=i/n*Math.PI*2;MER.push([x+Math.cos(a)*(r-0.4),y,z+Math.sin(a)*(r-0.4),-Math.atan2(Math.cos(a),-Math.sin(a)),Math.cos(a),Math.sin(a)]);}}

function sqTower(o,g){
  var x=o.x,z=o.z,w=o.w;
  if(o.gate)archBlock(w,o.h,w,[{x:0,w:o.gate[0],h:o.gate[1]}],MAT.brick,x,0,z,g,Math.PI/2);else box(w,o.h,w,MAT.brick,x,0,z,g);
  box(w+0.6,0.8,w+0.6,MAT.white,x,o.h-0.8,z,g);if(o.mid)box(w+0.4,0.6,w+0.4,MAT.white,x,o.mid,z,g);
  box(w+1.2,1.2,w+1.2,MAT.brick,x,o.h-2.4,z,g);
  var y=o.h;
  (o.tiers||[]).forEach(function(t){
    if(t.w)box(t.w,t.h,t.w,t.m||MAT.brick,x,y,z,g);else cyl(t.r,t.r,t.h,8,t.m||MAT.brick,x,y,z,g);
    if(t.band!==false){if(t.w)box(t.w+0.4,0.5,t.w+0.4,MAT.white,x,y+t.h-0.5,z,g);else cyl(t.r+0.25,t.r+0.25,0.5,8,MAT.white,x,y+t.h-0.5,z,g);}
    if(t.pins){var q=t.w/2;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(c){pinnacle(x+c[0]*q,y+t.h,z+c[1]*q,0.8,g);});}
    y+=t.h;
  });
  if(o.tent[2]===4)cone(o.tent[0],o.tent[1],4,MAT.green,x,y,z,g);else tent(o.tent[0],o.tent[1],8,MAT.green,x,y,z,g);
  y+=o.tent[1];
  if(o.top==='star')rubyStar(x,y+1.6,z,g);else vane(x,y,z,g);
}
function rndTower(o,g){
  cyl(o.r,o.r*1.05,o.h,32,MAT.brick,o.x,0,o.z,g);
  cyl(o.r+0.6,o.r+0.6,1.6,32,MAT.brick,o.x,o.h-1.6,o.z,g);cyl(o.r+0.7,o.r+0.7,0.4,32,MAT.white,o.x,o.h-2,o.z,g);
  ringMerlons(o.x,o.z,o.r+0.6,o.h);
  cyl(o.r2,o.r2,o.h2,8,MAT.brick,o.x,o.h,o.z,g);cyl(o.r2+0.25,o.r2+0.25,0.5,8,MAT.white,o.x,o.h+o.h2-0.5,o.z,g);
  tent(o.r2+0.5,o.th,8,MAT.green,o.x,o.h+o.h2,o.z,g);vane(o.x,o.h+o.h2+o.th,o.z,g);
}
rndTower({x:-40,z:-215,r:8.3,h:34,r2:5.4,h2:9,th:14},K);
sqTower({x:-40,z:-130,w:12,h:26,mid:13,gate:[4,7.5],tiers:[{w:10,h:10,m:MAT.arcade,pins:true},{r:4.6,h:8,m:MAT.white}],tent:[4.3,20],top:'star'},K);
sqTower({x:-40,z:0,w:10.5,h:22,mid:12,tiers:[],tent:[6.6,11,4],top:'vane'},K);
sqTower({x:-40,z:185,w:9,h:22,tiers:[{r:4,h:6}],tent:[4.1,9],top:'vane'},K);
sqTower({x:-40,z:235,w:10,h:20,mid:10,gate:[3.6,6],tiers:[{r:4.4,h:6}],tent:[4.5,9],top:'vane'},K);
rndTower({x:-40,z:285,r:6.6,h:30,r2:4.2,h2:4,th:11},K);
[[-1.6,-1.6],[1.6,-1.6],[-1.6,1.6],[1.6,1.6]].forEach(function(o){box(0.6,3.2,0.6,MAT.white,-40+o[0],WALL_H,150+o[1],K);});
box(4.2,0.5,4.2,MAT.white,-40,WALL_H+3.2,150,K);cone(3,4,4,MAT.green,-40,WALL_H+3.7,150,K);sphere(0.4,MAT.gold,-40,WALL_H+8,150,K);

/* ===== Спасская башня (71 м) ===== */
var CLOCK=[];
(function(){var g=GR.spasskaya,x=-40,z=125;
  archBlock(14,28,14,[{x:0,w:4.6,h:8.5}],MAT.brick,x,0,z,g,Math.PI/2);
  box(14.5,0.7,14.5,MAT.white,x,14,z,g);box(14.6,0.9,14.6,MAT.white,x,27.1,z,g);box(15.2,1.4,15.2,MAT.brick,x,25.4,z,g);
  archBlock(9,10,7,[{x:0,w:4.2,h:7}],MAT.brick,x+10.5,0,z,g,Math.PI/2);box(7.4,0.6,9.4,MAT.white,x+10.5,9.4,z,g);
  for(var i=-1;i<=1;i+=2){box(7,1.2,0.6,MAT.brick,x+10.5,10,z+i*4.2,g);}
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(o){pinnacle(x+o[0]*6.6,28,z+o[1]*6.6,1,g);});
  [[0,-1],[0,1],[-1,0],[1,0]].forEach(function(o){pinnacle(x+o[0]*6.6,28,z+o[1]*6.6,0.7,g);});
  box(11,4.4,11,MAT.arcade,x,28,z,g);
  box(10,9.5,10,MAT.brick,x,32.4,z,g);box(10.4,0.6,10.4,MAT.white,x,41.3,z,g);
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(n){
    var c=new THREE.Group();c.userData.dyn=true;c.position.set(x+n[0]*5.06,37,z+n[1]*5.06);c.lookAt(x+n[0]*10,37,z+n[1]*10);g.add(c);
    var ring=new THREE.Mesh(new THREE.RingGeometry(3.06,3.45,48),MAT.white);add(ring,c,false);
    var d=new THREE.Mesh(new THREE.CircleGeometry(3.06,48),MAT.dial);add(d,c,false);
    var hh=new THREE.Mesh(new THREE.BoxGeometry(0.28,1.9,0.06).translate(0,0.75,0.06),MAT.gold),mm=new THREE.Mesh(new THREE.BoxGeometry(0.18,2.6,0.06).translate(0,1.05,0.1),MAT.gold);
    c.add(hh);c.add(mm);CLOCK.push([hh,mm]);
  });
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(o){pinnacle(x+o[0]*4.6,41.9,z+o[1]*4.6,0.65,g,MAT.gold);});
  cyl(4.6,4.6,8,8,MAT.brick,x,41.9,z,g);cyl(4.85,4.85,0.6,8,MAT.white,x,49.3,z,g);
  for(var k=0;k<8;k++){var a=k/8*Math.PI*2+Math.PI/8;
    box(0.14,4.4,1.8,MAT.dark,x+Math.cos(a)*4.3,43.4,z+Math.sin(a)*4.3,g).rotation.y=-a;
    var a2=a+Math.PI/8;cyl(0.25,0.25,7.4,8,MAT.white,x+Math.cos(a2)*4.62,42,z+Math.sin(a2)*4.62,g);}
  cyl(3.8,3.8,3.6,8,MAT.white,x,49.9,z,g);kokoshniks(x,z,3.9,53.3,8,0.9,g);
  tent(3.9,13,8,MAT.green,x,53.5,z,g);
  rubyStar(x,67.8,z,g);
})();

/* ===== Мавзолей (24 × 12 м), трибуны, ели ===== */
(function(){var g=GR.mausoleum,x=-26.5;
  box(14,1.4,26,MAT.graniteR,x,0,0,g);
  box(12,3.6,23,MAT.graniteR,x,1.4,0,g);box(12.2,0.7,23.2,MAT.labr,x,5,0,g);
  box(2.2,4.3,9,MAT.graniteR,x+6.9,1.4,0,g);box(0.1,2.6,2.2,MAT.dark,x+8.05,1.4,0,g);
  var p=new THREE.Mesh(new THREE.PlaneGeometry(6,1.5),MAT.plate);p.rotation.y=Math.PI/2;p.position.set(x+8.02,4.8,0);add(p,g,false);
  box(10,2,18,MAT.graniteR,x-0.5,5.7,0,g);box(10.2,0.5,18.2,MAT.labr,x-0.5,7.7,0,g);
  box(8,1.6,12,MAT.graniteR,x-1,8.2,0,g);box(4.5,1.6,7,MAT.labr,x-1,9.8,0,g);
  for(var i=-3;i<=3;i++){box(0.35,1.8,0.35,MAT.graniteR,x+2,9.8,i*1.3,g);box(0.35,1.8,0.35,MAT.graniteR,x-4,9.8,i*1.3,g);}
  for(var j=-1;j<=1;j++){box(0.35,1.8,0.35,MAT.graniteR,x-1+j*2,9.8,4.4,g);box(0.35,1.8,0.35,MAT.graniteR,x-1+j*2,9.8,-4.4,g);}
  box(7,0.5,10.4,MAT.graniteR,x-1,11.6,0,g);
  [-1,1].forEach(function(s){for(var k=0;k<3;k++)box(6-k*1.8,1,52,MAT.graniteG,-31.5-k*0.9,k,s*43,g);});
  // гранитная ограда некрополя
  for(var z=-75;z<=75;z+=2.5){if(Math.abs(z)<14)continue;box(0.5,0.9,0.5,MAT.graniteG,-15,0,z,g);}
  var parts=[];for(var c=0;c<5;c++){var cg=new THREE.ConeGeometry(2.6-c*0.45,4.2,12);cg.translate(0,2.6+c*2.3,0);parts.push(cg.toNonIndexed());}
  var sg=THREE.BufferGeometryUtils.mergeBufferGeometries(parts),tr=new THREE.CylinderGeometry(0.25,0.3,2.6,6);tr.translate(0,1.3,0);
  var pos=[];for(var zz=-70;zz<=70;zz+=6.5){if(Math.abs(zz)<17)continue;pos.push([-36,zz]);}
  var im=new THREE.InstancedMesh(sg,MAT.spruce,pos.length),it=new THREE.InstancedMesh(tr,MAT.trunk,pos.length),d=new THREE.Object3D();
  pos.forEach(function(q,i){var s=0.9+RND()*0.25;d.position.set(q[0],0,q[1]);d.scale.set(s,s,s);d.rotation.y=RND()*6;d.updateMatrix();im.setMatrixAt(i,d.matrix);it.setMatrixAt(i,d.matrix);});
  add(im,g);add(it,g);
})();

/* ===== ГУМ (242 × 88 м) ===== */
(function(){var g=GR.gum,x0=72,L=242,D=88,H=18,cx=x0+D/2;
  box(D,H,L,[MAT.gum,MAT.gum,MAT.roof,MAT.roof,MAT.gum,MAT.gum],cx,0,0,g);
  // пилястры и карнизы — настоящий рельеф поверх текстуры
  for(var z=-L/2;z<=L/2+0.1;z+=8)box(0.45,H,0.55,MAT.gumStone,x0-0.2,0,z,g);
  [[5.6,0.9,0.7],[11.6,0.7,0.5],[16.9,1.1,1.0]].forEach(function(c){box(c[2],c[1],L+1,MAT.gumStone,x0-c[2]/2,c[0],0,g);});
  box(D+1,0.9,L+1,MAT.gumStone,cx,H,0,g);
  [cx-28,cx,cx+28].forEach(function(vx){
    var c=new THREE.CylinderGeometry(7.5,7.5,L-4,36,1,true,Math.PI/2,Math.PI);
    scaleUV(c,Math.PI*7.5/6,(L-4)/6);var m=new THREE.Mesh(c,MAT.glass);m.rotation.x=Math.PI/2;m.position.set(vx,H+0.9,0);add(m,g,false);
    box(15.4,1.2,L-4,MAT.roof,vx,H+0.2,0,g);
    for(var rz=-L/2+4;rz<L/2-2;rz+=12){var rib=new THREE.Mesh(new THREE.TorusGeometry(7.5,0.12,6,24,Math.PI),MAT.dark);rib.position.set(vx,H+0.9,rz);add(rib,g,false);}
  });
  (function(){var c=new THREE.CylinderGeometry(7.5,7.5,D-6,36,1,true,0,Math.PI);scaleUV(c,Math.PI*7.5/6,(D-6)/6);var m=new THREE.Mesh(c,MAT.glass);m.rotation.z=Math.PI/2;m.position.set(cx,H+0.9,0);add(m,g,false);})();
  // центральный ризалит с главным входом и боковые
  [[0,26,24,4],[-60,18,20,3],[60,18,20,3]].forEach(function(r){
    var rz=r[0],rw=r[1],rh=r[2];
    archBlock(rw,rh,r[3],[{x:0,w:rw*0.32,h:rh*0.42}],MAT.gum,x0-r[3]/2,0,rz,g,Math.PI/2);
    box(r[3]+0.6,0.9,rw+0.6,MAT.gumStone,x0-r[3]/2,rh,rz,g);
    box(0.3,rh*0.42,rw*0.32,MAT.dark,x0+0.2,0,rz,g);
    [-1,1].forEach(function(s){var tz=rz+s*(rw/2-1.6);cyl(1.8,1.8,7,8,MAT.gumStone,x0-r[3]/2,rh+0.9,tz,g);kokoshniks(x0-r[3]/2,tz,1.9,rh+7.9,8,0.45,g);tent(2.2,7,8,MAT.green,x0-r[3]/2,rh+7.9,tz,g);sphere(0.4,MAT.gold,x0-r[3]/2,rh+15.2,tz,g);});
    if(rz===0){var a=new THREE.Mesh(new THREE.CylinderGeometry(rw/2,rw/2,r[3]+0.4,32,1,false,-Math.PI/2,Math.PI),MAT.gumStone);a.rotation.set(0,0,Math.PI/2);a.rotation.order='ZYX';a.position.set(x0-r[3]/2,rh+0.9,rz);a.scale.set(1,1,0.45);add(a,g);}
  });
  [-L/2+3,L/2-3].forEach(function(z){cyl(3.2,3.2,9,8,MAT.gumStone,x0+2,H,z,g);kokoshniks(x0+2,z,3.3,H+9,8,0.8,g);tent(3.6,8,8,MAT.green,x0+2,H+9,z,g);sphere(0.45,MAT.gold,x0+2,H+17.4,z,g);});
  for(var lz=-110;lz<=110;lz+=22){cyl(0.12,0.16,7.2,10,MAT.dark,68,0,lz,g);box(0.7,1,0.7,MAT.dark,68,7.2,lz,g);sphere(0.32,MAT.lamp,68,7.7,lz,g);glow(68,7.7,lz,7,0xffd890,g);}
})();

/* ===== Исторический музей ===== */
(function(){var g=GR.museum,cx=3,cz=-205,W=62,D=54,H=24,zf=cz+D/2;
  box(W,H,D,[MAT.mus,MAT.mus,MAT.silver,MAT.roof,MAT.mus,MAT.mus],cx,0,cz,g);
  var r=new THREE.Mesh(new THREE.ConeGeometry(30,8,4,1),MAT.silver);r.rotation.y=Math.PI/4;r.scale.set(W/42.4,1,D/42.4);r.position.set(cx,H+4,cz);add(r,g);
  [[9,0.6,0.5],[17.6,0.5,0.4],[23.2,0.8,0.7]].forEach(function(c){box(W+c[2]*2,c[1],c[2],MAT.white,cx,c[0],zf+c[2]/2,g);});
  for(var px=-W/2;px<=W/2+0.1;px+=6)box(0.5,H,0.4,MAT.brick,cx+px,0,zf+0.2,g);
  // центральная башня над главным входом
  archBlock(12,30,8,[{x:0,w:4.4,h:6.5}],MAT.mus,cx,0,zf+4,g);box(12.8,0.9,8.8,MAT.white,cx,30,zf+4,g);
  pinnacle(cx-5.4,30.9,zf+7.4,0.7,g,MAT.silver);pinnacle(cx+5.4,30.9,zf+7.4,0.7,g,MAT.silver);
  cyl(4.5,4.5,6,8,MAT.brick,cx,30.9,zf+4,g);kokoshniks(cx,zf+4,4.6,36.9,8,1,g);
  tent(5,9.5,8,MAT.silver,cx,36.9,zf+4,g);eagle(cx,46.4,zf+4,g,1.3);
  [[-W/2+3,zf-3,10],[W/2-3,zf-3,10],[-W/2+3,cz-D/2+3,8],[W/2-3,cz-D/2+3,8]].forEach(function(p){
    box(6.5,H+10,6.5,MAT.mus,cx+p[0],0,p[1],g);box(7.1,0.8,7.1,MAT.white,cx+p[0],H+10,p[1],g);
    kokoshniks(cx+p[0],p[1],3.4,H+10.8,4,0.9,g);tent(4,p[2],8,MAT.silver,cx+p[0],H+10.8,p[1],g);eagle(cx+p[0],H+10.8+p[2],p[1],g);});
  [-16,-9,9,16].forEach(function(dx){box(3.6,H+5,3.6,MAT.mus,cx+dx,0,zf-1.8,g);tent(2.4,6,8,MAT.silver,cx+dx,H+5,zf-1.8,g);sphere(0.3,MAT.gold,cx+dx,H+11.3,zf-1.8,g);});
})();

/* ===== Воскресенские ворота: две арки проезда, Иверская часовня снаружи площади ===== */
(function(){var g=GR.gate,cx=58,z=-191,D=14;
  archBlock(14,14,D,[{x:-3.6,w:4.8,h:8.2},{x:3.6,w:4.8,h:8.2}],MAT.brick,cx,0,z,g);
  box(14.6,0.7,D+0.6,MAT.white,cx,13.3,z,g);box(14.4,0.5,D+0.4,MAT.white,cx,8.6,z,g);
  for(var k=-2;k<=2;k++){[z+D/2,z-D/2].forEach(function(zz){var s=new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,0.4,16,1,false,-Math.PI/2,Math.PI),MAT.white);s.rotation.x=Math.PI/2;s.position.set(cx+k*2.7,14,zz);add(s,g);});}
  [-11,11].forEach(function(dx){var x=cx+dx;
    box(8,19,8,MAT.brick,x,0,z,g);box(8.6,0.7,8.6,MAT.white,x,9,z,g);box(8.8,0.9,8.8,MAT.white,x,18.1,z,g);box(9,1.2,9,MAT.brick,x,16.6,z,g);
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(c){pinnacle(x+c[0]*3.8,19,z+c[1]*3.8,0.55,g,MAT.green);});
    cyl(3.2,3.2,5,8,MAT.white,x,19,z,g);
    for(var i=0;i<8;i++){var a=i/8*Math.PI*2+Math.PI/8;box(0.12,2.8,1.3,MAT.dark,x+Math.cos(a)*3.0,20,z+Math.sin(a)*3.0,g).rotation.y=-a;}
    kokoshniks(x,z,3.3,24,8,0.75,g);tent(3.4,9,8,MAT.green,x,24.2,z,g);eagle(x,33.2,z,g,1.1);
  });
  // Иверская часовня — на северной, внешней стороне, между арками
  var ch=-205.5;box(5,6,7,MAT.blueWall,cx,0,ch,g);box(5.6,0.5,7.6,MAT.white,cx,6,ch,g);
  for(var c=-1;c<=1;c+=2){box(0.4,6,0.4,MAT.white,cx+c*2.5,0,ch-3.5,g);box(0.4,6,0.4,MAT.white,cx+c*2.5,0,ch+3.5,g);}
  box(0.1,3,1.6,MAT.gold,cx,0.4,ch-3.55,g).rotation.y=Math.PI/2;
  cyl(1.6,1.6,1,16,MAT.blueWall,cx,6.5,ch,g);
  var dm=new THREE.Mesh(new THREE.SphereGeometry(1.7,32,16,0,Math.PI*2,0,Math.PI/2),MAT.blueStars);scaleUV(dm.geometry,4,1);dm.position.set(cx,7.5,ch);add(dm,g);
  cyl(0.12,0.12,2.2,8,MAT.gold,cx,9,ch,g);eagle(cx,10.8,ch,g,0.7);
})();

/* ===== Казанский собор ===== */
(function(){var g=GR.kazan,x=95,z=-161;
  box(16,10,16,[MAT.kaz,MAT.kaz,MAT.roof,MAT.roof,MAT.kaz,MAT.kaz],x,0,z,g);
  box(16.6,0.6,16.6,MAT.white,x,9.4,z,g);
  for(var t=0;t<3;t++){var w=14-t*3.2,y=10+t*1.6;box(w,1.6,w,MAT.brick,x,y,z,g);
    for(var s=0;s<4;s++){var a=s*Math.PI/2;var n=4-t;for(var i=0;i<n;i++){var off=(i-(n-1)/2)*(w/n);
      var k=new THREE.Mesh(new THREE.CylinderGeometry(w/n/2,w/n/2,0.35,16,1,false,-Math.PI/2,Math.PI),MAT.white);k.rotation.x=Math.PI/2;
      var p=new THREE.Group();p.position.set(x+Math.cos(a)*(w/2)+Math.sin(a)*off,y+1.6,z+Math.sin(a)*(w/2)-Math.cos(a)*off);p.rotation.y=-a+Math.PI/2;p.add(k);g.add(p);}}}
  cyl(2.8,2.8,5,16,MAT.brick,x,14.8,z,g);cyl(3,3,0.5,16,MAT.white,x,19.3,z,g);kokoshniks(x,z,2.9,15,8,0.6,g);
  onion(3.7,7,MAT.greenStars,x,19.8,z,g,6);cross(x,26.8,z,1.6,g);
  box(6,13,6,MAT.kaz,x+10,0,z+10,g);cyl(2.4,2.4,4,8,MAT.white,x+10,13,z+10,g);kokoshniks(x+10,z+10,2.5,17,8,0.55,g);
  tent(2.7,6,8,MAT.green,x+10,17,z+10,g);onion(0.7,1.5,MAT.gold,x+10,23,z+10,g);cross(x+10,24.4,z+10,0.8,g);
  box(8,4,5,MAT.kaz,x-9,0,z+6,g);cone(4.4,2,4,MAT.green,x-9,4,z+6,g);
})();

/* ===== Лобное место ===== */
(function(){var g=GR.lobnoe,x=5,z=170;
  cyl(6.5,6.6,1.2,64,MAT.white,x,0,z,g);
  var ring=new THREE.LatheGeometry([new THREE.Vector2(6.0,0),new THREE.Vector2(6.5,0),new THREE.Vector2(6.5,1.1),new THREE.Vector2(6.0,1.1),new THREE.Vector2(6.0,0)],64);
  scaleUV(ring,8,0.4);var r=new THREE.Mesh(ring,MAT.white);r.position.set(x,1.2,z);add(r,g);
  for(var i=0;i<24;i++){var a=i/24*Math.PI*2;box(0.2,0.6,0.2,MAT.white,x+Math.cos(a)*6.25,2.3,z+Math.sin(a)*6.25,g);}
  box(2.6,1.2,3,MAT.white,x-7.6,0,z,g);box(1.2,0.6,3,MAT.white,x-9.4,0,z,g);
  box(0.1,1.4,2.2,MAT.dark,x-6.4,1.2,z,g);
})();

/* ===== Памятник Минину и Пожарскому ===== */
(function(){var g=GR.minin,x=28,z=184;
  box(5,0.6,8,MAT.graniteG,x,0,z,g);box(3.8,3.9,6.6,MAT.graniteR,x,0.6,z,g);
  box(0.05,2,4,MAT.bronze,x+1.93,1.5,z,g);box(0.05,2,4,MAT.bronze,x-1.93,1.5,z,g);
  box(4.2,0.4,7,MAT.graniteR,x,4.5,z,g);
  cyl(0.55,0.75,3.4,12,MAT.bronze,x,4.9,z-1.3,g);sphere(0.38,MAT.bronze,x,8.6,z-1.3,g);
  var arm=cyl(0.14,0.14,1.8,8,MAT.bronze,x-0.9,7.2,z-1.3,g);arm.rotation.z=1.1;
  box(1.2,1.6,1.6,MAT.bronze,x,4.9,z+1.4,g);cyl(0.5,0.6,1.6,12,MAT.bronze,x,6.5,z+1.4,g);sphere(0.36,MAT.bronze,x,8.4,z+1.4,g);
  var sh=cyl(0.9,0.9,0.12,24,MAT.bronze,x+0.9,5.6,z+2,g);sh.rotation.x=Math.PI/2;
})();

/* ===== Собор Василия Блаженного (65 м) ===== */
(function(){var g=GR.basil,cx=30,cz=218;
  box(44,6,30,MAT.pod,cx,0,cz,g);box(30,6,44,MAT.pod,cx,0,cz,g);
  box(44.6,0.5,30.6,MAT.white,cx,6,cz,g);box(30.6,0.5,44.6,MAT.white,cx,6,cz,g);
  // крыльца с шатрами
  [[-4,-24,0],[24,-4,1]].forEach(function(p){var o=p[2]?[6,8]:[8,6];box(o[0],6,o[1],MAT.pod,cx+p[0],0,cz+p[1],g);cone(4.4,4,4,MAT.green,cx+p[0],6.5,cz+p[1],g);
    for(var s=0;s<6;s++){if(p[2])box(1,0.35*(6-s),6,MAT.white,cx+p[0]+4+s,0,cz+p[1],g);else box(6,0.35*(6-s),1,MAT.white,cx+p[0],0,cz+p[1]-4-s,g);}});
  prism(7.5,22,8,MAT.bwall,cx,6.5,cz,g);
  for(var k=0;k<3;k++)kokoshniks(cx,cz,7.4-k*0.9,28.5+k*1.6,8,1.6-k*0.3,g);
  cyl(5.8,5.8,5,8,MAT.white,cx,28.5,cz,g);
  cone(6.6,24,8,MAT.tentB,cx,33,cz,g);
  cyl(1.4,1.4,2.4,12,MAT.gold,cx,57,cz,g);onion(1.9,4,MAT.gold,cx,59.4,cz,g);cross(cx,63.4,cz,1.9,g);
  function church(dx,dz,rOct,hOct,rDrum,hDrum,R,H,p,rep){
    var x=cx+dx,z=cz+dz,y=6.5;prism(rOct,hOct,8,MAT.bwall,x,y,z,g);y+=hOct;
    for(var i=0;i<3;i++){kokoshniks(x,z,rOct-0.2-i*0.6,y+i*1.1,8,rOct*0.32-i*0.25,g);}
    cyl(rOct-0.3,rOct-0.3,3.3,8,MAT.brick,x,y,z,g);y+=3.3;
    cyl(rDrum,rDrum,hDrum,24,MAT.brick,x,y,z,g);
    for(var j=0;j<8;j++){var a=j/8*Math.PI*2;box(0.25,hDrum*0.6,0.25,MAT.white,x+Math.cos(a)*(rDrum+0.1),y+hDrum*0.2,z+Math.sin(a)*(rDrum+0.1),g);}
    cyl(rDrum+0.25,rDrum+0.25,0.5,24,MAT.white,x,y+hDrum-0.5,z,g);y+=hDrum;
    onion(R,H,M({map:p.map,bumpMap:p.bump,bumpScale:0.05,roughness:0.42,metalness:0.15},1,1,{glow:0xffffff,n:0.08}),x,y,z,g,rep);
    cross(x,y+H-0.2,z,R/2.6,g);
  }
  church(0,-16,5,12,3.2,5,4.6,10,pat('swirl','#c4392b','#2e7d50'),5);
  church(16,0,5,12,3.2,5,4.6,10,pat('zig','#2f6db3','#f1ede4'),6);
  church(0,16,5,12,3.2,5,4.6,10,pat('swirl','#e1b13b','#2e7d50'),5);
  church(-16,0,5,12,3.2,5,4.6,10,pat('check','#1f8f86','#e1b13b'),5);
  church(-11.3,-11.3,3.5,8,2.3,3.5,3.3,7.5,pat('rib','#c4392b','#f1ede4'),6);
  church(11.3,-11.3,3.5,8,2.3,3.5,3.3,7.5,pat('scale','#2e7d50','#e1b13b'),6);
  church(11.3,11.3,3.5,8,2.3,3.5,3.3,7.5,pat('swirl','#1f8f86','#f1ede4'),5);
  church(-11.3,11.3,3.5,8,2.3,3.5,3.3,7.5,pat('zig','#c4392b','#e1b13b'),6);
  // колокольня
  var bx=cx+28,bz=cz+12;box(9,12,9,MAT.pod,bx,0,bz,g);box(9.4,0.6,9.4,MAT.white,bx,11.4,bz,g);
  cyl(4.2,4.2,8,8,MAT.brick,bx,12,bz,g);
  for(var i=0;i<8;i++){var a=i/8*Math.PI*2+Math.PI/8;box(0.14,4.5,1.9,MAT.dark,bx+Math.cos(a)*3.95,13.5,bz+Math.sin(a)*3.95,g).rotation.y=-a;
    var a2=a+Math.PI/8;cyl(0.22,0.22,8,8,MAT.white,bx+Math.cos(a2)*4.2,12,bz+Math.sin(a2)*4.2,g);}
  cyl(4.4,4.4,0.6,8,MAT.white,bx,20,bz,g);tent(4.3,11,8,MAT.green,bx,20.6,bz,g);onion(1.2,2.6,MAT.gold,bx,31.6,bz,g);cross(bx,34,bz,1.2,g);
})();

/* зубцы с бойницами — одним инстансом */
(function(){
  var mg=(function(){var s=new THREE.Shape();s.moveTo(-0.9,0);s.lineTo(0.9,0);s.lineTo(0.9,2.5);s.lineTo(0,1.85);s.lineTo(-0.9,2.5);s.closePath();
    var g=new THREE.ExtrudeGeometry(s,{depth:0.8,bevelEnabled:false});g.translate(0,0,-0.4);scaleUV(g,0.25,0.25);return g;})();
  var im=new THREE.InstancedMesh(mg,MAT.brickM,MER.length),sl=new THREE.InstancedMesh(new THREE.BoxGeometry(0.22,0.85,0.9),MAT.dark,MER.length),d=new THREE.Object3D();
  MER.forEach(function(m,i){d.position.set(m[0],m[1],m[2]);d.rotation.set(0,m[3],0);d.updateMatrix();im.setMatrixAt(i,d.matrix);
    d.position.set(m[0],m[1]+0.85,m[2]);d.updateMatrix();sl.setMatrixAt(i,d.matrix);});
  add(im,K);add(sl,K,false);
})();

/* ===== Склейка статичной геометрии: один меш на материал в каждой группе ===== */
function mergeStatic(root){
  root.updateMatrixWorld(true);
  var buckets={},drop=[];
  root.traverse(function(o){
    if(!o.isMesh||o.isInstancedMesh||o.userData.dyn||Array.isArray(o.material)||!o.visible)return;
    for(var p=o.parent;p&&p!==root;p=p.parent)if(p.userData.dyn)return;
    var g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();
    Object.keys(g.attributes).forEach(function(k){if(k!=='position'&&k!=='normal'&&k!=='uv')g.deleteAttribute(k);});
    g.applyMatrix4(o.matrixWorld);
    (buckets[o.material.uuid]=buckets[o.material.uuid]||{m:o.material,g:[]}).g.push(g);drop.push(o);
  });
  drop.forEach(function(o){o.parent.remove(o);o.geometry.dispose();});
  Object.keys(buckets).forEach(function(k){var b=buckets[k];add(new THREE.Mesh(THREE.BufferGeometryUtils.mergeBufferGeometries(b.g),b.m),root);});
}
LM.forEach(function(l){mergeStatic(GR[l.id]);});

/* ===== Режим фокуса: у каждого объекта свои копии материалов и свои uniform-ы ===== */
var FOCUS={},CLONES=[];
function owner(id){return FOCUS[id]||(FOCUS[id]={dim:{value:0},lift:{value:0},td:0,tl:0});}
(function(){
  var cache={};
  function own(o,id){
    var U=owner(id),m=o.material;if(!m||!m.isMeshStandardMaterial)return;
    var k=id+'|'+m.uuid,c=cache[k];
    if(!c){c=m.clone();c.userData=m.userData;patch(c,!!m.userData.ao,U);cache[k]=c;CLONES.push([m,c]);}
    o.material=c;
  }
  LM.forEach(function(l){GR[l.id].traverse(function(o){if(o.isMesh)own(o,l.id);});});
  scene.children.forEach(function(o){if(o.isMesh)own(o,'base');});
})();
function setFocus(id){
  Object.keys(FOCUS).forEach(function(k){var U=FOCUS[k];
    if(!id){U.td=0;U.tl=0;}
    else if(k===id){U.td=0;U.tl=1;}
    else {U.td=k==='base'?0.72:0.88;U.tl=0;}
  });
}
function stepFocus(dt){
  var a=reduce?1:Math.min(1,dt*5);
  Object.keys(FOCUS).forEach(function(k){var U=FOCUS[k];U.dim.value+=(U.td-U.dim.value)*a;U.lift.value+=(U.tl-U.lift.value)*a;});
}

/* ===== Свет и окружение ===== */
var sunDir=new V3(-0.55,0.62,0.56).normalize(),C0=new V3(SCX,0,SCZ);
var hemi=new THREE.HemisphereLight(0xbcd4ff,0x6b5a4a,0.22);scene.add(hemi);
var sun=new THREE.DirectionalLight(0xffecd0,2.3);
sun.position.copy(sunDir).multiplyScalar(700).add(C0);sun.target.position.copy(C0);
sun.castShadow=true;sun.shadow.mapSize.set(small?2048:4096,small?2048:4096);
var sc=sun.shadow.camera;sc.left=-340;sc.right=340;sc.top=340;sc.bottom=-340;sc.near=100;sc.far=1500;
sun.shadow.bias=-0.0012;sun.shadow.normalBias=0.2;
scene.add(sun);scene.add(sun.target);
renderer.shadowMap.autoUpdate=false;

var pmrem=new THREE.PMREMGenerator(renderer),envDay,envNight;
if(THREE.Sky){var sky=new THREE.Sky();sky.scale.setScalar(9000);var u=sky.material.uniforms;u.turbidity.value=5;u.rayleigh.value=1.4;u.mieCoefficient.value=0.004;u.mieDirectionalG.value=0.8;u.sunPosition.value.copy(sunDir);
  var es=new THREE.Scene();es.add(sky);envDay=pmrem.fromScene(es).texture;}
else{var es2=new THREE.Scene();es2.background=new THREE.Color(0x9fbad3);envDay=pmrem.fromScene(es2).texture;}
(function(){var es=new THREE.Scene();es.background=new THREE.Color(0x0c1424);var l=new THREE.Mesh(new THREE.SphereGeometry(10,16,8),new THREE.MeshBasicMaterial({color:0x8a5a30}));l.position.set(0,-30,0);es.add(l);envNight=pmrem.fromScene(es).texture;})();
scene.environment=envDay;

var night=false;
function setNight(on){
  night=on;scene.environment=on?envNight:envDay;
  sun.intensity=on?0.12:2.3;sun.color.set(on?0x8ea4ff:0xffecd0);
  // ночью «прожекторы» светят снизу: тёплый свет от земли
  hemi.color.set(on?0x1a2240:0xbcd4ff);hemi.groundColor.set(on?0xffb066:0x6b5a4a);hemi.intensity=on?1.1:0.22;
  renderer.toneMappingExposure=on?0.85:0.5;
  FLOOD.forEach(function(f){f.m.emissiveIntensity=on?f.n:0;});
  MAT.lamp.emissiveIntensity=on?2:0.4;
  SPRITES.forEach(function(s){s.visible=on;});
  CLONES.forEach(function(p){p[1].emissiveIntensity=p[0].emissiveIntensity;});
  document.getElementById('tNight').setAttribute('aria-pressed',String(on));
}

/* ===== Камера и управление ===== */
var camera=new THREE.PerspectiveCamera(40,1,0.5,6000);
var controls=new THREE.OrbitControls(camera,canvas);
controls.enableDamping=true;controls.dampingFactor=0.08;
controls.minDistance=3;controls.maxDistance=1300;controls.maxPolarAngle=Math.PI*0.6;
controls.autoRotate=!reduce;controls.autoRotateSpeed=0.35;
controls.target.fromArray(DEF.t);camera.position.fromArray(DEF.c);

var panel=document.getElementById('panel');
function frame(){
  var w=viewer.clientWidth,h=viewer.clientHeight;if(!w||!h)return;
  camera.aspect=w/h;
  if(!panel.hidden&&w>620)camera.setViewOffset(w,h,180,0,w,h);else camera.clearViewOffset();
  camera.updateProjectionMatrix();renderer.setSize(w,h,false);
}
frame();
if(window.ResizeObserver)new ResizeObserver(frame).observe(viewer);else addEventListener('resize',frame);

var anim=null;
function flyTo(t,c){anim={s:performance.now(),d:reduce?1:1800,fT:controls.target.clone(),tT:new V3().fromArray(t),fC:camera.position.clone(),tC:new V3().fromArray(c)};}
function stepAnim(now){
  if(!anim)return;
  var k=Math.min(1,(now-anim.s)/anim.d),e=k<0.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;
  controls.target.lerpVectors(anim.fT,anim.tT,e);
  // дугой: камера поднимается в середине пути, чтобы не проходить сквозь здания
  camera.position.lerpVectors(anim.fC,anim.tC,e);camera.position.y+=Math.sin(e*Math.PI)*Math.min(160,anim.fC.distanceTo(anim.tC)*0.35);
  if(k>=1)anim=null;
}
function setAuto(on){controls.autoRotate=on;document.getElementById('tRotate').setAttribute('aria-pressed',String(on));}
function select(id){
  var l=id!=null&&IDX[id]!=null?LM[IDX[id]]:null;
  chips.querySelectorAll('.chip').forEach(function(b){b.setAttribute('aria-pressed',String(!!l&&b.dataset.lm===id));});
  setFocus(l?l.id:null);
  if(!l){panel.hidden=true;frame();flyTo(DEF.t,DEF.c);return;}
  document.getElementById('pYear').textContent=l.year;
  document.getElementById('pName').textContent=l.name;
  document.getElementById('pMeta').textContent=l.meta;
  document.getElementById('pText').textContent=l.text;
  document.getElementById('pSize').textContent=l.size;
  panel.hidden=false;frame();setAuto(false);flyTo(l.t,l.c);
  var chip=chips.querySelector('[data-lm="'+id+'"]');if(chip&&chip.scrollIntoView)chip.scrollIntoView({block:'nearest',inline:'nearest'});
}
chips.addEventListener('click',function(e){var b=e.target.closest('[data-lm]');if(b)select(b.dataset.lm);});
document.addEventListener('rs:select',function(e){select(e.detail);});
document.getElementById('panelClose').addEventListener('click',function(){select(null);});
document.getElementById('pReset').addEventListener('click',function(){select(null);});
document.getElementById('tReset').addEventListener('click',function(){select(null);});
document.getElementById('tRotate').addEventListener('click',function(){setAuto(!controls.autoRotate);});
document.getElementById('tNight').addEventListener('click',function(){setNight(!night);});
document.getElementById('tEye').addEventListener('click',function(){select(null);setAuto(false);flyTo(EYE.t,EYE.c);});
controls.addEventListener('start',function(){anim=null;if(controls.autoRotate)setAuto(false);});

var ray=new THREE.Raycaster(),ndc=new THREE.Vector2(),tip=document.getElementById('tip'),pickables=LM.map(function(l){return GR[l.id];});
function pick(cx,cy){
  var r=canvas.getBoundingClientRect();ndc.set((cx-r.left)/r.width*2-1,-(cy-r.top)/r.height*2+1);
  ray.setFromCamera(ndc,camera);var hits=ray.intersectObjects(pickables,true);
  for(var i=0;i<hits.length;i++){var o=hits[i].object;if(o.isSprite)continue;while(o&&!o.userData.lm)o=o.parent;if(o)return o.userData.lm;}
  return null;
}
var down=null,lastHover=0;
canvas.addEventListener('pointerdown',function(e){down={x:e.clientX,y:e.clientY};tip.hidden=true;});
canvas.addEventListener('pointerup',function(e){
  if(!down)return;var moved=Math.abs(e.clientX-down.x)+Math.abs(e.clientY-down.y);down=null;
  if(moved>6)return;var id=pick(e.clientX,e.clientY);if(id)select(id);
});
canvas.addEventListener('pointermove',function(e){
  if(e.pointerType!=='mouse'||e.buttons)return;
  var now=performance.now();if(now-lastHover<110)return;lastHover=now;
  var id=pick(e.clientX,e.clientY),r=viewer.getBoundingClientRect();
  canvas.classList.toggle('hot',!!id);
  if(!id){tip.hidden=true;return;}
  tip.textContent=LM[IDX[id]].short;tip.hidden=false;tip.style.left=(e.clientX-r.left)+'px';tip.style.top=(e.clientY-r.top)+'px';
});
canvas.addEventListener('pointerleave',function(){tip.hidden=true;canvas.classList.remove('hot');});

var clockEl=document.getElementById('clock');
function updateClock(){
  var d=new Date(Date.now()+3*3600000),h=d.getUTCHours(),m=d.getUTCMinutes(),s=d.getUTCSeconds();
  var ha=-((h%12)+m/60)/12*Math.PI*2,ma=-(m+s/60)/60*Math.PI*2;
  CLOCK.forEach(function(c){c[0].rotation.z=ha;c[1].rotation.z=ma;});
  var hm=(h<10?'0':'')+h+':'+(m<10?'0':'')+m;
  clockEl.textContent=viewer.clientWidth<620?'Куранты · '+hm+' МСК':'Куранты · '+hm+' МСК · масштаб 1:1';
}
updateClock();setInterval(updateClock,10000);

var visible=true;
if(window.IntersectionObserver)new IntersectionObserver(function(en){visible=en[0].isIntersecting;}).observe(viewer);
setNight(false);
msg.hidden=true;
// сцена статична: карту теней считаем один раз, после предварительных рендеров окружения
renderer.shadowMap.needsUpdate=true;
var last=performance.now();
function loop(now){
  requestAnimationFrame(loop);
  var dt=Math.min(0.1,(now-last)/1000);last=now;
  if(!visible||document.hidden)return;
  stepAnim(now);stepFocus(dt);if(!anim)controls.update();
  if(camera.position.y<1.2)camera.position.y=1.2;
  var t=now/1000;STARS.forEach(function(s,i){s.rotation.y=Math.sin(t*0.15+i)*0.6;});
  renderer.render(scene,camera);
}
requestAnimationFrame(loop);
}
})();
