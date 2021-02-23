<template>
  <div id="gallery">
    <div class="container">
      <h2>Animation</h2>
      <div class="row">
        <div v-for="(video, i) in videos" :key="i">
          <video autoplay muted loop :id="video.id">
            <source :src="video.src" type="video/mp4" />
          </video>
        </div>
      </div>
      <h2>Illustration</h2>
      <div class="row">
        <div class="column">
          <div v-for="(vector, i) in vectorImgs[0]" :key="i">
            <picture>
              <source type="image/webp" :srcset="vector.src" />
              <img
                :src="vector.fallback"
                style="width:100%"
                :alt="vector.alt"
                @click="toggleModal(vector)"
              />
            </picture>
          </div>
        </div>
        <div class="column">
          <div v-for="(vector, i) in vectorImgs[1]" :key="i">
            <picture>
              <source type="image/webp" :srcset="vector.src" />
              <img
                :src="vector.fallback"
                style="width:100%"
                :alt="vector.alt"
                @click="toggleModal(vector)"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h2>Render</h2>
      <div class="row">
        <div class="column">
          <div v-for="(render, i) in renderImgs[0]" :key="i">
            <picture>
              <source type="image/webp" :srcset="render.src" />
              <img
                :src="render.fallback"
                style="width:100%"
                :alt="render.alt"
                @click="toggleModal(render)"
              />
            </picture>
          </div>
        </div>
        <div class="column">
          <div v-for="(render, i) in renderImgs[1]" :key="i">
            <picture>
              <source type="image/webp" :srcset="render.src" />
              <img
                :src="render.fallback"
                style="width:100%"
                :alt="render.alt"
                @click="toggleModal(render)"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
    <div class="container"></div>
    <div id="modalCanvas" class="modal">
      <!-- Modal Content (The Image) -->
      <picture>
        <source type="image/webp" :srcset="modalsrc" />
        <img id="modalFallback" class="modal-content" :src="modalFallback" />
      </picture>

      <!-- Modal Caption (Image Text) -->
      <div id="caption"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gallery',
  data: () => ({
    modalsrc: undefined,
    modalFallback: undefined,
    vectorImgs: [
      [
        {
          src: require('@/assets/Wine_Bottle_2d.webp'),
          alt: 'vector drawn wine bottle',
          id: 'wine-bottle',
          fallback: require('@/assets/Wine_Bottle_2d.png'),
        },
        // {
        //   src: require('@/assets/Melon_Bike.webp'),
        //   alt: 'melon bike',
        //   id: 'melon-bike',
        //   fallback: require('@/assets/Melon_Bike.png'),
        // },
        // {
        //   src: require('@/assets/DummSite.webp'),
        //   alt: 'responsive site example',
        //   id: 'dummy-site',
        //   fallback: require('@/assets/DummSite.png'),
        // },
      ],
      [
        {
          src: require('@/assets/glasses-mockup.webp'),
          alt: 'mockup for glasses variety',
          id: 'glasses-mockup',
          fallback: require('@/assets/glasses-mockup.jpg'),
        },
        {
          src: require('@/assets/bottles-mockup.webp'),
          alt: 'mockup for glasses variety',
          id: 'glasses-mockup',
          fallback: require('@/assets/bottles-mockup.jpg'),
        },
        // {
        //   src: require('@/assets/Messy_Desk.webp'),
        //   alt: 'unorganized desk',
        //   id: 'unorganized-desk',
        //   fallback: require('@/assets/Messy_Desk.png'),
        // },
        // {
        //   src: require('@/assets/Clean_Desk.webp'),
        //   alt: 'organized desk',
        //   id: 'organized-desk',
        //   fallback: require('@/assets/Clean_Desk.png'),
        // },
      ],
    ],
    renderImgs: [
      [
        {
          src: require('@/assets/mic.webp'),
          alt: 'microphone render',
          id: 'thin-lines',
          fallback: require('@/assets/mic.png'),
        },
        {
          src: require('@/assets/DS_200.webp'),
          alt: 'render of network hub',
          id: 'ds-200',
          fallback: require('@/assets/DS_200.png'),
        },
        {
          src: require('@/assets/Thick_Lines.webp'),
          alt: 'twist glass with thick lines render',
          id: 'thick-lines',
          fallback: require('@/assets/Thick_Lines.jpg'),
        },
        {
          src: require('@/assets/van_render2.webp'),
          alt: 'Van Conversion Render',
          id: 'van_render2',
          fallback: require('@/assets/van_render2.png'),
        },
      ],
      [
        {
          src: require('@/assets/render_textured.webp'),
          alt: 'textured glasses render',
          id: 'textured-glasses',
          fallback: require('@/assets/render_textured.jpg'),
        },
        {
          src: require('@/assets/Render_Aviator.webp'),
          alt: 'aviator glasses render',
          id: 'aviator-glasses',
          fallback: require('@/assets/Render_Aviator.jpg'),
        },
        {
          src: require('@/assets/render_black.webp'),
          alt: 'black frame glasses',
          id: 'black-glasses',
          fallback: require('@/assets/render_black.jpg'),
        },
        {
          src: require('@/assets/DS_100.webp'),
          alt: 'render of network hub',
          id: 'ds-100',
          fallback: require('@/assets/DS_100.png'),
        },
        {
          src: require('@/assets/Thin_Lines.webp'),
          alt: 'Twist Bottle Thin Lines',
          id: 'thin-lines',
          fallback: require('@/assets/Thin_Lines.jpg'),
        },
        {
          src: require('@/assets/van_render.webp'),
          alt: 'Van Conversion Render',
          id: 'van_render',
          fallback: require('@/assets/van_render.png'),
        },
      ],
    ],
    videos: [
      {
        src: require('@/assets/rotate.mp4'),
        id: 'rotate',
      },
      {
        src: require('@/assets/van_02.mp4'),
        id: 'van',
      },
    ],
  }),
  methods: {
    toggleModal(image) {
      var modal = document.getElementById('modalCanvas');

      // Get the image and insert it inside the modal - use its "alt" text as a caption
      var img = document.getElementById(image.id);
      var captionText = document.getElementById('caption');

      modal.style.display = 'block';
      this.modalsrc = image.src;
      this.modalFallback = image.fallback;
      captionText.innerHTML = image.alt;

      modal.onclick = function() {
        modal.style.display = 'none';
      };
    },
    startVideos() {
      for (let i in this.videos) {
        var video = document.getElementById(this.videos[i].id);
        video.play();
      }
    },
  },
  activated() {
    this.startVideos();
  },
  created() {
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        var modal = document.getElementById('modalCanvas');
        modal.style.display = 'none';
      }
    });
  },
};
</script>
<style scoped>
#gallery {
  margin-top: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial;
}
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}
.row video {
  margin-top: 8px;
  margin-bottom: 8px;
  vertical-align: middle;
  border-radius: 1em;
  display: flex;
  width: 100%;
}
.container {
  border-radius: 1em;
  max-width: 49%;
  padding-top: 1em;
  margin-top: 2em;
}
.column {
  flex: 50%;
  max-width: 50%;
  padding: 0 8px;
}

.column img {
  margin-top: 8px;
  margin-bottom: 8px;
  vertical-align: middle;
  background-color: #b2b2b2;
  border-radius: 1em;
}
.column img:hover {
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(255, 255, 255, 0.19);
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media (max-width: 800px) {
  .container {
    max-width: 100%;
  }
  .column {
    flex: 50%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media (max-width: 600px) {
  .column {
    flex: 100%;
    max-width: 100%;
  }
}

/* modal */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

/* Modal Content (Image) */
.modal-content {
  margin: auto;
  display: block;
  max-width: 100%;
}

/* Caption of Modal Image (Image Text) - Same Width as the Image */
#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

/* Add Animation - Zoom in the Modal */
.modal-content,
#caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
