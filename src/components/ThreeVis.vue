<template>
  <div id="canvas">
    <div id="container"></div>
    <div id="text-container">
      <p>Click/Drag to Rotate</p>
      <p>Scroll/Pinch to Zoom</p>
    </div>
    <div id="buttons-container">
      <div v-for="(model, i) in models" :key="i">
        <button
          :id="'model-button-' + i"
          class="button"
          @click="toggleLayer(i)"
        >
          {{ model.name }}
        </button>
      </div>
    </div>
    <div
      class="annotation"
      id="annotationElement"
      v-if="selectedObject || activeObject"
    >
      <h3>{{ annotations[selectedPos].title }}</h3>
      <div v-if="activeObject">
        <picture>
          <source type="image/webp" :srcset="imgs[0].src" />
          <img
            :src="imgs[0].fallback"
            style="max-width:300px"
            :alt="imgs[0].alt"
          />
        </picture>
        <p>
          {{ annotations[activePos].text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export default {
  name: 'ThreeVis',
  data() {
    return {
      models: [
        {
          name: 'Textured',
          model: 'Plastic_Textured.glb',
          scale: 10,
          group: undefined,
        },
        {
          name: 'Black',
          model: 'Plastic_Black.glb',
          scale: 10,
          group: undefined,
        },
        {
          name: 'Blue',
          model: 'Plastic_Blue.glb',
          scale: 10,
          group: undefined,
        },
      ],
      annotations: [
        {
          location: {
            x: 5,
            y: 1,
            z: 0,
          },
          title: 'Custom Annotation',
          text: 'Annotations for product descriptions, photos, videos etc.',
        },
      ],
      imgs: [
        {
          src: require('@/assets/render_textured.webp'),
          alt: 'textured glasses render',
          id: 'textured-glasses',
          fallback: require('@/assets/render_textured.jpg'),
        },
      ],
      annotationsGroup: undefined,
      selectedObject: undefined,
      selectedPos: undefined,
      activePos: undefined,
      moved: false,
      scene: undefined,
      raycaster: undefined,
      mouseVector: undefined,
      camera: undefined,
      renderer: undefined,
      controls: undefined,
      play: true,
      scaleFactor: 0.7,
    };
  },
  computed: {
    activeObject() {
      console.log('checking active object');
      if (this.annotationsGroup) {
        if (this.activePos !== undefined) {
          console.log('activePos set');
          if (this.lastActive) {
            this.lastActiveObject.material.color.set('#ffffff');
          }

          let activeObject = this.annotationsGroup.children[this.activePos];
          console.log(activeObject);
          this.lastActiveObject = activeObject;
          activeObject.scale.set(
            this.scaleFactor * 1.2,
            this.scaleFactor * 1.2,
            1
          );
          activeObject.material.color.set('#3dc642');

          return activeObject;
        } else {
          console.log('no active set');
          if (this.lastActiveObject) {
            this.lastActiveObject.material.color.set('#ffffff');
            this.lastActiveObject.scale.set(
              this.scaleFactor,
              this.scaleFactor,
              1
            );
            this.lastActiveObject = undefined;
          }
          return undefined;
        }
      }
    },
  },
  methods: {
    init: function() {
      let container = document.getElementById('container');

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
      this.controls.enablePan = false;

      this.scene.add(new THREE.AmbientLight(0x404040, 3));

      let frontLeftLight = new THREE.PointLight();
      frontLeftLight.position.z = 3;
      frontLeftLight.position.x = -3;
      this.scene.add(frontLeftLight);

      let frontRightLight = new THREE.PointLight();
      frontRightLight.position.z = 3;
      frontRightLight.position.x = 3;
      this.scene.add(frontRightLight);

      let leftLight = new THREE.PointLight();
      leftLight.position.x = 10;
      leftLight.position.z = -5;
      this.scene.add(leftLight);

      let rightLight = new THREE.PointLight();
      rightLight.position.x = -10;
      rightLight.position.z = -5;
      this.scene.add(rightLight);

      let topLight = new THREE.PointLight();
      topLight.position.y = 5;
      this.scene.add(topLight);

      this.raycaster = new THREE.Raycaster();
      this.mouseVector = new THREE.Vector2();

      this.loadModel();
      this.loadSprites();

      window.addEventListener('resize', this.onWindowResize, false);

      container.addEventListener('mousemove', this.onDocumentMouseMove, false);
      container.addEventListener('mouseup', this.onDocumentMouseclick, false);
      container.addEventListener('touchend', this.onDocumentTouchEnd, false);
      document.addEventListener(
        'visibilitychange',
        this.onDocumentVisibilityChange
      );

      window.addEventListener('mousedown', () => {
        this.moved = false;
      });
      window.addEventListener('touchstart', () => {
        this.moved = false;
      });

      this.controls.addEventListener('change', () => {
        this.moved = true;
        if (this.activeObject) {
          this.updateAnnotationLocation();
        }
      });

      this.onWindowResize();
    },
    animate: function() {
      if (this.play) {
        this.checkAnnotationDistance();
        requestAnimationFrame(this.animate);

        this.renderer.setClearColor(0x0000000, 0.3);
        this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);
      }
    },
    onWindowResize: function() {
      if (this.play) {
        let container = document.getElementById('container');
        container.style.height = window.innerHeight - 50 + 'px';
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        if (this.selectedObject || this.activeObject) {
          this.updateAnnotationLocation();
        }

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      }
    },
    checkAnnotationDistance: function() {
      if (this.annotationsGroup) {
        if (
          this.camera.position.distanceTo(this.controls.target).toFixed(0) > 15
        ) {
          this.scaleFactor = 0.7;
        } else {
          this.scaleFactor = 0.5;
        }
        for (let skey in this.annotationsGroup.children) {
          if (
            this.annotationsGroup.children[skey] != this.selectedObject &&
            this.annotationsGroup.children[skey] != this.activeObject
          ) {
            this.annotationsGroup.children[skey].scale.set(
              this.scaleFactor,
              this.scaleFactor,
              1
            );
          } else {
            this.annotationsGroup.children[skey].scale.set(
              this.scaleFactor * 1.2,
              this.scaleFactor * 1.2,
              1
            );
          }
        }
      }
    },
    async loadModel() {
      let loader = new GLTFLoader();

      for (let i in this.models) {
        this.models[i].group = new THREE.Group();
        loader.load(
          require('@/assets/' + this.models[i].model),
          (gltf) => {
            for (let key in gltf.scene.children) {
              let mesh = gltf.scene.children[key];
              mesh.scale.set(
                this.models[i].scale,
                this.models[i].scale,
                this.models[i].scale
              );
              this.models[i].group.add(mesh);
            }
          },
          (error) => {
            console.log(error);
          }
        );
        this.scene.add(this.models[i].group);
        if (i != 0) {
          this.models[i].group.visible = false;
        }
      }
    },
    loadSprites: function() {
      this.annotationsGroup = new THREE.Group();
      const x = 32;
      const y = 32;
      const radius = 30;
      const startAngle = 0;
      const endAngle = Math.PI * 2;
      for (let i in this.annotations) {
        // Sprite
        // let canvas = document.getElementById("number");
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let numberTexture = new THREE.CanvasTexture(canvas);

        let spriteMaterial = new THREE.SpriteMaterial({
          map: numberTexture,
          alphaTest: 0.5,
          transparent: true,
          depthTest: false,
          depthWrite: false,
          sizeAttenuation: true,
        });

        // Number definition
        ctx.canvas.width = 64;
        ctx.canvas.height = 64;

        ctx.clearRect(0, 0, x, y);

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fill();

        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();

        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.font = '25px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(parseInt(i) + 1, x, y);

        let sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.7, 0.7, 0.7);
        sprite.position.set(
          this.annotations[i].location.x,
          this.annotations[i].location.y,
          this.annotations[i].location.z
        );

        this.annotationsGroup.add(sprite);
      }
      this.scene.add(this.annotationsGroup);
    },
    onDocumentMouseMove: function(event) {
      event.preventDefault();
      if (this.selectedObject) {
        if (this.activeObject != this.selectedObject) {
          // this.selectedObject.material.color.set("#ffffff");
          this.selectedObject.scale.set(this.scaleFactor, this.scaleFactor, 1);
        }
        this.selectedObject = null;
      }
      let intersects = this.getIntersects(event.pageX, event.pageY);

      if (intersects.length > 0) {
        let res = intersects.filter(function(res) {
          return res && res.object;
        })[0];
        if (res && res.object && res.object.material.opacity > 0) {
          this.selectedObject = res.object;
          this.selectedObject.scale.set(
            this.scaleFactor * 1.2,
            this.scaleFactor * 1.2,
            1
          );
          this.selectedPos = this.annotationsGroup.children.findIndex(
            (x) => x.id === this.selectedObject.id
          );
          this.updateAnnotationLocation();
        }
      }
    },
    updateAnnotationLocation() {
      let vector;
      if (this.activeObject) {
        vector = this.activeObject.position.clone();
      } else if (this.selectedObject) {
        vector = this.selectedObject.position.clone();
      }
      let canvas = this.renderer.domElement;
      vector.project(this.camera);

      vector.x = Math.round((0.5 + vector.x / 2) * canvas.width);
      vector.y = Math.round((0.5 - vector.y / 2) * canvas.height);
      if (document.querySelector('.annotation')) {
        let annotation = document.querySelector('.annotation');
        let annotationElement = document.getElementById('annotationElement');

        if (this.activePos != undefined) {
          annotationElement.style.borderColor = '#3dc642';
        }

        if (canvas.width < 400) {
          annotation.style.top = 39;
          annotation.style.left = 0;
          annotation.style.width = '100%';
        } else if (canvas.width - vector.x > annotationElement.clientWidth) {
          annotation.style.top = vector.y + 'px';
          annotation.style.left = vector.x + 35 + 'px';
        } else {
          annotation.style.top = vector.y + 'px';
          annotation.style.left =
            vector.x - annotationElement.clientWidth - 35 + 'px';
        }
      }
    },
    onDocumentTouchEnd: function(event) {
      event.preventDefault();

      //check sprite intersection
      if (this.selectedObject) {
        if (this.moved) return;
        if (this.activeObject != this.selectedObject) {
          // this.selectedObject.material.color.set("#ffffff");
          this.selectedObject.scale.set(this.scaleFactor, this.scaleFactor, 1);
        }
        this.selectedObject = undefined;
      }
      let intersects = this.getIntersects(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
      );
      if (intersects.length > 0) {
        let res = intersects.filter(function(res) {
          return res && res.object;
        })[0];
        if (res && res.object) {
          this.selectedObject = res.object;
          this.selectedPos = this.annotationsGroup.children.findIndex(
            (x) => x.id === this.selectedObject.id
          );
          this.activePos = this.selectedPos;
          setTimeout(this.updateAnnotationLocation, 100);
        }
      } else {
        this.selectedObject = undefined;
        this.activePos = undefined;
        this.selectedPos = undefined;
      }
    },
    onDocumentMouseclick: function() {
      if (this.moved) return;
      if (this.selectedObject) {
        this.activePos = this.selectedPos;
        this.updateAnnotationLocation();
      } else {
        this.activePos = undefined;
      }
    },
    getIntersects: function(x, y) {
      x = (x / window.innerWidth) * 2 - 1;
      y = -(y / window.innerHeight) * 2 + 1;
      this.mouseVector.set(x, y);
      this.raycaster.setFromCamera(this.mouseVector, this.camera);
      return this.raycaster.intersectObject(this.annotationsGroup, true);
    },
    toggleLayer(i) {
      let btn;
      for (let id in this.models) {
        btn = document.getElementById('model-button-' + id);
        if (i == id) {
          this.models[id].group.visible = true;
          btn.classList.add('active');
        } else {
          this.models[id].group.visible = false;
          btn.classList.remove('active');
        }
      }
    },
    onDocumentVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        this.play = false;
      } else {
        this.play = true;
      }
    },
  },
  mounted() {
    this.init();
    this.animate();
    let model = document.getElementById('model-button-0');
    model.classList.add('active');
  },
  deactivated() {
    this.play = false;
  },
  activated() {
    this.play = true;
    this.onWindowResize();
    this.animate();
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  box-sizing: border-box;
}
#text-container {
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 40px;
  user-select: none;
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
.active {
  color: #3dc642;
  border-color: #3dc642;
}
.annotation {
  position: absolute;
  user-select: none;
  top: 39px;
  left: -500px;
  color: #ffffff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid white;
  border-radius: 5px;
  padding: 5px;
  z-index: 2;
}
@media (max-width: 400px) {
  .annotation {
    border: none;
  }
}
</style>
