const {test,expect}=require('@playwright/test');
async function ready(page){await page.goto('/');await expect(page.getByRole('button',{name:'Enter the room',exact:true})).toBeEnabled({timeout:45000});}
test('entry moves the camera, wakes the room, and settles',async({page})=>{
 await ready(page);const before=await page.evaluate(()=>({camera:studio.camera.position.toArray(),lamp:studio.built.lights[0].intensity}));
 await page.getByRole('button',{name:'Enter the room',exact:true}).click();
 if(test.info().project.name==='mobile'){
  await expect(page.locator('body')).toHaveAttribute('data-room-state','entered');
  expect(await page.evaluate(()=>studio.camera.position.toArray())).toEqual(before.camera);
 }else{
  await expect(page.getByRole('button',{name:'Skip intro',exact:true})).toBeVisible();
  await expect.poll(()=>page.evaluate(()=>studio.camera.position.toArray())).not.toEqual(before.camera);
  const during=await page.evaluate(()=>({camera:studio.camera.position.toArray(),lamp:studio.built.lights[0].intensity}));
  expect(during.camera).not.toEqual(before.camera);expect(during.lamp).toBeLessThan(before.lamp);
  await expect(page.locator('body')).toHaveAttribute('data-room-state','entered');
 }
 await expect(page.locator('canvas')).toBeFocused();
 expect(await page.evaluate(()=>studio.camera.position.toArray())).toEqual(before.camera);
 expect(await page.evaluate(()=>studio.built.lights[0].intensity)).toBe(before.lamp);
 await expect(page.getByRole('button',{name:'Skip intro',exact:true})).toBeHidden();
 await page.goto('about:blank');
});
test('intro can be skipped immediately',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await ready(page);
 await page.getByRole('button',{name:'Enter the room',exact:true}).click();
 await page.getByRole('button',{name:'Skip intro',exact:true}).click();
 await expect(page.locator('body')).toHaveAttribute('data-room-state','entered');await expect(page.locator('canvas')).toBeFocused();
 expect(await page.evaluate(()=>studio.built.lights[0].intensity)).toBe(2.8);await page.goto('about:blank');
});
