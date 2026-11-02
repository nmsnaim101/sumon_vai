
const $=id=>document.getElementById(id),F='"Noto Sans Bengali","Kalpurush","Siyam Rupali",BnEmbed,system-ui,sans-serif';
$('hn').textContent=CFG.name;$('hp').textContent=CFG.union+' · '+CFG.post;$('sl').textContent=CFG.slogan;$('ph').textContent=CFG.phone;$('fb').href=CFG.fb;$('ph').href='tel:'+CFG.phone;document.title=CFG.name;document.documentElement.style.setProperty('--c',CFG.color);
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button,section').forEach(e=>e.classList.remove('on'));b.classList.add('on');$(b.dataset.t).classList.add('on')});
const img=s=>new Promise(r=>{if(!s)return r(null);const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=s});
function cover(x,i,cx,cy,r){x.save();x.beginPath();x.arc(cx,cy,r,0,7);x.clip();if(i){const s=Math.max(2*r/i.width,2*r/i.height);x.drawImage(i,cx-i.width*s/2,cy-i.height*s/2,i.width*s,i.height*s)}else{x.fillStyle='#cfd8d3';x.fillRect(cx-r,cy-r,2*r,2*r);x.fillStyle='#8a978f';x.beginPath();x.arc(cx,cy-r*.2,r*.35,0,7);x.fill();x.beginPath();x.arc(cx,cy+r*.95,r*.6,0,7);x.fill()}x.restore();x.lineWidth=10;x.strokeStyle='#fff';x.beginPath();x.arc(cx,cy,r,0,7);x.stroke()}
function txt(x,t,cx,y,px,w,wt){let s=px;do{x.font=(wt||'700')+' '+s+'px '+F;s-=2}while(x.measureText(t).width>w&&s>16);x.fillText(t,cx,y)}

const TH=[['সবুজ',CFG.color,'#0f7a59','#c8962e'],['নীল','#1d4f9c','#2f6fd0','#e0a526'],['মেরুন','#8a1c3a','#b8294f','#d9a441'],['মাটি','#9a4a0a','#c2681a','#14532d']],R=document.documentElement;let ti=0;
const tell=()=>parent.postMessage('theme:'+TH[ti][1]+','+TH[ti][2]+','+(R.dataset.theme||''),'*');
function setT(i){ti=i;const t=TH[i];R.style.setProperty('--c',t[1]);R.style.setProperty('--c2',t[2]);R.style.setProperty('--acc',t[3]);CFG.color=t[1];document.querySelectorAll('.sw i').forEach((e,k)=>e.classList.toggle('on',k==i));tell();try{localStorage.setItem('th',i)}catch(e){}}
$('swp').innerHTML=TH.map((t,i)=>`<i title="${t[0]}" style="background:linear-gradient(135deg,${t[1]},${t[2]})" onclick="setT(${i})"></i>`).join('');
$('tb').onclick=()=>$('ts').classList.toggle('on');$('tc').onclick=()=>$('ts').classList.remove('on');
$('dkb').onclick=e=>{const d=R.dataset.theme!='dark';R.dataset.theme=d?'dark':'light';e.target.classList.toggle('on',d);tell()};
$('mob').onclick=e=>{e.target.classList.toggle('on',!R.classList.toggle('nm'))};
let t0=0;try{t0=+localStorage.getItem('th')||0}catch(e){}setT(t0);
const BNd='০১২৩৪৫৬৭৮৯',bn=n=>String(n).replace(/\d/g,d=>BNd[d]);
function cnt(e){const n=+e.dataset.n,s=performance.now();(function f(t){const p=Math.min(1,(t-s)/1200);e.textContent=bn(Math.round(n*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f)})(s)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-n]').forEach(cnt);io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.card').forEach((c,i)=>{c.classList.add('rv');c.style.transitionDelay=(i%4)*80+'ms'});
const obs=()=>document.querySelectorAll('.rv:not(.in)').forEach(e=>io.observe(e));obs();document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>setTimeout(obs,60)));
if(CFG.photo){$('av').style.backgroundImage='url('+CFG.photo+')';$('av').textContent=''}
$('sy').innerHTML=(CFG.symbolImg?'<img src="'+CFG.symbolImg+'" alt="" onerror="this.remove()">':'')+'প্রতীক: '+CFG.symbol;
$('spn').textContent=CFG.name;$('spi').src=CFG.photo;setTimeout(()=>$('sp').classList.add('off'),1300);
const toast=m=>{const e=$('tt');e.textContent=m;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),2200)};
function boom(){const c=$('cf'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;const P=Array.from({length:90},()=>({x:innerWidth/2,y:innerHeight*.7,vx:(Math.random()-.5)*14,vy:-Math.random()*16-4,s:6+Math.random()*6,c:['#c8962e',TH[ti][1],TH[ti][2],'#fff'][Math.random()*4|0],r:Math.random()*6}));let f=0;(function a(){x.clearRect(0,0,c.width,c.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.45;p.r+=.2;x.fillStyle=p.c;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);x.restore()});if(++f<90)requestAnimationFrame(a);else x.clearRect(0,0,c.width,c.height)})()}
