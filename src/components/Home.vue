<template>
  <div>
    <h1 id="home-container">Brian Uyeno</h1>
    <h2>Visual Designer</h2>
    <h3>Vector &bull; 3D &bull; Web</h3>
    <div class="row">
      <button @click="galleryScroll()" class="button">
        CHECK OUT SOME SAMPLES
      </button>
    </div>
    <div class="arrow">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <Gallery id="gallery" />
  </div>
</template>

<script>
import Gallery from './Gallery.vue';
export default {
  name: 'Home',
  methods: {
    galleryScroll() {
      var element = document.getElementById('gallery');
      element.scrollIntoView({ behavior: 'smooth' });
    },
  },
  components: {
    Gallery,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 5em;
  justify-content: center;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media (max-width: 800px) {
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

.arrow {
  position: absolute;
  justify-content: center;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.arrow span {
  display: block;
  width: 20px;
  height: 20px;
  border-bottom: 5px solid #ffffff;
  border-right: 5px solid #ffffff;
  transform: rotate(45deg);
  /* margin: -10px; */
  animation: animate 2s infinite;
}
.arrow span:nth-child(2) {
  animation-delay: -0.2s;
}
.arrow span:nth-child(3) {
  animation-delay: -0.4s;
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
</style>
<style scoped>
#home-container {
  padding-top: 30px;
}
</style>
