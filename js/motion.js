// হিরোর স্লোগান কনফিগ থেকে বসানো (সংযত, একটাই প্রবেশ-অ্যানিমেশন CSS-এ আছে)
(function(){if(typeof CFG==='undefined')return;const h=document.getElementById('hsl');if(!h||!CFG.slogan)return;
 const p=String(CFG.slogan).split(/[,،]\s*/).filter(Boolean);if(p.length<2||p.length>3)return;
 h.innerHTML=p.map((x,i)=>'<span>'+x.replace(/[<>&]/g,'')+(i<p.length-1?',':'')+'</span>').join('')})();
