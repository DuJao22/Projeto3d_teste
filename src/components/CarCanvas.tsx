import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export interface CarCanvasHandle {
  updateCar: (scrollProgress: number) => void;
}

const CarCanvas = forwardRef<CarCanvasHandle>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<THREE.Group | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const scrollProgressRef = useRef(0);

  useImperativeHandle(ref, () => ({
    updateCar: (progress: number) => {
      scrollProgressRef.current = progress;
      if (!carRef.current || !cameraRef.current) return;

      const isMobile = window.innerWidth < 768;
      const xOffset = isMobile ? 0.8 : 1.5;
      const doorLeft = carRef.current.getObjectByName('door_left_ok');

      // Reset camera rotations for base states
      if (progress < 0.4 || progress >= 0.8) {
        cameraRef.current.rotation.x = 0;
        cameraRef.current.rotation.y = 0;
      }

      // Section 1: 0 to 0.2 (Hero)
      if (progress < 0.2) {
        const p = progress / 0.2;
        carRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 0.1, p);
        cameraRef.current.position.z = THREE.MathUtils.lerp(5, 4.5, p);
        carRef.current.position.x = 0;
        cameraRef.current.position.y = 0;
        if (doorLeft) doorLeft.rotation.y = 0;
      } else if (progress < 0.4) {
        const p = (progress - 0.2) / 0.2;
        carRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI * 0.1, Math.PI * 0.5, p);
        carRef.current.position.x = THREE.MathUtils.lerp(0, xOffset, p);
        cameraRef.current.position.z = 4.5;
        cameraRef.current.position.y = 0;
        if (doorLeft) doorLeft.rotation.y = 0;
      } else if (progress < 0.6) {
        const p = (progress - 0.4) / 0.2;
        const easeP = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

        carRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI * 0.5, Math.PI * 0.65, easeP);
        carRef.current.position.x = THREE.MathUtils.lerp(xOffset, 0.6, easeP);
        cameraRef.current.position.z = THREE.MathUtils.lerp(4.5, 1.1, easeP);
        cameraRef.current.position.y = THREE.MathUtils.lerp(0, 0.45, easeP);
        cameraRef.current.position.x = THREE.MathUtils.lerp(0, -0.6, easeP);
        
        cameraRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 0.05, easeP);
        cameraRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI * 0.05, easeP);

        const doorP = Math.min(p * 1.5, 1);
        if (doorLeft) {
          doorLeft.rotation.y = THREE.MathUtils.lerp(0, -Math.PI * 0.45, doorP);
        }
      } else if (progress < 0.8) {
        const p = (progress - 0.6) / 0.2;
        cameraRef.current.rotation.x = THREE.MathUtils.lerp(-Math.PI * 0.05, 0, p);
        cameraRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI * 0.05, 0, p);

        carRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI * 0.65, Math.PI * 1.8, p);
        carRef.current.position.x = THREE.MathUtils.lerp(0.6, 0, p);
        cameraRef.current.position.z = THREE.MathUtils.lerp(1.1, 5.5, p);
        cameraRef.current.position.y = THREE.MathUtils.lerp(0.45, 0, p);
        cameraRef.current.position.x = THREE.MathUtils.lerp(-0.6, 0, p);

        if (doorLeft) {
          doorLeft.rotation.y = THREE.MathUtils.lerp(-Math.PI * 0.45, 0, p);
        }
      } else {
        const p = (progress - 0.8) / 0.2;
        carRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI * 1.8, Math.PI * 2, p);
        cameraRef.current.position.z = THREE.MathUtils.lerp(5.5, 4.8, p);
        carRef.current.position.x = 0;
        cameraRef.current.position.y = 0;
        if (doorLeft) doorLeft.rotation.y = 0;
      }
    }
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    const clock = new THREE.Clock();

    try {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      cameraRef.current = camera;

      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.5;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Environment Map for realistic reflections
      const rgbeLoader = new RGBELoader();
      rgbeLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/equirectangular/venice_sunset_1k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      });

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Neon accents
      const pointLight = new THREE.PointLight(0x00f2ff, 15, 20);
      pointLight.position.set(-3, 2, 2);
      scene.add(pointLight);

      const blueLight = new THREE.PointLight(0x00E5FF, 10, 20);
      blueLight.position.set(3, -1, 2);
      scene.add(blueLight);

      // Ground Reflection / Shadow
      const groundGeo = new THREE.CircleGeometry(10, 32);
      const groundMat = new THREE.MeshStandardMaterial({ 
        color: 0x000000, 
        roughness: 0.1, 
        metalness: 0.5,
        transparent: true,
        opacity: 0.4
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.51;
      scene.add(ground);

      // Load Model
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      loader.setDRACOLoader(dracoLoader);

      const isMobile = window.innerWidth < 768;
      const modelUrl = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/ferrari.glb';
      
      loader.load(
        modelUrl,
        (gltf) => {
          const car = gltf.scene;
          const scale = isMobile ? 1.0 : 1.5;
          car.scale.set(scale, scale, scale);
          car.position.y = isMobile ? -0.3 : -0.5;
          
          car.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              const material = mesh.material as THREE.MeshStandardMaterial;
              if (material) {
                material.metalness = 1;
                material.roughness = 0.05;
                material.envMapIntensity = 2;
              }
            }
          });

          scene.add(car);
          carRef.current = car;
          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
          const geometry = new THREE.BoxGeometry(2, 0.5, 4);
          const material = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 1, roughness: 0.2 });
          const fallbackCar = new THREE.Mesh(geometry, material);
          fallbackCar.position.y = -0.5;
          scene.add(fallbackCar);
          carRef.current = new THREE.Group();
          carRef.current.add(fallbackCar);
        }
      );

      const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      };

      const animate = () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
        animationFrameId = requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();

        // Idle animation: slight floating and rotation
        if (carRef.current) {
          // Only apply idle animation when not in the middle of a heavy scroll transition
          // or apply it subtly on top of scroll
          const idleRotation = Math.sin(elapsedTime * 0.5) * 0.02;
          const idleFloat = Math.sin(elapsedTime * 1.5) * 0.03;
          
          carRef.current.position.y = (isMobile ? -0.3 : -0.5) + idleFloat;
          carRef.current.rotation.z = idleRotation * 0.5;
          
          // Add a bit of "life" to the wheels if they exist
          carRef.current.traverse((child) => {
            if (child.name.includes('wheel')) {
              child.rotation.x += 0.01;
            }
          });
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      };
      
      animate();
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        
        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
          const domElement = renderer.domElement;
          if (domElement && domElement.parentNode) {
            domElement.parentNode.removeChild(domElement);
          }
        }
        
        sceneRef.current = null;
        cameraRef.current = null;
        rendererRef.current = null;
        carRef.current = null;
      };
    } catch (e) {
      console.error('WebGL initialization failed:', e);
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-1 pointer-events-none"
      style={{ background: 'radial-gradient(circle at center, #111 0%, #000 100%)' }}
    />
  );
});

CarCanvas.displayName = 'CarCanvas';

export default CarCanvas;
