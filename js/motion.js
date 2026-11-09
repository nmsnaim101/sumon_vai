// মোশন ও ইন্টারঅ্যাকশন: স্ক্রল-প্রগ্রেস, ঢেউ, টিকার, ৩ডি টিল, ভাসমান আইকন, স্টেগার রিভিল
(function(){
const q=(s,r)=>(r||document).querySelector(s),qa=(s,r)=>[...(r||document).querySelectorAll(s)];
// স্ক্রল প্রগ্রেস বার
const pb=document.createElement('div');pb.id='pgb';document.body.appendChild(pb);
addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;pb.style.transform='scaleX('+(h>0?scrollY/h:0)+')';
 const o=q('.o1');if(o&&scrollY<400)o.style.translate='0 '+scrollY*.25+'px'},{passive:true});
// হেডারে ঢেউ
const hd=q('header');if(hd)hd.insertAdjacentHTML('beforeend','<svg class="wv" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path class="w1" d="M0 30c120-20 240-20 360 0s240 20 360 0 240-20 360 0 240 20 360 0v30H0z"/><path class="w2" d="M0 38c120 16 240 16 360 0s240-16 360 0 240 16 360 0 240-16 360 0v22H0z"/></svg>');
// টিকার
const h=q('#home');if(h&&typeof CFG!=='undefined'){const t=[CFG.slogan,'ধানের শীষে ভোট দিন','মাদক হটাও, যুব সমাজ বাঁচাও','০৬নং রাজগঞ্জ ইউনিয়ন'].filter(Boolean),r=t.map(x=>'<span>✨ '+x+'</span>').join('');
 const d=document.createElement('div');d.className='tkr';d.innerHTML='<div class="tkm">'+r+r+r+r+'</div>';h.insertBefore(d,h.firstChild)}
// হিরোতে ভাসমান ৩ডি আইকন
const hero=q('.hero');if(hero&&window.ICON){['leaf','ballot','star','megaphone'].forEach((n,i)=>{const e=document.createElement('div');e.className='fi fi'+i;e.innerHTML=ICON(n);hero.appendChild(e)})}
// স্টেগার রিভিল
function stag(){qa('.tl,.ev,.pc,.wt,.stp span').forEach((e,i)=>{if(e.classList.contains('rv'))return;e.classList.add('rv');e.style.transitionDelay=(i%9)*70+'ms'});if(typeof obs!=='undefined')obs()}
stag();new MutationObserver(()=>{clearTimeout(stag.t);stag.t=setTimeout(stag,80)}).observe(document.body,{childList:true,subtree:true});
// ৩ডি টিল (মাউস/টাচ)
let cur=null;
function tilt(e){const el=e.target.closest('.tl,.wt,.pc,.stats>div');if(cur&&cur!==el)rst(cur);if(!el)return;cur=el;const b=el.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;el.style.transition='transform .08s';el.style.transform=`perspective(500px) rotateX(${-y*14}deg) rotateY(${x*14}deg) translateZ(6px)`}
function rst(el){el.style.transition='transform .4s';el.style.transform='';cur=null}
addEventListener('pointermove',tilt,{passive:true});addEventListener('pointerup',()=>cur&&rst(cur));addEventListener('pointerleave',()=>cur&&rst(cur));document.addEventListener('pointerout',e=>{if(cur&&!cur.contains(e.relatedTarget))rst(cur)});
// ট্যাব বদলালে নতুন সেকশনের কার্ড সাথে সাথে ভেসে আসে
qa('nav button').forEach(b=>b.addEventListener('click',()=>setTimeout(stag,50)));
})();
