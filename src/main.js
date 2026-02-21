import * as THREE from 'three'; // 3GS Library
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // 3GS Library
import Stats from 'three/addons/libs/stats.module.js'; // 3GS Library
// import GUI from 'lil-gui'; // lil-gui Library
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'; // 3GS Library
import { World } from '/src/world.js'; // Custom Terrain Class

const gui = new GUI();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.layers.enable(1);
camera.position.set(10, 5, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const world = new World(10, 10, 10);
scene.add(world);

const stats = new Stats();
document.body.appendChild( stats.dom );

const sun = new THREE.DirectionalLight();
sun.intensity = 3;
sun.position.set( 1, 2, 3 );
scene.add( sun );

const ambient = new THREE.AmbientLight( 0x404040 );
ambient.intensity = 0.5;
scene.add( ambient );

camera.position.z = 5;

controls.update();
stats.update();

function animate() {
    stats.update();
    controls.update();
    renderer.render ( scene, camera );
}

window.addEventListener( 'resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

const worldFolder = gui.addFolder('World');
worldFolder.add(world, 'width', 0.5, 20, 1).name('Width');
worldFolder.add(world, 'height', 0.5, 20, 1).name('Height');
worldFolder.addColor(world.terrain.material, 'color').name('Color');

worldFolder.add(world, 'treeCount', 1, 100, 1).name('Tree Count');
worldFolder.add(world, 'rockCount', 1, 100, 1).name('Rock Count');
worldFolder.add(world, 'bushCount', 1, 100, 1).name('Bush Count');

worldFolder.add(world, 'generate').name('Generate New World');