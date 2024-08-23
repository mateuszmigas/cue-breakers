import * as THREE from "three";

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
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#scene") as HTMLCanvasElement,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    camera.position.z = 5;
    const animationCallback = () => {
      renderer.render(scene, camera);
    };
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
}

export const sceneRenderer = new SceneRenderer();

