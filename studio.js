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
function simg(x,cx,cy,r){if(S.i){const i=S.i,w=S.r%2?i.height:i.width,h=S.r%2?i.width:i.height,s=Math.max(2*r/w,2*r/h)*S.z;x.save();x.translate(cx+S.x*r,cy+S.y*r);x.rotate(S.r*Math.PI/2);x.drawImage(i,-i.width*s/2,-i.height*s/2,i.width*s,i.height*s);x.restore()}}
function sup(x,cx,cy,r){x.save();x.beginPath();S.sq?x.rect(cx-r,cy-r,2*r,2*r):x.arc(cx,cy,r,0,7);x.clip();
 if(!S.tr||!S.i){x.fillStyle=S.i?'#cfd8d3':'#f4f7f5';x.fillRect(cx-r,cy-r,2*r,2*r)}
 simg(x,cx,cy,r);
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
const TP=['১ · সার্বজনীন','২ · নেতৃবৃন্দসহ','৩ · নীল আধুনিক','৪ · বিজয় পতাকা','৫ · সবুজ-হলুদ','৬ · রাজকীয় মেরুন','প্রোফাইল ফ্রেম'],ND=6,ORD=[0,5,1,2,3,4,6];
$('tp').innerHTML=TP.map((t,i)=>`<button data-i="${i}" class="${i?'':'on'}">${i<ND?'<canvas width="108" height="135"></canvas>':''}<span>${t}</span></button>`).join('');
$('tp').onclick=e=>{const b=e.target.closest('button');if(!b)return;S.t=+b.dataset.i;[...$('tp').children].forEach(c=>c.classList.toggle('on',c==b))};
async function draw(t0,c,nm,ds){const t=ORD[t0],[cp,sy,hr,hc,lt,b2,...lp]=await Promise.all([img(CFG.photo),img(CFG.symbolImg),img(CFG.hero||CFG.photo),img(CFG.heroCut),img(CFG.late),img(CFG.banner2||'img/banner2.jpg'),...CFG.leaders.map(img)]);await document.fonts.load('700 30px BnEmbed');
 const x=c.getContext('2d'),W=1080,H=t0<ND?(t==5?1440:1350):W,C=CFG.color,foot='প্রচারে: '+CFG.union+'ের সর্বস্তরের জনগণ।',bis='বিসমিল্লাহির রাহমানির রাহীম',pm=(CFG.pet||CFG.name)+'কে চেয়ারম্যান হিসেবে দেখতে চাই';c.width=W;c.height=H;x.textAlign='center';x.textBaseline='alphabetic';
 const rr=(a,b,w,h,r)=>{x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()},
 sh=(b,a)=>{x.shadowColor='rgba(0,0,0,'+(a||.45)+')';x.shadowBlur=b||18},
 lg=(x0,y0,x1,y1,s)=>{const g=x.createLinearGradient(x0,y0,x1,y1);s.forEach((v,i)=>g.addColorStop(i/(s.length-1),v));return g},
 st=(s,cx,y,px,w,f,k,lw,wt)=>{let z=px;do{x.font=(wt||'700')+' '+z+'px '+F;z-=2}while(x.measureText(s).width>w&&z>16);if(lw){x.lineJoin='round';x.lineWidth=lw;x.strokeStyle=k;x.strokeText(s,cx,y)}x.fillStyle=f;x.fillText(s,cx,y)},
 ring=(cx,cy,r,col,lw)=>{x.lineWidth=lw;x.strokeStyle=col;x.beginPath();x.arc(cx,cy,r,0,7);x.stroke()},
 pic=(i,cx,cy,r,g,g2,lw)=>{lw=lw||6;x.save();sh();x.fillStyle=g;x.beginPath();x.arc(cx,cy,r+lw,0,7);x.fill();x.restore();cover(x,i,cx,cy,r);ring(cx,cy,r,g2||g,lw)},
 dun=(cx,cy,r,g,g2)=>{if(lt)pic(lt,cx,cy,r,g,g2||g,7)},
 spic=(cx,cy,r,g,g2)=>{x.save();sh();x.fillStyle=g;x.beginPath();S.sq?x.rect(cx-r-6,cy-r-6,2*r+12,2*r+12):x.arc(cx,cy,r+6,0,7);x.fill();x.restore();sup(x,cx,cy,r);x.lineWidth=6;x.strokeStyle=g2||g;x.beginPath();S.sq?x.rect(cx-r,cy-r,2*r,2*r):x.arc(cx,cy,r,0,7);x.stroke()},
 cpic=(cx,cy,r,bg,g2,lw)=>{lw=lw||7;const i=hc||hr;x.save();sh();x.fillStyle=g2;x.beginPath();x.arc(cx,cy,r+lw,0,7);x.fill();x.restore();x.save();x.beginPath();x.arc(cx,cy,r,0,7);x.clip();x.fillStyle=bg;x.fillRect(cx-r,cy-r,2*r,2*r);if(i){if(hc){const w=2.1*r,h=w*i.height/i.width;x.drawImage(i,cx-w/2,cy-r*.9,w,h)}else{const k=Math.max(2*r/i.width,2*r/i.height);x.drawImage(i,cx-i.width*k/2,cy-i.height*k/2,i.width*k,i.height*k)}}x.restore();ring(cx,cy,r,g2,lw)}, // চেয়ারম্যানের গোল ছবি (দ্বিতীয় বড়)
 man=(cx,bot,h)=>{const i=hc||hr;if(!i)return;const w=h*i.width/i.height;x.save();sh(26,.5);x.drawImage(i,cx-w/2,bot-h,w,h);x.restore()},
 pill=(cx,y,w,h,f,k,lw)=>{x.save();sh(12,.4);rr(cx-w/2,y,w,h,h/2);x.fillStyle=f;x.fill();x.restore();if(lw){rr(cx-w/2,y,w,h,h/2);x.lineWidth=lw;x.strokeStyle=k;x.stroke()}},
 sym=(cx,cy,h)=>{x.fillStyle='#fff';x.beginPath();x.roundRect(cx-h*1.1,cy-h/2-8,h*2.2,h+16,16);x.fill();if(sy){const s=Math.min(h/sy.height,h*2/sy.width);x.drawImage(sy,cx-sy.width*s/2,cy-sy.height*s/2,sy.width*s,sy.height*s)}else{x.fillStyle='#14211b';txt(x,CFG.symbol,cx,cy+h*.18,h*.6,h*2)}},
 sbg=(cx,cy,h)=>{if(sy){x.save();x.fillStyle='#fff';x.beginPath();x.arc(cx,cy,h*.62,0,7);x.fill();const s=Math.min(h/sy.height,h/sy.width);x.drawImage(sy,cx-sy.width*s/2,cy-sy.height*s/2,sy.width*s,sy.height*s);x.restore()}},
 tag=(cx,y,w,f,k,tc)=>{let yy=y;if(nm){pill(cx,yy,w,56,f,k,4);x.fillStyle=tc;txt(x,nm,cx,yy+40,38,w-30);yy+=64}if(ds){pill(cx,yy,w-30,44,'#ffe27a','#b07d12',3);x.fillStyle='#4a0a1d';txt(x,ds,cx,yy+32,28,w-60,'600')}};
 nm=nm||'';ds=ds||'';
 if(t==0){ // সার্বজনীন — প্রতীক/দল/নেতা ছাড়া
  x.fillStyle=lg(0,0,0,H,['#5fd0c0','#d9f5ee','#ffffff']);x.fillRect(0,0,W,H);
  x.fillStyle='rgba(255,255,255,.55)';[[860,470,330],[150,820,220],[1010,900,150]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fill()});
  x.save();x.globalAlpha=.07;x.fillStyle='#0a5c43';for(let i=0;i<9;i++){x.beginPath();x.moveTo(i*150,0);x.lineTo(i*150+60,0);x.lineTo(i*150-340,H);x.lineTo(i*150-400,H);x.fill()}x.restore();
  x.save();sh(26,.45);x.beginPath();x.moveTo(0,1005);x.bezierCurveTo(300,885,720,1120,W,950);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fillStyle=lg(0,900,0,H,['#0d7a57','#04271c']);x.fill();x.restore();
  x.lineWidth=9;x.strokeStyle='#fff';x.beginPath();x.moveTo(0,984);x.bezierCurveTo(300,864,720,1100,W,930);x.stroke();
  pill(540,28,520,56,'#0a4a37','#fff',3);x.fillStyle='#fff';txt(x,bis,540,66,32,480,'600');
  dun(540,196,104,'#fff','#0f7a59');
  x.save();x.translate(0,-70);
  x.fillStyle='#e11d2e';txt(x,'আসন্ন',850,345,46,380,'700');
  st(CFG.union,850,410,60,380,'#0a3d2d','#fff',0);st('পরিষদ',850,470,54,420,'#0a3d2d','#fff',0);
  pill(850,492,380,64,lg(0,492,380,492,['#d6121f','#8a0b2a']),'#fff',4);x.fillStyle='#fff';txt(x,'নির্বাচনে',850,543,50,340,'700');
  x.save();sh(14,.45);x.beginPath();x.moveTo(660,575);x.lineTo(1030,575);x.lineTo(1010,615);x.lineTo(1030,655);x.lineTo(660,655);x.lineTo(680,615);x.closePath();x.fillStyle=lg(0,575,370,655,['#f9d423','#f2870d']);x.fill();x.restore();st('চেয়ারম্যান',845,637,58,320,'#7a0a2a','#fff',0);
  pill(850,672,230,48,'#117a52','#fff',3);x.fillStyle='#fff';txt(x,'পদপ্রার্থী',850,706,36,200,'700');
  x.restore();
  cpic(850,825,150,lg(0,675,0,975,['#bfeee2','#ffffff']),'#0f7a59',8);
  x.save();sh(26,.45);x.fillStyle='#fff';x.beginPath();x.arc(335,735,330,0,7);x.fill();x.restore();ring(335,735,320,'#0f7a59',8);spic(335,735,310,'#fff','#fff');
  tag(335,1030,340,'#fff','#0f7a59','#0a3d2d');
  st(pm,540,1184,52,1000,'#ffe23a','#000',10);
  st(CFG.name,540,1234,44,1000,'#fff','#000',6);
  x.fillStyle='#fff';txt(x,'আপনাদের দোয়া ও সমর্থন প্রত্যাশী',540,1274,32,980,'600');
  x.fillStyle=lg(0,1292,W,1292,['#0f7a59','#c8962e']);x.fillRect(0,1292,W,58);x.fillStyle='#fff';txt(x,foot,540,1332,30,960,'600')}
 else if(t==1){ // নীল আধুনিক
  x.fillStyle=lg(0,0,0,H,['#6cc3f0','#dff3ff','#ffffff']);x.fillRect(0,0,W,H);
  x.fillStyle='rgba(255,255,255,.55)';[[800,430,340],[170,820,230],[1010,880,150]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fill()});
  x.save();x.globalAlpha=.07;x.fillStyle='#0b3a8c';for(let i=0;i<9;i++){x.beginPath();x.moveTo(i*150,0);x.lineTo(i*150+60,0);x.lineTo(i*150-340,H);x.lineTo(i*150-400,H);x.fill()}x.restore();
  x.save();sh(26,.45);x.beginPath();x.moveTo(0,1005);x.bezierCurveTo(300,880,720,1120,W,950);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fillStyle=lg(0,900,0,H,['#1747b8','#06143d']);x.fill();x.restore();
  x.lineWidth=9;x.strokeStyle='#fff';x.beginPath();x.moveTo(0,984);x.bezierCurveTo(300,860,720,1100,W,930);x.stroke();
  pill(640,30,500,58,'#0d2f7a','#fff',3);x.fillStyle='#fff';txt(x,bis,640,70,32,460,'600');
  dun(120,135,84,'#fff','#2d6fe0');
  x.save();x.translate(0,-40);x.textAlign='left';x.fillStyle='#e11d2e';txt(x,'আসন্ন',40,290,48,300,'700');x.fillStyle='#0b2a6f';
  {let u=CFG.union;x.textAlign='left';st(u,40,360,66,500,'#0b2a6f','#fff',0);st('পরিষদ',40,425,56,500,'#0b2a6f','#fff',0);x.textAlign='center'}
  pill(255,455,420,76,lg(0,455,420,455,['#d6121f','#8a0b2a']),'#fff',4);x.fillStyle='#fff';txt(x,'নির্বাচনে',255,512,56,380,'700');
  x.save();sh(14,.45);x.beginPath();x.moveTo(40,570);x.lineTo(430,570);x.lineTo(470,625);x.lineTo(430,680);x.lineTo(40,680);x.closePath();x.fillStyle=lg(0,570,430,680,['#f9d423','#f2870d']);x.fill();x.restore();st('চেয়ারম্যান',255,650,66,360,'#7a0a2a','#fff',0);
  pill(185,700,250,52,'#117a52','#fff',3);x.fillStyle='#fff';txt(x,'পদপ্রার্থী',185,738,38,220,'700');x.restore();
  [0,1,2].forEach(k=>pic(lp[k],262+k*106,150,44,'#fff','#2d6fe0',5));
  cpic(215,885,150,lg(0,735,0,1035,['#cfe9ff','#ffffff']),'#2d6fe0',8);
  x.save();sh(26,.45);x.fillStyle='#d6121f';x.beginPath();x.arc(775,815,295,0,7);x.fill();x.restore();ring(775,815,283,'#ffd84d',6);spic(775,815,270,'#fff','#fff');
  tag(775,1030,330,'#fff','#2d6fe0','#0b2a6f');
  st(CFG.name,540,1188,64,1000,'#ffe23a','#000',10);
  x.fillStyle='#fff';txt(x,'আপনাদের দোয়া ও সমর্থন প্রত্যাশী',540,1238,42,980,'600');
  x.fillStyle='#f4c542';txt(x,CFG.party||'',540,1278,30,1000,'600');
  x.fillStyle=lg(0,1292,W,1292,['#e11d8f','#5b1fa8']);x.fillRect(0,1292,W,58);x.fillStyle='#fff';txt(x,foot,540,1332,32,960,'600')}
 else if(t==2){ // বিজয় পতাকা
  x.fillStyle=lg(0,0,W,H,['#0b6b4d','#06402e']);x.fillRect(0,0,W,H);
  x.save();x.globalAlpha=.1;x.fillStyle='#fff';for(let i=0;i<8;i++){x.beginPath();x.arc(540,560,260+i*60,2.8,5.9);x.lineWidth=14;x.strokeStyle='#fff';x.stroke()}x.restore();
  x.save();sh(20,.4);x.beginPath();x.moveTo(0,740);x.bezierCurveTo(300,660,650,880,W,700);x.lineTo(W,H);x.lineTo(0,H);x.closePath();x.fillStyle=lg(0,650,0,H,['#f4faf4','#cfe8d4']);x.fill();x.restore();
  x.fillStyle='#ffe9a8';txt(x,bis,540,70,40,W-200,'600');
  dun(135,165,100,'#fff','#ffe27a');[0,1,2].forEach(k=>pic(lp[k],300+k*112,150,50,'#fff','#fff',5));
  st('আসন্ন '+CFG.union+' পরিষদ',540,330,46,900,'#fff','#000',0);
  st('নির্বাচনে',540,450,110,700,'#ffe27a','#073a29',12);
  x.save();sh(10,.35);x.fillStyle='#c8202d';x.fillRect(290,480,500,86);x.restore();x.fillStyle='#fff';txt(x,'চেয়ারম্যান',540,547,68,440,'700');
  x.save();sh(8,.3);x.fillStyle='#fff';x.fillRect(370,578,340,54);x.restore();x.fillStyle='#14523a';txt(x,'পদপ্রার্থী',540,618,40,300,'700');
  x.fillStyle='#fff';txt(x,'আপনাদের দোয়া ও সমর্থন প্রত্যাশী',350,666,34,540,'600');
  cpic(190,890,155,lg(0,735,0,1045,['#e9f6ec','#ffffff']),'#d4202c',8);
  x.save();sh(30,.4);x.fillStyle='#d4202c';x.beginPath();x.arc(800,895,280,0,7);x.fill();x.restore();spic(800,895,256,'#fff','#fff');tag(800,1078,320,'#fff','#d4202c','#0b3d2d');
  x.fillStyle=lg(0,1188,0,H,['#0d6a4a','#04281c']);x.fillRect(0,1188,W,162);
  x.save();x.beginPath();x.moveTo(0,1188);x.lineTo(W,1188);x.lineWidth=6;x.strokeStyle='#c8962e';x.stroke();x.restore();
  st(CFG.name,680,1262,64,500,'#ffe27a','#000',0);x.fillStyle='#fff';txt(x,CFG.party||'',680,1310,32,500,'600');
  sym(990,1262,50)}
 else if(t==3){ // সবুজ-হলুদ ডটস
  x.fillStyle=lg(0,0,W,H,['#cdeed3','#f6f3b2','#ffe46b']);x.fillRect(0,0,W,H);
  x.save();x.fillStyle='rgba(255,255,255,.75)';for(let r=0;r<22;r++)for(let q=0;q<14;q++){const R=Math.max(0,7-(r+q)*.22);if(R>.8){x.beginPath();x.arc(24+q*20+(r%2)*10,24+r*20,R,0,7);x.fill()}}x.restore();
  pill(560,30,520,58,'#0d2f7a','#fff',3);x.fillStyle='#fff';txt(x,bis,560,70,32,480,'600');
  dun(115,150,86,'#fff','#13854f');[0,1,2].forEach(k=>pic(lp[k],265+k*104,150,46,'#fff','#13854f',4));
  x.textAlign='left';x.fillStyle='#d6121f';txt(x,'আসন্ন',40,262,50,300,'700');st('ইউনিয়ন',40,330,64,480,'#d6121f','#fff',0);st('পরিষদ',40,396,56,480,'#d6121f','#fff',0);x.textAlign='center';
  [['নি','#d6121f'],['র্বা','#13854f'],['চ','#d6121f'],['নে','#13854f']].forEach((a,k)=>{const cx=92+k*96;x.save();sh(8,.3);x.fillStyle='#fff';x.beginPath();x.arc(cx,478,42,0,7);x.fill();x.restore();ring(cx,478,40,a[1],7);x.fillStyle='#0d2f7a';txt(x,a[0],cx,498,54,66,'700')});
  x.save();sh(10,.35);rr(30,550,420,76,10);x.fillStyle='#117a52';x.fill();x.restore();x.fillStyle='#fff';txt(x,CFG.union,240,606,48,390,'700');
  x.save();sh(14,.45);x.beginPath();x.moveTo(30,650);x.lineTo(470,650);x.lineTo(500,715);x.lineTo(470,780);x.lineTo(30,780);x.closePath();x.fillStyle=lg(0,650,0,780,['#a3081f','#5e0716']);x.fill();x.restore();st('চেয়ারম্যান',255,745,76,400,'#ffd43b','#2b0007',6);
  pill(170,795,250,56,'#fff','#13854f',4);x.fillStyle='#117a52';txt(x,'পদপ্রার্থী',170,835,40,220,'700');
  cpic(385,940,126,lg(0,814,0,1066,['#fff8c8','#ffffff']),'#d6121f',8);
  x.save();sh(26,.45);x.fillStyle='#fff';x.beginPath();x.arc(790,792,285,0,7);x.fill();x.restore();ring(790,792,275,'#13854f',8);spic(790,792,265,'#fff','#fff');
  tag(790,996,320,'#fff','#d6121f','#0d2f7a');
  x.save();sh(14,.5);rr(40,1104,1000,96,48);x.fillStyle=lg(0,0,W,0,['#e11d8f','#6a1b9a']);x.fill();x.restore();x.fillStyle='#fff';txt(x,CFG.name,540,1170,62,940,'700');
  st('আপনাদের সকলের দোয়া ও সমর্থন প্রত্যাশী।',540,1246,42,1000,'#e8321e','#fff',7);
  x.fillStyle='#0d2f7a';x.fillRect(0,1262,W,88);x.fillStyle='#fff';txt(x,pm,540,1300,38,1000,'700');x.fillStyle='#ffd43b';txt(x,foot,540,1336,26,1000,'600')}
 else if(t==4){ // রাজকীয় মেরুন
  x.fillStyle=lg(0,0,0,H,['#5a0b22','#2a0510','#14020a']);x.fillRect(0,0,W,H);
  let rg=x.createRadialGradient(540,520,40,540,520,700);rg.addColorStop(0,'rgba(255,214,120,.28)');rg.addColorStop(1,'rgba(255,214,120,0)');x.fillStyle=rg;x.fillRect(0,0,W,H);
  x.save();x.globalAlpha=.07;x.strokeStyle='#f0c75e';x.lineWidth=2;for(let a=-1;a<14;a++)for(let b=-1;b<17;b++){x.save();x.translate(a*90+(b%2)*45,b*90);x.rotate(Math.PI/4);x.strokeRect(-22,-22,44,44);x.restore()}x.restore();
  const G='#c8962e',G2='#f0c75e';x.strokeStyle=G;x.lineWidth=6;x.strokeRect(22,22,W-44,H-44);x.lineWidth=2;x.strokeRect(38,38,W-76,H-76);
  x.fillStyle=G2;txt(x,bis,540,100,42,W-200,'600');
  x.fillStyle='#fff';txt(x,'আসন্ন '+CFG.union,540,176,60,W-140,'700');x.fillStyle=G2;txt(x,'ইউনিয়ন পরিষদ নির্বাচন',540,236,40,W-200,'600');
  // আর্চ
  const ax=240,ay=260,aw=540,ah=590,arch=()=>{x.beginPath();x.moveTo(ax,ay+ah);x.lineTo(ax,ay+aw/2);x.arc(ax+aw/2,ay+aw/2,aw/2,Math.PI,0);x.lineTo(ax+aw,ay+ah);x.closePath()};
  x.save();sh(30,.6);arch();x.fillStyle=G;x.fill();x.restore();
  x.save();x.translate(0,0);arch();x.save();x.clip();x.fillStyle=lg(0,ay,0,ay+ah,['#fff4d6','#f0c75e']);x.fillRect(ax-10,ay-10,aw+20,ah+20);man(ax+aw/2,ay+ah+10,ah+40);x.restore();x.restore();
  arch();x.lineWidth=10;x.strokeStyle=G2;x.stroke();
  [0,1,2].forEach(k=>pic(lp[k],150,345+k*160,58,G,G2,6));
  dun(918,315,86,G,G2);
  spic(918,590,116,G,G2);tag(918,722,220,'#0a5c43',G,'#fff');
  x.save();sh(12,.5);x.beginPath();x.moveTo(150,850);x.lineTo(930,850);x.lineTo(960,895);x.lineTo(930,940);x.lineTo(150,940);x.lineTo(120,895);x.closePath();x.fillStyle=lg(0,850,0,940,[G2,G]);x.fill();x.restore();x.fillStyle='#4a0a1d';txt(x,CFG.post,540,918,56,700,'700');
  st(CFG.name,540,1032,76,980,'#fff','#000',0);
  x.fillStyle=G2;txt(x,'আপনাদের দোয়া ও সমর্থন প্রত্যাশী',540,1096,46,980,'600');
  x.fillStyle='#fff';txt(x,CFG.party||'',540,1150,34,980,'500');
  x.save();sh(16,.5);rr(60,1180,960,120,30);x.fillStyle=lg(0,1180,0,1300,[G2,G]);x.fill();x.restore();
  if(sy){const w=100;x.drawImage(sy,92,1188,w,w*sy.height/sy.width)}
  x.fillStyle='#4a0a1d';txt(x,CFG.symbol+' · '+CFG.slogan,610,1252,46,780,'700');txt(x,foot,610,1290,24,780,'600')}
 else if(t==5){ // ২ · নেতৃবৃন্দসহ — প্রার্থীর দেওয়া ব্যানার, পতাকার জায়গায় সমর্থকের বড় ছবি
  if(b2)x.drawImage(b2,0,0,W,H);else{x.fillStyle=lg(0,0,0,H,['#e8f5c8','#fff7b0','#0d7a57']);x.fillRect(0,0,W,H)}
  x.save();sh(30,.45);x.fillStyle='#fff';x.beginPath();x.arc(810,860,265,0,7);x.fill();x.restore();ring(810,860,257,'#0f7a59',6);spic(810,860,246,'#fff','#fff');
  tag(810,1100,340,'#fff','#d4202c','#0b3d2d')}
 else{ // প্রোফাইল ফ্রেম — গোল ছবি, লাল-সবুজ রিং, নিচে ব্যানার (ফেসবুকের গোল ক্রপেও ঠিক থাকে)
  x.fillStyle=lg(0,0,W,H,['#0b6b4d','#04301f']);x.fillRect(0,0,W,H);
  x.save();x.globalAlpha=.08;x.fillStyle='#fff';for(let i=0;i<9;i++){x.beginPath();x.moveTo(i*140,0);x.lineTo(i*140+50,0);x.lineTo(i*140-330,H);x.lineTo(i*140-380,H);x.fill()}x.restore();
  x.save();sh(30,.5);x.fillStyle='#fff';x.beginPath();x.arc(540,540,482,0,7);x.fill();x.restore();
  sup(x,540,540,440);
  x.lineWidth=40;x.strokeStyle='#d4202c';x.beginPath();x.arc(540,540,462,Math.PI,0);x.stroke();x.strokeStyle='#17a673';x.beginPath();x.arc(540,540,462,0,Math.PI);x.stroke();
  ring(540,540,488,'#f0c75e',8);ring(540,540,441,'#f0c75e',5);
  cpic(218,218,72,lg(0,146,0,290,['#e9f6ec','#ffffff']),'#ffd43b',6);sbg(862,218,114);
  x.save();sh(16,.5);rr(80,725,920,170,30);x.fillStyle=lg(0,725,0,895,['#d4202c','#7a0818']);x.fill();x.restore();rr(94,739,892,142,22);x.lineWidth=3;x.strokeStyle='#f0c75e';x.stroke();
  st('মুরাদ জিয়াউর রহমান সুমন ভাইকে',540,806,58,840,'#ffe27a','#3a0008',8);st('চেয়ারম্যান হিসেবে দেখতে চাই',540,866,52,840,'#fff','#3a0008',8);
  if(nm||ds)tag(540,905,400,'#fff','#d4202c','#0b3d2d');else{x.fillStyle='#ffe27a';txt(x,CFG.slogan||'',540,960,34,700,'600')}}}
