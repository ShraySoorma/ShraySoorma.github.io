import * as THREE from 'three';

// Contact shading from the actual depth buffer, so shadows follow moved props.
export function createRoomOcclusion(renderer){
 const target=new THREE.WebGLRenderTarget(1,1,{samples:renderer.capabilities.maxSamples,depthTexture:new THREE.DepthTexture(1,1,THREE.UnsignedIntType)});
 const uniforms={colorMap:{value:target.texture},depthMap:{value:target.depthTexture},inverseProjection:{value:new THREE.Matrix4()},resolution:{value:new THREE.Vector2(1,1)},radiusPixels:{value:24}};
 const material=new THREE.ShaderMaterial({uniforms,depthTest:false,depthWrite:false,vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}',fragmentShader:`
  #include <common>
  varying vec2 vUv;
  uniform sampler2D colorMap,depthMap;
  uniform mat4 inverseProjection;
  uniform vec2 resolution;
  uniform float radiusPixels;
  vec3 viewPosition(vec2 uv,float d){vec4 p=inverseProjection*vec4(uv*2.0-1.0,d*2.0-1.0,1.0);return p.xyz/p.w;}
  void main(){
   vec3 color=texture2D(colorMap,vUv).rgb;
   float depth=texture2D(depthMap,vUv).x;
   if(depth<.99999){
    vec3 p=viewPosition(vUv,depth);
    vec3 normal=normalize(cross(dFdx(p),dFdy(p)));
    if(normal.z<0.0)normal=-normal;
    float occlusion=0.0;
    for(int i=0;i<16;i++){
     float a=float(i)*2.39996323;float r=(.2+float(i)/20.0)*radiusPixels;
     vec2 uv=vUv+vec2(cos(a),sin(a))*r/resolution;
     float nd=texture2D(depthMap,uv).x;
     vec3 delta=viewPosition(uv,nd)-p;float distance=length(delta);
     float facing=max(0.0,dot(normal,delta/max(distance,.0001))-.12);
     occlusion+=facing*(1.0-smoothstep(.05,.58,distance));
    }
    color*=1.0-min(.42,occlusion/16.0*1.85);
   }
   gl_FragColor=vec4(color,1.0);
   #include <tonemapping_fragment>
   #include <colorspace_fragment>
  }`});
 const scene=new THREE.Scene(),camera=new THREE.Camera();scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),material));
 let enabled=true;
 function resize(){const size=renderer.getDrawingBufferSize(new THREE.Vector2());target.setSize(size.x,size.y);uniforms.resolution.value.copy(size);}
 function render(world,view){if(!enabled){renderer.render(world,view);return;}uniforms.inverseProjection.value.copy(view.projectionMatrixInverse);uniforms.radiusPixels.value=uniforms.resolution.value.y*.5/(view.isPerspectiveCamera?2*Math.tan(THREE.MathUtils.degToRad(view.fov/2))*(view.userData.focusDistance||10)/view.zoom:(view.top-view.bottom)/view.zoom);renderer.setRenderTarget(target);renderer.render(world,view);renderer.setRenderTarget(null);renderer.render(scene,camera);}
 return {render,resize,setEnabled:value=>enabled=!!value,dispose:()=>{target.dispose();material.dispose();}};
}
