import {createSkeletalRagdoll} from './skeletal-ragdoll.js?v=settled-ragdoll-14';
import * as THREE from 'three';
import * as CANNON from '../assets/world/vendor/cannon-es/cannon-es.js';

export function createRagdoll(world,object){
 if(object.userData.ragdoll.skeletal)return createSkeletalRagdoll(world,object);
 object.updateWorldMatrix(true,true);
 const {parts,joints}=object.userData.ragdoll,segments=new Map(),constraints=[];
 for(const [name,group] of Object.entries(parts)){
  const bounds=new THREE.Box3().setFromObject(group),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3()),origin=group.getWorldPosition(new THREE.Vector3());
  const mass=(name==='torso'?1.3:name==='pelvis'?1:name==='head'?.55:/Thigh/.test(name)?.6:/Shin|UpperArm/.test(name)?.4:/Forearm/.test(name)?.3:.13);
  const body=new CANNON.Body({mass,shape:new CANNON.Box(new CANNON.Vec3(Math.max(.025,size.x*.43),Math.max(.025,size.y*.44),Math.max(.025,size.z*.43))),position:new CANNON.Vec3(center.x,center.y,center.z),linearDamping:.06,angularDamping:.09,sleepSpeedLimit:.12,sleepTimeLimit:1.3,collisionFilterGroup:4,collisionFilterMask:3});
  const originalMass=body.mass;body.type=CANNON.Body.STATIC;body.mass=0;body.updateMassProperties();world.addBody(body);body.sleep();segments.set(name,{name,group,body,originalMass,center,offset:center.clone().sub(origin),position:group.position.clone(),quaternion:group.quaternion.clone(),worldQuaternion:group.getWorldQuaternion(new THREE.Quaternion())});
 }
 for(const joint of joints){
  const a=segments.get(joint.a),b=segments.get(joint.b),pivot=object.localToWorld(new THREE.Vector3(...joint.pivot));const axis=new CANNON.Vec3(b.center.x-pivot.x,b.center.y-pivot.y,b.center.z-pivot.z);axis.normalize();
  const c=new CANNON.ConeTwistConstraint(a.body,b.body,{pivotA:a.body.pointToLocalFrame(new CANNON.Vec3(pivot.x,pivot.y,pivot.z)),pivotB:b.body.pointToLocalFrame(new CANNON.Vec3(pivot.x,pivot.y,pivot.z)),axisA:axis,axisB:axis,angle:joint.angle,twistAngle:joint.twist,maxForce:3000,collideConnected:false});
  world.addConstraint(c);constraints.push({constraint:c,a,b});
 }
 function wake(){segments.forEach(s=>{s.body.type=CANNON.Body.DYNAMIC;s.body.mass=s.originalMass;s.body.updateMassProperties();s.body.wakeUp();});}
 function nearest(point,mesh){let node=mesh;while(node&&node!==object){const name=node.userData.ragdollPart;if(name&&segments.has(name))return segments.get(name).body;node=node.parent;}return [...segments.values()].reduce((a,b)=>a.body.position.distanceSquared(point)<b.body.position.distanceSquared(point)?a:b).body;}
 function sync(){for(const s of segments.values()){
  const delta=new THREE.Quaternion(s.body.quaternion.x,s.body.quaternion.y,s.body.quaternion.z,s.body.quaternion.w),origin=new THREE.Vector3(s.body.position.x,s.body.position.y,s.body.position.z).sub(s.offset.clone().applyQuaternion(delta));s.group.position.copy(s.group.parent.worldToLocal(origin));
  const parentQ=s.group.parent.getWorldQuaternion(new THREE.Quaternion()).invert();s.group.quaternion.copy(parentQ.multiply(delta).multiply(s.worldQuaternion));
 }}
 function reset(){for(const s of segments.values()){s.body.position.set(s.center.x,s.center.y,s.center.z);s.body.quaternion.set(0,0,0,1);s.body.velocity.setZero();s.body.angularVelocity.setZero();s.body.force.setZero();s.body.torque.setZero();s.body.type=CANNON.Body.STATIC;s.body.mass=0;s.body.updateMassProperties();s.body.aabbNeedsUpdate=true;s.body.sleep();s.group.position.copy(s.position);s.group.quaternion.copy(s.quaternion);}}
 function metrics(){let maxGap=0;for(const {constraint:c,a,b} of constraints){const p=a.body.pointToWorldFrame(c.pivotA),q=b.body.pointToWorldFrame(c.pivotB);maxGap=Math.max(maxGap,p.distanceTo(q));}return {parts:segments.size,joints:constraints.length,maxJointGap:maxGap,segments:[...segments.values()].map(s=>({name:s.name,x:s.body.position.x,y:s.body.position.y,z:s.body.position.z,q:[s.body.quaternion.x,s.body.quaternion.y,s.body.quaternion.z,s.body.quaternion.w]}))};}
 return {object,ragdoll:true,nearest,wake,sync,reset,metrics,active:()=>[...segments.values()].some(s=>s.body.sleepState!==CANNON.Body.SLEEPING)};
}
