import * as THREE from 'three'; // 3GS Library
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // 3GS Library
import Stats from 'three/addons/libs/stats.module.js'; // 3GS Library
// import GUI from 'lil-gui'; // lil-gui Library
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'; // 3GS Library

const gui = new GUI();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.layers.enable(1);

const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const stats = new Stats();
document.body.appendChild( stats.dom );

const sun = new THREE.DirectionalLight();
sun.position.set( 1, 2, 3 );
scene.add( sun );

const ambient = new THREE.AmbientLight( 0x404040 );
ambient.intensity = 0.5;
scene.add( ambient );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

controls.update();

function animate() {

    stats.update();

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

    renderer.render ( scene, camera );

}

window.addEventListener( 'resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

const folderr = gui.addFolder('Cube');
folderr.add(cube.position, 'x', -2, 2, 0.1).name('Position X') ;
folderr.addColor(cube.material, 'color');