const un=()=>$('un').value.trim(),ud=()=>($('ud')||{value:''}).value.trim();
{const u=$('un'),i=document.createElement('input');i.id='ud';i.type='text';i.maxLength=40;i.placeholder='পদবী (ঐচ্ছিক) — যেমন: সাবেক ছাত্রদল নেতা';i.className=u.className;i.style.cssText=u.style.cssText;i.style.marginTop='8px';i.autocomplete='off';u.insertAdjacentElement('afterend',i)}
async function thumbs(){const o=document.createElement('canvas');for(let i=0;i<ND;i++){try{await draw(i,o,'');const t=$('tp').children[i].querySelector('canvas'),g=t.getContext('2d'),k=Math.min(108/o.width,135/o.height);g.clearRect(0,0,108,135);g.drawImage(o,(108-o.width*k)/2,(135-o.height*k)/2,o.width*k,o.height*k)}catch(e){}}}
setTimeout(thumbs,700);
const cap=()=>`আমি ${CFG.name} কে সমর্থন করি। ${CFG.slogan}\n${CFG.site}`,
 save=(b)=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='support.png';document.body.appendChild(a);a.click();a.remove()};
async function out(k){const b=await new Promise(r=>$('cv').toBlob(r,'image/png')),f=new File([b],'support.png',{type:'image/png'});
 try{navigator.clipboard.writeText(cap())}catch(e){}
 if(k=='d'){save(b);if(!R.classList.contains('nm'))boom();return toast('ছবি ডাউনলোড হচ্ছে')}
 if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text:cap()})}catch(e){}return}
 save(b);toast('ছবি সেভ হয়েছে, ক্যাপশন কপি হয়েছে। পোস্টে ছবি ও ক্যাপশন দিন');
 setTimeout(()=>open(k=='f'?'https://www.facebook.com/':'https://wa.me/?text='+encodeURIComponent(cap())),1200)}
$('mk').onclick=async()=>{const b=$('mk'),c=$('cv');b.classList.add('load');const w=document.createElement('canvas');await draw(S.t,w,un(),ud());c.width=w.width;c.height=w.height;c.getContext('2d').drawImage(w,0,0);c.style.display='block';$('ac').style.display='block';b.classList.remove('load');c.scrollIntoView({behavior:'smooth',block:'center'});toast('তৈরি হয়েছে ✓')};
$('d1').onclick=()=>out('d');$('d2').onclick=()=>out('f');$('d3').onclick=()=>out('w');ped();
