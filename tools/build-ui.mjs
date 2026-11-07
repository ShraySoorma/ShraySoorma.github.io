import {build} from 'esbuild';
import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
const output=new URL('../assets/ui/',import.meta.url);
await mkdir(new URL('icons/',output),{recursive:true});
await build({entryPoints:['scripts/ui-components.js'],outdir:'assets/ui',entryNames:'components',bundle:true,format:'esm',platform:'browser',target:['es2022'],minify:true,legalComments:'linked'});
for(const name of ['arrow-right','arrow-up-right','rotate-ccw','ellipsis','book-open','x','sun','pause','play','circle-help','maximize-2','zoom-in','zoom-out','person-standing','armchair'])await cp(`node_modules/lucide-static/icons/${name}.svg`,new URL(`icons/${name}.svg`,output));
await cp('node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2',new URL('geist-latin-variable.woff2',output));
const sources=[];
for(const name of ['@awesome.me/webawesome','lucide-static','@fontsource-variable/geist']){const pkg=JSON.parse(await readFile(`node_modules/${name}/package.json`,'utf8'));sources.push({package:name,version:pkg.version,license:pkg.license});await cp(`node_modules/${name}/${name==='@awesome.me/webawesome'?'LICENSE.md':'LICENSE'}`,new URL(`${name.split('/').at(-1)}-LICENSE.txt`,output));}
await writeFile(new URL('SOURCES.json',output),JSON.stringify(sources,null,2)+'\n');
console.log('Built self-hosted UI components, theme, icons, and font.');
