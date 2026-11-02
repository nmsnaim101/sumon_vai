const S={i:null,o:null,x:0,y:0,z:1,r:0,sq:0,tr:0,t:0},E=$('ed'),P=new Map();let d0=0;
const eh=s=>String(s??'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])),tl=s=>{s=String(s).replace(/[০-৯]/g,d=>'০১২৩৪৫৬৭৮৯'.indexOf(d)).replace(/\D/g,'');return s[0]=='0'?'+88'+s:'+'+s};
$('bio').textContent=CFG.bio;$('pl').innerHTML=CFG.pledges.map(p=>`<details class="pd"><summary>${eh(p.t)}</summary><p>${eh(p.d)}</p></details>`).join('');
$('mf').innerHTML=CFG.pledges.map((p,i)=>`<details class="card"${i?'':' open'}><summary><b>${eh(p.t)}</b></summary><p>${eh(p.d)}</p><ul>${p.pts.map(x=>`<li>${eh(x)}</li>`).join('')}</ul><div class="more">${(p.more||[]).map(t=>`<p>${eh(t)}</p>`).join('')}</div></details>`).join('');
document.querySelector('.stats div:last-child b').dataset.n=CFG.pledges.length;
$('dlead').textContent=CFG.drug.lead;$('dp').innerHTML=CFG.drug.pts.map(t=>`<li>${eh(t)}</li>`).join('');
$('dm').innerHTML=(CFG.drug.more||[]).map(s=>`<h3>${eh(s[0])}</h3><p>${eh(s[1])}</p>`).join('');$('dc').onclick=()=>{document.querySelector('nav button[data-t=form]').click();$('ft').value='স্বেচ্ছাসেবক হতে চাই'};
$('gs').innerHTML=CFG.guide.map(g=>`<li><b>${eh(g.t)}</b><br><small>${eh(g.d)}</small></li>`).join('');$('gs').onclick=e=>{const l=e.target.closest('li');if(l)l.classList.toggle('done')};
$('gn').innerHTML=CFG.notes.map(n=>`<li>${eh(n)}</li>`).join('');
if(CFG.voteDate){$('gd').style.display='block';$('gd').innerHTML='<b>তারিখ ও সময়:</b> '+eh(CFG.voteDate)}
if(CFG.video){$('vid').style.display='block';$('vid').dataset.v=CFG.video}
$('of').textContent=CFG.office;$('of').href='tel:'+tl(CFG.office);$('ct').innerHTML=`${eh(CFG.contact)} — <a href="tel:${CFG.tel}">${eh(CFG.phone)}</a>`;
$('ph').href='tel:'+CFG.tel;$('ph').insertAdjacentHTML('afterend',` (${CFG.contact}) · <a href="https://wa.me/${CFG.tel.slice(1)}">হোয়াটসঅ্যাপ</a>`);
img(CFG.photo).then(i=>{if(!i){$('av').style.backgroundImage='';$('av').textContent='👤'}});
function sup(x,cx,cy,r){x.save();x.beginPath();S.sq?x.rect(cx-r,cy-r,2*r,2*r):x.arc(cx,cy,r,0,7);x.clip();
 if(!S.tr){x.fillStyle='#cfd8d3';x.fillRect(cx-r,cy-r,2*r,2*r)}
 if(S.i){const i=S.i,w=S.r%2?i.height:i.width,h=S.r%2?i.width:i.height,s=Math.max(2*r/w,2*r/h)*S.z;x.translate(cx+S.x*r,cy+S.y*r);x.rotate(S.r*Math.PI/2);x.drawImage(i,-i.width*s/2,-i.height*s/2,i.width*s,i.height*s)}
 x.restore();x.lineWidth=r/20;x.strokeStyle='#fff';x.beginPath();S.sq?x.rect(cx-r,cy-r,2*r,2*r):x.arc(cx,cy,r,0,7);x.stroke()}
const ped=()=>{const x=E.getContext('2d');x.clearRect(0,0,300,300);sup(x,150,150,140)},rs=()=>{S.x=S.y=S.r=0;S.z=1;$('zm').value=1;ped()};
E.onpointerdown=e=>{E.setPointerCapture(e.pointerId);P.set(e.pointerId,[e.clientX,e.clientY]);d0=0};
E.onpointermove=e=>{if(!P.has(e.pointerId))return;const o=P.get(e.pointerId),k=300/E.getBoundingClientRect().width/140;P.set(e.pointerId,[e.clientX,e.clientY]);
 if(P.size==1){S.x+=(e.clientX-o[0])*k;S.y+=(e.clientY-o[1])*k}
 else{const[a,b]=[...P.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(d0)S.z=Math.min(4,Math.max(1,S.z*d/d0));d0=d;$('zm').value=S.z}ped()};
E.onpointerup=E.onpointercancel=e=>{P.delete(e.pointerId);d0=0};
E.onwheel=e=>{e.preventDefault();S.z=Math.min(4,Math.max(1,S.z*(e.deltaY<0?1.06:.94)));$('zm').value=S.z;ped()};
$('zm').oninput=e=>{S.z=+e.target.value;ped()};$('rt').onclick=()=>{S.r=(S.r+1)%4;ped()};$('sq').onclick=()=>{S.sq^=1;ped()};$('rs').onclick=rs;
$('pf').onchange=e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{S.i=S.o=im;S.tr=/png|webp/i.test(f.type)?1:0;$('bg').textContent='✨ ব্যাকগ্রাউন্ড মুছুন (ঐচ্ছিক)';rs()};im.src=URL.createObjectURL(f)};
$('bg').onclick=async()=>{const b=$('bg'),t0='✨ ব্যাকগ্রাউন্ড মুছুন (ঐচ্ছিক)';
 if(S.tr){S.i=S.o;S.tr=0;b.textContent=t0;return ped()}
 if(!S.o)return toast('আগে ছবি দিন');
 if(!confirm('প্রথমবার বড় ফাইল ডাউনলোড হবে, ভালো নেট বা Wi-Fi থাকলে ভালো। চালিয়ে যাবেন?'))return;
 b.textContent='⏳ লোড হচ্ছে…';
 try{const m=await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.6.0/+esm'),bl=await m.removeBackground(S.o.src,{progress:(k,c,t)=>b.textContent='⏳ '+Math.round(c/t*100)+'%'}),im=new Image();
  im.onload=()=>{S.i=im;S.tr=1;b.textContent='↩ আগের ছবি';ped()};im.src=URL.createObjectURL(bl)}catch(e){b.textContent=t0;toast('ব্যাকগ্রাউন্ড মোছা যায়নি — নিচের লিংকের সাইট ব্যবহার করুন');$('bl').open=true}};
const TP=['১ · সোনালী সবুজ','২ · নীল আধুনিক','৩ · বিজয় পতাকা','৪ · সবুজ-হলুদ','৫ · রাজকীয় মেরুন','প্রোফাইল ফ্রেম'],ND=5;
$('tp').innerHTML=TP.map((t,i)=>`<button data-i="${i}" class="${i?'':'on'}">${i<ND?'<canvas width="108" height="135"></canvas>':''}<span>${t}</span></button>`).join('');
$('tp').onclick=e=>{const b=e.target.closest('button');if(!b)return;S.t=+b.dataset.i;[...$('tp').children].forEach(c=>c.classList.toggle('on',c==b))};
async function draw(t,c,nm){const[cp,sy,hr,hc,lt,...lp]=await Promise.all([img(CFG.photo),img(CFG.symbolImg),img(CFG.hero||CFG.photo),img(CFG.heroCut),img(CFG.late),...CFG.leaders.map(img)]);await document.fonts.load('700 30px BnEmbed');
 const x=c.getContext('2d'),W=1080,H=t<ND?1350:W,C=CFG.color,foot='প্রচারে: '+CFG.union+'ের সর্বস্তরের জনগণ।',bis='বিসমিল্লাহির রাহমানির রাহীম',pm=(CFG.pet||CFG.name)+'কে চেয়ারম্যান হিসেবে দেখতে চাই';c.width=W;c.height=H;x.textAlign='center';x.textBaseline='alphabetic';
 const rr=(a,b,w,h,r)=>{x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()},
 sh=(b,a)=>{x.shadowColor='rgba(0,0,0,'+(a||.45)+')';x.shadowBlur=b||18},
 lg=(x0,y0,x1,y1,s)=>{const g=x.createLinearGradient(x0,y0,x1,y1);s.forEach((v,i)=>g.addColorStop(i/(s.length-1),v));return g},
 st=(s,cx,y,px,w,f,k,lw,wt)=>{let z=px;do{x.font=(wt||'700')+' '+z+'px '+F;z-=2}while(x.measureText(s).width>w&&z>16);if(lw){x.lineJoin='round';x.lineWidth=lw;x.strokeStyle=k;x.strokeText(s,cx,y)}x.fillStyle=f;x.fillText(s,cx,y)},
 ring=(cx,cy,r,col,lw)=>{x.lineWidth=lw;x.strokeStyle=col;x.beginPath();x.arc(cx,cy,r,0,7);x.stroke()},
 pic=(i,cx,cy,r,g,g2,lw)=>{lw=lw||6;x.save();sh();x.fillStyle=g;x.beginPath();x.arc(cx,cy,r+lw,0,7);x.fill();x.restore();cover(x,i,cx,cy,r);ring(cx,cy,r,g2||g,lw)},
 dun=(cx,cy,r,g,g2)=>{if(lt)pic(lt,cx,cy,r,g,g2||g,7)},
 spic=(cx,cy,r,g,g2)=>{x.save();sh();x.fillStyle=g;x.beginPath();S.sq?x.rect(cx-r-6,cy-r-6,2*r+12,2*r+12):x.arc(cx,cy,r+6,0,7);x.fill();x.restore();sup(x,cx,cy,r);x.lineWidth=6;x.strokeStyle=g2||g;x.beginPath();S.sq?x.rect(cx-r,cy-r,2*r,2*r):x.arc(cx,cy,r,0,7);x.stroke()},
 man=(cx,bot,h)=>{const i=hc||hr;if(!i)return;const w=h*i.width/i.height;x.save();sh(26,.5);x.drawImage(i,cx-w/2,bot-h,w,h);x.restore()},
 pill=(cx,y,w,h,f,k,lw)=>{x.save();sh(12,.4);rr(cx-w/2,y,w,h,h/2);x.fillStyle=f;x.fill();x.restore();if(lw){rr(cx-w/2,y,w,h,h/2);x.lineWidth=lw;x.strokeStyle=k;x.stroke()}},
 sym=(cx,cy,h)=>{x.fillStyle='#fff';x.beginPath();x.roundRect(cx-h*1.1,cy-h/2-8,h*2.2,h+16,16);x.fill();if(sy){const s=Math.min(h/sy.height,h*2/sy.width);x.drawImage(sy,cx-sy.width*s/2,cy-sy.height*s/2,sy.width*s,sy.height*s)}else{x.fillStyle='#14211b';txt(x,CFG.symbol,cx,cy+h*.18,h*.6,h*2)}},
 sbg=(cx,cy,h)=>{if(sy){x.save();x.fillStyle='#fff';x.beginPath();x.arc(cx,cy,h*.62,0,7);x.fill();const s=Math.min(h/sy.height,h/sy.width);x.drawImage(sy,cx-sy.width*s/2,cy-sy.height*s/2,sy.width*s,sy.height*s);x.restore()}};
 nm=nm||'সমর্থক';
 if(t==0){const G='#c8962e',G2='#f0c75e';
  let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,C);g.addColorStop(.55,'#07382a');g.addColorStop(1,'#031a12');x.fillStyle=g;x.fillRect(0,0,W,H);
  let rg=x.createRadialGradient(540,600,60,540,600,680);rg.addColorStop(0,'rgba(255,255,255,.22)');rg.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=rg;x.fillRect(0,0,W,H);
  x.save();x.globalAlpha=.06;x.fillStyle='#fff';for(let i=-2;i<12;i++){x.beginPath();x.moveTo(i*120,0);x.lineTo(i*120+55,0);x.lineTo(i*120-475,H);x.lineTo(i*120-530,H);x.fill()}x.restore();
  x.strokeStyle=G;x.lineWidth=6;x.strokeRect(22,22,W-44,H-44);x.lineWidth=2;x.strokeRect(38,38,W-76,H-76);
  const gp=(i,cx,cy,r)=>pic(i,cx,cy,r,G,G2,6),
  rp=(i,a,b,w,h,r)=>{x.save();sh(20);rr(a,b,w,h,r);x.fillStyle=G;x.fill();x.restore();x.save();rr(a+5,b+5,w-10,h-10,r-4);x.clip();if(i){const s=Math.max((w-10)/i.width,(h-10)/i.height);x.drawImage(i,a+5+(w-10-i.width*s)/2,b+5,i.width*s,i.height*s)}else{x.fillStyle='#cfd8d3';x.fillRect(a,b,w,h)}x.restore()},
  plate=(cx,y,w,t1)=>{const h=72;x.save();sh(14,.5);rr(cx-w/2,y,w,h,22);x.fillStyle=lg(0,y,0,y+h,['#0f7a59','#053a2a']);x.fill();x.restore();rr(cx-w/2,y,w,h,22);x.lineWidth=4;x.strokeStyle=G;x.stroke();x.fillStyle='#fff';txt(x,t1,cx,y+50,42,w-34,'700')};
  x.fillStyle=G2;txt(x,bis,540,92,42,W-160,'600');
  x.save();sh(12,.4);rr(90,118,900,76,38);x.fillStyle=lg(0,118,0,194,[G2,G]);x.fill();x.restore();x.fillStyle='#0a3d2d';txt(x,CFG.party||CFG.union,540,172,46,840,'700');
  gp(lp[0],118,290,58);gp(lp[1],250,290,58);gp(lp[2],382,290,58);
  x.fillStyle='#fff';txt(x,CFG.union,676,285,44,380);x.fillStyle=G2;txt(x,CFG.post,676,338,32,380,'600');
  dun(960,285,66,G,G2);
  rp(hr,85,420,330,440,30);plate(250,840,410,CFG.name);
  spic(745,712,190,G,G2);plate(745,885,420,nm);
  x.save();sh(10,.5);x.fillStyle='#fff';txt(x,pm,540,1016,62,W-120);x.restore();
  x.fillStyle=G2;txt(x,(CFG.tag1||'')+' '+(CFG.tag2||''),540,1078,46,W-120);
  x.save();sh(16,.5);rr(60,1110,960,190,30);x.fillStyle=lg(0,1110,0,1300,[G2,G]);x.fill();x.restore();
  if(sy){const w=140;x.drawImage(sy,90,1135,w,w*sy.height/sy.width)}
  x.fillStyle='#0a3d2d';txt(x,CFG.symbol,620,1210,68,720,'700');txt(x,CFG.slogan,620,1268,38,720,'600')}
 else if(t==1){ // নীল আধুনিক
  x.fillStyle=lg(0,0,0,H,['#6cc3f0','#dff3ff','#ffffff']);x.fillRect(0,0,W,H);
  x.fillStyle='rgba(255,255,255,.55)';[[800,430,340],[170,820,230],[1010,880,150]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fill()});
  x.save();x.globalAlpha=.07;x.fillStyle='#0b3a8c';for(let i=0;i<9;i++){x.beginPath();x.moveTo(i*150,0);x.lineTo(i*150+60,0);x.lineTo(i*150-340,H);x.lineTo(i*150-400,H);x.fill()}x.restore();
  man(752,1040,830);
  x.save();sh(26,.45);x.beginPath();x.moveTo(0,1005);x.bezierCurveTo(300,880,720,1120,W,950);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fillStyle=lg(0,900,0,H,['#1747b8','#06143d']);x.fill();x.restore();
  x.lineWidth=9;x.strokeStyle='#fff';x.beginPath();x.moveTo(0,984);x.bezierCurveTo(300,860,720,1100,W,930);x.stroke();
  pill(640,30,500,58,'#0d2f7a','#fff',3);x.fillStyle='#fff';txt(x,bis,640,70,32,460,'600');
  dun(120,135,84,'#fff','#2d6fe0');
  x.textAlign='left';x.fillStyle='#e11d2e';txt(x,'আসন্ন',40,290,48,300,'700');x.fillStyle='#0b2a6f';
  {let u=CFG.union;x.textAlign='left';st(u,40,360,66,500,'#0b2a6f','#fff',0);st('পরিষদ',40,425,56,500,'#0b2a6f','#fff',0);x.textAlign='center'}
  pill(255,455,420,76,lg(0,455,420,455,['#d6121f','#8a0b2a']),'#fff',4);x.fillStyle='#fff';txt(x,'নির্বাচনে',255,512,56,380,'700');
  x.save();sh(14,.45);x.beginPath();x.moveTo(40,570);x.lineTo(430,570);x.lineTo(470,625);x.lineTo(430,680);x.lineTo(40,680);x.closePath();x.fillStyle=lg(0,570,430,680,['#f9d423','#f2870d']);x.fill();x.restore();st('চেয়ারম্যান',255,650,66,360,'#7a0a2a','#fff',0);
  pill(185,700,250,52,'#117a52','#fff',3);x.fillStyle='#fff';txt(x,'পদপ্রার্থী',185,738,38,220,'700');
  [0,1,2].forEach(k=>pic(lp[k],262+k*106,150,44,'#fff','#2d6fe0',5));
  x.save();sh(14,.4);x.fillStyle='#d6121f';x.beginPath();x.arc(235,880,130,0,7);x.fill();x.restore();ring(235,880,118,'#ffd84d',5);
  spic(235,880,100,'#fff','#fff');
  pill(235,1000,330,62,'#fff','#2d6fe0',4);x.fillStyle='#0b2a6f';txt(x,nm,235,1044,40,300);
  st(CFG.name,540,1148,70,1000,'#ffe23a','#000',10);
  x.fillStyle='#fff';txt(x,'আপনাদের দোয়া ও সমর্থন প্রত্যাশী',540,1210,50,980,'600');
  x.fillStyle='#f4c542';txt(x,CFG.party||'',540,1262,34,1000,'600');
  x.fillStyle=lg(0,1292,W,1292,['#e11d8f','#5b1fa8']);x.fillRect(0,1292,W,58);x.fillStyle='#fff';txt(x,foot,540,1332,32,960,'600')}
 else if(t==2){ // বিজয় পতাকা
  x.fillStyle=lg(0,0,W,H,['#0b6b4d','#06402e']);x.fillRect(0,0,W,H);
  x.save();sh(30,.4);x.fillStyle='#d4202c';x.beginPath();x.arc(640,430,330,0,7);x.fill();x.restore();
  x.save();x.globalAlpha=.1;x.fillStyle='#fff';for(let i=0;i<8;i++){x.beginPath();x.arc(640,430,330+i*60,2.8,5.9);x.lineWidth=14;x.strokeStyle='#fff';x.stroke()}x.restore();
  man(690,980,860);
  x.save();sh(20,.4);x.beginPath();x.moveTo(0,740);x.bezierCurveTo(300,660,650,880,W,700);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fillStyle=lg(0,650,0,H,['#f4faf4','#cfe8d4']);x.fill();x.restore();
  x.fillStyle='#ffe9a8';txt(x,bis,540,70,40,W-200,'600');
  pic(lp[0],112,180,62,'#fff','#fff',5);pic(lp[1],250,180,62,'#fff','#fff',5);pic(lp[2],181,318,62,'#fff','#fff',5);
  spic(150,545,95,'#fff','#fff');pill(150,660,270,58,'#fff','#d4202c',4);x.fillStyle='#0b3d2d';txt(x,nm,150,701,36,240);
  // দুনু — নিচের বাম কোণে বড় প্রতিকৃতি
  if(lt){x.save();sh(26,.5);rr(30,845,360,360,34);x.fillStyle='#c8962e';x.fill();x.restore();x.save();rr(38,853,344,344,28);x.clip();x.drawImage(lt,38,853,344,344);x.restore();rr(38,853,344,344,28);x.lineWidth=5;x.strokeStyle='#f6dc8b';x.stroke()}
  x.fillStyle='#0b3d2d';x.textAlign='right';{x.font='700 40px '+F;x.fillText('আসন্ন',1040,790);st(CFG.union+' পরিষদ',1040,848,44,600,'#0b3d2d','#fff',0)}x.textAlign='center';
  st('নির্বাচনে',740,958,110,560,'#0b5d3f','#fff',12);
  x.save();sh(10,.35);x.fillStyle='#c8202d';x.fillRect(560,975,520,86);x.restore();x.fillStyle='#fff';txt(x,'চেয়ারম্যান',830,1042,68,440,'700');
  x.fillStyle='#14523a';x.fillRect(680,1070,400,56);x.fillStyle='#fff';txt(x,'পদপ্রার্থী',880,1112,40,340,'700');
  x.fillStyle='#14412f';x.textAlign='right';{st('আপনাদের দোয়া ও সমর্থন প্রত্যাশী',1040,1162,34,620,'#14412f','#fff',0)}x.textAlign='center';
  x.fillStyle=lg(0,1188,0,H,['#0d6a4a','#04281c']);x.fillRect(0,1188,W,162);
  x.save();x.beginPath();x.moveTo(0,1188);x.lineTo(W,1188);x.lineWidth=6;x.strokeStyle='#c8962e';x.stroke();x.restore();
  st(CFG.name,680,1262,64,500,'#ffe27a','#000',0);x.fillStyle='#fff';txt(x,CFG.party||'',680,1310,32,500,'600');
  sym(990,1262,50)}
 else if(t==3){ // সবুজ-হলুদ ডটস
  x.fillStyle=lg(0,0,W,H,['#cdeed3','#f6f3b2','#ffe46b']);x.fillRect(0,0,W,H);
  x.save();x.fillStyle='rgba(255,255,255,.75)';for(let r=0;r<22;r++)for(let q=0;q<14;q++){const R=Math.max(0,7-(r+q)*.22);if(R>.8){x.beginPath();x.arc(24+q*20+(r%2)*10,24+r*20,R,0,7);x.fill()}}x.restore();
  man(790,1060,860);
  pill(560,30,520,58,'#0d2f7a','#fff',3);x.fillStyle='#fff';txt(x,bis,560,70,32,480,'600');
  dun(100,130,72,'#fff','#13854f');
  x.textAlign='left';x.fillStyle='#d6121f';txt(x,'আসন্ন',40,262,50,300,'700');st('ইউনিয়ন',40,330,64,480,'#d6121f','#fff',0);st('পরিষদ',40,396,56,480,'#d6121f','#fff',0);x.textAlign='center';
  [['নি','#d6121f'],['র্বা','#13854f'],['চ','#d6121f'],['নে','#13854f']].forEach((a,k)=>{const cx=92+k*96;x.save();sh(8,.3);x.fillStyle='#fff';x.beginPath();x.arc(cx,478,42,0,7);x.fill();x.restore();ring(cx,478,40,a[1],7);x.fillStyle='#0d2f7a';txt(x,a[0],cx,498,54,66,'700')});
  x.save();sh(10,.35);rr(30,550,420,76,10);x.fillStyle='#117a52';x.fill();x.restore();x.fillStyle='#fff';txt(x,CFG.union,240,606,48,390,'700');
  x.save();sh(14,.45);x.beginPath();x.moveTo(30,650);x.lineTo(470,650);x.lineTo(500,715);x.lineTo(470,780);x.lineTo(30,780);x.closePath();x.fillStyle=lg(0,650,0,780,['#a3081f','#5e0716']);x.fill();x.restore();st('চেয়ারম্যান',255,745,76,400,'#ffd43b','#2b0007',6);
  pill(170,795,250,56,'#fff','#13854f',4);x.fillStyle='#117a52';txt(x,'পদপ্রার্থী',170,835,40,220,'700');
  [0,1,2].forEach(k=>pic(lp[k],70+k*92,905,38,'#fff','#13854f',4));
  x.save();sh(14,.4);x.fillStyle='#fff';x.beginPath();x.arc(405,895,98,0,7);x.fill();x.restore();ring(405,895,91,'#d6121f',8);spic(405,895,78,'#fff','#fff');
  x.save();sh(14,.5);rr(40,1020,1000,120,60);x.fillStyle=lg(0,0,W,0,['#e11d8f','#6a1b9a']);x.fill();x.restore();x.fillStyle='#fff';txt(x,CFG.name,540,1100,72,940,'700');
  st('আপনাদের সকলের দোয়া ও সমর্থন প্রত্যাশী।',540,1196,54,1000,'#e8321e','#fff',8);
  x.fillStyle='#0d2f7a';x.fillRect(0,1262,W,88);x.fillStyle='#fff';txt(x,pm,540,1300,38,1000,'700');x.fillStyle='#ffd43b';txt(x,foot,540,1336,26,1000,'600')}
 else if(t==4){ // রাজকীয় মেরুন
  x.fillStyle=lg(0,0,0,H,['#5a0b22','#2a0510','#14020a']);x.fillRect(0,0,W,H);
  let rg=x.createRadialGradient(540,520,40,540,520,700);rg.addColorStop(0,'rgba(255,214,120,.28)');rg.addColorStop(1,'rgba(255,214,120,0)');x.fillStyle=rg;x.fillRect(0,0,W,H);
  x.save();x.globalAlpha=.07;x.strokeStyle='#f0c75e';x.lineWidth=2;for(let a=-1;a<14;a++)for(let b=-1;b<17;b++){x.save();x.translate(a*90+(b%2)*45,b*90);x.rotate(Math.PI/4);x.strokeRect(-22,-22,44,44);x.restore()}x.restore();
  const G='#c8962e',G2='#f0c75e';x.strokeStyle=G;x.lineWidth=6;x.strokeRect(22,22,W-44,H-44);x.lineWidth=2;x.strokeRect(38,38,W-76,H-76);
  x.fillStyle=G2;txt(x,bis,540,100,42,W-200,'600');
  x.fillStyle='#fff';txt(x,'আসন্ন '+CFG.union,540,176,60,W-140,'700');x.fillStyle=G2;txt(x,'ইউনিয়ন পরিষদ নির্বাচন',540,236,40,W-200,'600');
  // আর্চ
  const ax=290,ay=275,aw=500,ah=560,arch=()=>{x.beginPath();x.moveTo(ax,ay+ah);x.lineTo(ax,ay+aw/2);x.arc(ax+aw/2,ay+aw/2,aw/2,Math.PI,0);x.lineTo(ax+aw,ay+ah);x.closePath()};
  x.save();sh(30,.6);arch();x.fillStyle=G;x.fill();x.restore();
  x.save();x.translate(0,0);arch();x.save();x.clip();x.fillStyle=lg(0,ay,0,ay+ah,['#fff4d6','#f0c75e']);x.fillRect(ax-10,ay-10,aw+20,ah+20);man(540,ay+ah+10,ah+40);x.restore();x.restore();
  arch();x.lineWidth=10;x.strokeStyle=G2;x.stroke();
  [0,1,2].forEach(k=>pic(lp[k],150,350+k*165,68,G,G2,6));
  dun(930,265,92,G,G2);
  spic(930,560,92,G,G2);pill(915,675,220,56,lg(0,0,0,56,['#0f7a59','#053a2a']),G,3);x.fillStyle='#fff';txt(x,nm,915,714,34,196);
  x.save();sh(12,.5);x.beginPath();x.moveTo(150,850);x.lineTo(930,850);x.lineTo(960,895);x.lineTo(930,940);x.lineTo(150,940);x.lineTo(120,895);x.closePath();x.fillStyle=lg(0,850,0,940,[G2,G]);x.fill();x.restore();x.fillStyle='#4a0a1d';txt(x,CFG.post,540,918,56,700,'700');
  st(CFG.name,540,1032,76,980,'#fff','#000',0);
  x.fillStyle=G2;txt(x,'আপনাদের দোয়া ও সমর্থন প্রত্যাশী',540,1096,46,980,'600');
  x.fillStyle='#fff';txt(x,CFG.party||'',540,1150,34,980,'500');
  x.save();sh(16,.5);rr(60,1180,960,120,30);x.fillStyle=lg(0,1180,0,1300,[G2,G]);x.fill();x.restore();
  if(sy){const w=100;x.drawImage(sy,92,1188,w,w*sy.height/sy.width)}
  x.fillStyle='#4a0a1d';txt(x,CFG.symbol+' · '+CFG.slogan,610,1252,46,780,'700');txt(x,foot,610,1290,24,780,'600')}
 else{x.fillStyle='#fff';x.fillRect(0,0,W,W);sup(x,540,540,520);x.lineWidth=44;x.strokeStyle=C;x.beginPath();x.arc(540,540,516,0,7);x.stroke();x.fillStyle=C;x.fillRect(150,850,780,120);x.fillStyle='#fff';txt(x,'আমি '+CFG.name+' এর সমর্থক',540,925,52,720)}}
