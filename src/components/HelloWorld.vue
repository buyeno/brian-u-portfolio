<template>
  <div class="hello">
    <h1>Brian Uyeno</h1>
    <h2> Visual Designer</h2>
    <h3>Vector &bull; 3D &bull; Web</h3>
    <div class="row">
      <button @click="galleryScroll()" @hover="setHoverState()" class="button">CHECK OUT SOME SAMPLES</button>
    </div>
    <div class="arrow">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <Gallery id="gallery"/>
  </div>
</template>

<script>
import Gallery from "./Gallery.vue";
export default {
  name: 'HelloWorld',
  methods: {
    setHoverState() {
      // document.getElementsByClassName()
    },
    galleryScroll() {
      var element = document.getElementById("gallery");
      element.scrollIntoView({behavior: "smooth"});
    }
  },
  components: {
    Gallery
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 5em;
  justify-content: center;
}

/* Create four equal columns that sits next to each other */
.column {
  flex: 50%;
  max-width: 25%;
  padding: 0 4px;
}

.column img {
  margin-top: 8px;
  vertical-align: middle;
}



/* Responsive layout - makes a two column-layout instead of four columns */
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
  .column {
    flex: 100%;
    max-width: 100%;
  }
  #splash {
    display: none;
  }
  #smallSplash {
    display: none;
  }
  #xsmallSplash {
    display: block;
  }
}
@media (min-width: 800px) {
  h1 {
    font-size: 5em;
  }
  h2 {
    font-size: 3em;
  }
  .cloud {
    max-width: 10%;
  }
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.arrow{
    position: absolute;
    justify-content: center;
    top: 85%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.arrow span{
    display: block;
    width: 20px;
    height: 20px;
    border-bottom: 5px solid #ffffff;
    border-right: 5px solid #ffffff;
    transform: rotate(45deg);
    /* margin: -10px; */
    animation: animate 2s infinite;
}
.arrow span:nth-child(2){
    animation-delay: -0.2s;
}
.arrow span:nth-child(3){
    animation-delay: -0.4s;
}
@keyframes animate {
    0%{
        opacity: 0;
        transform: rotate(45deg) translate(-20px,-20px);
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0;
        transform: rotate(45deg) translate(20px,20px);
    }
}

.star {
  position: absolute;
  left:-100px;
  animation: star-shoot 8s linear infinite;
  animation-delay: 5s;
  z-index: -1;
  overflow: clip;
}
@keyframes star-shoot {
  0%{
    opacity: 1;
  }
  25%{
    left:-100px;
    top:0;
    opacity: 1;
  }
  40%{
    left:100%;
    top: 300px;
    opacity: 0;
  }
  70%{
    left:100px;
    top:-100px;
    opacity: 0;
  }
  75%{
    opacity: 1;
  }
  85%{
    left:100%;
    top: 200px;
    opacity: 0;
  }
  100%{
    left:-100px;
    top:0;
    opacity: 0;
  }
}
</style>
