<template>
  <div id="canvas">
    <div id="container"></div>
    <div id="buttons-container">
      <div v-for="(model, i) in models">
        <button class="button" @click="toggleLayer(i), model=i ">{{model.name}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
export default {
  name: "ThreeVis",
  data() {
    return {
      models: [
        {
          name: "Aviators",
          model: "Gunmetal_Green.glb",
          scale: 10,
          group: undefined
        },
        {
          name: "Textured",
          model: "Textured_Glasses.glb",
          scale: 10,
          group: undefined
        },
        {
          name: "Microphone",
          model: "mic.glb",
          scale: 3,
          group: undefined
        }
      ],
      navHeight: 30,
      model: 0,
      currentModel: null,
      scene: null,
      mesh: null,
      camera:  null,
      renderer: null,
      controls: null,
      meshScale: 10,
      fullscreenTrigger: false,
      play: true
    }
  },
  methods: {
    init: function() {
      let container = document.getElementById("container");

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        1,
        1000
      );
      this.camera.position.z = 20;
      this.camera.target = new THREE.Vector3();


      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.gammaOutput = true;
      this.renderer.gammaFactor = 2.2;
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.minDistance = 10;
      this.controls.maxDistance = 30;

      this.scene.add(new THREE.AmbientLight(0x404040, 3));

      let frontLeftLight = new THREE.PointLight();
      frontLeftLight.position.z=3
      frontLeftLight.position.x=-3
      this.scene.add(frontLeftLight)

      let frontRightLight = new THREE.PointLight();
      frontRightLight.position.z=3
      frontRightLight.position.x=3
      this.scene.add(frontRightLight)

      let leftLight = new THREE.PointLight();
      leftLight.position.x=10
      leftLight.position.z=-5
      this.scene.add(leftLight)

      let rightLight = new THREE.PointLight();
      rightLight.position.x=-10
      rightLight.position.z=-5
      this.scene.add(rightLight)

      let topLight = new THREE.PointLight();
      topLight.position.y=5
      this.scene.add(topLight)

      this.loadModel();

      window.addEventListener("resize", this.onWindowResize, false);
      this.onWindowResize();
    },
    animate: function() {
      if (this.play) {
        requestAnimationFrame(this.animate);

        this.renderer.setClearColor(0x0000000, .3);
        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);
      }
    },
    onWindowResize: function() {
      if (this.play) {
        let container = document.getElementById('container');
        container.style.height= window.innerHeight-80 + 'px';
        this.renderer.setSize(container.clientWidth, container.clientHeight);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      }
    },
    async loadModel() {
      let loader = new GLTFLoader();

      for (let i in this.models) {
        this.models[i].group = new THREE.Group();
        loader.load(
          require("@/assets/" + this.models[i].model),
          gltf => {
            for (let key in gltf.scene.children) {
              let mesh = gltf.scene.children[key];
              mesh.scale.set(this.models[i].scale, this.models[i].scale, this.models[i].scale);
              this.models[i].group.add(mesh);
            }
          },
          error => {
            console.log(error);
          }
        );
        this.scene.add(this.models[i].group)
        if (i !=0 ){
          this.models[i].group.visible=false;
        }
      }


    },
    toggleLayer(i) {
      for (let id in this.models) {
        if (i == id) {
          this.models[id].group.visible=true
        } else {
          this.models[id].group.visible=false
        }
      }
      this.controls.reset();
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
    this.onWindowResize();
    this.animate();
  }
};
</script>

<style scoped>
#container {
  width: 100%;
  box-sizing: border-box;
}
#buttons-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  width: 100%;
  bottom: 0;
}
.button {
  margin: 10px;
}
</style>