const un=()=>$('un').value.trim()||'সমর্থক';
async function thumbs(){const o=document.createElement('canvas');for(let i=0;i<ND;i++){try{await draw(i,o,'সমর্থক');const t=$('tp').children[i].querySelector('canvas');t.getContext('2d').drawImage(o,0,0,108,135)}catch(e){}}}
setTimeout(thumbs,700);
const cap=()=>`আমি ${CFG.name} কে সমর্থন করি। ${CFG.slogan}\n${CFG.site}`,
 save=(b)=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='support.png';document.body.appendChild(a);a.click();a.remove()};
async function out(k){const b=await new Promise(r=>$('cv').toBlob(r,'image/png')),f=new File([b],'support.png',{type:'image/png'});
 try{navigator.clipboard.writeText(cap())}catch(e){}
 if(k=='d'){save(b);if(!R.classList.contains('nm'))boom();return toast('ছবি ডাউনলোড হচ্ছে')}
 if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text:cap()})}catch(e){}return}
 save(b);toast('ছবি সেভ হয়েছে, ক্যাপশন কপি হয়েছে। পোস্টে ছবি ও ক্যাপশন দিন');
 setTimeout(()=>open(k=='f'?'https://www.facebook.com/':'https://wa.me/?text='+encodeURIComponent(cap())),1200)}
$('mk').onclick=async()=>{const b=$('mk'),c=$('cv');b.classList.add('load');const w=document.createElement('canvas');await draw(S.t,w,un());c.width=w.width;c.height=w.height;c.getContext('2d').drawImage(w,0,0);c.style.display='block';$('ac').style.display='block';b.classList.remove('load');c.scrollIntoView({behavior:'smooth',block:'center'});toast('তৈরি হয়েছে ✓')};
$('d1').onclick=()=>out('d');$('d2').onclick=()=>out('f');$('d3').onclick=()=>out('w');ped();
