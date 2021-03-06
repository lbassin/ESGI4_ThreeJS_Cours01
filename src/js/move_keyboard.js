import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

const geometry = new THREE.BoxGeometry(200, 200, 200);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);

const scene = new THREE.Scene();
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();

document.body.onkeydown = (event) => {
    const speed = 16;

    switch (event.keyCode){
        case 37:
            mesh.rotation.y += Math.PI / speed;
            mesh.scale.y += 0.02;
            break;
        case 38:
            mesh.rotation.x -= Math.PI / speed;
            break;
        case 39:
            mesh.rotation.y -= Math.PI / speed;
            mesh.scale.y += 0.02;
            break;
        case 40:
            mesh.rotation.x += Math.PI / speed;
            break;
    }
};

document.body.onkeyup = (event) => {
    if(event.keyCode === 37 || event.keyCode === 39){
        mesh.scale.y = 1;
    }
};

let mouseEnabled = false;
document.body.onmousedown = () => {
    mouseEnabled = true;
};

document.body.onmouseup = () => {
    mouseEnabled = false;
};

document.body.onmousemove = (event) => {
    if(!mouseEnabled){
        return false;
    }

    mesh.rotation.y += event.movementX / 100;
    mesh.rotation.x += event.movementY / 100;
};
