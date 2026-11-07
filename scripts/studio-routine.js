import * as THREE from 'three';
const V=(x,y,z)=>new THREE.Vector3(x,y,z),smooth=x=>{x=THREE.MathUtils.clamp(x,0,1);return x*x*(3-2*x);};
export function createStudioRoutine(built,physics,{random=Math.random}={}){
 const avatar=built.avatar,motion=avatar.motion,home=avatar.position.clone(),homeQ=avatar.quaternion.clone(),exit=V(-.65,.03,.6),book=built.objects.find(o=>o.userData.name==='Stories / volume 1'),cup=built.objects.filter(o=>o.userData.category==='mug').sort((a,b)=>a.position.distanceTo(home)-b.position.distanceTo(home))[0];
 const props=new Map([book,cup].filter(Boolean).map(o=>[o,{position:o.position.clone(),quaternion:o.quaternion.clone()}]));
 const shelf=built.objects.find(o=>o.userData.name==='The working library'),desk=built.objects.find(o=>o.userData.name==='The workbench'),chair=built.objects.find(o=>o.userData.name==='The desk chair'),furniture=new Map([shelf,desk,chair].filter(Boolean).map(o=>[o,o.position.clone()]));
 let state='typing',elapsed=0,duration=6+random()*4,activity='Typing at the desk',enabled=true,suspended=false,task=null,previous='',curve=null,gait=0,time=0,carried=null,propStart=null,propQ=null,readDuration=5,openBook=null,bookVisual=null,hiddenBookMeshes=[],footLocks={},bookOpen=0,lastPlaced=null,handErrors=[],pagePinchError=null;
 const visits=[];let stateStart=home.clone(),stateQ=homeQ.clone();
 const pickup=()=>task==='book'?V(2.38,.03,-1.88):V(-.65,.03,-.65),display=()=>task==='book'?V(.85,.03,1.0):V(-.2,.03,1.55);
 function enter(next,seconds,label){state=next;elapsed=0;duration=seconds;activity=label;stateStart=avatar.position.clone();stateQ=avatar.quaternion.clone();visits.push(next);if(visits.length>80)visits.shift();}
 function face(yaw,dt){avatar.quaternion.slerp(new THREE.Quaternion().setFromAxisAngle(V(0,1,0),yaw),1-Math.exp(-dt*5));}
 function available(object){const original=props.get(object),record=physics.find(object);return original&&record?.body?.type===2&&!record.scripted&&object.position.distanceTo(original.position)<.18;}
 const chairHome=chair.position.clone(),chairQ=chair.quaternion.clone(),chairOutQ=chairQ.clone().multiply(new THREE.Quaternion().setFromAxisAngle(V(0,1,0),-1.25)),chairShift=V(.08,0,.12);
 function seat(amount){chair.position.copy(chairHome).addScaledVector(chairShift,amount);chair.quaternion.slerpQuaternions(chairQ,chairOutQ,amount);physics.place(chair);}
 function makeOpenBook(){
  const group=new THREE.Group(),paper=new THREE.MeshStandardMaterial({color:'#eee4cc',roughness:.92,side:THREE.DoubleSide}),cover=new THREE.MeshStandardMaterial({color:'#795945',roughness:.8}),ink=new THREE.MeshBasicMaterial({color:'#8b7c60',side:THREE.DoubleSide}),hinges=[];
  for(const side of [-1,1]){const hinge=new THREE.Group();group.add(hinge);hinges.push({hinge,side});const page=new THREE.Mesh(new THREE.BoxGeometry(.34,.018,.31),paper);page.position.set(side*.175,.012,0);hinge.add(page);const binding=new THREE.Mesh(new THREE.BoxGeometry(.35,.018,.325),cover);binding.position.set(side*.175,-.008,0);hinge.add(binding);for(let line=0;line<9;line++){const text=new THREE.Mesh(new THREE.PlaneGeometry(.27-line%3*.012,.002),ink);text.rotation.x=-Math.PI/2;text.position.set(side*.175,.023,-.115+line*.028);hinge.add(text);}}
  const leaf=new THREE.Mesh(new THREE.PlaneGeometry(.345,.305,20,8),paper);leaf.geometry.rotateX(-Math.PI/2);leaf.geometry.translate(.1725,.026,0);leaf.userData.rest=leaf.geometry.attributes.position.array.slice();group.add(leaf);group.userData={hinges,leaf};group.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return group;
 }
 function openness(value){bookOpen=value;if(!openBook)return;for(const {hinge,side} of openBook.userData.hinges){hinge.rotation.z=side*(1-value)*Math.PI/2;hinge.position.y=-(1-value)*.175;}openBook.userData.leaf.visible=value>.98;}
 function open(){if(!book||openBook)return;hiddenBookMeshes=book.children.map(o=>[o,o.visible]);for(const [o] of hiddenBookMeshes)o.visible=false;bookVisual ||=makeOpenBook();openBook=bookVisual;book.add(openBook);openness(0);page(0);}
 function close(){if(openBook)book.remove(openBook);openBook=null;bookOpen=0;for(const [o,v] of hiddenBookMeshes)o.visible=v;hiddenBookMeshes=[];}
 function pagePoint(progress,x=.345,z=.1525){const a=Math.PI*progress+.2*Math.sin(Math.PI*x/.345)*Math.sin(Math.PI*progress);return V(x*Math.cos(a),.026+x*Math.sin(a)+.025*Math.sin(Math.PI*x/.345)*Math.sin(Math.PI*progress),z);}
 function page(progress){if(!openBook)return;const mesh=openBook.userData.leaf,attr=mesh.geometry.attributes.position,rest=mesh.userData.rest;for(let i=0;i<attr.count;i++){const p=pagePoint(progress,rest[i*3],rest[i*3+2]);attr.setXYZ(i,p.x,p.y,p.z);}attr.needsUpdate=true;mesh.geometry.computeVertexNormals();mesh.geometry.computeBoundingSphere();}
 function captureProp(object){carried=object;propStart=object.position.clone();propQ=object.quaternion.clone();physics.scripted(object);if(task==='book')open();}
 function desiredCarry(sip=0){
  avatar.updateWorldMatrix(true,true);const q=avatar.quaternion.clone(),position=avatar.localToWorld(task==='book'?V(0,2.04,.43):V(.28,1.9,.46));
  if(task==='book')q.multiply(new THREE.Quaternion().setFromAxisAngle(V(1,0,0),.16*bookOpen));
  else{q.multiply(new THREE.Quaternion().setFromAxisAngle(V(1,0,0),-.9*sip));const lip=V(0,.214,-.095).applyQuaternion(q),atMouth=motion.mouthWorld().sub(lip);position.lerp(atMouth,sip);}
  return {position,quaternion:q};
 }
 function contacts(object,opening=bookOpen){
  const q=object.quaternion,at=p=>p.applyQuaternion(q).add(object.position),direction=p=>p.applyQuaternion(q),result={};
  if(object===book){for(const [side,sign] of [['left',-1],['right',1]]){const hinge=new THREE.Quaternion().setFromAxisAngle(V(0,0,1),sign*(1-opening)*Math.PI/2),p=V(sign*.36,-.075,.035).applyQuaternion(hinge).add(V(0,-(1-opening)*.175,0)),n=V(0,1,0).applyQuaternion(hinge),f=V(-sign,0,0).applyQuaternion(hinge);result[side]={position:at(p),normal:direction(n),fingers:direction(f),curl:.02,thumb:at(V(sign*.35,.043,.035).applyQuaternion(hinge).add(V(0,-(1-opening)*.175,0)))};}}
  else result.right={position:at(V(.205,.125,0)),normal:direction(V(-1,0,0)),fingers:direction(V(0,0,1)),curl:.6,thumb:at(V(.16,.185,0))};
  if(object===book)for(const target of Object.values(result))target.supportPlane={point:target.position.clone().addScaledVector(target.normal,.05),normal:target.normal.clone()};
  return result;
 }
 function hold(object,amount=1,turn=null){
  if(!object)return;pagePinchError=null;const targets=contacts(object),q=object.quaternion;
  if(turn!==null&&object===book){const p=smooth((turn-.2)/.6),corner=pagePoint(p).applyQuaternion(q).add(object.position),target=targets.right,normal=V(0,-1,0).applyQuaternion(q),fingers=V(-1,0,0).applyQuaternion(q),pinchPalm=corner.clone().add(V(.10,.075,0).applyQuaternion(q));let weight;
   const base=target.position.clone(),outsideLow=V(.57,-.075,.24).applyQuaternion(q).add(object.position),outsideHigh=V(.57,.20,.24).applyQuaternion(q).add(object.position),topPlane={point:V(0,.035,0).applyQuaternion(q).add(object.position),normal:V(0,-1,0).applyQuaternion(q)};
   if(turn>0&&turn<.2){
    const u=turn/.2;weight=smooth((u-.3)/.45);
    if(u<.3)target.position.lerpVectors(base,outsideLow,smooth(u/.3));
    else if(u<.75)target.position.lerpVectors(outsideLow,outsideHigh,smooth((u-.3)/.45));
    else target.position.lerpVectors(outsideHigh,pinchPalm,smooth((u-.75)/.25));
    target.supportPlane=u>.75?topPlane:u<.3?target.supportPlane:null;
   }else if(turn>.8&&turn<1){
    const u=(turn-.8)/.2,lifted=pinchPalm.clone().add(V(0,.15,0).applyQuaternion(q));weight=1-smooth((u-.6)/.25);
    if(u<.25)target.position.lerpVectors(pinchPalm,lifted,smooth(u/.25));
    else if(u<.6)target.position.lerpVectors(lifted,outsideHigh,smooth((u-.25)/.35));
    else if(u<.85)target.position.lerpVectors(outsideHigh,outsideLow,smooth((u-.6)/.25));
    else target.position.lerpVectors(outsideLow,base,smooth((u-.85)/.15));
    target.supportPlane=u<.6?topPlane:u>.85?target.supportPlane:null;
   }else{weight=turn>=.2&&turn<=.8?1:0;target.position.lerp(pinchPalm,weight);if(weight)target.supportPlane=topPlane;}
   target.normal.applyQuaternion(new THREE.Quaternion().setFromAxisAngle(target.fingers.clone().normalize(),Math.PI*weight));target.fingers.lerp(fingers,weight).normalize();target.curl=.04+.08*weight;target.thumb=null;if(turn>=.2&&turn<=.8)target.pinch=corner;
  }
  for(const [side,target] of Object.entries(targets)){const error=avatar.hands.solve(side,{...target,amount});if(amount>.99&&Number.isFinite(error))handErrors.push(error);if(target.pinch)pagePinchError=Math.max(avatar.hands.tipWorld(side,1).distanceTo(target.pinch),avatar.hands.tipWorld(side,2).distanceTo(target.pinch));}if(handErrors.length>120)handErrors.splice(0,handErrors.length-120);
 }
 function carry(amount=1,sip=0,turn=null){if(!carried)return;const target=desiredCarry(sip);carried.position.lerpVectors(propStart,target.position,smooth(amount));carried.quaternion.slerpQuaternions(propQ,target.quaternion,smooth(amount));hold(carried,1,turn);}
 function putBack(amount){if(!carried)return;const original=props.get(carried);carried.position.lerpVectors(propStart,original.position,smooth(amount));carried.quaternion.slerpQuaternions(propQ,original.quaternion,smooth(amount));hold(carried);}
 function releaseProp(){if(!carried)return;const original=props.get(carried);carried.position.copy(original.position);carried.quaternion.copy(original.quaternion);lastPlaced=carried;close();physics.prepare(carried);carried=null;}
 function basePath(){return task==='book'?[exit,V(.65,.03,.7),V(1.3,.03,-.2),pickup()]:[exit,V(-.3,.03,.05),pickup()];}
 function displayPath(){return task==='book'?[pickup(),V(1.3,.03,-.2),display()]:[pickup(),V(-.25,.03,.4),display()];}
 function walk(next,points,label){points[0]=avatar.position.clone();curve=new THREE.CatmullRomCurve3(points,false,'centripetal');footLocks={};enter(next,Math.max(.65,curve.getLength()/(.85+random()*.1)),label);}
 function plantedFeet(){
  avatar.updateWorldMatrix(true,false);const feet={};for(const side of [-1,1]){const name=side<0?'left':'right',f=((gait/(Math.PI*2)+(side<0?.5:0))%1+1)%1;let lock=footLocks[name];const landing=()=>avatar.localToWorld(V(side*.23,.22,.22));
   if(!lock){lock=footLocks[name]={last:f,plant:landing(),from:null,to:null};}
   if(f<lock.last){lock.plant=lock.to?.clone()||landing();lock.from=null;lock.to=null;}
   let point;if(f<.6)point=lock.plant.clone();else{if(!lock.from){lock.from=lock.plant.clone();lock.to=landing().add(V(0,0,.30).applyQuaternion(avatar.quaternion));}const u=(f-.6)/.4;point=lock.from.clone().lerp(lock.to,smooth(u));point.y+=Math.sin(Math.PI*u)*.105;}
   lock.last=f;feet[name]=avatar.worldToLocal(point);
  }return feet;
 }
 function blocked(){if(!curve)return false;const point=curve.getPointAt(Math.min(1,(elapsed+.35)/duration));for(const object of [desk,chair,shelf]){const original=furniture.get(object);if(!original||object.position.distanceTo(original)<.2)continue;const box=new THREE.Box3().setFromObject(object);if(point.x>box.min.x-.3&&point.x<box.max.x+.3&&point.z>box.min.z-.3&&point.z<box.max.z+.3)return true;}return false;}
 function choose(){const options=[];if(available(book)&&shelf.position.distanceTo(furniture.get(shelf))<.25)options.push('book');if(available(cup))options.push('coffee');if(!options.length){duration=3+random()*4;elapsed=0;return;}const alternatives=options.filter(o=>o!==previous),pool=alternatives.length&&random()<.7?alternatives:options;task=pool[Math.floor(random()*pool.length)];previous=task;handErrors=[];readDuration=task==='book'?5+random()*4:4.5+random()*2;enter('standing',2.1,'Getting up from the desk');}
 function update(dt,allowed=true){
  if(!enabled||suspended||!allowed)return false;const walking=['walking','carrying','return-prop','returning'].includes(state);if(walking&&blocked()){activity='Waiting for a clear path';return false;}
  elapsed+=dt;time+=dt;const t=THREE.MathUtils.clamp(elapsed/duration,0,1),e=smooth(t);physics.scripted(avatar);
  if(state==='typing'){avatar.updateTyping(time,true);if(t===1)choose();}
  else if(state==='standing'){avatar.updateTyping(time,false);const swivel=smooth(t/.45),leave=smooth((t-.42)/.58);seat(swivel);avatar.position.copy(home).addScaledVector(chairShift,swivel).lerp(exit,leave);motion.pose({stand:smooth((t-.18)/.82),time});avatar.quaternion.slerpQuaternions(homeQ,chairOutQ,swivel);avatar.quaternion.slerp(new THREE.Quaternion().setFromAxisAngle(V(0,1,0),Math.atan2(exit.x-home.x,exit.z-home.z)),leave);if(t===1)walk('walking',basePath(),task==='book'?'Walking to the bookshelf':'Getting a coffee');}
  else if(walking){const point=curve.getPointAt(t),tangent=curve.getTangentAt(t);gait+=point.distanceTo(avatar.position)*Math.PI*2/.75;avatar.position.copy(point);face(Math.atan2(tangent.x,tangent.z),dt);motion.pose({stand:1,gait,walking:Math.min(1,t*7,(1-t)*7),feet:motion.authored?null:plantedFeet(),read:carried&&task==='book'?.45:0,coffee:carried&&task==='coffee'?.65:0,time});carry();if(t===1){if(state==='returning')enter('sitting',2.1,'Sitting down to work');else if(state==='carrying'){if(task==='book'){enter('opening',1.1,'Opening the book');}else enter('enjoying',readDuration,'Taking a coffee break');}else if(state==='return-prop')enter('aligning',.75,task==='book'?'Turning toward the shelf':'Turning toward the desk');else enter('reaching',1.55,task==='book'?'Choosing a book':'Picking up the coffee');}}
  else if(state==='reaching'){const object=task==='book'?book:cup,original=props.get(object),delta=original.position.clone().sub(avatar.position);face(Math.atan2(delta.x,delta.z),dt);motion.pose({stand:1,reachBook:task==='book'?e:0,reachCoffee:task==='coffee'?e:0,time});hold(object,smooth(t/.75));if(t>.9&&!carried)captureProp(object);if(t===1)enter('securing',.9,task==='book'?'Lifting the book':'Lifting the coffee');}
  else if(state==='securing'){motion.pose({stand:1,reachBook:task==='book'?1-e:0,reachCoffee:task==='coffee'?1-e:0,read:task==='book'?.45*e:0,coffee:task==='coffee'?.65*e:0,time});carry();if(t===1)walk('carrying',displayPath(),task==='book'?'Finding a quiet place to read':'Taking a coffee break');}
  else if(state==='opening'){face(.18,dt);motion.pose({stand:1,read:.45+.55*e,time});openness(e);carry();if(t===1)enter('enjoying',readDuration,'Reading for a few moments');}
  else if(state==='enjoying'){face(.18+Math.sin(time*.6)*.025,dt);const lift=smooth(t/.15),sip=task==='coffee'?lift*(.1+.9*smooth((Math.sin(t*Math.PI*4-Math.PI/2)+1)/2)):0;motion.pose({stand:1,read:task==='book'?1:0,coffee:task==='coffee'?.65+.35*lift:0,sip,time});const turn=task==='book'?THREE.MathUtils.clamp((t-.25)/.5,0,1):null;if(openBook)page(smooth((turn-.2)/.6));carry(1,sip,turn);if(t===1)enter('closing',.85,task==='book'?'Closing the book':'Finishing the coffee');}
  else if(state==='closing'){motion.pose({stand:1,read:task==='book'?1-.55*e:0,coffee:task==='coffee'?1-.35*e:0,time});openness(1-e);carry();if(t===1){walk('return-prop',displayPath().reverse(),task==='book'?'Returning the book':'Returning the coffee');}}
  else if(state==='aligning'){const original=props.get(carried),delta=original.position.clone().sub(avatar.position);face(Math.atan2(delta.x,delta.z),dt);motion.pose({stand:1,read:task==='book'?.45:0,coffee:task==='coffee'?.65:0,time});carry();if(t===1){propStart=carried.position.clone();propQ=carried.quaternion.clone();enter('putting',1.65,task==='book'?'Putting the book back':'Setting the coffee down');}}
  else if(state==='putting'){const original=props.get(carried),delta=original.position.clone().sub(avatar.position);face(Math.atan2(delta.x,delta.z),dt);motion.pose({stand:1,read:task==='book'?.45*(1-e):0,coffee:task==='coffee'?.65*(1-e):0,reachBook:task==='book'?e:0,reachCoffee:task==='coffee'?e:0,time});putBack(t);if(t===1){releaseProp();enter('withdrawing',.55,task==='book'?'Leaving the book on the shelf':'Leaving the coffee on the desk');}}
  else if(state==='withdrawing'){motion.pose({stand:1,time});hold(lastPlaced,1-e);if(t===1){lastPlaced=null;walk('returning',basePath().reverse(),'Walking back to the desk');}}
  else if(state==='sitting'){const arrive=smooth(t/.55),swivel=1-smooth((t-.58)/.42);seat(swivel);avatar.position.lerpVectors(stateStart,home.clone().addScaledVector(chairShift,swivel),arrive);avatar.quaternion.slerpQuaternions(stateQ,chairOutQ,arrive);avatar.quaternion.slerp(homeQ,1-swivel);motion.pose({stand:1-smooth((t-.3)/.65),time});if(t===1){seat(0);avatar.position.copy(home);avatar.quaternion.copy(homeQ);enter('typing',7+random()*10,'Typing at the desk');}}

  return true;
 }
 function interrupt(object){if(object!==avatar&&object!==carried&&![desk,chair,shelf].includes(object))return;avatar.updateTyping(time,false);suspended=true;activity='Routine paused · Tidy up to restart';if(carried&&object!==carried){const dropped=carried;close();physics.prepare(dropped);physics.grab(dropped,dropped.getWorldPosition(V(0,0,0)));physics.release(V(0,0,0));}close();carried=null;}
 function suspend(){suspended=true;avatar.updateTyping(time,false);close();carried=null;}
 function reset(){close();carried=null;lastPlaced=null;handErrors=[];seat(0);suspended=false;gait=0;footLocks={};motion.reset();avatar.position.copy(home);avatar.quaternion.copy(homeQ);enter('typing',5+random()*7,'Typing at the desk');physics.scripted(avatar);}
 function setEnabled(value){enabled=!!value;return enabled;}
 physics.scripted(avatar);
 return {update,interrupt,suspend,reset,setEnabled,stats:()=>({state,activity,elapsed,duration,task,enabled,suspended,carrying:carried?.userData.name||null,bookOpen,pagePinchError,maxHandError:Math.max(0,...handErrors),visits:[...visits]}),get activity(){return activity;},get typing(){return state==='typing'&&enabled&&!suspended;}};
}
