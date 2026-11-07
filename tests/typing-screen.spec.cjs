const {test,expect}=require('@playwright/test');
test('code pauses when the avatar leaves and resumes at the desk',async({page})=>{
 await page.goto('/');await expect(page.getByRole('button',{name:'Enter the room',exact:true})).toBeEnabled({timeout:45000});
 await page.getByRole('button',{name:'Enter the room',exact:true}).click();await expect(page.locator('body')).toHaveAttribute('data-room-state','entered');
 const version=()=>page.evaluate(()=>{const screen=studio.built.objects.find(o=>o.userData.name==='The engineering screen');return screen.children.find(o=>o.material?.map).material.map.version;});
 const first=await version();await expect.poll(version).toBeGreaterThan(first);
 await page.locator('canvas').focus();await page.keyboard.press('Space');
 await page.evaluate(()=>{for(let i=0;i<1000&&studio.routine.stats().state==='typing';i++)studio.routine.update(1/60,true);});
 await page.keyboard.press('Space');await expect(page.locator('canvas')).toHaveAttribute('data-typing','false');
 const away=await version();await page.waitForTimeout(400);expect(await version()).toBe(away);
 await page.keyboard.press('Space');await page.evaluate(()=>{for(let i=0;i<12000&&studio.routine.stats().state!=='typing';i++)studio.routine.update(1/60,true);});
 await page.keyboard.press('Space');await expect(page.locator('canvas')).toHaveAttribute('data-typing','true');await expect.poll(version).toBeGreaterThan(away);
 await page.goto('about:blank');
});
