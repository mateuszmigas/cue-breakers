import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type SceneItem =
  | {
      type: "ball";
      position: [number, number, number];
    }
  | {
      type: "gltf-static";
      url: string;
      position: [number, number, number];
    };

export class SceneRenderer {
  private scene!: THREE.Scene;
  // private renderer!: THREE.WebGLRenderer;
  // private camera!: THREE.PerspectiveCamera;
  private groups: Map<string, SceneItem[]> = new Map();

  constructor() {
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#scene") as HTMLCanvasElement,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    camera.position.set(5, 5, 5);
    const target = new THREE.Vector3(0, 1.4, 0);
    const radius = 5; // Distance from the target point
    let angle = 0; //

    const animationCallback = () => {
      angle += 0.01; // Increment angle for rotation
      camera.position.x = target.x + radius * Math.cos(angle);
      camera.position.z = target.z + radius * Math.sin(angle);
      camera.lookAt(target);
      renderer.render(scene, camera);
    };

    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.castShadow = true;
    directionalLight.position.x = 0;
    directionalLight.position.y = 5;
    directionalLight.position.z = 0;
    directionalLight.position.normalize();
    scene.add(directionalLight);

    renderer.setAnimationLoop(animationCallback);
    this.scene = scene;
    // this.renderer = renderer;
    // this.camera = camera;
  }

  setItems(group: string, items: SceneItem[]) {
    if (this.groups.has(group)) {
      //todo
      return;
    }
    this.groups.set(group, items);

    const groupObject = new THREE.Group();
    items.forEach((item) => {
      if (item.type === "ball") {
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(...item.position);
        groupObject.add(sphere);
      } else if (item.type === "gltf-static") {
        const loader = new GLTFLoader();
        loader.load(
          item.url,
          (gltf) => this.scene.add(gltf.scene),
          undefined,
          (error) => console.error(error)
        );
      }
    });

    this.scene.add(groupObject);
  }
}

export const sceneRenderer = new SceneRenderer();

