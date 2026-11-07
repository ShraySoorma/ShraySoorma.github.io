const {test,expect}=require('@playwright/test');
test('reading fingers stay outside the page block throughout a page turn',async({page})=>{
 await page.goto('/');await expect(page.getByRole('button',{name:'Enter the room',exact:true})).toBeEnabled({timeout:45000});
 await page.getByRole('button',{name:'Enter the room',exact:true}).click();await expect(page.locator('body')).toHaveAttribute('data-room-state','entered');
 await page.locator('canvas').focus();await page.keyboard.press('Space');
 const result=await page.evaluate(async()=>{
const T=await import('/assets/world/vendor/three/three.module.js'),a=studio.built.avatar,book=studio.built.objects.find(o=>o.userData.name==='Stories / volume 1');let phases={},candidates=0,bounds=new T.Box3(),samples=0,inside=0,tested=0,worst=0,pinch=0;for(let i=0;i<12000;i++){studio.routine.update(1/60,true);const s=studio.routine.stats();if(s.task==='book'&&s.state==='enjoying'&&i%15===0){studio.scene.updateMatrixWorld(true);a.skin.update();book.updateWorldMatrix(true,true);const inv=book.matrixWorld.clone().invert();samples++;pinch=Math.max(pinch,s.pagePinchError||0);for(const mesh of a.skin.meshes){const pos=mesh.geometry.attributes.position,indices=mesh.geometry.attributes.skinIndex,weights=mesh.geometry.attributes.skinWeight;if(!indices)continue;for(let j=0;j<pos.count;j++){let finger=0;for(let k=0;k<4;k++)if(/^finger[2-5]/.test(mesh.skeleton.bones[indices.getComponent(j,k)]?.name||''))finger+=weights.getComponent(j,k);if(finger<.5)continue;candidates++;const v=new T.Vector3().fromBufferAttribute(pos,j);mesh.applyBoneTransform(j,v);v.applyMatrix4(mesh.matrixWorld).applyMatrix4(inv);bounds.expandByPoint(v);if(Math.abs(v.x)<.34&&Math.abs(v.z)<.15){tested++;const depth=Math.min(v.y+.017,.022-v.y);if(depth>.002){inside++;const phase=Math.floor(s.elapsed/s.duration*10);phases[phase]=(phases[phase]||0)+1;worst=Math.max(worst,depth);}}}}}if(samples>0&&s.task==='book'&&s.state==='closing')break;}return{samples,tested,inside,worst,pinch};
 });
 expect(result.samples).toBeGreaterThan(10);expect(result.tested).toBeGreaterThan(1000);
 expect(result.inside).toBe(0);expect(result.pinch).toBeLessThan(.035);
 await page.goto('about:blank');
});
