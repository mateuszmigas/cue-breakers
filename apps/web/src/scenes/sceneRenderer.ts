import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export type SceneItem =
  | {
      type: "ball";
      position: [number, number, number];
      textureUrl: string;
    }
  | {
      type: "gltf-static";
      url: string;
      position: [number, number, number];
    };

export class SceneRenderer {
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
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

    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.castShadow = true;
    directionalLight.position.x = 0;
    directionalLight.position.y = 5;
    directionalLight.position.z = 0;
    directionalLight.position.normalize();
    scene.add(directionalLight);

    // renderer.setAnimationLoop(animationCallback);
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
  }

  angle = 0;
  render() {
    const target = new THREE.Vector3(0, 1.4, 0);
    const radius = 5; // Distance from the target point
    this.angle += 0.001; // Increment this.angle for rotation
    this.camera.position.x = target.x + radius * Math.cos(this.angle);
    this.camera.position.z = target.z + radius * Math.sin(this.angle);
    this.camera.lookAt(target);
    this.renderer.render(this.scene, this.camera);
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
        const texture = new THREE.TextureLoader().load(item.textureUrl);
        const material = new THREE.MeshPhongMaterial({
          map: texture,
          specular: 0xffffff,
          shininess: 100,
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.scale.set(0.15, 0.15, 0.15);
        sphere.rotation.set(Math.random(), Math.random(), Math.random());
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
