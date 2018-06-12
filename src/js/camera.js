import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

// Camera Rotate
const fpsObject = new THREE.Object3D();
scene.add(fpsObject);

const pitchObject = new THREE.Object3D();
pitchObject.add(camera);

const yawObject = new THREE.Object3D();
yawObject.position.y = 10;
yawObject.add(pitchObject);
fpsObject.add(yawObject);

document.addEventListener('mousemove', (event) => {
    const movementX = event.movementX;
    const movementY = event.movementY;

    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;

    pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchObject.rotation.x));
});

// Camera Move
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const keys = [];
document.onkeydown = function(e) {
    e = e || window.event;
    keys[e.keyCode] = true;
};

document.onkeyup = function (e) {
    e = e || window.event;
    keys[e.keyCode] = false;
};

const clock = new THREE.Clock();
const animate = () => {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const dir = new THREE.Vector3();

    if (keys) {
        dir.z -= 1;
    }
    if (keys[40]) {
        dir.z += 1;
    }
    if (keys[37]) {
        dir.x -= 1;
    }
    if (keys[39]) {
        dir.x += 1;
    }

    dir.normalize();
    const speed = 10;

    yawObject.translateX(dir.x * delta * speed);
    yawObject.translateZ(dir.x * delta * speed);

    renderer.render(scene, camera);
}
animate();

const geometry = new THREE.BoxGeometry(200, 200, 200);
const parent = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xff0000}));
scene.add(parent);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);