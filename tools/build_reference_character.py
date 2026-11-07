"""Build the reference-fitted anatomical character and its authored motion clips."""
import bpy, bmesh, json, math, random, pathlib
import numpy as np
from mathutils import Vector, Matrix
from mathutils.kdtree import KDTree
random.seed(27)
ROOT=pathlib.Path(__file__).resolve().parents[1];SRC=ROOT/'.studio-build/character-source';OUT=ROOT/'assets/studio/character';OUT.mkdir(parents=True,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
V=lambda x,y,z:Vector((x,y,z))
T=lambda p:Vector((p[0],-p[2],p[1]))
B=Matrix(((1,0,0,0),(0,0,-1,0),(0,1,0,0),(0,0,0,1)))
raw=[];faces=[];groups={};name=''
for line in open(SRC/'base.obj'):
 if line.startswith('v '):raw.append(Vector(tuple(map(float,line.split()[1:4]))))
 elif line.startswith('g '):name=line.strip()[2:];groups.setdefault(name,[])
 elif line.startswith('f '):
  face=[int(t.split('/')[0])-1 for t in line.split()[1:]];groups[name].append(face)
# Start from a balanced adult body target, then fit the supplied proportions.
for target in ['male-a.target','male-b.target','male-c.target']:
 for line in open(SRC/target):
  if line.startswith('#') or not line.strip():continue
  values=line.split();raw[int(values[0])]+=Vector(tuple(map(float,values[1:4])))/3
weights=json.loads((SRC/'weights.json').read_text())['weights'];spec=json.loads((SRC/'skeleton.json').read_text());vertexWeights=[[] for _ in raw]
for bone,entries in weights.items():
 for index,w in entries:vertexWeights[index].append((bone,w))
bodyIndices=sorted({i for f in groups['body'] for i in f});floor=min(raw[i].y for i in bodyIndices);top=max(raw[i].y for i in bodyIndices);SCALE=3.05/(top-floor)
def initial(p):
 y=(p.y-floor)*SCALE;x=p.x*SCALE;factor=1.12 if y<2.55 else 1.0
 if y<1.55:factor=.75+.37*max(0,min(1,y/1.55))
 return V(x*factor,y,p.z*SCALE)
base=[initial(p) for p in raw]
def joint_raw(group):
 ids={i for f in groups[group] for i in f};return sum((base[i] for i in ids),Vector())/len(ids)
parts=['pelvis','torso','head','leftUpperArm','leftForearm','leftHand','rightUpperArm','rightForearm','rightHand','leftThigh','leftShin','leftFoot','rightThigh','rightShin','rightFoot']
def category(n):
 side='right' if n.endswith('.L') else 'left'
 if n.startswith('upperarm'):return side+'UpperArm'
 if n.startswith('lowerarm'):return side+'Forearm'
 if n.startswith(('wrist','finger','metacarpal')):return side+'Hand'
 if n.startswith('upperleg'):return side+'Thigh'
 if n.startswith('lowerleg'):return side+'Shin'
 if n.startswith(('foot','toe')):return side+'Foot'
 if n.startswith(('root','pelvis','spine04','spine05')):return 'pelvis'
 if n.startswith(('spine','clavicle','shoulder','breast')):return 'torso'
 return 'head'
def mapping(a,b,c,d):
 q=(b-a).rotation_difference(d-c);m=q.to_matrix().to_4x4();ratio=(d-c).length/(b-a).length
 return Matrix.Translation(c)@m@Matrix.Diagonal((ratio,ratio,ratio,1))@Matrix.Translation(-a)
warps={p:Matrix.Identity(4) for p in parts}
for side,suffix,prefix in [(1,'l','right'),(-1,'r','left')]:
 shoulder=joint_raw('joint-'+suffix+'-shoulder');elbow=joint_raw('joint-'+suffix+'-elbow');wrist=joint_raw('joint-'+suffix+'-hand');tip=joint_raw('joint-'+suffix+'-finger-3-4')
 a=V(side*.36,shoulder.y,.03);b=V(side*.49,shoulder.y-.43,.02);c=V(side*.57,shoulder.y-.86,.04);d=V(side*.58,shoulder.y-1.16,.09)
 warps[prefix+'UpperArm']=mapping(shoulder,elbow,a,b);warps[prefix+'Forearm']=mapping(elbow,wrist,b,c);warps[prefix+'Hand']=mapping(wrist,tip,c,d)
points=[]
for i,p in enumerate(base):
 entries=vertexWeights[i];total=sum(w for _,w in entries)
 if total:points.append(sum(((warps[category(n)]@p)*w for n,w in entries),Vector())/total)
 else:points.append(p.copy())
def joint(group):
 ids={i for f in groups[group] for i in f};return sum((points[i] for i in ids),Vector())/len(ids)
anatomy={}
for side,suffix,prefix in [(1,'l','right'),(-1,'r','left')]:
 anatomy[prefix]={k:list(joint('joint-'+suffix+'-'+g)) for k,g in [('shoulder','shoulder'),('elbow','elbow'),('wrist','hand'),('hip','upper-leg'),('knee','knee'),('ankle','ankle')]}
neck=joint('joint-neck');mouth=sum((points[i] for i in spec['joints'][spec['bones']['oris05']['tail']]),Vector())/len(spec['joints'][spec['bones']['oris05']['tail']]);anatomy['neck']=list(neck);anatomy['mouth']=list(mouth)
# Use the existing, anatomically authored skin weights and facial/finger skeleton.
armature=bpy.data.armatures.new('Shray anatomical skeleton');rig=bpy.data.objects.new('Shray character rig',armature);bpy.context.collection.objects.link(rig);bpy.context.view_layer.objects.active=rig;rig.select_set(True);bpy.ops.object.mode_set(mode='EDIT')
for name,b in spec['bones'].items():
 bone=armature.edit_bones.new(name);bone.head=T(sum((points[i] for i in spec['joints'][b['head']]),Vector())/len(spec['joints'][b['head']]));bone.tail=T(sum((points[i] for i in spec['joints'][b['tail']]),Vector())/len(spec['joints'][b['tail']]));
 if (bone.tail-bone.head).length<.001:bone.tail.z+=.01
 bone.align_roll(Vector((0,-1,0)))
for name,b in spec['bones'].items():
 if b['parent']:armature.edit_bones[name].parent=armature.edit_bones[b['parent']]
bpy.ops.object.mode_set(mode='OBJECT');rig.show_in_front=True;rig['characterVersion']='volumetric-head-8'
def material(name,color,rough=.8,metal=0):
 m=bpy.data.materials.new(name);m.use_nodes=True;n=m.node_tree.nodes.get('Principled BSDF');n.inputs['Base Color'].default_value=(*color,1);n.inputs['Roughness'].default_value=rough;n.inputs['Metallic'].default_value=metal;return m
skin=material('Natural skin',(.48,.28,.18),.75);shirt=material('Black cotton',(.018,.02,.022),.88);pants=material('Charcoal twill',(.045,.048,.052),.9);shoeMat=material('Black leather',(.006,.006,.006),.45);hairMat=material('Dark curly hair',(.004,.003,.0025),.67);silver=material('Silver stud',(.65,.68,.7),.25,.9)
reference=bpy.data.images.load(str(ROOT/'reference/character/turnaround.png'));portrait=bpy.data.images.load(str(ROOT/'reference/portrait-original.png'));lm=json.loads((ROOT/'reference/character/original-face-landmarks.json').read_text())['landmarks']
frontCenter=240;ppu=326.6;imageFloor=1115;eyeY=(joint('joint-l-eye').y+joint('joint-r-eye').y)/2;chinY=joint('joint-jaw').y;foreheadY=3.01;eyeX=(abs(joint('joint-l-eye').x)+abs(joint('joint-r-eye').x))/2
# Explicit source UVs are baked into independent texture atlases; originals stay private.
def photoUV(p,back=False,face=False):
 if face:
  templeL,templeR=lm[234],lm[454];cx=(templeL['x']+templeR['x'])/2;half=(templeR['x']-templeL['x'])/2
  lEye=(lm[33]['x']+lm[133]['x'])/2;rEye=(lm[263]['x']+lm[362]['x'])/2;u=float(np.interp(p.x,[-.23,-eyeX,0,eyeX,.23],[templeL['x'],lEye,lm[1]['x'],rEye,templeR['x']]))
  eyePhoto=(lm[33]['y']+lm[263]['y'])/2
  anchors=sorted([(chinY,lm[152]['y']),(mouth.y,lm[13]['y']),(eyeY,eyePhoto),(foreheadY,lm[10]['y'])])
  y=p.y
  for (ya,va),(yb,vb) in zip(anchors,anchors[1:]):
   if ya<=y<=yb:break
  v=va+(vb-va)*(y-ya)/(yb-ya)
  return (u,1-v)
 cx=1060 if back else frontCenter
 return ((cx+(-p.x if back else p.x)*ppu)/1680,1-(imageFloor-p.y*ppu)/1252)
def assignWeights(obj,originals):
 for n in spec['bones']:obj.vertex_groups.new(name=n)
 for new,old in enumerate(originals):
  for n,w in vertexWeights[old]:obj.vertex_groups[n].add([new],w,'REPLACE')
 mod=obj.modifiers.new('Anatomical deformation','ARMATURE');mod.object=rig;obj.parent=rig
objects=[]
def makeSubset(name,chosen,mat,inflate=0,photo=False):
 used=sorted({i for f in chosen for i in f});mapping={old:new for new,old in enumerate(used)};verts=[points[i].copy() for i in used]
 mesh=bpy.data.meshes.new(name);mesh.from_pydata([T(p) for p in verts],[],[[mapping[i] for i in f] for f in chosen]);mesh.update();obj=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(obj);obj.data.materials.append(mat)
 for poly in mesh.polygons:poly.use_smooth=True
 if inflate:
  for v in mesh.vertices:v.co+=v.normal*inflate
  mesh.update()
 assignWeights(obj,used)
 if photo:
  uv=mesh.uv_layers.new(name='PhotoUV')
  for poly in mesh.polygons:
   source=[verts[mesh.loops[li].vertex_index] for li in poly.loop_indices];normal=poly.normal;back=normal.y>0
   for li,p in zip(poly.loop_indices,source):uv.data[li].uv=photoUV(p,back)
 obj['sourceTopology']='Anatomical quad mesh';objects.append(obj);return obj,used
bodyFaces=groups['body'];headFaces=[];shirtFaces=[];pantsFaces=[];shoeFaces=[];skinFaces=[]
for f in bodyFaces:
 p=sum((points[i] for i in f),Vector())/len(f);mix={}
 for i in f:
  for n,w in vertexWeights[i]:mix[category(n)]=mix.get(category(n),0)+w/len(f)
 part=max(mix,key=mix.get) if mix else 'torso'
 if p.y>2.65:
  pass  # The portrait-fitted head replaces the generic cranium completely.
 elif part.endswith(('Forearm','Hand')):skinFaces.append(f)
 elif part.endswith('UpperArm'):
  prefix='left' if p.x<0 else 'right';e=V(*anatomy[prefix]['elbow']);s=V(*anatomy[prefix]['shoulder']);t=(p-s).dot(e-s)/(e-s).length_squared
  if t>.68:skinFaces.append(f)
  else:shirtFaces.append(f)
 elif 1.48<p.y<2.66:
  if not (p.y>2.34 and p.z>.06 and abs(p.x)<.11*min(1,(p.y-2.34)/.22)):shirtFaces.append(f)
 elif .16<p.y<1.61:pantsFaces.append(f)
 if 1.48<p.y<1.66 and not part.endswith(('UpperArm','Forearm','Hand')):pantsFaces.append(f)
 elif p.y<=.19:shoeFaces.append(f)
body,bodyUsed=makeSubset('Skin and facial anatomy',skinFaces,skin)
shirtObj,shirtUsed=makeSubset('Tailored short sleeve shirt',shirtFaces,shirt,.035,True)
pantsObj,pantsUsed=makeSubset('Straight charcoal trousers',pantsFaces,pants,.022,True)
shoes,shoesUsed=makeSubset('Black leather shoes',shoeFaces,shoeMat,.018,True)
# Join a clean draped torso to anatomical deltoids and sleeve openings.
# The upper section keeps the shoulder contour; the chest has no body details.
upper=[]
for f in shirtFaces:
 center=sum((points[i] for i in f),Vector())/len(f);arm=sum(w for i in f for bone,w in vertexWeights[i] if category(bone).endswith('UpperArm'))/len(f)
 if center.y>2.32 or arm>.3:upper.append(f)
used=sorted({i for f in upper for i in f});sourcePositions={old:shirtObj.data.vertices[j].co.copy() for j,old in enumerate(shirtUsed)};index={old:j for j,old in enumerate(used)};verts=[sourcePositions[i] for i in used];quads=[[index[i] for i in f] for f in upper]
rings=[(1.48,.35,.22),(1.68,.345,.22),(1.92,.35,.22),(2.14,.375,.215),(2.34,.39,.20),(2.42,.385,.18)];steps=48;offset=len(verts)
for y,rx,rz in rings:
 for j in range(steps):a=j/steps*math.tau;verts.append(T(V(math.cos(a)*rx,y,math.sin(a)*rz)))
for row in range(len(rings)-1):
 for j in range(steps):a=offset+row*steps+j;quads.append((a,offset+row*steps+(j+1)%steps,offset+(row+1)*steps+(j+1)%steps,a+steps))
quads.extend([tuple(offset+j for j in reversed(range(steps))),tuple(offset+(len(rings)-1)*steps+j for j in range(steps))])
objects.remove(shirtObj);bpy.data.objects.remove(shirtObj,do_unlink=True);m=bpy.data.meshes.new('Continuous tailored garment');m.from_pydata(verts,[],quads);m.update();shirtObj=bpy.data.objects.new('Tailored short sleeve shirt',m);bpy.context.collection.objects.link(shirtObj);m.materials.append(shirt)
bm=bmesh.new();bm.from_mesh(m);bmesh.ops.holes_fill(bm,edges=[e for e in bm.edges if e.is_boundary],sides=0);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(m);bm.free()
bpy.ops.object.select_all(action='DESELECT');shirtObj.select_set(True);bpy.context.view_layer.objects.active=shirtObj
bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.mesh.separate(type='LOOSE');bpy.ops.object.mode_set(mode='OBJECT');pieces=list(bpy.context.selected_objects);shirtObj=max(pieces,key=lambda o:len(o.data.vertices));bpy.context.view_layer.objects.active=shirtObj
for piece in pieces:
 bm=bmesh.new();bm.from_mesh(piece.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces))
 if bm.calc_volume(signed=True)<0:bmesh.ops.reverse_faces(bm,faces=list(bm.faces))
 bm.to_mesh(piece.data);bm.free();piece.data.update()
