<template>
  <div id="app">
    <div class="toolbar">
      <span>
        Gallery
      </span>
      <span>
        3D Viewer
      </span>
      <span>
        Web
      </span>
    </div>
    <!-- <img src="./assets/Brian_Full.png" alt="Brian Uyeno Photo" style="max-height:500px;"> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <component id="content" :is="currentTab" />
    <!-- <Gallery/> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <div class="panel" id="contact-panel">
      <Contact />
    </div>
    <button class="accordion" @click="toggleContact()">Contact</button> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Contact from "./components/Contact.vue";
import ThreeVis from "./components/ThreeVis.vue";
import Web from "./components/Web.vue";

export default {
  name: "app",
  data: () => ({
    currentTab: "HelloWorld"
  }),
  components: {
    HelloWorld,
    Contact,
    ThreeVis,
    Web
  },
  methods: {
    toggleContact() {
      const panel = document.getElementById("contact-panel");
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins|Dosis');
body {
  background-color: #000000
}
#app {
  font-family: "Dosis", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
#content {
  padding-top: 60px;
  padding-bottom: 30px;
}
body{
    overflow-x:hidden;
}

</style>
<style scoped>
.toolbar {
  display: inline-flex;
  justify-content: flex-end;
  flex-direction: row;
  position: fixed;
  right: 0;
}
.toolbar > span {
  padding: 3px;
  width: 100px;
  margin: 10px;
  text-align: center;
}
/* Style the buttons that are used to open and close the accordion panel */
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: center;
  border: none;
  outline: none;
  transition: 0.4s;
  position: fixed;
  bottom: 0;
  left: 0;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active,
.accordion:hover {
  background-color: #ccc;
}

/* Style the accordion panel. Note: hidden by default */
.panel {
  padding: 0 18px;
  background-color: white;
  display: none;
  width: 100%;
  overflow: hidden;
  position: fixed;
  left: 0;
  bottom: 40px;
}
</style>
