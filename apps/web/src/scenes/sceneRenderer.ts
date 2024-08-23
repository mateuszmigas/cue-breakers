import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type SceneItem = {
  type: "ball";
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
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const controls = new OrbitControls(
      camera,
      document.querySelector("#root") as HTMLCanvasElement
    );
    controls.update();
    const scene = new THREE.Scene();
    camera.position.set(5, 5, 5);
    controls.target.set(0, 1.4, 0);
    const animationCallback = () => {
      controls.update();
      camera.position.x = 5 * Math.sin(Date.now() * 0.0001);
      camera.position.z = 5 * Math.cos(Date.now() * 0.0001);
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
    this.renderer = renderer;
    this.camera = camera;
  }

  setItems(group: string, items: SceneItem[]) {
    if (this.groups.has(group)) {
      //todo
      return;
    }
    this.groups.set(group, items);

    const groupObject = new THREE.Group();
    items.forEach((item) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(...item.position);
      groupObject.add(cube);
    });

    this.scene.add(groupObject);
  }

  loadTable() {
    const loader = new GLTFLoader();
    loader.load(
      "Scene.gltf",
      (gltf) => {
        gltf.scene.rotateY(Math.PI);

        console.log("adding", gltf.scene);
        this.scene.add(gltf.scene);
        // objects.table.add(gltf.scene);
      },
      undefined,
      (error) => console.error(error)
    );
  }
}

export const sceneRenderer = new SceneRenderer();