bpy.ops.object.join();shirtObj=bpy.context.object;shirtObj.data.remesh_voxel_size=.012;shirtObj.data.use_remesh_preserve_volume=True;bpy.ops.object.voxel_remesh();assert len(shirtObj.data.polygons)>100,'Garment remesh failed'
for vertex in shirtObj.data.vertices:
 x,y,z=vertex.co.x,vertex.co.z,-vertex.co.y;weight=max(0,min(1,(y-2.08)/.12,(2.56-y)/.12))*max(0,min(1,(.43-abs(x))/.08))*max(0,min(1,(abs(z)-.08)/.04))
 if weight:
  target=math.copysign((.22 if z>0 else .20)*math.sqrt(max(.10,1-(x/.40)**2)),z);vertex.co.y=-(z*(1-weight)+target*weight)
# The garment ends at the base of the neck, rather than continuing up the
# anatomical neck surface inherited from the body mesh.
for vertex in shirtObj.data.vertices:
 if vertex.co.z>2.50 and abs(vertex.co.x)<.17:
  blend=max(0,min(1,(.17-abs(vertex.co.x))/.035))
  vertex.co.z-=max(0,vertex.co.z-2.50)*blend
# Resolve folded/collapsed neckline faces before smoothing or transferring weights.
shirtObj.data.update();shirtObj.data.remesh_voxel_size=.009
bpy.ops.object.voxel_remesh()
bm=bmesh.new();bm.from_mesh(shirtObj.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(shirtObj.data);bm.free()
soft=shirtObj.modifiers.new('Cloth drape smoothing','SMOOTH');soft.factor=.55;soft.iterations=5;bpy.ops.object.modifier_apply(modifier=soft.name);dec=shirtObj.modifiers.new('Tailored garment topology','DECIMATE');dec.ratio=.45;bpy.ops.object.modifier_apply(modifier=dec.name)
kd=KDTree(len(bodyIndices))
for i in bodyIndices:kd.insert(T(points[i]),i)
kd.balance()
for name in spec['bones']:shirtObj.vertex_groups.new(name=name)
for vertex in shirtObj.data.vertices:
 merged={};total=0
 for _,old,distance in kd.find_n(vertex.co,4):
  contribution=1/(distance+.015)**3;total+=contribution
  for bone,w in vertexWeights[old]:merged[bone]=merged.get(bone,0)+w*contribution
 for bone,w in merged.items():shirtObj.vertex_groups[bone].add([vertex.index],w/total,'REPLACE')
for poly in shirtObj.data.polygons:poly.use_smooth=True
uv=shirtObj.data.uv_layers.new(name='PhotoUV')
for poly in shirtObj.data.polygons:
 for li in poly.loop_indices:
  p=shirtObj.data.vertices[shirtObj.data.loops[li].vertex_index].co;uv.data[li].uv=photoUV(V(p.x,p.z,-p.y),poly.normal.y>0)
shirtObj.parent=rig;mod=shirtObj.modifiers.new('Anatomical garment deformation','ARMATURE');mod.object=rig;objects.append(shirtObj)
faceData=json.loads((ROOT/'reference/character/original-face-landmarks.json').read_text());landmarks=faceData['landmarks']
rawFace=[V(q['x'],-q['y'],-q['z']) for q in landmarks[:468]]
lateral=(rawFace[263]-rawFace[33]).normalized();vertical=rawFace[10]-rawFace[152];vertical=(vertical-lateral*vertical.dot(lateral)).normalized();forward=lateral.cross(vertical).normalized()
origin=(rawFace[234]+rawFace[454])/2;midY=((rawFace[10]+rawFace[152])/2-origin).dot(vertical)
faceWidth=.37;faceHeight=.46;scaleX=faceWidth/(rawFace[454]-rawFace[234]).dot(lateral);scaleY=faceHeight/(rawFace[10]-rawFace[152]).dot(vertical)
fv=[]
for q in rawFace:
 d=q-origin;fv.append(V(d.dot(lateral)*scaleX,2.82+(d.dot(vertical)-midY)*scaleY,-.025+d.dot(forward)*scaleX*1.12))
# A restrained mandibular definition keeps the photographed likeness intact.
for p in fv:
 jaw=max(0,min(1,(2.78-p.y)/.07))*max(0,min(1,(p.y-2.565)/.07))
 p.x*=1+.075*jaw*min(1,abs(p.x)/.12)
 if p.y<2.73:p.z+=.009*max(0,1-abs(p.x)/.19)
ff=[];fuv=[(q['x'],1-q['y']) for q in landmarks[:468]]
for i in range(0,len(faceData['edges']),3):
 tri=list(dict.fromkeys(j for edge in faceData['edges'][i:i+3] for j in [edge['start'],edge['end']]))
 if len(tri)!=3 or max(tri)>=468:continue
 if (fv[tri[1]]-fv[tri[0]]).cross(fv[tri[2]]-fv[tri[0]]).z<0:tri.reverse()
 ff.append(tri)
for ring in [[33,7,163,144,145,153,154,155,133,173,157,158,159,160,161,246],[263,249,390,373,374,380,381,382,362,398,384,385,386,387,388,466],[78,95,88,178,87,14,317,402,318,324,308,415,310,311,312,13,82,81,80,191]]:
 index=len(fv);fv.append(sum((fv[i] for i in ring),Vector())/len(ring));fuv.append(tuple(sum(fuv[i][j] for i in ring)/len(ring) for j in [0,1]))
 for i,j in enumerate(ring):
  tri=[index,j,ring[(i+1)%len(ring)]]
  if (fv[tri[1]]-fv[tri[0]]).cross(fv[tri[2]]-fv[tri[0]]).z<0:tri.reverse()
  ff.append(tri)
neighbors={}
for edge in faceData['oval']:
 a,b=edge['start'],edge['end'];neighbors.setdefault(a,[]).append(b);neighbors.setdefault(b,[]).append(a)
ring=[10];previous=None
while len(ring)<len(neighbors):
 current=ring[-1];nexts=[v for v in neighbors[current] if v!=previous];n=nexts[0] if nexts[0] not in ring else nexts[-1]
 if n in ring:break
 previous=current;ring.append(n)
# Sweep the actual facial oval into a rounded occiput. The first ring shares
# the exact jaw/temple contour; there is no flattened portrait backing plate.
cranialVerts=[fv[i].copy() for i in ring];cranialFaces=[];cranialColors=[]
portraitPixels=np.asarray(portrait.pixels[:],dtype=np.float32).reshape(portrait.size[1],portrait.size[0],4)
def portraitColor(index):
 q=landmarks[index];c=portraitPixels[int((1-q['y'])*(portrait.size[1]-1)),int(q['x']*(portrait.size[0]-1)),:3]
 return np.where(c>.04045,((c+.055)/1.055)**2.4,c/12.92)
cheekTone=portraitColor(205);count=len(ring)
for row in range(13):
 t=row/12;angle=t*math.pi/2
 for k,index in enumerate(ring):
  edge=fv[index]
  if row:
   x=edge.x*math.cos(angle)+math.copysign(.016*math.sin(math.pi*t),edge.x);verticalAngle=(t**1.25)*math.pi/2 if edge.y<2.78 else angle;y=2.86+(edge.y-2.86)*math.cos(verticalAngle)+.135*math.sin(math.pi*t)*max(0,(edge.y-2.86)/.2);z=edge.z*(1-math.sin(angle))-.245*math.sin(angle)
   cranialVerts.append(V(x,y,z))
  edgeTone=portraitColor(index);blend=min(1,t*2.8);cranialColors.append(tuple(edgeTone*(1-blend)+cheekTone*blend)+(1,))
for row in range(12):
 for k in range(count):a=row*count+k;cranialFaces.append((a,row*count+(k+1)%count,(row+1)*count+(k+1)%count,a+count))
m=bpy.data.meshes.new('Portrait facial topology');m.from_pydata([T(p) for p in fv],[],ff);m.update();faceObj=bpy.data.objects.new('Reference fitted face',m);bpy.context.collection.objects.link(faceObj);faceObj.data.materials.append(material('Portrait face',(.5,.3,.2),.92));uv=m.uv_layers.new(name='PhotoUV')
for poly in m.polygons:
 poly.use_smooth=True
 for li in poly.loop_indices:uv.data[li].uv=fuv[m.loops[li].vertex_index]
g=faceObj.vertex_groups.new(name='head');g.add(list(range(len(fv))),1,'REPLACE');faceObj.parent=rig;mod=faceObj.modifiers.new('Facial skeleton','ARMATURE');mod.object=rig;sub=faceObj.modifiers.new('Facial surface refinement','SUBSURF');sub.levels=1;sub.render_levels=1;objects.append(faceObj);anatomy['mouth']=list(fv[13])
# Garment cuffs and hems have real thickness, not disconnected limb caps.
for obj in [shirtObj,pantsObj,shoes]:
 sub=obj.modifiers.new('Garment surface refinement','SUBSURF');sub.levels=1;sub.render_levels=1
 solid=obj.modifiers.new('Fabric edge thickness','SOLIDIFY');solid.thickness=.006
# Bake photographed clothing onto UV atlases without baking studio shadows a second time.
def bake(obj,sourceImage,face=False,size=2048):
 mesh=obj.data;uv=mesh.uv_layers.get('PhotoUV') or mesh.uv_layers.new(name='PhotoUV')
 if face is True:
  mask=mesh.color_attributes.new(name='PortraitBlend',type='FLOAT_COLOR',domain='POINT')
  for i,old in enumerate(bodyUsed):
   p=points[old];normal=mesh.vertices[i].normal;front=max(0,min(1,(-normal.y-.05)/.55));edge=max(0,min(1,(.235-abs(p.x))/.055));vertical=max(0,min(1,(p.y-chinY+.025)/.06))*max(0,min(1,(3.04-p.y)/.05));mask.data[i].color=(front*edge*vertical,)*3+(1,)
  for poly in mesh.polygons:
   for li in poly.loop_indices:uv.data[li].uv=photoUV(points[bodyUsed[mesh.loops[li].vertex_index]],face=True)
 atlas=mesh.uv_layers.new(name='SurfaceUV');mesh.uv_layers.active=atlas
 bpy.ops.object.select_all(action='DESELECT');obj.select_set(True);bpy.context.view_layer.objects.active=obj;bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project(angle_limit=math.radians(65),island_margin=.012);bpy.ops.object.mode_set(mode='OBJECT')
 mat=obj.data.materials[0];nodes=mat.node_tree.nodes;links=mat.node_tree.links
 # Deterministic CPU texture projection avoids dependence on a render backend.
 source=np.asarray(sourceImage.pixels[:],dtype=np.float32).reshape(sourceImage.size[1],sourceImage.size[0],4);pixels=np.zeros((size,size,4),dtype=np.float32);covered=np.zeros((size,size),dtype=bool);mesh.calc_loop_triangles();photoLayer=mesh.uv_layers['PhotoUV'];atlasLayer=mesh.uv_layers['SurfaceUV'];faceMask=mesh.color_attributes.get('PortraitBlend')
 nearestCloth=None
 if not face:
  nearestCloth=np.tile(np.arange(source.shape[1],dtype=np.int32),(source.shape[0],1))
  for row in range(source.shape[0]):
   for lo,hi in [(15,455),(850,1260)]:
    valid=np.flatnonzero(np.max(source[row,lo:hi,:3],axis=1)<.32)+lo
    if not len(valid):continue
    xs=np.arange(lo,hi);right=np.clip(np.searchsorted(valid,xs),0,len(valid)-1);left=np.maximum(0,right-1);nearestCloth[row,lo:hi]=np.where(abs(valid[left]-xs)<abs(valid[right]-xs),valid[left],valid[right])
 cheek=lm[205];sy=int((1-cheek['y'])*(source.shape[0]-1));sx=int(cheek['x']*(source.shape[1]-1));baseColor=source[max(0,sy-3):sy+4,max(0,sx-3):sx+4,:3].mean(axis=(0,1))
 for tri in mesh.loop_triangles:
  ids=list(tri.loops);dst=np.array([atlasLayer.data[i].uv[:] for i in ids])*(size-1);srcUV=np.array([photoLayer.data[i].uv[:] for i in ids]);lo=np.maximum(0,np.floor(dst.min(axis=0)).astype(int));hi=np.minimum(size-1,np.ceil(dst.max(axis=0)).astype(int))
  if np.any(hi<lo):continue
  xx,yy=np.meshgrid(np.arange(lo[0],hi[0]+1)+.5,np.arange(lo[1],hi[1]+1)+.5);a,b,c=dst;den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1])
  if abs(den)<1e-8:continue
  w0=((b[1]-c[1])*(xx-c[0])+(c[0]-b[0])*(yy-c[1]))/den;w1=((c[1]-a[1])*(xx-c[0])+(a[0]-c[0])*(yy-c[1]))/den;w2=1-w0-w1;inside=(w0>=-.001)&(w1>=-.001)&(w2>=-.001)
  if not inside.any():continue
  uv=w0[...,None]*srcUV[0]+w1[...,None]*srcUV[1]+w2[...,None]*srcUV[2];u=np.clip((uv[...,0]*(source.shape[1]-1)).astype(int),0,source.shape[1]-1);v=np.clip((uv[...,1]*(source.shape[0]-1)).astype(int),0,source.shape[0]-1);color=source[v,u,:3]
  if nearestCloth is not None:
   background=np.max(color,axis=2)>.35;u=np.where(background,nearestCloth[v,u],u);color=source[v,u,:3]
   target=.085 if mat.name=='Black cotton' else .20;color=np.clip(target+(np.minimum(color,.32)-(.10 if mat.name=='Black cotton' else .20))*.4,.025,.28)
  if face is True:
   values=[faceMask.data[mesh.loops[i].vertex_index].color[0] for i in ids];blend=np.clip(w0*values[0]+w1*values[1]+w2*values[2],0,1)[...,None];color=baseColor[None,None,:]*(1-blend)+color*blend
  region=pixels[lo[1]:hi[1]+1,lo[0]:hi[0]+1];region[inside,:3]=color[inside];region[inside,3]=1;covered[lo[1]:hi[1]+1,lo[0]:hi[0]+1]|=inside
 for _ in range(10):
  counts=np.zeros((size,size),dtype=np.float32);total=np.zeros((size,size,3),dtype=np.float32)
  for axis,direction in [(0,1),(0,-1),(1,1),(1,-1)]:
   mask=np.roll(covered,direction,axis);counts+=mask;total+=np.roll(pixels[:,:,:3],direction,axis)*mask[:,:,None]
  fill=(~covered)&(counts>0);pixels[fill,:3]=total[fill]/counts[fill,None];pixels[fill,3]=1;covered|=fill
 pixels[:,:,3]=1;image=bpy.data.images.new(mat.name+' albedo',width=size,height=size,alpha=False);image.pixels.foreach_set(pixels.ravel());image.filepath_raw=str(OUT/(mat.name.lower().replace(' ','-')+'.png'));image.file_format='PNG';image.save();principal=nodes.get('Principled BSDF');target=nodes.new('ShaderNodeTexImage');target.image=image;links.new(target.outputs['Color'],principal.inputs['Base Color']);uvNode=nodes.new('ShaderNodeUVMap');uvNode.uv_map='SurfaceUV';links.new(uvNode.outputs['UV'],target.inputs['Vector']);mesh.uv_layers.active=atlas;atlas.active_render=True

