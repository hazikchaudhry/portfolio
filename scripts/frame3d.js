import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';

class Frame3D {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.frame = null;
        this.targetRotation = { x: 0, y: 0 };
        this.currentRotation = { x: 0, y: 0 };

        this.init();

    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.querySelector('.floating-element').appendChild(this.renderer.domElement);

        // Camera position
        this.camera.position.z = 6;
        this.camera.position.x = 1;

        // Create frame
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('assets/images/paint.jpg');

        const geometry = new THREE.BoxGeometry(4, 3.8, 0.2);
        const material = new THREE.MeshPhysicalMaterial({
            
            map: texture,

            metalness: 0.2,
            roughness: 0.4,

            reflectivity: 1,
            clearcoat: 0.5,
            clearcoatRoughness: 0.3

        });

        this.frame = new THREE.Mesh(geometry, material);
        this.frame.position.x = -3.7;  // Move frame left to align with circles
        this.frame.position.y = 2;  // Align vertically with text
        this.scene.add(this.frame);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 3.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1.5);
        pointLight.position.set(5, 5, 5);

        this.scene.add(pointLight);

        const backLight = new THREE.PointLight(0xffffff, 1.2);
        backLight.position.set(-5, 3, -5);

        this.scene.add(backLight);

        // Event listeners
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));

        // Start animation
        this.animate();
    }

    handleMouseMove(event) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        this.targetRotation.y = mouseX * 0.3;
        this.targetRotation.x = mouseY * 0.3;
    }

    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Smooth rotation
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;

        if (this.frame) {
            this.frame.rotation.x = this.currentRotation.x;

            this.frame.rotation.y = this.currentRotation.y;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Frame3D();
});