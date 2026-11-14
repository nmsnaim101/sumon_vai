// ============ সুমন ভাই ক্যাম্পেইন সাইট — Apps Script (ভার্সন ৩) ============
// এই স্ক্রিপ্ট আপনার Google Sheet-এর সাথে যুক্ত (Extensions → Apps Script থেকে খোলা)।
// লগিন: পাসওয়ার্ড + আপনার Gmail-এ আসা ৬ ডিজিটের কোড (প্রতিবার নতুন কোড)।
const ADMIN_PW='nmsadmin';          // অ্যাডমিন পাসওয়ার্ড
const MAX_BAD=5, LOCK_SEC=300;      // ৫ বার ভুল হলে ৫ মিনিট বন্ধ
const OTP_SEC=600, TOKEN_SEC=21600; // কোড ১০ মিনিট, লগিন ৬ ঘণ্টা
const T_EV='কর্মসূচি', T_PR='সমস্যা', T_ST='সেটিং', T_CT='কনটেন্ট', T_NW='খবর', T_SX='পরিসংখ্যান';
const H_CT=['কী','মান'], H_NW=['আইডি','তারিখ','শিরোনাম','লেখা','ছবি'], H_SX=['তারিখ','কী','সংখ্যা','চাবি'];
const SXK=['visit','home','make','manifesto','drug','gallery','ward','guide','svc','form','news','chat','slip','share','install'];
const CTK=['ticker','pledges','videos'];
const H_MSG=['সময়','ধরন','নাম','ফোন','ওয়ার্ড','বার্তা'];
const H_EV=['আইডি','তারিখ','সময়','স্থান','কর্মসূচি','বিবরণ'];
const H_PR=['নম্বর','সময়','নাম','ফোন','ওয়ার্ড','বিষয়','বিবরণ','অবস্থা','মন্তব্য'];
const H_ST=['কী','মান'];
const STATUS=['নতুন','চলমান','সমাধান হয়েছে'];

const j_=o=>ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
const cl_=(v,n)=>{v=String(v==null?'':v).slice(0,n||1000);return /^[=+\-@]/.test(v)?"'"+v:v};
const ch_=()=>CacheService.getScriptCache();
function ss_(){return SpreadsheetApp.getActiveSpreadsheet()}
function tab_(name,head){let s=ss_().getSheetByName(name);if(!s){s=ss_().insertSheet(name);s.appendRow(head);s.setFrozenRows(1)}return s}
function msgs_(){const s=ss_().getSheets()[0];if(s.getLastRow()===0)s.appendRow(H_MSG);return s}
function sha_(t){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,t).map(b=>('0'+(b&255).toString(16)).slice(-2)).join('')}
function rows_(s){const n=s.getLastRow();return n<2?[]:s.getRange(2,1,n-1,s.getLastColumn()).getValues()}
function iso_(v){return v instanceof Date?Utilities.formatDate(v,'Asia/Dhaka','yyyy-MM-dd'):String(v==null?'':v)}

// ---------- সবার জন্য (GET) ----------
function doGet(e){
  const p=(e&&e.parameter)||{};
  if(p.a==='pub')return j_(pub_());
  if(p.a==='track')return j_(track_(String(p.id||'')));
  if(p.a==='news')return j_(news_());
  if(p.a==='nimg')return j_(nimg_(String(p.id||'')));
  if(p.a==='hit'){hit_(String(p.k||''));return ContentService.createTextOutput('ok')}
  return ContentService.createTextOutput('Apps Script চালু আছে ✓');
}
function pub_(){
  const c=ch_().get('pub');if(c)return JSON.parse(c);
  const ev=rows_(tab_(T_EV,H_EV)).filter(r=>r[1]).map(r=>({id:String(r[0]),d:iso_(r[1]),t:String(r[2]),p:String(r[3]),n:String(r[4]),x:String(r[5])}));
  const st={};rows_(tab_(T_ST,H_ST)).forEach(r=>{if(r[0])st[String(r[0])]=String(r[1])});
  const ct={};rows_(tab_(T_CT,H_CT)).forEach(r=>{if(r[0]&&CTK.indexOf(String(r[0]))>=0){try{ct[String(r[0])]=JSON.parse(String(r[1]))}catch(x){}}});
  const o={ok:true,events:ev,settings:st,content:ct};
  try{ch_().put('pub',JSON.stringify(o),60)}catch(x){}
  return o;
}
function track_(id){
  if(!/^\d{4,8}$/.test(id))return {ok:false,err:'নম্বর ঠিক নয়।'};
  const r=rows_(tab_(T_PR,H_PR)).filter(x=>String(x[0])===id)[0];
  if(!r)return {ok:false,err:'এই নম্বরে কোনো সমস্যা পাওয়া যায়নি।'};
  return {ok:true,status:String(r[7]),subject:String(r[5]),time:iso_(r[1]),note:String(r[8]||'')};
}