bake(body,portrait,True);bake(faceObj,portrait,'patch');bake(shirtObj,reference);bake(pantsObj,reference);
# Replace projected photograph seams with a continuous, subtle cotton weave.
clothImage=shirtObj.data.materials[0].node_tree.nodes.get('Principled BSDF').inputs['Base Color'].links[0].from_node.image
w,h=clothImage.size;yy,xx=np.indices((h,w));rng=np.random.default_rng(27)
weave=.058+.0025*np.sin(xx*math.pi/2)*np.sin(yy*math.pi/2)+rng.normal(0,.0008,(h,w))
clothPixels=np.ones((h,w,4),dtype=np.float32);clothPixels[:,:,:3]=np.stack([weave*.96,weave,weave*1.04],axis=2)
clothImage.pixels.foreach_set(clothPixels.ravel());clothImage.save()
objects.remove(shoes);bpy.data.objects.remove(shoes,do_unlink=True)
# Small modeled details follow the same anatomical rig.
def bindHead(obj,bone='head'):
 obj.parent=rig;g=obj.vertex_groups.new(name=bone);g.add(list(range(len(obj.data.vertices))),1,'REPLACE');mod=obj.modifiers.new('Character rig','ARMATURE');mod.object=rig;objects.append(obj)
def sphere(name,center,scale,mat,bone='head'):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=16,location=T(center));o=bpy.context.object;o.name=name;o.scale=(scale[0],scale[2],scale[1]);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True);o.data.materials.append(mat)
 for p in o.data.polygons:p.use_smooth=True
 bindHead(o,bone);return o
