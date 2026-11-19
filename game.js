import * as THREE from "three";
const $=id=>document.getElementById(id),canvas=$("scene");
const scene=new THREE.Scene();scene.background=new THREE.Color(0x9bc4d4);scene.fog=new THREE.Fog(0x9bc4d4,180,1000);
const camera=new THREE.PerspectiveCamera(68,innerWidth/innerHeight,.1,1600);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.toneMapping=THREE.ACESFilmicToneMapping;
scene.add(new THREE.HemisphereLight(0xd9edff,0x65734d,2));const sun=new THREE.DirectionalLight(0xffe1ad,2.1);sun.position.set(-100,160,100);sun.castShadow=true;scene.add(sun);
const mat=(c,r=.8,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const red=mat(0x174b83,.5),cream=mat(0xe8edf0),blue=mat(0x174b83,.55),yellow=mat(0xf2c94c),black=mat(0x171c1d,.4),railmat=mat(0x555d60,.3,.8),wood=mat(0x514332),grass=mat(0x607c50),leaf=mat(0x47734a),glass=new THREE.MeshStandardMaterial({color:0x16343b,roughness:.15,metalness:.3});
const ground=new THREE.Mesh(new THREE.BoxGeometry(900,.5,1700),grass);ground.position.set(0,-.8,-650);scene.add(ground);
function box(g,w,h,d,m,x,y,z){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o}
function cyl(g,r,l,m,x,y,z){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,l,16),m);o.rotation.z=Math.PI/2;o.position.set(x,y,z);o.castShadow=true;g.add(o);return o}
const track=new THREE.Group();scene.add(track);for(const x of [-.8,.8])box(track,.13,.18,1500,railmat,x,.03,-520);for(let i=0;i<250;i++)box(track,2.8,.13,1,wood,0,-.05,-i*6);
const train=new THREE.Group();scene.add(train);const loco=new THREE.Group();train.add(loco);
// Detailed WAP-4-inspired locomotive, modelled from the user's reference image
const locoOrange=mat(0xe87522,.58),locoAmber=mat(0xffb12b,.55),locoYellow=mat(0xe9d34a,.55),locoDark=mat(0x202326,.82),steel=mat(0x62696d,.35,.78),rubber=mat(0x111416,.95),grille=mat(0x30383b,.72),white=mat(0xe9e9df,.55);
box(loco,3.12,3.12,12.9,locoOrange,0,2.15,.05);
box(loco,3.14,.22,12.9,locoYellow,0,1.08,.05);
box(loco,3.16,.52,12.9,locoDark,0,.48,.05);
box(loco,3.08,.16,12.8,locoAmber,0,3.76,.05);
box(loco,2.78,.24,9.8,locoDark,0,3.91,.25);
// Sloped cab nose at the forward end and broad front face
const noseGeo=new THREE.BufferGeometry();
const nv=[-1.52,.65,-6.65,1.52,.65,-6.65,-1.52,2.45,-6.65,1.52,2.45,-6.65,-1.52,3.35,-5.05,1.52,3.35,-5.05,-1.52,.65,-5.05,1.52,.65,-5.05];
const ni=[0,2,1,1,2,3,2,4,3,3,4,5,0,1,6,1,7,6,1,3,7,3,5,7,2,0,4,0,6,4,4,6,5,5,6,7];
noseGeo.setAttribute("position",new THREE.Float32BufferAttribute(nv,3));noseGeo.setIndex(ni);noseGeo.computeVertexNormals();
const nose=new THREE.Mesh(noseGeo,new THREE.MeshStandardMaterial({color:0xe87522,roughness:.58,side:THREE.DoubleSide}));nose.castShadow=true;loco.add(nose);
// Windscreens, wipers and front details
for(const x of [-.73,.73]){const wind=box(loco,1.08,.9,.075,glass,x,2.85,-6.68);wind.rotation.x=-.18;const wiper=box(loco,.035,.72,.035,black,x,2.72,-6.73);wiper.rotation.z=.22;}
box(loco,2.55,.09,.08,locoYellow,0,2.22,-6.7);
for(const x of [-1.13,1.13]){const lamp=new THREE.Mesh(new THREE.CylinderGeometry(.17,.17,.12,20),yellow);lamp.rotation.x=Math.PI/2;lamp.position.set(x,1.52,-6.72);loco.add(lamp);const buffer=new THREE.Mesh(new THREE.CylinderGeometry(.27,.27,.35,20),steel);buffer.rotation.x=Math.PI/2;buffer.position.set(x,.78,-6.82);loco.add(buffer);}
box(loco,.22,.62,.18,steel,0,.9,-6.83);box(loco,.12,.52,.12,locoDark,0,.66,-7.02);
// Front pilot / cowcatcher, coupler and air hoses
const pilot=box(loco,2.65,.48,.25,locoDark,0,.38,-6.78);pilot.rotation.x=-.18;
box(loco,.65,.18,.65,steel,0,.45,-7.05);box(loco,.32,.28,.45,black,0,.2,-7.25);
for(const x of [-.85,-.48,.48,.85]){const hose=new THREE.Mesh(new THREE.TorusGeometry(.13,.025,8,20,Math.PI),rubber);hose.rotation.y=Math.PI/2;hose.position.set(x,.82,-6.95);loco.add(hose);}
// Side cab windows and engine-room ventilation grilles on both sides
for(const side of [-1,1]){
 const sx=side*1.575;
 for(const z of [-5.15,-3.9]){box(loco,.045,1.02,.82,glass,sx,2.83,z);box(loco,.055,.08,.92,locoYellow,sx,2.27,z);}
 for(let z=-2.7;z<=5.3;z+=1.55){box(loco,.045,.34,.9,locoDark,sx,3.25,z);for(let k=0;k<7;k++)box(loco,.035,.025,.76,steel,sx+side*.025,3.25,z-.34+k*.11);}
 for(let z=-2.65;z<=5.1;z+=1.65){box(loco,.05,1.15,.9,grille,sx,2.05,z);for(let k=0;k<9;k++)box(loco,.06,.035,.78,steel,sx+side*.035,1.55+k*.12,z);}
 box(loco,.05,.1,12.3,locoYellow,sx,1.08,.05);
 // Side steps and handrails
 for(let z of [-5.6,-4.8,5.2,5.8])box(loco,.22,.09,.55,steel,side*1.62,.28,z);
 for(let z=-5.5;z<=5.5;z+=2.6){const rail=box(loco,.045,.75,.045,steel,side*1.62,1.45,z);rail.rotation.z=.04;}
}
// Bogies, six axles, detailed wheels and suspension
for(const bz of [-4.35,0,4.35]){
 const bogie=new THREE.Group();bogie.position.set(0,.43,bz);loco.add(bogie);
 box(bogie,2.65,.28,2.5,locoDark,0,0,0);box(bogie,2.72,.16,2.15,steel,0,.2,0);
 for(const wz of [-.78,.78])for(const side of [-1,1]){
  const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.52,.52,.22,24),rubber);wheel.rotation.z=Math.PI/2;wheel.position.set(side*1.35,0,wz);wheel.castShadow=true;bogie.add(wheel);
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.24,20),steel);hub.rotation.z=Math.PI/2;hub.position.set(side*1.35,0,wz);bogie.add(hub);
  for(let q=0;q<4;q++){const spring=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.48,10),yellow);spring.position.set(side*.92,.38,wz+(q%2?-.17:.17));bogie.add(spring);}
 }
 for(const z of [-1,1])box(bogie,2.4,.12,.12,steel,0,.56,z);
}
// Roof equipment, insulators and pantograph
for(let z of [-3.9,-1.1,1.5,4.1]){box(loco,.72,.22,.9,steel,0,4.13,z);for(let x of [-.25,.25]){const ins=new THREE.Mesh(new THREE.CylinderGeometry(.09,.13,.38,12),white);ins.position.set(x,4.42,z);loco.add(ins);}}
for(let z of [-2.8,2.9]){box(loco,1.1,.32,1.35,locoDark,0,4.38,z);for(let x of [-.35,0,.35])box(loco,.08,.55,.08,steel,x,4.75,z);}
const pant=new THREE.Group();loco.add(pant);pant.position.set(0,4.65,1.7);
for(const x of [-.72,.72]){const foot=box(pant,.12,.14,1.25,steel,x,0,0);const a=box(pant,.075,1.45,.075,steel,x*.55,.72,0);a.rotation.z=x>0?-.48:.48;const b=box(pant,.075,1.45,.075,steel,x*.55,.72,0);b.rotation.z=x>0?.48:-.48;}
box(pant,1.8,.12,.2,steel,0,1.42,0);box(pant,2.05,.1,.28,black,0,1.53,0);
// Exhaust fans, horns and roof insulator details
for(let z of [-5.4,5.1]){const horn=new THREE.Mesh(new THREE.CylinderGeometry(.08,.2,.65,16),steel);horn.rotation.x=Math.PI/2;horn.position.set(0,4.22,z);loco.add(horn);}
for(let z=-4;z<=4;z+=2){const fan=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.13,20),locoDark);fan.position.set(0,4.16,z);loco.add(fan);for(let k=0;k<4;k++){const blade=box(loco,.06,.025,.48,steel,0,4.24,z);blade.rotation.y=k*Math.PI/2;}}
const coaches=[];
const coachBlue=mat(0x1688cf,.52),coachLight=mat(0xe7f3f7,.62),coachDark=mat(0x25333b,.6);
for(let n=0;n<6;n++){
 const c=new THREE.Group();train.add(c);c.position.z=9+n*14;
 box(c,2.92,3.05,13.2,coachBlue,0,1.95,0);box(c,2.96,.18,13.2,coachLight,0,2.8,0);box(c,2.98,.14,13.2,coachLight,0,1.15,0);
 box(c,2.95,.16,13.15,coachDark,0,.38,0);
 // rounded-looking roof and end caps
 const roof=new THREE.Mesh(new THREE.CylinderGeometry(1.48,1.48,13.15,24,1,false,0,Math.PI),coachLight);roof.rotation.x=Math.PI/2;roof.position.set(0,3.48,0);c.add(roof);
 for(const side of [-1,1]){
  const sx=side*1.49;
  for(let w=0;w<10;w++){const z=-5.25+w*1.16;if(w===4||w===5)continue;box(c,.045,.78,.82,coachDark,sx,2.25,z);box(c,.055,.68,.72,glass,sx+side*.03,2.27,z);box(c,.06,.055,.76,steel,sx+side*.04,2.27,z);}
  // Passenger doors at coach ends
  for(const z of [-5.75,5.75]){box(c,.055,2.05,.78,coachBlue,sx,1.95,z);box(c,.065,1.25,.57,glass,sx+side*.035,2.2,z);box(c,.08,.12,.18,steel,sx+side*.06,1.02,z);}
  box(c,.06,.12,12.4,coachLight,sx+side*.04,1.25,0);
 }
 // Coach end vestibules and coupling
 for(const z of [-6.62,6.62]){box(c,2.55,2.5,.12,coachDark,0,1.85,z);box(c,1.25,2.2,.14,black,0,1.9,z);}
 // Two bogies, four wheelsets each coach
 for(const bz of [-4.5,4.5]){const bg=new THREE.Group();bg.position.set(0,.45,bz);c.add(bg);box(bg,2.55,.25,2.3,coachDark,0,0,0);for(const wz of [-.68,.68])for(const side of [-1,1]){const wh=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.2,20),rubber);wh.rotation.z=Math.PI/2;wh.position.set(side*1.32,0,wz);bg.add(wh);const hub=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.22,16),steel);hub.rotation.z=Math.PI/2;hub.position.set(side*1.32,0,wz);bg.add(hub);}for(const side of [-1,1])box(bg,.12,.55,.12,steel,side*1.18,.28,0);}
 coaches.push(c);
}
const scenery=new THREE.Group();scene.add(scenery);
for(let i=0;i<170;i++){const z=-i*9-20,x=(Math.random()<.5?-1:1)*(13+Math.random()*55),tree=new THREE.Group();tree.position.set(x,0,z);const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.15,.25,2.8,8),wood);trunk.position.y=1.4;tree.add(trunk);for(let j=0;j<3;j++){const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(1.1-j*.12,1),leaf);crown.position.set(0,2.4+j*.55,0);tree.add(crown)}scenery.add(tree)}
for(let i=0;i<80;i++){const z=-i*18-10,side=i%2?1:-1;box(scenery,.12,7,.12,black,side*7,3.2,z);box(scenery,2.4,.12,.12,black,side*7,6.5,z)}
for(let i=0;i<22;i++){const hill=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),mat(0x71835e));hill.scale.set(40,14,45);hill.position.set((i%2?1:-1)*130,5,-i*85-100);scenery.add(hill)}
const signal=new THREE.Group();signal.position.set(4.5,0,-240);scene.add(signal);box(signal,.18,7,.18,black,0,3.5,0);box(signal,.95,1.8,.35,black,0,5.6,0);const lampR=new THREE.Mesh(new THREE.SphereGeometry(.26),new THREE.MeshBasicMaterial({color:0xff2222}));lampR.position.set(0,6,-.2);signal.add(lampR);const lampG=new THREE.Mesh(new THREE.SphereGeometry(.26),new THREE.MeshBasicMaterial({color:0x123c20}));lampG.position.set(0,5.25,-.2);signal.add(lampG);
const cab=new THREE.Group();scene.add(cab);cab.visible=false;box(cab,5,.3,1,black,0,-1.1,-2);box(cab,5,.15,.2,cream,0,-.9,-2.5);for(let x=-2.4;x<=2.4;x+=.12)box(cab,.035,.7,.035,black,x,1.3,-3);box(cab,5,.15,.2,black,0,1.75,-3);box(cab,.2,2.8,.2,black,-2.45,.2,-1.6);box(cab,.2,2.8,.2,black,2.45,.2,-1.6);
function makeLever(x,leverMat){const base=new THREE.Mesh(new THREE.CylinderGeometry(.22,.28,.16,16),black);base.position.set(x,-.86,-1.65);cab.add(base);const rod=new THREE.Mesh(new THREE.CylinderGeometry(.055,.075,.85,12),leverMat);rod.position.set(x,-.43,-1.65);rod.rotation.z=-.22;cab.add(rod);const grip=new THREE.Mesh(new THREE.SphereGeometry(.14,12,12),leverMat);grip.position.set(x-.09,-.02,-1.65);cab.add(grip);return rod;}const powerLever=makeLever(-1.25,mat(0x19a05a)),brakeLever=makeLever(1.25,mat(0xd33b32));
let speed=0,power=0,brake=0,travel=0,started=false,paused=false,cabView=false,emergency=false,lights=true;const keys={};
let audioCtx=null,trackGain=null,clackGain=null;function startAudio(){if(audioCtx){audioCtx.resume();return;}audioCtx=new (window.AudioContext||window.webkitAudioContext)();const master=audioCtx.createGain();master.gain.value=.24;master.connect(audioCtx.destination);const low=audioCtx.createOscillator();low.type="triangle";low.frequency.value=58;const lg=audioCtx.createGain();lg.gain.value=.025;low.connect(lg);lg.connect(master);low.start();const buf=audioCtx.createBuffer(1,audioCtx.sampleRate*2,audioCtx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*.5;const noise=audioCtx.createBufferSource();noise.buffer=buf;noise.loop=true;const filter=audioCtx.createBiquadFilter();filter.type="bandpass";filter.frequency.value=750;filter.Q.value=.7;trackGain=audioCtx.createGain();trackGain.gain.value=.012;noise.connect(filter);filter.connect(trackGain);trackGain.connect(master);noise.start();const clack=audioCtx.createOscillator(),cg=audioCtx.createGain();clack.type="square";clack.frequency.value=3.4;cg.gain.value=.008;const cf=audioCtx.createBiquadFilter();cf.type="lowpass";cf.frequency.value=180;clack.connect(cf);cf.connect(cg);cg.connect(master);clack.start();clackGain=cg;}
function playHorn(){if(!audioCtx)startAudio();const now=audioCtx.currentTime,out=audioCtx.createGain();out.gain.setValueAtTime(.0001,now);out.gain.exponentialRampToValueAtTime(.32,now+.12);out.gain.setValueAtTime(.32,now+1.1);out.gain.exponentialRampToValueAtTime(.0001,now+1.8);out.connect(audioCtx.destination);[110,146.8,220].forEach((f,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type="sawtooth";o.frequency.value=f;o.detune.value=i*4;g.gain.value=i===0?.45:.22;o.connect(g);g.connect(out);o.start(now);o.stop(now+1.85);});}
function toast(t){const e=$("toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1500)}
function horn(){playHorn();toast("WAP-4 HORN")}
function cameraMode(){cabView=!cabView;cab.visible=cabView;$("cabOverlay").classList.toggle("show",cabView);toast(cabView?"DRIVER CAB VIEW":"EXTERNAL CAMERA")}
function update(dt){if(trackGain)trackGain.gain.setTargetAtTime(started&&!paused?(.012+Math.min(speed*3.6,100)*.00022):.002,audioCtx.currentTime,.2);if(clackGain)clackGain.gain.setTargetAtTime(started&&!paused?(.004+Math.min(speed*3.6,100)*.00012):.001,audioCtx.currentTime,.2);cab.position.set(train.position.x,0,-travel);powerLever.rotation.z=-.22-power/32*.75;brakeLever.rotation.z=-.22+brake/100*.75;if(started&&!paused){if(keys.KeyW||keys.ArrowUp)power=Math.min(32,power+dt*8);if(keys.KeyA)power=Math.max(0,power-dt*12);if(keys.KeyS||keys.ArrowDown)brake=Math.min(100,brake+dt*32);if(keys.KeyZ)brake=Math.max(0,brake-dt*25);if(keys.KeyX)brake=Math.min(100,brake+dt*22);const accel=power/32*.72-brake/100*2.3-(emergency?5.5:0)-.012-speed*.0015;speed=Math.max(0,Math.min(130/3.6,speed+Math.max(speed<.12&&accel<0?0:accel,-10)*dt));travel+=speed*dt;train.position.set(Math.sin(travel/1800)*2.2,0,-travel)}
const km=Math.round(speed*3.6),bp=(5-brake*.045-(emergency?2.5:0)).toFixed(1),bc=(brake*.045+(emergency?3:0)).toFixed(1);$("speed").textContent=km;$("cabSpeed").textContent=km;$("bp").textContent=$("cabBP").textContent=bp;$("bc").textContent=$("cabBC").textContent=bc;$("notch").textContent="N"+Math.round(power);$("cabPower").textContent=Math.round(power)+"/32";$("cabBrake").textContent=emergency?"EMERGENCY":brake?"APPLIED":"RELEASED";$("cabLight").textContent=lights?"ON":"OFF";$("clock").textContent=new Date().toLocaleTimeString("en-GB");$("distance").textContent=Math.max(0,210-travel/1000).toFixed(1);$("progress").style.width=Math.min(100,travel/210000*100)+"%";$("signalDistance").textContent=Math.max(0,240-travel).toFixed(0)+" m ahead";$("signalText").textContent=travel<220?"RED":"GREEN";$("signalLamp").className=travel<220?"":"green";lampR.material.color.setHex(travel<220?0xff2222:0x15251a);lampG.material.color.setHex(travel<220?0x123c20:0x37ff75);$("overspeed").textContent=km>110?"OVERSPEED":"ON LIMIT";$("overspeed").className=km>110?"danger":"";$("statusTitle").textContent=emergency?"EMERGENCY BRAKE":km>110?"OVERSPEED WARNING":brake?"BRAKES APPLIED":power?"POWER APPLIED":km?"COASTING":"LOCOMOTIVE READY";$("statusText").textContent=emergency?"Reset after stopping":brake?"Brake level "+Math.round(brake)+"%":power?"Traction notch "+Math.round(power):"Apply power to depart"}
function render(dt){if(cabView){camera.position.set(train.position.x,3.7,-travel-1.3);camera.lookAt(train.position.x,3.1,-travel-95)}else{camera.position.lerp(new THREE.Vector3(train.position.x+10,8.5,-travel+22),1-Math.pow(.001,dt));camera.lookAt(train.position.x,2,-travel-28)}renderer.render(scene,camera)}
let last=performance.now();function loop(now){requestAnimationFrame(loop);const dt=Math.min(.05,(now-last)/1000);last=now;update(dt);render(dt)}requestAnimationFrame(loop);
function bindHoldButton(id,key){const el=$(id);const down=e=>{e.preventDefault();keys[key]=true;};const up=e=>{e.preventDefault();keys[key]=false;};el.addEventListener("pointerdown",down);el.addEventListener("pointerup",up);el.addEventListener("pointerleave",up);el.addEventListener("pointercancel",up);el.addEventListener("contextmenu",e=>e.preventDefault());}
bindHoldButton("acceleratorBtn","KeyW");bindHoldButton("brakeBtn","KeyS");
$("startBtn").onclick=()=>{started=true;startAudio();$("startScreen").classList.add("hide");toast("SERVICE COMMENCED · WAP-4 READY")};$("pauseBtn").onclick=()=>{paused=!paused;$("pauseBtn").textContent=paused?"▶ RESUME":"Ⅱ PAUSE"};$("cameraBtn").onclick=cameraMode;$("hornBtn").onclick=horn;$("lightBtn").onclick=()=>{lights=!lights;toast(lights?"HEADLIGHTS ON":"HEADLIGHTS OFF")};
addEventListener("keydown",e=>{keys[e.code]=true;if(["ArrowUp","ArrowDown","Space"].includes(e.code))e.preventDefault();if(e.repeat)return;if(e.code==="KeyC")cameraMode();if(e.code==="KeyH")horn();if(e.code==="KeyF"){lights=!lights;toast(lights?"HEADLIGHTS ON":"HEADLIGHTS OFF")}if(e.code==="Space"){emergency=true;brake=100;power=0;toast("EMERGENCY BRAKE APPLIED")}if(e.code==="KeyR"&&speed<.2){emergency=false;brake=0;toast("BRAKE SYSTEM RESET")}});addEventListener("keyup",e=>keys[e.code]=false);addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});