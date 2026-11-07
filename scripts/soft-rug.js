import * as THREE from 'three';
import * as CANNON from '../assets/world/vendor/cannon-es/cannon-es.js';

// A woven surface of particles and distance constraints, sharing the room's
// rigid-body world so lifted fabric can drape across the furniture.
export function createSoftRug(world,object,{floorTop=.04,x=0,z=0,width=10,depth=6.1,groundTop=-.53}={}){
 const {mesh,columns,rows,fringe}=object.userData.cloth;
 object.updateWorldMatrix(true,true);
 const positions=mesh.geometry.attributes.position,initial=[],nodes=[],springs=[],constraints=[];
 const fabric=new CANNON.Material('woven-fabric');world.addContactMaterial(new CANNON.ContactMaterial(fabric,world.defaultMaterial,{friction:.75,restitution:0,contactEquationStiffness:1e8,contactEquationRelaxation:3}));
 for(let i=0;i<positions.count;i++){
  const p=new THREE.Vector3().fromBufferAttribute(positions,i).applyMatrix4(mesh.matrixWorld);initial.push(p.clone());
  const body=new CANNON.Body({mass:.008,material:fabric,shape:new CANNON.Particle(),position:new CANNON.Vec3(p.x,p.y,p.z),linearDamping:.5,angularDamping:1,collisionFilterGroup:2,collisionFilterMask:5,sleepSpeedLimit:.14,sleepTimeLimit:1.1});
  body.type=CANNON.Body.STATIC;body.mass=0;body.updateMassProperties();world.addBody(body);body.sleep();nodes.push(body);
 }
 const at=(x,y)=>nodes[y*columns+x];
 function connect(a,b,force=350){const c=new CANNON.DistanceConstraint(a,b,a.position.distanceTo(b.position),force);c.collideConnected=true;constraints.push(c);}
 for(let y=0;y<rows;y++)for(let x=0;x<columns;x++){
  if(x+1<columns)connect(at(x,y),at(x+1,y));
  if(y+1<rows)connect(at(x,y),at(x,y+1));
  if(x+1<columns&&y+1<rows){connect(at(x,y),at(x+1,y+1),200);connect(at(x+1,y),at(x,y+1),200);}
  // Weak bend springs allow folds; unlike rigid links, these do not lock the rug flat.
  if(x+2<columns)springs.push(new CANNON.Spring(at(x,y),at(x+2,y),{restLength:at(x,y).position.distanceTo(at(x+2,y).position),stiffness:.18,damping:.025}));
  if(y+2<rows)springs.push(new CANNON.Spring(at(x,y),at(x,y+2),{restLength:at(x,y).position.distanceTo(at(x,y+2).position),stiffness:.18,damping:.025}));
 }
 let disturbed=false;
 function wake(){if(!disturbed)for(const c of constraints)world.addConstraint(c);disturbed=true;nodes.forEach(n=>{n.type=CANNON.Body.DYNAMIC;n.mass=.008;n.updateMassProperties();n.wakeUp();});}
 function nearest(point){return nodes.reduce((best,node)=>node.position.distanceSquared(point)<best.position.distanceSquared(point)?node:best,nodes[0]);}
 function sync(){
  if(!disturbed)return;
  mesh.updateWorldMatrix(true,false);
  for(let i=0;i<nodes.length;i++){const n=nodes[i];const floor=Math.abs(n.position.x-x)<=width/2&&Math.abs(n.position.z-z)<=depth/2?floorTop+.003:groundTop+.005;if(n.position.y<floor){n.position.y=floor;n.velocity.y=Math.max(0,n.velocity.y);n.aabbNeedsUpdate=true;}const p=mesh.worldToLocal(new THREE.Vector3(n.position.x,n.position.y,n.position.z));positions.setXYZ(i,p.x,p.y,p.z);}
  positions.needsUpdate=true;mesh.geometry.computeVertexNormals();mesh.geometry.computeBoundingSphere();mesh.geometry.computeBoundingBox();
  if(fringe){const fp=fringe.geometry.attributes.position;let k=0;for(const side of [0,columns-1])for(let y=0;y<rows;y++){
    const i=y*columns+side,n=nodes[i],inner=nodes[i+(side===0?1:-1)];const dir=new THREE.Vector3(n.position.x-inner.position.x,n.position.y-inner.position.y,n.position.z-inner.position.z).normalize();
    for(let strand=0;strand<3;strand++){
      const a=object.worldToLocal(new THREE.Vector3(n.position.x,n.position.y,n.position.z+(strand-1)*.035));const b=a.clone().add(dir.clone().multiplyScalar(.13));
      fp.setXYZ(k++,a.x,a.y,a.z);fp.setXYZ(k++,b.x,b.y-.018,b.z);
    }
   }fp.needsUpdate=true;fringe.geometry.computeBoundingSphere();}
 }
 function reset(){for(const c of constraints)world.removeConstraint(c);for(let i=0;i<nodes.length;i++){const n=nodes[i],p=initial[i];n.position.set(p.x,p.y,p.z);n.velocity.setZero();n.force.setZero();n.angularVelocity.setZero();n.type=CANNON.Body.STATIC;n.mass=0;n.updateMassProperties();n.aabbNeedsUpdate=true;n.sleep();}disturbed=true;sync();disturbed=false;}
 function beforeStep(){if(disturbed)springs.forEach(s=>s.applyForce());}
 reset();
 return {object,cloth:true,nodes,nearest,wake,sync,reset,beforeStep,active:()=>disturbed&&nodes.some(n=>n.sleepState!==CANNON.Body.SLEEPING),metrics:()=>({nodes:nodes.length,minY:Math.min(...nodes.map(n=>n.position.y)),maxY:Math.max(...nodes.map(n=>n.position.y))})};
}