# A closed cranial surface gives the jaw, temples and back of head real volume.
m=bpy.data.meshes.new('Jaw and cranial topology');m.from_pydata([T(p) for p in cranialVerts],[],cranialFaces);m.update();o=bpy.data.objects.new('Sculpted jaw and cranium',m);bpy.context.collection.objects.link(o)
headMat=material('Cranial skin',tuple(cheekTone),.82);colors=m.color_attributes.new(name='HeadTone',type='FLOAT_COLOR',domain='CORNER')
for loop in m.loops:colors.data[loop.index].color=cranialColors[loop.vertex_index]
colorNode=headMat.node_tree.nodes.new('ShaderNodeVertexColor');colorNode.layer_name='HeadTone';headMat.node_tree.links.new(colorNode.outputs['Color'],headMat.node_tree.nodes.get('Principled BSDF').inputs['Base Color']);m.materials.append(headMat)
for f in m.polygons:f.use_smooth=True
bindHead(o)
# Weld the facial oval to the cranial rings so the cheek-to-temple normals are
# continuous; both regions retain their own material and the same head weights.
bpy.ops.object.select_all(action='DESELECT');o.select_set(True);faceObj.select_set(True);bpy.context.view_layer.objects.active=faceObj;objects.remove(o);bpy.ops.object.join()
bm=bmesh.new();bm.from_mesh(faceObj.data);bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=.00001);bm.to_mesh(faceObj.data);bm.free();faceObj.data.update();faceObj.name='Sculpted portrait head'
for f in faceObj.data.polygons:f.use_smooth=True
# The neck reaches into the jaw, with a recessed nape and a forward throat.
neckVertices=[];neckFaces=[]
for row in range(7):
 t=row/6;y=2.40+t*.34;rx=.108+t*.013;rz=.09+t*.01
 for j in range(40):a=j/40*math.tau;neckVertices.append(T(V(math.cos(a)*rx,y,-.045+math.sin(a)*rz)))