// ---------- POST ----------
function doPost(e){
  let d;try{d=JSON.parse(e.postData.contents)}catch(x){return j_({ok:false,err:'ভুল ডেটা'})}
  const a=d.action;
  if(a==='otp1')return otp1_(d);
  if(a==='otp2')return otp2_(d);
  if(a==='prob')return prob_(d);
  if(a==='hit'){hit_(String(d.k||''));return j_({ok:true})}
  if(a){
    if(!tok_(d.token))return j_({ok:false,err:'লগিনের সময় শেষ। আবার লগিন করুন।',relogin:true});
    if(a==='list')return j_({ok:true,rows:rows_(msgs_()).reverse().slice(0,800).map(r=>r.map(v=>v instanceof Date?v.toISOString():v))});
    if(a==='ev_get')return j_({ok:true,events:rows_(tab_(T_EV,H_EV)).map(r=>({id:String(r[0]),d:iso_(r[1]),t:String(r[2]),p:String(r[3]),n:String(r[4]),x:String(r[5])}))});
    if(a==='ev_save')return evSave_(d);
    if(a==='pr_list')return j_({ok:true,rows:rows_(tab_(T_PR,H_PR)).reverse().slice(0,500).map(r=>r.map(v=>v instanceof Date?v.toISOString():v))});
    if(a==='pr_set')return prSet_(d);
    if(a==='st_get')return j_(pub_());
    if(a==='st_save')return stSave_(d);
    if(a==='ct_save')return ctSave_(d);
    if(a==='nw_get')return j_(news_(true));
    if(a==='nw_img')return j_(nimg_(String(d.id||'')));
    if(a==='nw_put')return nwPut_(d);
    if(a==='nw_del')return nwDel_(d);
    if(a==='sx_get')return j_(sxGet_());
    return j_({ok:false,err:'অজানা কাজ'});
  }
  // সাধারণ বার্তা/মতামত/স্বেচ্ছাসেবক ফর্ম
  const s=msgs_();s.getRange('D2:E').setNumberFormat('@');
  s.appendRow([new Date(),cl_(d.type),cl_(d.name),cl_(d.phone),cl_(d.ward),cl_(d.msg)]);
  return ContentService.createTextOutput('ok');
}

// ---------- লগিন: পাসওয়ার্ড + Gmail কোড ----------
function locked_(){return +(ch_().get('bad')||0)>=MAX_BAD}
function bad_(){const c=ch_(),n=+(c.get('bad')||0)+1;c.put('bad',String(n),LOCK_SEC)}
function otp1_(d){
  if(locked_())return j_({ok:false,err:'অনেকবার ভুল হয়েছে, ৫ মিনিট পরে চেষ্টা করুন।'});
  if(String(d.pw||'')!==ADMIN_PW){bad_();return j_({ok:false,err:'পাসওয়ার্ড ভুল।'})}
  const c=ch_(),sent=+(c.get('sent')||0);
  if(sent>=5)return j_({ok:false,err:'১০ মিনিটে অনেকবার কোড চাওয়া হয়েছে, একটু পরে চেষ্টা করুন।'});
  const code=String(100000+(parseInt(sha_(Utilities.getUuid()).slice(0,8),16)%900000));
  c.put('otp',sha_(code+':'+ADMIN_PW),OTP_SEC);c.put('otpbad','0',OTP_SEC);c.put('sent',String(sent+1),OTP_SEC);
  const to=Session.getEffectiveUser().getEmail();
  MailApp.sendEmail(to,'অ্যাডমিন লগিন কোড: '+code,'আপনার সুমন ক্যাম্পেইন সাইটের অ্যাডমিন লগিন কোড: '+code+'\n\nকোডটি ১০ মিনিট চলবে এবং একবারই কাজ করবে। আপনি লগিন করতে না চাইলে এই মেইল উপেক্ষা করুন।');
  const m=to.replace(/^(.{2}).*(@.*)$/,'$1***$2');
  return j_({ok:true,mail:m});
}
function otp2_(d){
  if(locked_())return j_({ok:false,err:'অনেকবার ভুল হয়েছে, ৫ মিনিট পরে চেষ্টা করুন।'});
  if(String(d.pw||'')!==ADMIN_PW){bad_();return j_({ok:false,err:'পাসওয়ার্ড ভুল।'})}
  const c=ch_(),h=c.get('otp');
  if(!h)return j_({ok:false,err:'কোডের সময় শেষ। নতুন কোড নিন।',expired:true});
  if(sha_(String(d.code||'').replace(/\D/g,'')+':'+ADMIN_PW)!==h){
    const n=+(c.get('otpbad')||0)+1;c.put('otpbad',String(n),OTP_SEC);
    if(n>=MAX_BAD){c.remove('otp');return j_({ok:false,err:'অনেকবার ভুল কোড। নতুন কোড নিন।',expired:true})}
    return j_({ok:false,err:'কোড ভুল।'});
  }
  c.remove('otp');c.remove('bad');
  const t=sha_(Utilities.getUuid()+Utilities.getUuid());
  c.put('t_'+t,'1',TOKEN_SEC);
  return j_({ok:true,token:t});
}
function tok_(t){t=String(t||'');return /^[0-9a-f]{64}$/.test(t)&&ch_().get('t_'+t)==='1'}

