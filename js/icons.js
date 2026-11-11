// লাইন-আইকন সেট: পেজের ইমোজি নিজে থেকেই এই একরঙা আইকনে বদলে যায় (লেখার রঙ অনুযায়ী; ইন্টারনেট লাগে না)
(function(){
const P={
home:'M3 11 12 3.5 21 11M5.5 9.5V20h4.5v-6h4v6h4.5V9.5',
image:'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9.2h.01',
doc:'M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5',
shield:'M12 3 19 6v5.2c0 4.8-3 8.3-7 9.8-4-1.5-7-5-7-9.8V6zM9 12l2.2 2.2L15.2 10',
camera:'M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z',
pin:'M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
ballot:'M4 12h16v8H4zM8 12l1-8h6l1 8M9.5 16h5',
people:'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6M16 4.8a3 3 0 0 1 0 5.9M18 14.4c2 .8 3.5 2.6 3.5 5.6',
user:'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.6-7 8-7s8 3 8 7',
mail:'M3 6h18v12H3zM3.5 7l8.5 6.5L20.5 7',
phone:'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v3.5a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
megaphone:'M3 10v4h3.5l8 5V5l-8 5zM18 9a4 4 0 0 1 0 6',
calendar:'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
clip:'M9 4h6v3H9zM7 5.5H5V21h14V5.5h-2M9 14l2 2 4-4',
chat:'M4 5h16v11H11l-5 4v-4H4z',
install:'M7 3h10v18H7zM12 8v6M9.5 12 12 14.5 14.5 12M11 18h2',
share:'M12 15V4M8 8l4-4 4 4M5 13v7h14v-7',
fb:'M14 21v-8h3l.5-3.5H14V7.7c0-1 .5-1.7 1.7-1.7h1.9V3c-.4-.1-1.5-.2-2.6-.2C12.6 2.8 11 4.3 11 7v2.5H8V13h3v8z',
leaf:'M5 19C5 9.5 11 4.5 20 4.5c0 9-5 14.5-15 14.5zM5 19c3-5 6-8 10-10',
ticket:'M3 8h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4zM9 8v10',
lock:'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
refresh:'M20 11a8 8 0 0 0-14.5-4M4 4v4h4M4 13a8 8 0 0 0 14.5 4M20 20v-4h-4',
palette:'M12 3a9 9 0 0 0 0 18c1.5 0 2-1 1.5-2s0-2 1.5-2h2a4 4 0 0 0 4-4C21 7 17 3 12 3zM8 11h.01M11 7.5h.01M15.5 8h.01',
star:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
clock:'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
check:'M4.5 12.5l5 5L20 6.5',
warn:'M12 4l9 16H3zM12 10v4.5M12 17.5h.01',
trash:'M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13',
save:'M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6',
plus:'M12 5v14M5 12h14',
search:'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM16 16l5 5',
down:'M12 4v11M7.5 11 12 15.5 16.5 11M5 20h14'};
const M={'🏠':'home','🖼':'image','📜':'doc','📝':'doc','📋':'doc','🛡':'shield','📷':'camera','📍':'pin','🗳':'ballot','🤝':'people','🙋':'people','👤':'user','✉':'mail','📩':'mail','📧':'mail','📞':'phone','📢':'megaphone','🗓':'calendar','📅':'calendar','🛠':'clip','💬':'chat','📲':'install','📤':'share','📘':'fb','🌾':'leaf','🎫':'ticket','🔐':'lock','🔒':'lock','🔄':'refresh','🎨':'palette','🎉':'star','✨':'star','⏳':'clock','🕒':'clock','✅':'check','⚠':'warn','🗑':'trash','💾':'save','➕':'plus','🔎':'search','⬇':'down'};
const svg=n=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${P[n]}"/></svg>`;
const keys=Object.keys(M).sort((a,b)=>b.length-a.length),RE=new RegExp('('+keys.join('|')+')[\\uFE0F]?','g'),QK=new RegExp(keys.join('|'));
const st=document.createElement('style');st.textContent='.i3{display:inline-block;width:1.25em;height:1.25em;vertical-align:-.25em;line-height:0;flex:none}.i3 svg{width:100%;height:100%;display:block;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}';document.head.appendChild(st);
const SK={SCRIPT:1,STYLE:1,TEXTAREA:1,OPTION:1,TITLE:1,INPUT:1,CANVAS:1,SVG:1};
function fix(n){if(n.nodeType===3){const t=n.nodeValue;if(!QK.test(t)||!n.parentNode||SK[n.parentNode.nodeName.toUpperCase()])return;
  const f=document.createDocumentFragment();let last=0,m;RE.lastIndex=0;while((m=RE.exec(t))){if(m.index>last)f.appendChild(document.createTextNode(t.slice(last,m.index)));const i=document.createElement('i');i.className='i3';i.innerHTML=svg(M[m[1]]);f.appendChild(i);last=RE.lastIndex}
  if(last<t.length)f.appendChild(document.createTextNode(t.slice(last)));n.parentNode.replaceChild(f,n)}
 else if(n.nodeType===1&&!SK[n.nodeName.toUpperCase()]&&!(n.classList&&n.classList.contains('i3'))){[...n.childNodes].forEach(fix)}}
function start(){fix(document.body);new MutationObserver(ms=>{ms.forEach(m=>{if(m.type==='characterData')fix(m.target);else m.addedNodes.forEach(fix)})}).observe(document.body,{childList:true,subtree:true,characterData:true})}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
window.ICON=n=>`<i class="i3">${svg(n)}</i>`;
})();