for row in range(6):
 for j in range(40):a=row*40+j;neckFaces.append((a,row*40+(j+1)%40,(row+1)*40+(j+1)%40,a+40))
m=bpy.data.meshes.new('Fitted neck topology');m.from_pydata(neckVertices,[],neckFaces);m.update();o=bpy.data.objects.new('Fitted neck',m);bpy.context.collection.objects.link(o);o.data.materials.append(material('Neck skin',tuple(cheekTone),.85))
for f in m.polygons:f.use_smooth=True
bindHead(o)
headGroup=o.vertex_groups['head'];headGroup.remove(list(range(len(o.data.vertices))));torsoGroup=o.vertex_groups.new(name='spine01')
for vert in o.data.vertices:
 t=max(0,min(1,(vert.co.z-2.44)/.25));t=t*t*(3-2*t)
 if t:headGroup.add([vert.index],t,'REPLACE')
 if t<1:torsoGroup.add([vert.index],1-t,'REPLACE')
# Exposed upper chest and trapezius continue beneath the open collar.
chestFaces=[]
for f in bodyFaces:
 center=sum((points[i] for i in f),Vector())/len(f)
 if 2.43<center.y<2.65 and abs(center.x)<.22:chestFaces.append(f)
chest,chestUsed=makeSubset('Neck base and upper chest',chestFaces,material('Upper chest skin',tuple(cheekTone),.85))
# Pinnae have a folded helix, inner bowl, and lobule behind the jaw hinge.
for side in [-1,1]:
 ev=[];ef=[];steps=40
 for r in range(5):
  radius=[1,.84,.65,.40,.03][r];depth=[0,.012,-.008,-.015,-.005][r]
  for j in range(steps):
   a=j/steps*math.tau;ev.append(T(V(side*(.193+depth),2.815+math.sin(a)*.067*radius,-.045+math.cos(a)*.034*radius)))
 for r in range(4):
  for j in range(steps):a=r*steps+j;ef.append((a,r*steps+(j+1)%steps,(r+1)*steps+(j+1)%steps,a+steps))
 m=bpy.data.meshes.new('Ear cartilage');m.from_pydata(ev,[],ef);m.update();o=bpy.data.objects.new('Ear '+str(side),m);bpy.context.collection.objects.link(o);m.materials.append(material('Ear skin '+str(side),tuple(cheekTone*.91),.8))
 for f in m.polygons:f.use_smooth=True
 bindHead(o)
