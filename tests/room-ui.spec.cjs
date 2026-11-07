const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
async function ready(page){await page.goto('/');await expect(page.getByRole('button',{name:'Enter the room',exact:true})).toBeEnabled({timeout:45000});}
async function enter(page){await ready(page);await page.getByRole('button',{name:'Enter the room',exact:true}).click();await expect(page.locator('body')).toHaveAttribute('data-room-state','entered');}
test.afterEach(async({page})=>{if(!page.isClosed())await page.goto('about:blank',{waitUntil:'commit',timeout:5000}).catch(()=>{});});
async function audit(page){const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations).toEqual([]);}

test('welcome gates the room, loads locally, and supports keyboard entry',async({page},testInfo)=>{
 const external=[];page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith('http://127.0.0.1:4180/'))external.push(r.url());});
 let release;const blocked=new Promise(resolve=>release=resolve);
 await page.route('**/shray-character.glb*',async route=>{await blocked;await route.continue();});
 await page.goto('/');await page.waitForFunction(()=>customElements.get('wa-button'));
 await expect(page.getByRole('heading',{name:'Welcome to my room',exact:true})).toBeVisible();
 await expect(page.getByRole('button',{name:'Enter the room',exact:true})).toBeDisabled();await expect(page.locator('#studio-stage')).toBeHidden();
 await audit(page);release();await expect(page.getByRole('button',{name:'Enter the room',exact:true})).toBeEnabled();
 expect(await page.evaluate(()=>studio.routine.stats().elapsed)).toBe(0);
 await page.screenshot({path:testInfo.outputPath('welcome.png')});
 await page.getByRole('button',{name:'Enter the room',exact:true}).focus();await page.keyboard.press('Enter');
 await expect(page.locator('body')).toHaveAttribute('data-room-state','entered');await expect(page.locator('#studio-stage')).toBeVisible();await expect(page.locator('canvas')).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(external).toEqual([]);
 await page.screenshot({path:testInfo.outputPath('room.png')});
});

test('library menus work with keyboard and dialogs restore focus',async({page},testInfo)=>{
 await enter(page);await page.getByRole('button',{name:'Room options',exact:true}).click();
 await expect(page.getByRole('menu')).toBeVisible();await audit(page);await page.keyboard.press('Home');await page.keyboard.press('Enter');
 const dialog=page.getByRole('dialog',{name:'Bookshelf',exact:true});await expect(dialog).toBeVisible();
 await expect(page.locator('#work-content [data-project-role]')).toHaveCount(2);
 await expect(page.locator('#work-content [data-project-role] .project-role')).toHaveText(['Founder','Founder']);
 await page.locator('#work-dialog').getByRole('button',{name:/^Charlore/}).click();await expect(page.getByRole('dialog',{name:'Charlore',exact:true})).toBeVisible();await expect(page.locator('#work-content .project-role')).toHaveText('Founder');
 await audit(page);await page.screenshot({path:testInfo.outputPath('book.png')});
 await page.keyboard.press('Escape');await expect(page.locator('#work-dialog')).not.toHaveAttribute('open','');await expect(page.getByRole('button',{name:'Room options',exact:true})).toBeFocused();
 await page.getByRole('button',{name:'Room options',exact:true}).click();await page.getByRole('menuitemcheckbox',{name:'Pause',exact:true}).click();
 await expect(page.locator('canvas')).toHaveAttribute('data-paused','true');
 await page.getByRole('button',{name:'Room options',exact:true}).click();await expect(page.getByRole('menuitemcheckbox',{name:'Resume',exact:true})).toHaveAttribute('aria-checked','true');
 await page.getByRole('menuitemcheckbox',{name:'Resume',exact:true}).click();await expect(page.locator('canvas')).toHaveAttribute('data-paused','false');
});

test('books still open on click and move on drag without hover cards',async({page},testInfo)=>{
 await enter(page);await page.locator('canvas').focus();await page.keyboard.press('Space');
 const point=await page.evaluate(async()=>{const T=await import('/assets/world/vendor/three/three.module.js'),book=studio.built.objects.find(o=>o.userData.name==='Charlore'),v=book.localToWorld(new T.Vector3(0,0,.19)).project(studio.camera),r=studio.renderer.domElement.getBoundingClientRect();window.originalBookPosition=book.position.clone();return{x:r.left+(v.x+1)*r.width/2,y:r.top+(1-v.y)*r.height/2};});
 await page.mouse.move(point.x,point.y);await expect(page.locator('#object-label')).toHaveCount(0);await page.mouse.click(point.x,point.y);
 await expect(page.getByRole('dialog',{name:'Charlore',exact:true})).toBeVisible();await expect(page.locator('#work-content .project-role')).toHaveText('Founder');expect(await page.evaluate(()=>studio.built.objects.find(o=>o.userData.name==='Charlore').position.distanceTo(originalBookPosition))).toBeLessThan(1e-8);
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toBeHidden();await expect(page.locator('canvas')).toBeFocused();await page.locator('canvas').focus();await page.keyboard.press('Space');
 let dragPoint=point,expected='Charlore';if(testInfo.project.name==='mobile'){dragPoint=await page.evaluate(async()=>{const T=await import('/assets/world/vendor/three/three.module.js'),mug=studio.built.objects.find(o=>o.userData.category==='mug'),v=mug.localToWorld(new T.Vector3(0,.11,.08)).project(studio.camera),r=studio.renderer.domElement.getBoundingClientRect();return{x:r.left+(v.x+1)*r.width/2,y:r.top+(1-v.y)*r.height/2};});expected='Half-finished coffee';}
 await page.mouse.move(dragPoint.x,dragPoint.y);await page.mouse.down();await page.mouse.move(dragPoint.x+65,dragPoint.y-70,{steps:12});expect(await page.evaluate(()=>studio.physics.stats().held)).toBe(expected);await page.mouse.up();
 await expect(page.locator('wa-dialog[open]')).toHaveCount(0);await page.getByRole('button',{name:'Tidy up',exact:true}).click();await expect(page.locator('canvas')).toHaveAttribute('data-restoring','false');
});

test('failed room loading retains an accessible bookshelf',async({page})=>{
 await page.route('**/shray-character.glb*',route=>route.abort());await page.goto('/');
 await expect(page.locator('#welcome-error')).toBeVisible();await expect(page.getByRole('button',{name:'Enter the room',exact:true})).toBeHidden();
 await page.getByRole('button',{name:'Open the bookshelf',exact:true}).click();await expect(page.getByRole('dialog',{name:'Bookshelf',exact:true})).toBeVisible();
 await page.locator('#work-dialog').getByRole('button',{name:'Kyndryl',exact:true}).click();await expect(page.locator('#work-content')).toContainText('1M+');
});
