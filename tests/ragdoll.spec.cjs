const {test,expect}=require('@playwright/test');

test('a dropped avatar settles and can be picked up again',async({page})=>{
 await page.goto('/');
 await expect(page.getByRole('button',{name:'Enter the room',exact:true})).toBeEnabled({timeout:45000});
 await page.getByRole('button',{name:'Enter the room',exact:true}).click();
 await expect(page.locator('body')).toHaveAttribute('data-room-state','entered');
 await page.locator('canvas').focus();await page.keyboard.press('Space');
 const result=await page.evaluate(async()=>{
  const T=await import('/assets/world/vendor/three/three.module.js');
  const avatar=studio.built.avatar,physics=studio.physics;
  const head=avatar.userData.physicsParts.find(p=>p.name==='Head');
  const start=new T.Box3().setFromObject(head).getCenter(new T.Vector3());
  studio.routine.interrupt(avatar);physics.grab(avatar,start);
  for(let i=0;i<180;i++){physics.move(start.clone().lerp(new T.Vector3(0,1.4,2),Math.min(1,i/120)));physics.step(1/90);}
  physics.release(new T.Vector3());
  let last,lateMotion=0,maxGap=0;
  for(let i=0;i<2700;i++){
   physics.step(1/90);const m=physics.stats().ragdolls[0];maxGap=Math.max(maxGap,m.maxJointGap);
   if(i>2500&&last)for(let j=0;j<m.segments.length;j++)lateMotion=Math.max(lateMotion,Math.hypot(m.segments[j].x-last[j].x,m.segments[j].y-last[j].y,m.segments[j].z-last[j].z));
   last=m.segments;
  }
  const settled=!physics.find(avatar).active(),h=last.find(s=>s.name==='head'),pickup=new T.Vector3(h.x,h.y,h.z);
  physics.grab(avatar,pickup);
  for(let i=0;i<180;i++){physics.move(pickup.clone().add(new T.Vector3(0,Math.min(1,i/120),0)));physics.step(1/90);}
  const lift=physics.stats().ragdolls[0].segments.find(s=>s.name==='head').y-h.y;
  physics.reset();const reset=!physics.stats().ragdolls[0].engaged;
  return {lateMotion,maxGap,settled,lift,reset};
 });
 expect(result.lateMotion).toBeLessThan(.001);expect(result.maxGap).toBeLessThan(.02);
 expect(result.lift).toBeGreaterThan(.7);expect(result.reset).toBe(true);
 await page.goto('about:blank');
});