# Closed shoe lasts, stacked soles, toe seams and laces replace exposed toe anatomy.
for side,prefix,suffix in [(1,'right','L'),(-1,'left','R')]:
 center=anatomy[prefix]['ankle'][0];stations=[(-.14,.055,.18),(-.10,.08,.23),(0,.09,.22),(.09,.11,.18),(.22,.12,.13),(.32,.085,.105),(.35,.008,.09)];verts=[];fs=[];rings=24
 for z,width,height in stations:
  for j in range(rings):
   a=j/rings*math.tau;sy=math.sin(a);y=.085+(height-.085)*sy if sy>0 else .085+.025*sy;verts.append(V(center+math.cos(a)*width,y,z))
 for i in range(len(stations)-1):
  for j in range(rings):a=i*rings+j;fs.append((a,i*rings+(j+1)%rings,(i+1)*rings+(j+1)%rings,a+rings))
 fs.extend([tuple(reversed(range(rings))),tuple((len(stations)-1)*rings+j for j in range(rings))]);m=bpy.data.meshes.new('Leather shoe last');m.from_pydata([T(p) for p in verts],[],fs);m.update();o=bpy.data.objects.new('Leather derby '+prefix,m);bpy.context.collection.objects.link(o);o.data.materials.append(shoeMat)
 for poly in m.polygons:poly.use_smooth=True
 sub=o.modifiers.new('Polished shoe silhouette','SUBSURF');sub.levels=2;sub.render_levels=2;bindHead(o,'foot.'+suffix)
 for row in range(5):
  z=-.01+row*.027;y=.225-row*.009;c=bpy.data.curves.new('Lace','CURVE');c.dimensions='3D';c.bevel_depth=.0025;c.bevel_resolution=2;spline=c.splines.new('POLY');spline.points.add(2)
  for point,co in zip(spline.points,[V(center-.052,y,z),V(center,y+.008,z+.009),V(center+.052,y,z)]):point.co=(*T(co),1)
  lace=bpy.data.objects.new('Derby lace',c);bpy.context.collection.objects.link(lace);lace.data.materials.append(material('Black lacing '+prefix+str(row),(.009,.009,.009),.75));bpy.ops.object.select_all(action='DESELECT');lace.select_set(True);bpy.context.view_layer.objects.active=lace;bpy.ops.object.convert(target='MESH');bindHead(bpy.context.object,'foot.'+suffix)
for side,suffix in [(1,'l'),(-1,'r')]:
 ear=V(side*.203,2.765,-.032);sphere('Silver ear stud '+suffix,ear,(.008,.008,.007),silver)
for y in [1.62,1.82,2.02,2.22]:sphere('Shirt button',V(-.018,y,.19),(.012,.012,.006),material('Dark shirt button '+str(y),(.014,.013,.012),.32),'spine03' if y<2.0 else 'spine02')
# Connected collar panels with a folded outer edge.
for side in [-1,1]:
 verts=[V(side*.075,2.50,.10),V(side*.15,2.49,.13),V(side*.22,2.37,.18),V(side*.12,2.31,.21),V(side*.065,2.42,.15)];m=bpy.data.meshes.new('Collar');m.from_pydata([T(p+V(0,0,.08)) for p in verts],[],[(0,1,2,3,4)]);m.update();o=bpy.data.objects.new('Folded cotton collar',m);bpy.context.collection.objects.link(o);o.data.materials.append(material('Collar cotton '+str(side),(.004,.004,.004),.9));bindHead(o,'spine01');solid=o.modifiers.new('Collar thickness','SOLIDIFY');solid.thickness=.008;bevel=o.modifiers.new('Rounded cloth fold','BEVEL');bevel.width=.012;bevel.segments=3
# Real curved curl clumps cover a fitted scalp instead of two spherical hair masses.
hairVerts=[];hairFaces=[]
# The scalp cap follows the rebuilt skull and has a continuous hairline.
scalpVerts=[];scalpFaces=[];samples=[];lat=48;lon=128
for row in range(lat+1):
 for j in range(lon):
  phi=j/lon*math.tau;front=(math.cos(phi)+1)/2;maxTheta=2.20-1.10*front;theta=.001+(row/lat)*maxTheta
  p=V(.218*math.sin(theta)*math.sin(phi),2.86+.295*math.cos(theta),-.035+.260*math.sin(theta)*math.cos(phi));n=V(p.x/.218**2,(p.y-2.86)/.295**2,(p.z+.035)/.260**2).normalized();p+=n*(.006*math.sin(phi*19+theta*13)*math.sin(theta*21-phi*9));scalpVerts.append(T(p))
  normal=V(p.x/.214**2,(p.y-2.86)/.282**2,(p.z+.035)/.255**2).normalized();samples.append((p,normal))
for row in range(lat):
 for j in range(lon):a=row*lon+j;scalpFaces.append((a,row*lon+(j+1)%lon,(row+1)*lon+(j+1)%lon,a+lon))
m=bpy.data.meshes.new('Continuous scalp cap');m.from_pydata(scalpVerts,[],scalpFaces);m.update();o=bpy.data.objects.new('Fitted curly scalp',m);bpy.context.collection.objects.link(o);m.materials.append(hairMat)
for f in m.polygons:
 f.use_smooth=True
 radial=Vector((f.center.x,f.center.y-.035,f.center.z-2.86))
 if f.normal.dot(radial)<0:f.flip()
scalpObj=o;uv=m.uv_layers.new(name='PhotoUV');hairPhoto=np.asarray(reference.pixels[:],dtype=np.float32).reshape(reference.size[1],reference.size[0],4)
for poly in m.polygons:
 for li in poly.loop_indices:
  p=V(m.vertices[m.loops[li].vertex_index].co.x,m.vertices[m.loops[li].vertex_index].co.z,-m.vertices[m.loops[li].vertex_index].co.y);back=p.z<-.05;cx=1060 if back else 240;py=int(max(60,min(135,50+(3.2-p.y)*350)));px=int(cx+(-p.x if back else p.x)*340);row=hairPhoto[1251-py];lo=cx-78;hi=cx+78;valid=np.flatnonzero(np.max(row[lo:hi,:3],axis=1)<.23)+lo
  if len(valid):px=int(valid[np.argmin(abs(valid-px))])
  else:px=cx
  uv.data[li].uv=(px/1680,1-py/1252)