// ---------- সমস্যা জানান ----------
function prob_(d){
  const name=cl_(d.name,100),msg=cl_(d.msg,1500);
  if(!name||!msg)return j_({ok:false,err:'নাম ও সমস্যা লিখুন।'});
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try{
    const s=tab_(T_PR,H_PR),ids={};rows_(s).forEach(r=>ids[String(r[0])]=1);
    let id;do{id=String(100000+Math.floor(Math.random()*900000))}while(ids[id]);
    s.getRange('A2:A').setNumberFormat('@');s.getRange('D2:D').setNumberFormat('@');
    s.appendRow([id,new Date(),name,cl_(d.phone,30),cl_(d.ward,30),cl_(d.subject,100),msg,'নতুন','']);
    return j_({ok:true,id:id});
  }finally{lock.releaseLock()}
}
function prSet_(d){
  if(STATUS.indexOf(d.status)<0)return j_({ok:false,err:'অবস্থা ঠিক নয়।'});
  const s=tab_(T_PR,H_PR),v=s.getRange(1,1,Math.max(1,s.getLastRow()),1).getValues();
  for(let i=1;i<v.length;i++)if(String(v[i][0])===String(d.id)){s.getRange(i+1,8,1,2).setValues([[d.status,cl_(d.note,500)]]);return j_({ok:true})}
  return j_({ok:false,err:'নম্বর পাওয়া যায়নি।'});
}

// ---------- কর্মসূচি ও সেটিং সংরক্ষণ ----------
function evSave_(d){
  const list=(Array.isArray(d.events)?d.events:[]).slice(0,100);
  const s=tab_(T_EV,H_EV);if(s.getLastRow()>1)s.getRange(2,1,s.getLastRow()-1,6).clearContent();
  s.getRange('A2:F').setNumberFormat('@');
  if(list.length){
    s.getRange(2,1,list.length,6).setNumberFormat('@').setValues(list.map((x,i)=>[cl_(x.id||('e'+(i+1)),20),cl_(x.d,10),cl_(x.t,40),cl_(x.p,200),cl_(x.n,200),cl_(x.x,500)]));
  }
  ch_().remove('pub');return j_({ok:true});
}
function stSave_(d){
  const o=d.settings||{},s=tab_(T_ST,H_ST);
  if(s.getLastRow()>1)s.getRange(2,1,s.getLastRow()-1,2).clearContent();
  const ks=Object.keys(o).slice(0,60);
  if(ks.length)s.getRange(2,1,ks.length,2).setNumberFormat('@').setValues(ks.map(k=>[cl_(k,40),cl_(o[k],3000)]));
  ch_().remove('pub');return j_({ok:true});
}


// ---------- সাইট কনটেন্ট (ticker, ইশতেহার, ভিডিও) ----------
function ctSave_(d){
  const k=String(d.key||'');if(CTK.indexOf(k)<0)return j_({ok:false,err:'অজানা অংশ'});
  let v=d.value;if(!Array.isArray(v))return j_({ok:false,err:'ডেটা ঠিক নয়'});
  const T=(x,n)=>String(x==null?'':x).slice(0,n);
  if(k==='ticker')v=v.slice(0,30).map(x=>T(x,200)).filter(Boolean);
  if(k==='videos')v=v.slice(0,80).map(x=>({t:T(x.t,120),u:T(x.u,400),c:T(x.c,60)})).filter(x=>x.u);
  if(k==='pledges')v=v.slice(0,12).map(x=>({t:T(x.t,120),d:T(x.d,600),pts:(x.pts||[]).slice(0,12).map(y=>T(y,300)).filter(Boolean),more:(x.more||[]).slice(0,12).map(y=>T(y,1200)).filter(Boolean)})).filter(x=>x.t);
  const js=JSON.stringify(v);if(js.length>45000)return j_({ok:false,err:'লেখা অনেক বড় হয়ে গেছে।'});
  const s=tab_(T_CT,H_CT),vals=rows_(s);let row=0;vals.forEach((r,i)=>{if(String(r[0])===k)row=i+2});
  if(!row){s.appendRow([k,'']);row=s.getLastRow()}
  s.getRange(row,2).setNumberFormat('@').setValue(js);
  ch_().remove('pub');return j_({ok:true});
}

