<template>
  <div id="app">
    <div id="name" class="name">
      Brian Uyeno Design
    </div>
    <div id="navbar" class="toolbar">
      <span
        @click="(currentTab = 'Home'), setActiveClass(0)"
        :class="active[0]"
      >
        Gallery
      </span>
      <span
        @click="(currentTab = 'ThreeVis'), setActiveClass(1)"
        :class="active[1]"
      >
        3D Viewer
      </span>
      <span
        @click="(currentTab = 'Contact'), setActiveClass(2)"
        :class="active[2]"
      >
        Contact
      </span>
    </div>
    <div id="background">
      <picture>
        <source type="image/webp" srcset="./assets/Starry_Night.webp" />
        <img
          id="splash"
          class="splash"
          src="./assets/Starry_Night.jpg"
          alt="night silhouette splash image"
        />
      </picture>
      <picture>
        <source type="image/webp" srcset="./assets/Starry_Night_xs.webp" />
        <img
          id="xsmallSplash"
          class="splash"
          src="./assets/Starry_Night_xs.jpg"
          alt="night silhouette splash image"
        />
      </picture>
      <picture>
        <source
          type="image/webp"
          srcset="./assets/Night_Silhouette_small.webp"
        />
        <img
          id="smallSplash"
          class="splash"
          src="./assets/Night_Silhouette_small.jpg"
          alt="night silhouette splash image"
        />
      </picture>
    </div>
    <!-- <svg class="star" height="100" width="100">
      <circle cx="10" cy="10" r="5" fill="white" />
    </svg> -->
    <transition name="tab" mode="out-in">
      <keep-alive>
        <component id="content" :is="currentTab" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Contact from './components/Contact.vue';
import ThreeVis from './components/ThreeVis.vue';
import Web from './components/Web.vue';

export default {
  name: 'app',
  data: () => ({
    currentTab: 'Home',
    active: ['active', '', ''],
    backgroundHeight: null,
    navButtons: [
      {
        text: 'Gallery',
        tab: 'Home',
        active: true,
      },
      {
        text: '3D Viewer',
        tab: 'ThreeVis',
        active: true,
      },
      {
        text: 'Contact',
        tab: 'Contact',
        active: true,
      },
    ],
  }),
  components: {
    Home,
    Contact,
    ThreeVis,
    Web,
  },
  methods: {
    setBackgroundHeight() {
      let background = document.getElementById('background');
      background.style.height = window.innerHeight - 12 + 'px';
      this.backgroundHeight = background.clientHeight;
    },
    checkNavOpacity() {
      let scrollTop = window.pageYOffset;
      let nav = document.getElementById('navbar');
      // get scroll position in px
      if (scrollTop > this.backgroundHeight) {
        nav.style = 'background-color: rgba(0, 0, 0, 1);';
      } else {
        nav.style = 'background-color: rgba(0, 0, 0, 0);';
      }
    },
    setActiveClass(i) {
      var element = document.getElementById('background');
      element.scrollIntoView({ behavior: 'smooth' });
      for (let id in this.active) {
        if (id == i) {
          this.active[id] = 'active';
        } else {
          this.active[id] = '';
        }
      }
    },
    init() {
      this.setBackgroundHeight();
      window.addEventListener('resize', this.setBackgroundHeight, false);
      window.addEventListener('scroll', this.checkNavOpacity, false);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins|Dosis');
body {
  background-color: #000000;
}
#app {
  font-family: 'Dosis', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
#content {
  padding-top: 30px;
  /* padding-bottom: 30px; */
}
body {
  overflow-x: hidden;
}
button:hover {
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(255, 255, 255, 0.19);
  cursor: pointer;
}
button:focus {
  outline: 0;
}

.button {
  color: #ffffff;
  padding: 1em;
  background-color: transparent;
  border-radius: 1em;
  border: 2px solid #ffffff;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.tab-enter {
  opacity: 0;
}
.tab-enter-active {
  transition: opacity 1s, transform 1s;
}
.tab-leave {
}
.tab-leave-active {
  transition: opacity 1s, transform 1s;
  transform: translateX(100px);
  opacity: 0;
}
</style>
<style scoped>
.name {
  display: block;
  position: fixed;
  left: 10px;
  z-index: 1;
}
.toolbar {
  display: inline-flex;
  justify-content: flex-end;
  flex-direction: row;
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  right: 0;
  top: 0;
  width: 100%;
}
.toolbar > span {
  padding: 8px;
  width: 100px;
  text-align: center;
  user-select: none;
}
.toolbar > span:hover {
  background-color: rgba(255, 255, 255, 0.19);
  cursor: pointer;
}
.active {
  border-bottom: solid;
}
#background {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}
.splash {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: -1;
  width: 100%;
  overflow-y: hidden;
}

@media (max-width: 800px) {
  .column {
    flex: 50%;
    max-width: 50%;
  }
  h1 {
    font-size: 2em;
  }
  #splash {
    display: none;
  }
  #xsmallSplash {
    display: none;
  }
  #smallSplash {
    display: block;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media (max-width: 600px) {
  #splash {
    display: none;
  }
  #smallSplash {
    display: none;
  }
  #xsmallSplash {
    display: block;
  }
  .name {
    display: none;
  }
}
@media (min-width: 800px) {
  #splash {
    display: block;
  }
  #smallSplash {
    display: none;
  }
  #xsmallSplash {
    display: none;
  }
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-20px, -20px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(20px, 20px);
  }
}

.star {
  position: absolute;
  left: -100px;
  animation: star-shoot 8s linear infinite;
  animation-delay: 5s;
  z-index: -1;
  overflow: clip;
}
@keyframes star-shoot {
  0% {
    opacity: 1;
  }
  25% {
    left: -100px;
    top: 0;
    opacity: 1;
  }
  40% {
    left: 100%;
    top: 300px;
    opacity: 0;
  }
  70% {
    left: 100px;
    top: -100px;
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
  85% {
    left: 100%;
    top: 200px;
    opacity: 0;
  }
  100% {
    left: -100px;
    top: 0;
    opacity: 0;
  }
}
</style>
