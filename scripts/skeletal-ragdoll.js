import * as THREE from 'three';
import * as CANNON from '../assets/world/vendor/cannon-es/cannon-es.js';

// Physics is absent during authored animation. Touch captures the current pose
// and hands the same weighted skeleton to a connected set of rigid segments.
export function createSkeletalRagdoll(world,object){
 const {bones,boneParts,parts,joints}=object.ragdollRig,segments=new Map(),constraints=[];
 object.updateWorldMatrix(true,true);
 const home={position:object.position.clone(),quaternion:object.quaternion.clone(),bones:Object.values(bones).map(bone=>({bone,position:bone.position.clone(),quaternion:bone.quaternion.clone(),scale:bone.scale.clone()}))};
 const captured=new Map(),targets=new Map(),deltas=new Map();
 const matrix=new THREE.Matrix4(),parentInverse=new THREE.Matrix4(),unit=new THREE.Vector3(1,1,1),point=new THREE.Vector3(),rotation=new THREE.Quaternion();
 let engaged=false,prepared=false;
 // Rest against the solid floor; rug particles must not act as point obstacles.
 const material=new CANNON.Material('avatar');
 world.addContactMaterial(new CANNON.ContactMaterial(material,world.defaultMaterial,{friction:.48,restitution:0,contactEquationStiffness:1e6,contactEquationRelaxation:6}));
 for(const [name,part] of Object.entries(parts)){
  const bone=bones[part.bone],geometry=part.proxy.children[0].geometry;geometry.computeBoundingBox();const box=geometry.boundingBox,center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3()),scale=bone.getWorldScale(new THREE.Vector3());
  const mass=name==='torso'?1.3:name==='pelvis'?1:name==='head'?.55:/Thigh/.test(name)?.6:/Shin|UpperArm/.test(name)?.4:/Forearm/.test(name)?.3:.13;
  const body=new CANNON.Body({mass,shape:new CANNON.Box(new CANNON.Vec3(Math.max(.025,size.x*scale.x*.45),Math.max(.025,size.y*scale.y*.46),Math.max(.025,size.z*scale.z*.45))),linearDamping:.3,angularDamping:.4,sleepSpeedLimit:.12,sleepTimeLimit:1.2,material,collisionFilterGroup:4,collisionFilterMask:1});
  segments.set(name,{name,bone,center,body,mass,inverseCapture:new THREE.Matrix4()});deltas.set(name,new THREE.Matrix4());
 }
 function capture(){
  object.hands?.relax();object.updateWorldMatrix(true,true);captured.clear();
  for(const [name,bone] of Object.entries(bones)){captured.set(name,bone.matrixWorld.clone());if(!targets.has(bone))targets.set(bone,new THREE.Matrix4());}
  for(const s of segments.values()){
   point.copy(s.center).applyMatrix4(s.bone.matrixWorld);s.bone.getWorldQuaternion(rotation);s.body.position.set(point.x,point.y,point.z);s.body.quaternion.set(rotation.x,rotation.y,rotation.z,rotation.w);s.body.velocity.setZero();s.body.angularVelocity.setZero();s.body.force.setZero();s.body.torque.setZero();s.body.aabbNeedsUpdate=true;s.inverseCapture.compose(point,rotation,unit).invert();
  }
  constraints.length=0;
  for(const joint of joints){
   const a=segments.get(joint.a),b=segments.get(joint.b),pivot=joint.local.clone().applyMatrix4(bones[joint.bone].matrixWorld),p=new CANNON.Vec3(pivot.x,pivot.y,pivot.z),axis=b.body.position.vsub(p);if(axis.length()<.001)axis.set(0,1,0);axis.normalize();
   const axisA=a.body.vectorToLocalFrame(axis),axisB=b.body.vectorToLocalFrame(axis);
   const constraint=new CANNON.ConeTwistConstraint(a.body,b.body,{pivotA:a.body.pointToLocalFrame(p),pivotB:b.body.pointToLocalFrame(p),axisA,axisB,angle:joint.angle,twistAngle:joint.twist,maxForce:2500,collideConnected:true});// Keep positional joints strong, but limit corrective torque on light limbs.
   constraint.coneEquation.minForce=-2;constraint.twistEquation.minForce=-.35;for(const equation of constraint.equations)equation.setSpookParams(1e5,6,1/90);constraints.push({constraint,a,b});
  }
  prepared=true;
 }
 function nearest(p){if(!engaged&&!prepared)capture();let closest=null,distance=Infinity;for(const s of segments.values()){const d=s.body.position.distanceSquared(p);if(d<distance){closest=s.body;distance=d;}}return closest;}
 function wake(){if(engaged)return;if(!prepared)capture();engaged=true;for(const s of segments.values()){world.addBody(s.body);s.body.wakeUp();}for(const {constraint} of constraints)world.addConstraint(constraint);world.broadphase.dirty=true;}
 function sync(){
  if(!engaged)return;
  for(const s of segments.values()){point.set(s.body.position.x,s.body.position.y,s.body.position.z);rotation.set(s.body.quaternion.x,s.body.quaternion.y,s.body.quaternion.z,s.body.quaternion.w);deltas.get(s.name).compose(point,rotation,unit).multiply(s.inverseCapture);}
  for(const [name,bone] of Object.entries(bones))targets.get(bone).copy(deltas.get(boneParts[name]||'head')).multiply(captured.get(name));
  for(const bone of Object.values(bones)){parentInverse.copy(targets.get(bone.parent)||bone.parent.matrixWorld).invert();matrix.multiplyMatrices(parentInverse,targets.get(bone));matrix.decompose(bone.position,bone.quaternion,bone.scale);}
  object.updateWorldMatrix(true,true);
 }
 function reset(){
  if(engaged){for(const {constraint} of constraints)world.removeConstraint(constraint);for(const s of segments.values())world.removeBody(s.body);world.broadphase.dirty=true;}
  engaged=false;prepared=false;object.position.copy(home.position);object.quaternion.copy(home.quaternion);
  for(const p of home.bones){p.bone.position.copy(p.position);p.bone.quaternion.copy(p.quaternion);p.bone.scale.copy(p.scale);}object.updateWorldMatrix(true,true);
 }
 function metrics(){let maxGap=0;if(engaged)for(const {constraint:c,a,b} of constraints)maxGap=Math.max(maxGap,a.body.pointToWorldFrame(c.pivotA).distanceTo(b.body.pointToWorldFrame(c.pivotB)));return {engaged,parts:segments.size,joints:constraints.length,maxJointGap:maxGap,jointGaps:engaged?constraints.map(({constraint:c,a,b})=>({joint:a.name+' / '+b.name,gap:a.body.pointToWorldFrame(c.pivotA).distanceTo(b.body.pointToWorldFrame(c.pivotB))})):[],segments:engaged?[...segments.values()].map(s=>({name:s.name,x:s.body.position.x,y:s.body.position.y,z:s.body.position.z,q:[s.body.quaternion.x,s.body.quaternion.y,s.body.quaternion.z,s.body.quaternion.w]})):[]};}
 return {object,ragdoll:true,nearest,wake,sync,reset,metrics,active:()=>engaged&&[...segments.values()].some(s=>s.body.sleepState!==CANNON.Body.SLEEPING)};
}
