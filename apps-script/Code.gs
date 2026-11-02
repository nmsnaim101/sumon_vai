const ADMIN_PW='sumonvai101010'; // ডেমো পাসওয়ার্ড। এখানে বদলান, তারপর নতুন version Deploy করুন।
const j_=o=>ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
function doPost(e){
  const d=JSON.parse(e.postData.contents),s=SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if(d.action==='list')return list_(d,s);
  const c=v=>{v=String(v||'').slice(0,1000);return /^[=+\-@]/.test(v)?"'"+v:v};
  s.getRange('D2:E').setNumberFormat('@');
  s.appendRow([new Date(),c(d.type),c(d.name),c(d.phone),c(d.ward),c(d.msg)]);
  return ContentService.createTextOutput('ok');
}
function list_(d,s){
  const ch=CacheService.getScriptCache(),n=+(ch.get('f')||0);
  if(n>=5)return j_({ok:false,err:'অনেকবার ভুল হয়েছে, ৫ মিনিট পরে চেষ্টা করুন।'});
  if(d.pw!==ADMIN_PW){ch.put('f',String(n+1),300);return j_({ok:false,err:'পাসওয়ার্ড ভুল।'})}
  ch.remove('f');
  return j_({ok:true,rows:s.getDataRange().getValues().slice(1).reverse().slice(0,500)});
}