// ---------- খবর ও ঘোষণা ----------
function news_(full){
  const c=!full&&ch_().get('news');if(c)return JSON.parse(c);
  const L=rows_(tab_(T_NW,H_NW)).filter(r=>r[0]).map(r=>({id:String(r[0]),d:iso_(r[1]),t:String(r[2]),x:String(r[3]),i:!!String(r[4]||'')})).sort((a,b)=>(b.d+b.id).localeCompare(a.d+a.id)).slice(0,60);
  const o={ok:true,news:L};
  if(!full){try{ch_().put('news',JSON.stringify(o),60)}catch(x){}}
  return o;
}
function nimg_(id){
  if(!/^n\d{6,16}$/.test(id))return {ok:false};
  const r=rows_(tab_(T_NW,H_NW)).filter(x=>String(x[0])===id)[0];
  return r&&r[4]?{ok:true,img:String(r[4])}:{ok:false};
}
function nwPut_(d){
  const t=cl_(d.t,200),x=cl_(d.x,4000);if(!t)return j_({ok:false,err:'শিরোনাম লিখুন।'});
  let img=d.img;if(typeof img==='string'&&img&&!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(img))return j_({ok:false,err:'ছবি ঠিক নয়।'});
  if(typeof img==='string'&&img.length>46000)return j_({ok:false,err:'ছবি বেশি বড়।'});
  const lock=LockService.getScriptLock();lock.waitLock(10000);
  try{
    const s=tab_(T_NW,H_NW),vals=rows_(s);let id=String(d.id||''),row=0;
    vals.forEach((r,i)=>{if(id&&String(r[0])===id)row=i+2});
    if(!row){id='n'+Date.now();s.appendRow([id,'','','','']);row=s.getLastRow()}
    s.getRange(row,1,1,4).setNumberFormat('@').setValues([[id,cl_(d.d,10),t,x]]);
    if(typeof img==='string')s.getRange(row,5).setNumberFormat('@').setValue(img);
    ch_().remove('news');return j_({ok:true,id:id});
  }finally{lock.releaseLock()}
}
function nwDel_(d){
  const s=tab_(T_NW,H_NW),v=rows_(s);
  for(let i=0;i<v.length;i++)if(String(v[i][0])===String(d.id)){s.deleteRow(i+2);ch_().remove('news');return j_({ok:true})}
  return j_({ok:false,err:'পাওয়া যায়নি।'});
}

// ---------- পরিসংখ্যান (শুধু গণনা — কোনো নাম/নম্বর জমা হয় না) ----------
function hit_(k){
  if(SXK.indexOf(k)<0)return;
  const lock=LockService.getScriptLock();if(!lock.tryLock(3000))return;
  try{
    const s=tab_(T_SX,H_SX),d=Utilities.formatDate(new Date(),'Asia/Dhaka','yyyy-MM-dd'),key=d+'|'+k,n=s.getLastRow();
    const f=n>1?s.getRange(2,4,n-1,1).createTextFinder(key).matchEntireCell(true).findNext():null;
    if(f){const c=s.getRange(f.getRow(),3);c.setValue((+c.getValue()||0)+1)}
    else s.appendRow([d,k,1,key]);
  }finally{lock.releaseLock()}
}
function sxGet_(){
  const lim=Utilities.formatDate(new Date(Date.now()-60*864e5),'Asia/Dhaka','yyyy-MM-dd');
  return {ok:true,rows:rows_(tab_(T_SX,H_SX)).map(r=>[iso_(r[0]),String(r[1]),+r[2]||0]).filter(r=>r[0]>=lim)};
}

// ---------- একবার চালিয়ে অনুমতি দিন (Gmail পাঠানোর জন্য জরুরি) ----------
function authorize(){
  tab_(T_EV,H_EV);tab_(T_PR,H_PR);tab_(T_ST,H_ST);tab_(T_CT,H_CT);tab_(T_NW,H_NW);tab_(T_SX,H_SX);msgs_();
  MailApp.sendEmail(Session.getEffectiveUser().getEmail(),'অনুমতি সফল ✓','অ্যাডমিন লগিন কোড এই ঠিকানায় আসবে।');
  Logger.log('ঠিক আছে — আপনার Gmail-এ একটা টেস্ট মেইল গেছে।');
}
