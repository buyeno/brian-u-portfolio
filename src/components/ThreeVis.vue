<template>
  <div id="canvas">
    <div id="container"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import Orbitcontrols from "three-orbitcontrols";
import GLTFLoader from "three-gltf-loader";
export default {
  name: "ThreeVis",
  data: () => ({
    models: [
      "Thick_Lines.glb"
    ],
    navHeight: 30,
    model: "Textured_Glasses.glb",
    currentModel: null,
    scene: null,
    mesh: null,
    camera:  null,
    renderer: null,
    controls: null,
    meshScale: 10,
    fullscreenTrigger: false,
    play: true
  }),
  methods: {
    init: function() {
      let container = document.getElementById("container");

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xCCCCCC)

      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        1,
        1000
      );
      this.camera.position.z = 10;
      // can add up to 20 layers to toggle hide/show
      this.camera.layers.enable(1); // model
      this.camera.layers.enable(2); // routes
      this.camera.layers.enable(3); // tics
      this.camera.target = new THREE.Vector3();

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.controls = new Orbitcontrols(this.camera, this.renderer.domElement);
      // this.controls.minDistance = 50;
      // this.controls.maxDistance = 200;

      // set based on model
      // if (this.crag.crag.model.azumuth) {
      //   this.controls.minAzimuthAngle = this.crag.crag.model.azumuth[0];
      //   this.controls.maxAzimuthAngle = this.crag.crag.model.azumuth[1];
      // }

      // this.controls.maxPolarAngle = Math.PI / 2;
      // this.controls.screenSpacePanning = true;

      this.scene.add(new THREE.AmbientLight());
      let frontLeftLight = new THREE.PointLight();
      frontLeftLight.position.z=1

      frontLeftLight.position.x=-1
      this.scene.add(frontLeftLight)

      let frontRightLight = new THREE.PointLight();
      frontRightLight.position.z=1

      frontRightLight.position.x=1
      this.scene.add(frontRightLight)

      let leftLight = new THREE.PointLight();
      leftLight.position.x=5
      this.scene.add(leftLight)

      let rightLight = new THREE.PointLight();
      rightLight.position.x=-5
      this.scene.add(rightLight)

      let topLight = new THREE.PointLight();
      topLight.position.y=5
      this.scene.add(topLight)

      // for raycasting
      // let geometry = new THREE.BufferGeometry()
      // geometry.setFromPoints([ new THREE.Vector3(), new THREE.Vector3() ])
      this.loadModel();
      // this.raycaster = new THREE.Raycaster();
      // this.mouseVector = new THREE.Vector2();
      //
      window.addEventListener("resize", this.onWindowResize, false);
      // container.addEventListener("mousemove", this.onDocumentMouseMove, false);
      // container.addEventListener("mouseup", this.onDocumentMouseclick, false);
      // window.addEventListener("mousedown", () => {
      //   this.moved = false;
      // });
      // window.addEventListener("touchstart", () => {
      //   this.moved = false;
      // });
      // container.addEventListener("touchend", this.onDocumentTouchEnd, false);
      // this.controls.addEventListener("change", () => {
      //   this.moved = true;
      //   this.camMoved = true;
      //   if (this.inBounds == false){
      //     this.controls.enabled = false;
      //     this.controls.target.copy(this.lastTarget);
      //     this.controls.enabled = true;
      //   }
      // });
      // document.addEventListener("fullscreenchange", () => {
      //   const element = document.fullscreenElement;
      //   if (!element) {
      //     this.fullscreenView = false;
      //   }
      // });
      this.onWindowResize();
    },
    animate: function() {
      if (this.play) {
        requestAnimationFrame(this.animate);

        this.renderer.setClearColor(0x2222222, 1);
        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);
      }
    },
    onWindowResize: function() {
      if (this.play) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        // if (this.fullscreenTrigger) {
        //   this.fullscreenTrigger = false;
        //   this.renderer.setSize(window.innerWidth, window.innerHeight);
        // } else {
        //   this.renderer.setSize(
        //     window.innerWidth,
        //     window.innerHeight - this.navHeight
        //   );
        // }
      }
    },
    async loadModel() {
      let loader = new GLTFLoader();

      // const model = await this.$axios.$get(this.crag.crag.model.link);

      loader.load(
        require("@/assets/" + this.model),
        gltf => {
          for (let key in gltf.scene.children) {
            let mesh = gltf.scene.children[key];
            mesh.layers.set(1);
            mesh.scale.set(this.meshScale, this.meshScale, this.meshScale);
            this.scene.add(mesh);
          }
          // this.mesh = gltf.scene.children[0];
          // this.mesh.layers.set(1);
          // this.mesh.scale.set(this.meshScale, this.meshScale, this.meshScale);
          // this.scene.add(this.mesh);
        },
        error => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    this.init();
    this.animate();
  },
  deactivated() {
    this.play = false;
  },
  activated() {
    this.play = true;
    this.animate();
  }
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 500px;
  box-sizing: border-box;
}
</style>