# An opaque dark undercoat prevents holes between the modeled curls.
scalpObj.data.materials.clear();scalpObj.data.materials.append(hairMat);bindHead(o)
# Interlocking irregular curl cores give the undercoat depth and a soft edge.
# Fine fibres sit over these small lobed locks instead of exposing a flat cap.
coreVerts=[];coreFaces=[];coreIds=[];seedWeights=[max(.15,math.sqrt(n.x*n.x+n.z*n.z)) for p,n in samples]
for center,normal in random.choices(samples,weights=seedWeights,k=1150):
 tangent=normal.cross(V(0,1,0))
 if tangent.length<.1:tangent=V(1,0,0)
 tangent.normalize();bit=normal.cross(tangent);radius=random.uniform(.012,.022);height=random.uniform(.018,.030);phase=random.uniform(0,math.tau);offset=len(coreVerts);sides=8;profile=[.30,.85,1,.85,.30];matIndex=random.choices([0,1,2],[.6,.3,.1])[0]
 for row,profileRadius in enumerate(profile):
  t=row/4;path=center+normal*(.002+t*height)+tangent*math.sin(phase+t*5)*.004+bit*math.cos(phase+t*5)*.004
  for j in range(sides):
   a=j/sides*math.tau;r=radius*profileRadius*(1+.12*math.sin(a*3+phase+t*4));coreVerts.append(T(path+tangent*math.cos(a)*r+bit*math.sin(a)*r*.85))
 for row in range(4):
  for j in range(sides):a=offset+row*sides+j;coreFaces.append((a,offset+row*sides+(j+1)%sides,offset+(row+1)*sides+(j+1)%sides,a+sides));coreIds.append(matIndex)
m=bpy.data.meshes.new('Sculpted curl locks');m.from_pydata(coreVerts,[],coreFaces);m.update();o=bpy.data.objects.new('Curl undercoat volume',m);bpy.context.collection.objects.link(o)
for mat in [material('Deep black curl core',(.0035,.0025,.002),.88),material('Black curl core',(.005,.0035,.0026),.86),material('Brown black curl core',(.007,.0045,.003),.87)]:m.materials.append(mat)
for f,index in zip(m.polygons,coreIds):f.use_smooth=True;f.material_index=index
soft=o.modifiers.new('Rounded curl locks','SUBSURF');soft.levels=1;soft.render_levels=1
bindHead(o)
# Fine, tapered fibres share irregular curl clumps. Broad tuft variation gives
# the silhouette the reference's soft volume rather than a uniform coil helmet.
hairMaterialIds=[]
for clump in range(1100):
 center,normal=random.choice(samples);center=center.copy();phi=math.atan2(center.x,center.z+.035);tuft=.022+.014*math.sin(phi*3+center.y*17)+random.uniform(-.008,.018);center+=normal*tuft;tangent=normal.cross(V(0,1,0))
 if tangent.length<.1:tangent=V(1,0,0)
 tangent.normalize();bit=normal.cross(tangent);radius=random.uniform(.012,.024);turns=random.uniform(1.1,1.9);startAngle=random.uniform(0,math.tau);height=random.uniform(.025,.060);materialIndex=random.choices([0,1,2],[.55,.32,.13])[0]
 for fibre in range(4):
  steps=16;sides=3;offset=len(hairVerts);tube=random.uniform(.0008,.0014);spread=V(random.uniform(-.002,.002),random.uniform(-.002,.002),random.uniform(-.002,.002));phase=startAngle+random.uniform(-.10,.10)
  for step in range(steps):
   t=step/(steps-1);angle=phase+t*math.tau*turns;r=radius*(.85+.15*math.sin(t*math.pi));path=center+tangent*math.cos(angle)*r+bit*math.sin(angle)*r+normal*(t-.5)*height+spread;direction=(-tangent*math.sin(angle)+bit*math.cos(angle)).normalized();u=direction.cross(normal).normalized();v=direction.cross(u);taper=min(1,.18+t*7,.12+(1-t)*8)
   for j in range(sides):a=j/sides*math.tau;hairVerts.append(T(path+u*math.cos(a)*tube*taper+v*math.sin(a)*tube*taper))
  for step in range(steps-1):
   for j in range(sides):a=offset+step*sides+j;hairFaces.append((a,offset+step*sides+(j+1)%sides,offset+(step+1)*sides+(j+1)%sides,a+sides));hairMaterialIds.append(materialIndex)
m=bpy.data.meshes.new('Curly hair fibres');m.from_pydata(hairVerts,[],hairFaces);m.update();o=bpy.data.objects.new('Curly hair',m);bpy.context.collection.objects.link(o)
for mat in [material('Black curl fibre',(.004,.003,.0025),.67),material('Soft black hair',(.006,.0042,.0031),.70),material('Warm curl highlights',(.009,.006,.004),.72)]:m.materials.append(mat)
for poly,index in zip(m.polygons,hairMaterialIds):poly.use_smooth=True;poly.material_index=index
bindHead(o)
# Motion controls use measured joint positions; the exported skeleton stays conventional.
def align(name,a,b,c,d):return Matrix.Translation(c)@(b-a).rotation_difference(d-c).to_matrix().to_4x4()@Matrix.Translation(-a)
def limbAlign(a,b,normal,c,d,targetNormal):
 def frame(start,end,n):
  y=(end-start).normalized();x=(n-y*n.dot(y)).normalized();z=x.cross(y).normalized();return Matrix((x,y,z)).transposed().to_4x4()
 return Matrix.Translation(c)@frame(c,d,targetNormal)@frame(a,b,normal).inverted()@Matrix.Translation(-a)
def ik(a,target,l1,l2,pole):
 delta=target-a;distance=max(.01,min(delta.length,l1+l2-.004));direction=delta.normalized();end=a+direction*distance;along=(l1*l1-l2*l2+distance*distance)/(2*distance);height=math.sqrt(max(0,l1*l1-along*along));bend=pole-a;bb=bend-direction*bend.dot(direction);bb.normalize();return a+direction*along+bb*height,end
