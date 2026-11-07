const {defineConfig}=require('@playwright/test');
module.exports=defineConfig({
 testDir:'./tests',timeout:60000,expect:{timeout:8000},workers:1,
 reporter:'list',use:{baseURL:'http://127.0.0.1:4180',channel:'chrome',headless:true,trace:'off',screenshot:'only-on-failure'},
 projects:[{name:'desktop',use:{viewport:{width:1440,height:1000}}},{name:'mobile',use:{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}}],
 webServer:{command:'python3 -m http.server 4180 --bind 127.0.0.1',url:'http://127.0.0.1:4180',reuseExistingServer:false,timeout:15000,stdout:'ignore',stderr:'ignore'}
});
