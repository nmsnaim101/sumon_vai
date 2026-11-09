// ৩ডি-স্টাইল আইকন: পেজের সব ইমোজি নিজে থেকেই এই আইকন সেটে বদলে যায় (ইন্টারনেট লাগে না)
(function(){
const G={
home:'M12 2.5 1.5 12H5v9h5.5v-6h3v6H19v-9h3.5z',
image:'M3 4h18v16H3V4zm2 2v9.5l4-4.5 3 3.2L16 9l3 3.5V6H5zm3.2 1.6a1.6 1.6 0 1 0 .01 0z',
doc:'M6 2h9l5 5v15H6V2zm3 10v2h8v-2H9zm0 4v2h8v-2H9zm0-8v2h4V8H9z',
shield:'M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3zm-1.4 13.5L7.5 12.4l1.4-1.4 1.7 1.7 4.5-4.5 1.4 1.4-5.9 5.9z',
camera:'M9 4 7.5 6H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L15 4H9zm3 5a4.2 4.2 0 1 1 0 8.4A4.2 4.2 0 0 1 12 9z',
pin:'M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z',
ballot:'M8 2h8v7H8V2zM3 11h18v10H3V11zm6 3v2h6v-2H9z',
people:'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.5 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3.6 3-6 7-6s7 2.4 7 6H2zm15-5.6c3 .3 5 2 5 5.6h-4c0-2-.4-3.8-1-5.6z',
user:'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.4 0-8 2.2-8 5.5V21h16v-1.5c0-3.3-3.6-5.5-8-5.5z',
mail:'M2 5h20v14H2V5zm2.5 2L12 12.5 19.5 7h-15z',
phone:'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2z',
megaphone:'M3 9v6h3l7 4V5L6 9H3zm12-1v8c1.8-.7 3-2.1 3-4s-1.2-3.3-3-4z',
calendar:'M7 2v2H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3V2h-2v2H9V2H7zM5 9h14v10H5V9zm2 2v2h3v-2H7zm5 0v2h3v-2h-3z',
wrench:'M21 6.5a5 5 0 0 1-6.7 4.7L7 18.5a2 2 0 0 1-2.8-2.8l7.3-7.3A5 5 0 0 1 17.5 2l-2.9 2.9 1.5 3 3 1.5L21 6.5z',
chat:'M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
install:'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm4 5v5H8l4 4 4-4h-3V7h-2z',
share:'M18 8a3 3 0 1 0-2.8-4l-8 4.6a3 3 0 1 0 0 4.8l8 4.6A3 3 0 1 0 16 17l-7.9-4.6a3 3 0 0 0 0-.8L16 7.1A3 3 0 0 0 18 8z',
fb:'M14 22v-8h3l.5-3.5H14V8.3c0-1 .3-1.8 1.8-1.8h1.9V3.4c-.3-.1-1.4-.2-2.6-.2-2.7 0-4.4 1.6-4.4 4.5v2.8H8V14h2.7v8H14z',
leaf:'M12 2C7 6 5 10 5 14a7 7 0 0 0 14 0c0-4-2-8-7-12zm-.8 9h1.6v10h-1.6V11z',
ticket:'M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V6zm6 2v8h2V8H9z',
lock:'M6 10V8a6 6 0 0 1 12 0v2h2v12H4V10h2zm2 0h8V8a4 4 0 0 0-8 0v2z',
refresh:'M12 4V1L7 6l5 5V7a5 5 0 0 1 4.4 7.4l1.8 1A7 7 0 0 0 12 4zm-4.4 2.6-1.8-1A7 7 0 0 0 12 20v3l5-5-5-5v4a5 5 0 0 1-4.4-7.4z',
palette:'M12 2a10 10 0 0 0 0 20 2 2 0 0 0 1.5-3.3 2 2 0 0 1 1.5-3.3H18a4 4 0 0 0 4-4C22 6 17.5 2 12 2zM7 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z',
star:'M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.5 5.7 21l1.5-7L2 9.3l7-.8L12 2z',
clock:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.4l4 2.3-1 1.7-5-3V7h2z',
check:'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z',
warn:'M12 2 1 21h22L12 2zm-1 8h2v5h-2v-5zm0 6.5h2v2h-2v-2z',
trash:'M6 7h12l-1 14H7L6 7zm3-4h6l1 2h4v2H4V5h4l1-2z',
save:'M5 3h11l4 4v14H5V3zm3 0v5h7V3H8zm4 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
plus:'M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7V4z',
search:'M10 2a8 8 0 1 0 4.9 14.3l5.4 5.4 1.4-1.4-5.4-5.4A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z',
down:'M11 3h2v10l3.5-3.5L18 11l-6 6-6-6 1.5-1.5L11 13V3zM5 19h14v2H5v-2z'};
const C={home:['#34d399','#059669'],image:['#f472b6','#be185d'],doc:['#fbbf24','#d97706'],shield:['#60a5fa','#1d4ed8'],camera:['#a78bfa','#6d28d9'],pin:['#fb7185','#e11d48'],ballot:['#2dd4bf','#0f766e'],people:['#fb923c','#ea580c'],user:['#94a3b8','#475569'],mail:['#38bdf8','#0369a1'],phone:['#4ade80','#15803d'],megaphone:['#fbbf24','#dc2626'],calendar:['#60a5fa','#4338ca'],wrench:['#94a3b8','#475569'],chat:['#4ade80','#16a34a'],install:['#34d399','#0f766e'],share:['#38bdf8','#2563eb'],fb:['#3b82f6','#1e40af'],leaf:['#a3e635','#15803d'],ticket:['#f59e0b','#b45309'],lock:['#fbbf24','#b45309'],refresh:['#38bdf8','#0369a1'],palette:['#f472b6','#7c3aed'],star:['#fde047','#f59e0b'],clock:['#f59e0b','#c2410c'],check:['#4ade80','#15803d'],warn:['#fde047','#d97706'],trash:['#f87171','#b91c1c'],save:['#60a5fa','#1d4ed8'],plus:['#34d399','#047857'],search:['#818cf8','#4338ca'],down:['#34d399','#047857']};
const M={'🏠':'home','🖼':'image','📜':'doc','📝':'doc','📋':'doc','🛡':'shield','📷':'camera','📍':'pin','🗳':'ballot','🤝':'people','🙋':'people','👤':'user','✉':'mail','📩':'mail','📧':'mail','📞':'phone','📢':'megaphone','🗓':'calendar','📅':'calendar','🛠':'wrench','💬':'chat','📲':'install','📤':'share','📘':'fb','🌾':'leaf','🎫':'ticket','🔐':'lock','🔒':'lock','🔄':'refresh','🎨':'palette','🎉':'star','✨':'star','⏳':'clock','🕒':'clock','✅':'check','⚠':'warn','🗑':'trash','💾':'save','➕':'plus','🔎':'search','⬇':'down'};
const dk=(h,k)=>'#'+[1,3,5].map(i=>('0'+Math.round(parseInt(h.substr(i,2),16)*k).toString(16)).slice(-2)).join('');
const defs='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'+Object.keys(C).map(n=>`<linearGradient id="gi-${n}" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="${C[n][0]}"/><stop offset="1" stop-color="${C[n][1]}"/></linearGradient>`).join('')+'<radialGradient id="gi-hl" cx=".3" cy=".1" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs></svg>';
const cache={};
function svg(n){return cache[n]||(cache[n]=`<svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="24" cy="46" rx="15" ry="2" fill="#000" opacity=".2"/><rect x="5" y="9" width="38" height="36" rx="12" fill="${dk(C[n][1],.72)}"/><rect x="5" y="4" width="38" height="36" rx="12" fill="url(#gi-${n})"/><rect x="5" y="4" width="38" height="36" rx="12" fill="url(#gi-hl)"/><path d="M10 17c0-7 6-11 14-11s14 4 14 11c-7 4-21 4-28 0z" fill="#fff" opacity=".2"/><rect x="5.5" y="4.5" width="37" height="35" rx="11.5" fill="none" stroke="#fff" stroke-opacity=".4"/><g transform="translate(12 10)"><path d="${G[n]}" fill="#000" opacity=".28" fill-rule="evenodd" transform="translate(0 1.6)"/><path d="${G[n]}" fill="#fff" fill-rule="evenodd"/></g></svg>`)}
const keys=Object.keys(M).sort((a,b)=>b.length-a.length),RE=new RegExp('('+keys.join('|')+')[\\uFE0F]?','g'),QK=new RegExp(keys.join('|'));
const st=document.createElement('style');st.textContent='.i3{display:inline-block;width:1.4em;height:1.4em;vertical-align:-.32em;line-height:0;filter:drop-shadow(0 2px 3px rgba(0,0,0,.22));transition:transform .25s}.i3 svg{width:100%;height:100%;display:block}button:hover>.i3,a:hover>.i3,.tl:hover .i3,.wt:hover .i3{transform:translateY(-2px) scale(1.12) rotate(-4deg)}';document.head.appendChild(st);
const SK={SCRIPT:1,STYLE:1,TEXTAREA:1,OPTION:1,TITLE:1,INPUT:1,CANVAS:1,SVG:1};
function fix(n){if(n.nodeType===3){const t=n.nodeValue;if(!QK.test(t)||(n.parentNode&&(SK[n.parentNode.nodeName.toUpperCase()]||n.parentNode.closest&&n.parentNode.closest('svg'))))return;
  const f=document.createDocumentFragment();let last=0,m;RE.lastIndex=0;while((m=RE.exec(t))){if(m.index>last)f.appendChild(document.createTextNode(t.slice(last,m.index)));const i=document.createElement('i');i.className='i3';i.innerHTML=svg(M[m[1]]);f.appendChild(i);last=RE.lastIndex}
  if(last<t.length)f.appendChild(document.createTextNode(t.slice(last)));n.parentNode.replaceChild(f,n)}
 else if(n.nodeType===1&&!SK[n.nodeName.toUpperCase()]&&!(n.classList&&n.classList.contains('i3'))){[...n.childNodes].forEach(fix)}}
function start(){document.body.insertAdjacentHTML('afterbegin',defs);fix(document.body);
 new MutationObserver(ms=>{ms.forEach(m=>{if(m.type==='characterData')fix(m.target);else m.addedNodes.forEach(fix)})}).observe(document.body,{childList:true,subtree:true,characterData:true})}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
window.ICON=n=>`<i class="i3">${svg(n)}</i>`;
})();