def pose(stand=1,phase=0,walking=0,read=0,coffee=0,sip=0,reachBook=0,reachCoffee=0,typing=0,rise=0):
 matrices={p:Matrix.Identity(4) for p in parts};hipY=sum(anatomy[p]['hip'][1] for p in ['left','right'])/2;shift=(1-stand)*(1.04-hipY)-reachCoffee*.16;up=V(0,shift,0);matrices['pelvis']=Matrix.Translation(up);waist=V(0,1.65,0);matrices['torso']=Matrix.Translation(up)@Matrix.Translation(waist)@Matrix.Rotation(rise,4,'X')@Matrix.Translation(-waist);neckV=V(*anatomy['neck']);matrices['head']=matrices['torso']@Matrix.Translation(neckV)@Matrix.Rotation(read*.45-sip*.04,4,'X')@Matrix.Translation(-neckV)
 for side,prefix in [(-1,'left'),(1,'right')]:
  a=anatomy[prefix];h,k,f=[V(*a[x]) for x in ['hip','knee','ankle']];ph=(phase/(math.tau)+(0 if side>0 else .5))%1
  if ph<.6:z=.22-ph/.6*.45;lift=0
  else:u=(ph-.6)/.4;z=-.23+(u*u*(3-2*u))*.45;lift=math.sin(u*math.pi)*.09
  neutral=V(side*.30,f.y,.02);foot=neutral.copy();foot.z+=z*walking;foot.y+=lift*walking;foot=foot.lerp(V(side*.27,f.y+.15,.67),1-stand);knee,end=ik(h+up,foot,(k-h).length,(f-k).length,h+up+V(0,-.2,1));matrices[prefix+'Thigh']=align('',h,k,h+up,knee);matrices[prefix+'Shin']=align('',k,f,knee,end);matrices[prefix+'Foot']=Matrix.Translation(end-f)
  s,e,w=[V(*a[x]) for x in ['shoulder','elbow','wrist']];shoulder=matrices['torso']@s;goal=w.copy();goal.x=side*.40;goal.z=.02-math.sin(phase+(math.pi if side<0 else 0))*.17*walking;goal=goal.lerp(V(side*.24,1.82,.72),1-stand);goal=goal.lerp(V(side*.24,2.15,.56),read)
  if side>0:
   goal=goal.lerp(V(.25,2.0,.46),coffee);goal=goal.lerp(V(.22,2.55,.75),reachBook);goal=goal.lerp(V(.2,.98,.8),reachCoffee);mouthV=matrices['head']@V(*anatomy['mouth']);goal=goal.lerp(mouthV+V(.13,-.066,.20),sip)
  knee,end=ik(shoulder,goal,(e-s).length,(w-e).length,shoulder+V(side*.38,-.55,-.42));restNormal=(e-s).cross(w-e).normalized();bendNormal=(knee-shoulder).cross(end-knee).normalized();matrices[prefix+'UpperArm']=limbAlign(s,e,restNormal,shoulder,knee,bendNormal);matrices[prefix+'Forearm']=limbAlign(e,w,restNormal,knee,end,bendNormal);handRotation=Matrix.Rotation(side*math.pi/2*(1-stand),4,'Z')@Matrix.Rotation(-1.30*(1-stand)-read*.85-coffee*.5-sip*.7,4,'X');neutral=matrices[prefix+'Forearm'].to_quaternion();handRotation=neutral.slerp(handRotation.to_quaternion(),max(1-stand,read,coffee,sip)).to_matrix().to_4x4();matrices[prefix+'Hand']=Matrix.Translation(end)@handRotation@Matrix.Translation(-w)
  if typing:
   tap=max(0,math.sin(phase+(math.pi if side<0 else 0)))**2*.035;matrices[prefix+'Forearm']=Matrix.Translation(V(0,tap*.35,0))@matrices[prefix+'Forearm'];matrices[prefix+'Hand']=Matrix.Translation(V(0,tap,0))@matrices[prefix+'Hand']
 matrices['_curl']=read*.18+max(coffee,sip)*.6;matrices['_typing']=typing;matrices['_phase']=phase
 return matrices
ordered=sorted(rig.pose.bones,key=lambda b:len(b.parent_recursive));rest={b.name:b.bone.matrix_local.copy() for b in rig.pose.bones}
def setPose(matrices,frame=None):
 targets={name:B@matrices[category(name)]@B.inverted()@rest[name] for name in rest}
 for bone in ordered:
  base=(targets[bone.parent.name]@rest[bone.parent.name].inverted()@rest[bone.name]) if bone.parent else rest[bone.name];bone.matrix_basis=base.inverted()@targets[bone.name];bone.rotation_mode='QUATERNION'
  if bone.name.startswith('finger'):
   digit=int(bone.name[6]);bend=matrices.get('_curl',0)
   if matrices.get('_typing',0):bend+=max(0,math.sin(matrices.get('_phase',0)+digit*.8+(math.pi if bone.name.endswith('.L') else 0)))*.16
   bone.matrix_basis=bone.matrix_basis@Matrix.Rotation(bend,4,'X')
  if frame is not None:
   for path in ['location','rotation_quaternion','scale']:bone.keyframe_insert(data_path=path,frame=frame,group=bone.name)
clips={'stand_up':[(0,dict(stand=0)),(5,dict(stand=0,rise=.18)),(13,dict(stand=.45,rise=.12)),(24,dict(stand=1))],'standing':[(0,dict()),(24,dict())],'seated':[(0,dict(stand=0)),(24,dict(stand=0))],'typing':[(f,dict(stand=0,typing=1,phase=f/24*math.tau*2)) for f in range(0,25,3)],'walk':[(f,dict(walking=1,phase=f/24*math.tau)) for f in range(0,25,2)],'read':[(0,dict(read=1)),(24,dict(read=1))],'coffee_hold':[(0,dict(coffee=1)),(24,dict(coffee=1))],'sip':[(0,dict(coffee=1,sip=1)),(24,dict(coffee=1,sip=1))],'reach_book':[(0,dict(reachBook=1)),(24,dict(reachBook=1))],'reach_coffee':[(0,dict(reachCoffee=1)),(24,dict(reachCoffee=1))]}
rig.animation_data_create()
for name,keyframes in clips.items():
 action=bpy.data.actions.new(name);rig.animation_data.action=action
 for frame,values in keyframes:setPose(pose(**values),frame)
 track=rig.animation_data.nla_tracks.new();track.name=name;strip=track.strips.new(name,0,action);track.mute=True
rig.animation_data.action=None
for bone in rig.pose.bones:bone.matrix_basis=Matrix.Identity(4)
# Preserve a clear neutral standing source and a separate seated browser opening pose.
bpy.context.scene.render.fps=24;bpy.context.scene.frame_set(0);bpy.context.view_layer.update()
(OUT/'anatomy.json').write_text(json.dumps(dict(joints=anatomy,parts=parts,boneParts={n:category(n) for n in spec['bones']},clips=list(clips),height=3.05),indent=2)+'\n')
(OUT/'SOURCES.json').write_text(json.dumps({'base_mesh':{'source':'https://github.com/makehumancommunity/makehuman','license':'CC0 1.0','assets':['base.obj','default.mhskel','default_weights.mhw']},'references':'User-supplied original portrait and character turnaround. Unseen geometry inferred.','method':'Anatomical quad topology, photographed material atlases, conventional skinning and authored motion clips.'},indent=2)+'\n')
bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'.studio-build/shray-reference-character.blend'))
bpy.ops.object.select_all(action='SELECT');bpy.ops.export_scene.gltf(filepath=str(OUT/'shray-character.glb'),export_format='GLB',export_extras=True,export_yup=True,export_animations=True,export_nla_strips=True,export_force_sampling=True,export_apply=False)
print('REFERENCE_CHARACTER_READY',len(objects),len(rig.pose.bones),str(OUT/'shray-character.glb'))
