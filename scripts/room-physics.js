import {createRagdoll} from './ragdoll-physics.js';
import {createSoftRug} from './soft-rug.js';
import * as THREE from 'three';
import * as CANNON from '../assets/world/vendor/cannon-es/cannon-es.js';

// Keep physics separate from the portfolio's camera and object inspection.
export function createRoomPhysics(roomGroups, {roomWidth=5.6,roomDepth=4.1,roomHeight=3.5,floorTop=.04,groundTop=-.53} = {}) {
  const world = new CANNON.World({gravity:new CANNON.Vec3(0,-9.81,0),allowSleep:true});
  world.broadphase=new CANNON.SAPBroadphase(world);
  world.solver.iterations=24;
  world.defaultContactMaterial.friction=.48;
  world.defaultContactMaterial.restitution=.08;
  world.defaultContactMaterial.contactEquationStiffness=1e6;
  world.defaultContactMaterial.contactEquationRelaxation=5;
  const records=[], cloths=[], ragdolls=[], byObject=new Map(), byBody=new Map();
  let activations=0;
  const fixed=new Set(['floor','wall','window','column','structure','joinery','architecture','wayfinding','acoustics']);
  let enabled=false, held=null, started=false;
  function staticBox(size,center){const body=new CANNON.Body({mass:0,shape:new CANNON.Box(new CANNON.Vec3(...size.map(v=>v/2))),position:new CANNON.Vec3(...center)});world.addBody(body);}
  // Each storey has a solid floor, rear wall, and side walls. The open front
  // remains open: objects can tumble onto the display surface below.
  staticBox([40,.3,32],[0,groundTop-.15,0]);
  for(const group of Object.values(roomGroups)){
    const p=group.position;
    staticBox([roomWidth,.14,roomDepth],[p.x,p.y+floorTop-.07,0]);
    staticBox([roomWidth,roomHeight,.18],[p.x,p.y+roomHeight/2,-roomDepth/2-.04]);
    for(const x of [-roomWidth/2,roomWidth/2])staticBox([.14,roomHeight,roomDepth],[p.x+x,p.y+roomHeight/2,0]);
    for(const object of group.children){
      const category=object.userData.category;
      if(!category||fixed.has(category)||object.userData.ignorePick||object.userData.highlight)continue;
      if(object.userData.ragdoll){const rig=createRagdoll(world,object);ragdolls.push(rig);byObject.set(object,rig);continue;}
      if(object.userData.cloth){const cloth=createSoftRug(world,object,{floorTop:p.y+floorTop,x:p.x,z:p.z,width:roomWidth,depth:roomDepth,groundTop});cloths.push(cloth);byObject.set(object,cloth);continue;}
      const bounds=new THREE.Box3().setFromObject(object),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
      if(!Number.isFinite(size.x)||size.length()<.025)continue;
      const origin=object.getWorldPosition(new THREE.Vector3());
      const volume=size.x*size.y*size.z;
      const mass=Math.max(.08,Math.min(14,volume*4));
      const body=new CANNON.Body({mass:0,type:CANNON.Body.STATIC,position:new CANNON.Vec3(center.x,center.y,center.z),linearDamping:.35,angularDamping:.5,sleepSpeedLimit:.13,sleepTimeLimit:.8});
      const shape=(sx,sy,sz,x=0,y=0,z=0)=>body.addShape(new CANNON.Box(new CANNON.Vec3(Math.max(.012,sx/2),Math.max(.012,sy/2),Math.max(.012,sz/2))),new CANNON.Vec3(x,y,z));
      // Open-bottom furniture colliders let books and equipment fall under desks.
      if(object.userData.physicsParts?.length){
        for(const part of object.userData.physicsParts){const b=new THREE.Box3().setFromObject(part),s=b.getSize(new THREE.Vector3()),c=b.getCenter(new THREE.Vector3()).sub(center);shape(s.x,s.y,s.z,c.x,c.y,c.z);}
      }else if(category==='storage'){
        for(let i=0;i<6;i++)shape(size.x,.055,size.z,0,-size.y/2+i*(size.y-.06)/5,0);
        for(const x of [-1,1])shape(.055,size.y,size.z,x*(size.x-.055)/2,0,0);
      }else if(category==='chair'){
        body.collisionFilterGroup=8;body.collisionFilterMask=3;

        const seatY=-size.y*.1;shape(size.x*.7,.10,size.z*.7,0,seatY,size.z*.08);shape(size.x*.75,size.y*.62,.09,0,size.y*.17,-size.z*.35);shape(.12,size.y*.42,.12,0,-size.y*.3,0);
      }else if((category==='desk'||category==='table'||category==='counter')&&size.y>.35){
        const top=Math.min(.12,size.y*.17);shape(size.x,top,size.z,0,(size.y-top)/2,0);
        const leg=Math.min(.12,size.x*.13,size.z*.13);
        for(const x of [-1,1])for(const z of [-1,1])shape(leg,size.y-top,leg,x*(size.x-leg)/2,-top/2,z*(size.z-leg)/2);
      }else shape(size.x*.94,size.y*.96,size.z*.94);
      const record={object,body,position:object.position.clone(),quaternion:object.quaternion.clone(),center:center.clone(),offset:center.clone().sub(origin),mass,room:group.userData.roomId};
      record.initialOffset=record.offset.clone();record.basisQuaternion=record.quaternion.clone();record.originalShapes=body.shapes.map((shape,i)=>({shape,offset:body.shapeOffsets[i].clone(),orientation:body.shapeOrientations[i].clone()}));
      records.push(record);byObject.set(object,record);byBody.set(body,record);world.addBody(body);body.sleep();
      body.addEventListener('collide',event=>transferContact(event.contact));
    }
  }
  const anchor=new CANNON.Body({mass:0,type:CANNON.Body.KINEMATIC,collisionFilterGroup:0,collisionFilterMask:0});world.addBody(anchor);
  function activate(record){const body=record.body;if(body.type===CANNON.Body.DYNAMIC)return;body.type=CANNON.Body.DYNAMIC;body.mass=record.mass;body.updateMassProperties();body.wakeUp();world.broadphase.dirty=true;}
  function transferContact(contact){
    if(activations>=4)return;
    for(const [target,source] of [[contact.bi,contact.bj],[contact.bj,contact.bi]]){
      const record=byBody.get(target);if(!record||target.type!==CANNON.Body.STATIC||source.type!==CANNON.Body.DYNAMIC)continue;
      const pushing=held?.body===source;
      const origin=byBody.get(source);if(!pushing&&origin&&source.position.distanceTo(origin.center)<.09)continue;
      const dragError=pushing?source.pointToWorldFrame(held.constraint.pivotA).distanceTo(anchor.position):0;
      const speed=Math.max(Math.abs(contact.getImpactVelocityAlongNormal()),Math.min(2,dragError*4));
      // Ignore resting contacts and tiny props tapping heavy furniture.
      if(speed<(pushing?.1:.28)||speed*source.mass<record.mass*(pushing?.12:.4))continue;
      activate(record);activations++;
    }
  }
  function limitMotion(){for(const body of world.bodies){if(body.type!==CANNON.Body.DYNAMIC)continue;const v=body.velocity.length(),w=body.angularVelocity.length();if(v>8)body.velocity.scale(8/v,body.velocity);if(w>10)body.angularVelocity.scale(10/w,body.angularVelocity);}}
  world.addEventListener('postStep',limitMotion);
  function find(object){let node=object;while(node){if(byObject.has(node))return byObject.get(node);node=node.parent;}return null;}
  function sync(){
    cloths.forEach(c=>c.sync());ragdolls.forEach(r=>r.sync());
    for(const r of records){
      if(r.scripted)continue;
      const q=new THREE.Quaternion(r.body.quaternion.x,r.body.quaternion.y,r.body.quaternion.z,r.body.quaternion.w);
      const origin=new THREE.Vector3(r.body.position.x,r.body.position.y,r.body.position.z).sub(r.offset.clone().applyQuaternion(q));
      r.object.position.copy(r.object.parent.worldToLocal(origin));r.object.quaternion.copy(q.multiply(r.basisQuaternion));
    }
  }
  function grab(object,point){
    const r=find(object);if(!r)return false;started=true;release(new THREE.Vector3());if(r.scripted)prepare(object);
    const body=r.cloth||r.ragdoll?r.nearest(new CANNON.Vec3(point.x,point.y,point.z),object):r.body;
    if(r.cloth||r.ragdoll)r.wake();else activate(r);body.wakeUp();body.velocity.setZero();body.angularVelocity.setZero();
    anchor.position.set(point.x,point.y,point.z);anchor.velocity.setZero();
    const pivot=body.pointToLocalFrame(new CANNON.Vec3(point.x,point.y,point.z));
    const constraint=new CANNON.PointToPointConstraint(body,pivot,anchor,new CANNON.Vec3(),r.ragdoll?500:Math.max(35,Math.min(1800,body.mass*150)));
    world.addConstraint(constraint);held={record:r,body,constraint};return true;
  }
  function move(point){anchor.position.set(point.x,point.y,point.z);anchor.velocity.setZero();held?.body.wakeUp();}
  function release(velocity=new THREE.Vector3()){
    if(!held)return;
    world.removeConstraint(held.constraint);
    const v=velocity.clone().clampLength(0,8),body=held.body;
    body.velocity.set(v.x,v.y,v.z);body.angularVelocity.set(-v.z*.5,v.x*.25,-v.x*.5);body.wakeUp();held=null;
  }
  function reset(){started=false;release();cloths.forEach(c=>c.reset());ragdolls.forEach(r=>r.reset());for(const r of records){r.scripted=false;r.body.collisionFilterMask=-1;r.offset.copy(r.initialOffset);r.basisQuaternion.copy(r.quaternion);for(const shape of [...r.body.shapes])r.body.removeShape(shape);for(const entry of r.originalShapes)r.body.addShape(entry.shape,entry.offset,entry.orientation);r.body.position.set(r.center.x,r.center.y,r.center.z);r.body.quaternion.set(0,0,0,1);r.body.velocity.setZero();r.body.angularVelocity.setZero();r.body.force.setZero();r.body.torque.setZero();r.body.type=CANNON.Body.STATIC;r.body.mass=0;r.body.updateMassProperties();r.body.aabbNeedsUpdate=true;r.body.sleep();r.object.position.copy(r.position);r.object.quaternion.copy(r.quaternion);}world.broadphase.dirty=true;}
  function step(dt){if(!enabled||!started)return false;activations=0;cloths.forEach(c=>c.beforeStep());world.step(1/90,Math.min(dt||1/60,.05),6);for(const contact of world.contacts)transferContact(contact);limitMotion();sync();return cloths.some(c=>c.active())||ragdolls.some(r=>r.active())||records.some(r=>r.body.sleepState!==CANNON.Body.SLEEPING);}
  function scripted(object){const r=find(object);if(!r?.body)return false;if(r.scripted)return true;r.scripted=true;r.body.type=CANNON.Body.STATIC;r.body.mass=0;r.body.collisionFilterMask=0;r.body.updateMassProperties();r.body.sleep();return true;}
  function prepare(object){
    const r=find(object);if(!r?.body)return;object.updateWorldMatrix(true,true);const sections=object.userData.physicsParts||[object],bounds=new THREE.Box3();for(const section of sections)bounds.union(new THREE.Box3().setFromObject(section));const center=bounds.getCenter(new THREE.Vector3()),origin=object.getWorldPosition(new THREE.Vector3());
    for(const shape of [...r.body.shapes])r.body.removeShape(shape);
    for(const part of sections){const box=new THREE.Box3().setFromObject(part),size=box.getSize(new THREE.Vector3()),offset=box.getCenter(new THREE.Vector3()).sub(center);r.body.addShape(new CANNON.Box(new CANNON.Vec3(Math.max(.012,size.x*.46),Math.max(.012,size.y*.46),Math.max(.012,size.z*.46))),new CANNON.Vec3(offset.x,offset.y,offset.z));}
    r.offset.copy(center).sub(origin);r.basisQuaternion.copy(object.quaternion);r.body.position.set(center.x,center.y,center.z);r.body.quaternion.set(0,0,0,1);r.body.collisionFilterMask=-1;r.body.aabbNeedsUpdate=true;r.scripted=false;world.broadphase.dirty=true;
  }
  function place(object){
    const r=find(object);if(!r?.body)return;
    const q=object.getWorldQuaternion(new THREE.Quaternion()).multiply(r.quaternion.clone().invert()),p=object.getWorldPosition(new THREE.Vector3()).add(r.initialOffset.clone().applyQuaternion(q));
    r.offset.copy(r.initialOffset);r.basisQuaternion.copy(r.quaternion);r.body.position.set(p.x,p.y,p.z);r.body.quaternion.set(q.x,q.y,q.z,q.w);r.body.type=CANNON.Body.STATIC;r.body.mass=0;r.body.collisionFilterMask=object.userData.category==='chair'?3:-1;r.body.updateMassProperties();r.body.aabbNeedsUpdate=true;r.body.sleep();r.scripted=false;world.broadphase.dirty=true;
  }
  function setEnabled(value){release();enabled=!!value;}
  return {find,grab,move,release,reset,step,setEnabled,scripted,prepare,place,count:records.length+cloths.length+ragdolls.length,stats:()=>({objects:records.length+cloths.length+ragdolls.length,cloth:cloths.map(c=>c.metrics()),ragdolls:ragdolls.map(r=>r.metrics()),awake:records.filter(r=>r.body.sleepState!==CANNON.Body.SLEEPING).length,held:held?.record.object.userData.name||null})};
}
