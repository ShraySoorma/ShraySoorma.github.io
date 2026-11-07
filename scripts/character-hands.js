import * as THREE from 'three';
const V=(x,y,z)=>new THREE.Vector3(x,y,z),Q=()=>new THREE.Quaternion();
const clamp=x=>THREE.MathUtils.clamp(x,0,1);
export function createCharacterHands(avatar,bones,boneParts,joints){
 avatar.updateWorldMatrix(true,true);
 const hands={},restFinger=new Map();
 for(const side of ['left','right']){
  const suffix=side==='right'?'L':'R',wrist=bones['wrist.'+suffix],knuckle=bones['finger3-1.'+suffix].getWorldPosition(V(0,0,0)),w=wrist.getWorldPosition(V(0,0,0));
  const across=bones['finger2-1.'+suffix].getWorldPosition(V(0,0,0)).sub(bones['finger5-1.'+suffix].getWorldPosition(V(0,0,0))).normalize(),forward=knuckle.clone().sub(w).normalize(),normal=across.clone().cross(forward).normalize();
  if(normal.x*(side==='right'?-1:1)<0)normal.negate();across.copy(forward.clone().cross(normal)).normalize();const basis=new THREE.Matrix4().makeBasis(across,forward,normal),wristQ=wrist.getWorldQuaternion(Q());
  const palm=w.clone().lerp(knuckle,.65),anchor=new THREE.Object3D();anchor.position.copy(wrist.worldToLocal(palm.clone()));wrist.add(anchor);
  const tips={};for(let digit=1;digit<=5;digit++){const last=bones[`finger${digit}-3.${suffix}`],previous=bones[`finger${digit}-2.${suffix}`],end=last.getWorldPosition(V(0,0,0)),dir=end.clone().sub(previous.getWorldPosition(V(0,0,0))).multiplyScalar(.8),tip=new THREE.Object3D();tip.position.copy(last.worldToLocal(end.add(dir)));last.add(tip);tips[digit]=tip;}
  const groups=[side+'UpperArm',side+'Forearm',side+'Hand'];const armBones=Object.entries(bones).filter(([name])=>groups.includes(boneParts[name]));
  for(const [name,bone] of armBones)if(name.startsWith('finger'))restFinger.set(bone,bone.quaternion.clone());
  hands[side]={suffix,wrist,anchor,tips,armBones,basisInverse:basis.invert(),wristQ,palmOffset:palm.sub(w),shoulder:joints.find(j=>j.b===side+'UpperArm'),elbow:joints.find(j=>j.b===side+'Forearm'),wristJoint:joints.find(j=>j.b===side+'Hand')};
 }
 function pivot(j){return j.local.clone().applyMatrix4(bones[j.bone].matrixWorld);}
 function frame(a,b,n){const y=b.clone().sub(a).normalize(),x=n.clone().addScaledVector(y,-n.dot(y)).normalize(),z=x.clone().cross(y).normalize();return new THREE.Matrix4().makeBasis(x,y,z);}
 function align(a,b,n,c,d,m){return new THREE.Matrix4().makeTranslation(...c).multiply(frame(c,d,m)).multiply(frame(a,b,n).invert()).multiply(new THREE.Matrix4().makeTranslation(...a.clone().negate()));}
 function fingerRotate(bone,worldAxis,angle){bone.updateWorldMatrix(true,false);const axis=worldAxis.clone().applyQuaternion(bone.getWorldQuaternion(Q()).invert());bone.quaternion.multiply(Q().setFromAxisAngle(axis,angle));bone.updateWorldMatrix(false,true);}
 function tipTo(h,digit,goal,iterations=4){for(let iteration=0;iteration<iterations;iteration++)for(let joint=3;joint>=1;joint--){const bone=bones[`finger${digit}-${joint}.${h.suffix}`],origin=bone.getWorldPosition(V(0,0,0)),current=h.tips[digit].getWorldPosition(V(0,0,0)).sub(origin),target=goal.clone().sub(origin);if(current.lengthSq()<1e-8||target.lengthSq()<1e-8)continue;const base=restFinger.get(bone),delta=Q().setFromUnitVectors(current.normalize(),target.normalize()),angle=2*Math.acos(THREE.MathUtils.clamp(delta.w,-1,1));if(angle>.5)delta.slerp(Q(),1-.5/angle);const parent=bone.parent.getWorldQuaternion(Q());bone.quaternion.premultiply(parent.clone().invert().multiply(delta).multiply(parent));const limit=digit===1?(joint===1?.7:1.0):(joint===1?.85:1.3),turn=base.angleTo(bone.quaternion);if(turn>limit)bone.quaternion.slerp(base,1-limit/turn);bone.updateWorldMatrix(false,true);}}
 // Test the whole finger chain, including skin thickness, against the cover.
 function fingerClearance(h,digit,plane){
  let penetration=-Infinity;
  for(let joint=1;joint<=4;joint++){
   const node=joint===4?h.tips[digit]:bones[`finger${digit}-${joint}.${h.suffix}`];
   const p=node.getWorldPosition(V(0,0,0));penetration=Math.max(p.sub(plane.point).dot(plane.normal)+.022,penetration);
  }
  return penetration;
 }
 function keepFingerOutside(h,digit,plane){
  for(let iteration=0;iteration<12&&fingerClearance(h,digit,plane)>.001;iteration++){
   const bone=bones[`finger${digit}-1.${h.suffix}`],direction=h.tips[digit].getWorldPosition(V(0,0,0)).sub(bone.getWorldPosition(V(0,0,0))).normalize(),axis=direction.cross(plane.normal).normalize();
   if(axis.lengthSq()<.001)break;fingerRotate(bone,axis,-.08);
  }
 }
 function solve(side,{position,fingers,normal,amount=1,curl=.6,pinch=null,thumb=null,thumbCurl=.2,elbowPole=null,supportPlane=null}){
  const h=hands[side];amount=clamp(amount);if(!amount)return;
  for(const [name,bone] of h.armBones)if(restFinger.has(bone))bone.quaternion.copy(restFinger.get(bone));
  avatar.updateWorldMatrix(true,true);
  const f=fingers.clone().normalize(),n=normal.clone().addScaledVector(f,-normal.dot(f)).normalize(),x=f.clone().cross(n).normalize();n.copy(x.clone().cross(f)).normalize();
  const deltaQ=Q().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x,f,n).multiply(h.basisInverse)),desiredQ=deltaQ.clone().multiply(h.wristQ);
  const currentPalm=h.anchor.getWorldPosition(V(0,0,0)),palm=currentPalm.lerp(position,amount),currentQ=h.wrist.getWorldQuaternion(Q()),handQ=currentQ.slerp(desiredQ,amount),rotationDelta=handQ.clone().multiply(h.wristQ.clone().invert()),goal=palm.clone().sub(h.palmOffset.clone().applyQuaternion(rotationDelta));
  const s=pivot(h.shoulder),e=pivot(h.elbow),w=pivot(h.wristJoint),l1=s.distanceTo(e),l2=e.distanceTo(w),direction=goal.clone().sub(s),distance=THREE.MathUtils.clamp(direction.length(),Math.abs(l1-l2)+.005,l1+l2-.004);direction.normalize();const end=s.clone().addScaledVector(direction,distance),bend=V(0,0,0);
  // Project the pole after subtracting the shoulder, keeping a stable elbow plane.
  bend.copy((elbowPole?elbowPole.clone():avatar.localToWorld(V(side==='right'?.75:-.75,1.8,-.35))).sub(s));bend.addScaledVector(direction,-bend.dot(direction)).normalize();
  const along=(l1*l1-l2*l2+distance*distance)/(2*distance),elbow=s.clone().addScaledVector(direction,along).addScaledVector(bend,Math.sqrt(Math.max(0,l1*l1-along*along))),restNormal=e.clone().sub(s).cross(w.clone().sub(e)).normalize(),targetNormal=elbow.clone().sub(s).cross(end.clone().sub(elbow)).normalize();
  const transforms={[side+'UpperArm']:align(s,e,restNormal,s,elbow,targetNormal),[side+'Forearm']:align(e,w,restNormal,elbow,end,targetNormal),[side+'Hand']:new THREE.Matrix4().makeTranslation(...end).multiply(new THREE.Matrix4().makeRotationFromQuaternion(handQ.clone().multiply(h.wrist.getWorldQuaternion(Q()).invert()))).multiply(new THREE.Matrix4().makeTranslation(...w.clone().negate()))};
  const targets=new Map();for(const [name,bone] of h.armBones)targets.set(bone,transforms[boneParts[name]].clone().multiply(bone.matrixWorld));
  for(const [,bone] of h.armBones){const parent=targets.get(bone.parent)||bone.parent.matrixWorld,local=parent.clone().invert().multiply(targets.get(bone));local.decompose(bone.position,bone.quaternion,bone.scale);}
  avatar.updateWorldMatrix(true,true);const axis=f.clone().cross(n).normalize();
  for(let digit=2;digit<=5;digit++)for(let joint=1;joint<=3;joint++)fingerRotate(bones[`finger${digit}-${joint}.${h.suffix}`],axis,(pinch&&digit===2?.12:curl)*amount*(joint===1?.7:1));
  if(thumb)tipTo(h,1,thumb);else fingerRotate(bones[`finger1-1.${h.suffix}`],axis,thumbCurl*amount);
  if(supportPlane&&!pinch)for(let digit=2;digit<=5;digit++){const tip=h.tips[digit].getWorldPosition(V(0,0,0)),distance=tip.clone().sub(supportPlane.point).dot(supportPlane.normal);if(distance>0)tipTo(h,digit,tip.addScaledVector(supportPlane.normal,-distance),2);}
  if(pinch){tipTo(h,2,pinch.clone().addScaledVector(n,-.014));tipTo(h,1,pinch.clone().addScaledVector(n,.014));}
  if(supportPlane)for(let digit=2;digit<=5;digit++)keepFingerOutside(h,digit,supportPlane);
  avatar.updateWorldMatrix(true,true);return h.anchor.getWorldPosition(V(0,0,0)).distanceTo(palm);
 }
 function type(time,surface){
  for(const side of ['left','right']){
   const sign=side==='left'?1:-1,p=surface.localToWorld(V(sign*.25,.09,.14)),q=surface.getWorldQuaternion(Q()),f=V(0,-.08,-1).normalize().applyQuaternion(q),n=V(0,-1,0).applyQuaternion(q);
   const shoulder=pivot(hands[side].shoulder),pole=shoulder.clone().add(V(side==='right'?.65:-.65,.03,-.25).applyQuaternion(avatar.quaternion));solve(side,{position:p,fingers:f,normal:n,curl:.11,thumbCurl:.08,elbowPole:pole});
   const h=hands[side],axis=f.clone().cross(n).normalize();for(let digit=2;digit<=5;digit++){const tap=Math.max(0,Math.sin(time*8+digit*1.4+(side==='left'?Math.PI:0)))**4;fingerRotate(bones[`finger${digit}-1.${h.suffix}`],axis,tap*.10);}
  }
 }
 return {solve,type,relax:()=>{for(const [bone,q] of restFinger)bone.quaternion.copy(q);avatar.updateWorldMatrix(true,true);},palmWorld:side=>{avatar.updateWorldMatrix(true,true);return hands[side].anchor.getWorldPosition(V(0,0,0));},tipWorld:(side,digit)=>hands[side].tips[digit].getWorldPosition(V(0,0,0))};
}
