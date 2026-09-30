/* ---- EDIT ME: club contact ---- */
var CONFIG={whatsapp:"254790332916",display:"+254 790 332 916"};
var WA=CONFIG.whatsapp;
/* ---- EDIT ME: packages (keep the same order as the buttons in index.html) ---- */
var packs=[
 {n:"Lounge Table",p:"From KES 3,000",d:"Reserved seating for up to 4, table service, priority entry."},
 {n:"Gold Bottle",p:"From KES 9,000",d:"Reserved booth, a premium bottle with mixers, host for the night."},
 {n:"Birthday Night",p:"Ask for a quote",d:"Table, cake moment, DJ shout-out and photos for your group."}
];
/* ---- EDIT ME: events for the RSVP list (date is YYYY-MM-DD, or "" for none) ---- */
var events=[
 {big:"3",small:"Sat",n:"Arrow Bwoy Live",t:"Live performance by Arrow Bwoy x DJ Kibe. Saturday 3 October.",date:"2026-10-03",note:"Arrow Bwoy Live x DJ Kibe (Sat 3 Oct)"},
 {big:"Oct",small:"All month",n:"Havanas October Takeover",t:"Back-to-back experiences all October, from Sherehe Headquarters.",date:"",note:"Havanas October Takeover"}
];
var out="";
events.forEach(function(e,i){
  out+='<div class="ev"><div class="date"><b>'+e.big+'</b><span>'+e.small+'</span></div><div><h3>'+e.n+'</h3><p>'+e.t+'</p></div><button class="btn ghost" data-i="'+i+'">RSVP</button></div>';
});
document.getElementById("evlist").innerHTML=out;
var rf=document.getElementById("rf"),psel=document.getElementById("psel"),pdet=document.getElementById("pdet"),note=document.getElementById("note");
rf.date.min=new Date().toISOString().slice(0,10);
function toForm(){document.getElementById("reserve").scrollIntoView();rf.name.focus({preventScroll:true})}
function pickEvent(i){var e=events[i];if(e.date)rf.date.value=e.date;note.value=e.note;toForm()}
function markPack(i){
  document.querySelectorAll(".pack").forEach(function(b){b.classList.toggle("sel",b.dataset.p===String(i))});
}
function setPack(i){
  psel.value=String(i);markPack(i);
  var k=packs[i];pdet.value=k?k.n+" ("+k.p+"): "+k.d:"";
}
document.getElementById("evlist").addEventListener("click",function(x){var b=x.target.closest("button");if(b)pickEvent(b.dataset.i)});
document.getElementById("rail").addEventListener("click",function(x){var b=x.target.closest("button");if(b)pickEvent(b.dataset.e)});
document.getElementById("packs").addEventListener("click",function(x){var b=x.target.closest("button");if(!b)return;setPack(b.dataset.p);toForm()});
psel.addEventListener("change",function(){psel.value===""?(pdet.value="",markPack(-1)):setPack(psel.value)});
function msg(){
  var f=rf,L=["Hello Havanas! I would like to book a table."];
  if(f.name.value)L.push("Name: "+f.name.value);
  if(f.phone.value)L.push("Phone: "+f.phone.value);
  if(f.date.value)L.push("Date: "+f.date.value+" at "+f.time.value);
  L.push("Guests: "+f.guests.value);
  if(pdet.value)L.push("Package: "+pdet.value);
  if(note.value)L.push("Event/note: "+note.value);
  return L.join("\n");
}
function openWA(){window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg()),"_blank")}
rf.addEventListener("submit",function(x){x.preventDefault();document.getElementById("done").style.display="block";openWA()});
document.getElementById("wabar").addEventListener("click",function(x){x.preventDefault();openWA()});

/* keep every WhatsApp/phone link in sync with CONFIG */
document.querySelectorAll("[data-wa]").forEach(function(a){a.href="https://wa.me/"+WA});
document.querySelectorAll("[data-phone]").forEach(function(a){a.textContent=CONFIG.display});
