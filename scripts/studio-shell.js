import '../assets/ui/components.js?v=welcome-13';

const $=selector=>document.querySelector(selector);
let entered=false,ready=false;
const welcome=$('#room-welcome'),enter=$('#enter-room'),progress=$('#load-progress');
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
export const hasEnteredRoom=()=>entered;
export function setLoadProgress(value){
 const percent=Math.max(0,Math.min(100,Math.round(value*100)));
 progress.value=percent;$('#load-copy').textContent=`Loading the room · ${percent}%`;
}
export function markRoomReady(){
 ready=true;progress.value=100;enter.disabled=false;$('#studio-loading').hidden=false;$('#studio-loading').setAttribute('aria-busy','false');$('#load-copy').textContent='Room ready';welcome.dataset.ready='true';
}
export function markRoomFailed(){
 $('#studio-loading').hidden=true;$('#welcome-error').hidden=false;$('#welcome-error').textContent='This device couldn’t open the room. You can still read the books.';$('#fallback-work').hidden=false;enter.hidden=true;
}
export function finishRoomEntrance(){
 welcome.hidden=true;document.body.dataset.roomState='entered';
 for(const element of document.querySelectorAll('.room-chrome,#studio-stage'))element.inert=false;
 document.querySelector('#skip-entrance').hidden=true;
 $('#studio-stage canvas')?.focus({preventScroll:true});
}
const skip=document.createElement('wa-button');skip.id='skip-entrance';skip.textContent='Skip intro';skip.appearance='plain';skip.hidden=true;document.body.append(skip);
skip.addEventListener('click',()=>dispatchEvent(new Event('room-skip-entrance')));
enter.addEventListener('click',()=>{
 if(!ready||entered)return;
 entered=true;document.body.dataset.roomState='entering';welcome.inert=true;
 $('#studio-stage').inert=true;skip.hidden=reduced();
 if(!reduced())skip.focus({preventScroll:true});
 dispatchEvent(new CustomEvent('room-enter',{detail:{reduced:reduced()}}));
});
export function openDialog(dialog){
 const menu=$('#room-options'),active=document.activeElement;
 dialog.returnFocusTo=menu.open||menu.contains(active)?$('#options-trigger'):active;
 menu.open=false;dialog.open=true;
}
for(const dialog of document.querySelectorAll('wa-dialog'))dialog.addEventListener('wa-after-hide',()=>{
 if(document.querySelector('wa-dialog[open]'))return;
 const target=dialog.returnFocusTo;
 if(target?.isConnected&&target.getClientRects().length&&!target.closest('[inert]'))target.focus({preventScroll:true});
 else if(entered)$('#studio-stage canvas')?.focus({preventScroll:true});
});
export function closeDialog(dialog){dialog.open=false;}
export function setControlLabel(id,text){const control=$(id),label=control.querySelector('[data-label]');(label||control).textContent=text;}
export function connectRoomMenu(){
 const menu=$('#room-options'),actions=new Map();
 for(const item of menu.querySelectorAll('wa-dropdown-item')){if(item.onclick){actions.set(item,item.onclick);item.onclick=null;}}
 menu.addEventListener('wa-select',event=>{
  const item=event.detail.item;actions.get(item)?.(event);
  for(const entry of menu.querySelectorAll('wa-dropdown-item[type="checkbox"]')){if(entry.hasAttribute('data-shot'))entry.checked=entry.dataset.shot===document.body.dataset.camera;else entry.checked=entry.getAttribute('data-pressed')==='true';}
 });
}
