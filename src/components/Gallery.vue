<template>
  <div id="gallery">
    <div class="container">
      <h2>Vector Illustration</h2>
      <div class="row">
        <div class="column" >
          <div v-for="(vector, i) in vectorImgs[0]">
            <img :src="vector.src" style="width:100%" :alt="vector.alt" :id="vector.id" @click="toggleModal(vector)" @error="fallbackImg(vector)"/>
          </div>
        </div>
        <div class="column">
          <div v-for="(vector, i) in vectorImgs[1]">
            <img :src="vector.src" style="width:100%" :alt="vector.alt" :id="vector.id" @click="toggleModal(vector)"  @error="fallbackImg(vector)"/>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h2>product Vis</h2>
      <div class="row">
        <div class="column" >
          <div v-for="(render, i) in renderImgs[0]">
            <img :src="render.src" style="width:100%" :alt="render.alt" :id="render.id" @click="toggleModal(render)"  @error="fallbackImg(render)"/>
          </div>
        </div>
        <div class="column">
          <div v-for="(render, i) in renderImgs[1]">
            <img :src="render.src" style="width:100%" :alt="render.alt" :id="render.id" @click="toggleModal(render)"  @error="fallbackImg(render)"/>
          </div>
        </div>
      </div>
    </div>
    <div id="imgModal" class="modal">

      <!-- Modal Content (The Image) -->
      <img class="modal-content" id="img01">

      <!-- Modal Caption (Image Text) -->
      <div id="caption"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gallery",
  data: () => ({
    imgError: false,
    vectorImgs: [
      [
        {
          src: require("@/assets/Melon_Bike.webp"),
          alt: "melon bike",
          id: "melon-bike",
          fallback: require("@/assets/Melon_Bike.png")
        },
        {
          src: require("@/assets/DummSite.webp"),
          alt: "responsive site example",
          id: "dummy-site",
          fallback: require("@/assets/DummSite.png")
        },
        {
          src: require("@/assets/Wine_Bottle_2d.webp"),
          alt: "vector drawn wine bottle",
          id: "wine-bottle",
          fallback: require("@/assets/Wine_Bottle_2d.png")
        },
        {
          src: require("@/assets/Letter.webp"),
          alt: "wax sealed letter",
          id: "letter",
          fallback: require("@/assets/Letter.png")
        }
      ],
      [
        {
          src: require("@/assets/Messy_Desk.webp"),
          alt: "unorganized desk",
          id: "unorganized-desk",
          fallback: require("@/assets/Messy_Desk.png")
        },
        {
          src: require("@/assets/Clean_Desk.webp"),
          alt: "organized desk",
          id: "organized-desk",
          fallback: require("@/assets/Clean_Desk.png")
        },
        {
          src: require("@/assets/ClimbAssist_Logo_Full.webp"),
          alt: "logo for climb assist",
          id: "climb-assist-logo",
          fallback: require("@/assets/ClimbAssist_Logo_Full.png")
        },
        {
          src: require("@/assets/AtlasLogo.webp"),
          alt: "logo for atlas",
          id: "atlas-logo",
          fallback: require("@/assets/AtlasLogo.png")
        }
      ]
    ],
    renderImgs: [
      [
        {
          src: require("@/assets/Carabiner.webp"),
          alt: "render of carabiner",
          id: "carabiner",
          fallback: require("@/assets/Carabiner.jpg")
        },
        {
          src: require("@/assets/Thick_Lines.webp"),
          alt: "twist glass with thick lines render",
          id: "thick-lines",
          fallback: require("@/assets/Thick_Lines.jpg")
        },
        {
          src: require("@/assets/Thin_Lines.webp"),
          alt: "twist glass with thin lines render",
          id: "thin-lines",
          fallback: require("@/assets/Thin_Lines.jpg")
        },
      ],
      [
        {
          src: require("@/assets/render_textured.webp"),
          alt: "textured glasses render",
          id: "textured-glasses",
          fallback: require("@/assets/render_textured.jpg")
        },
        {
          src: require("@/assets/Render_Aviator.webp"),
          alt: "aviator glasses render",
          id: "aviator-glasses",
          fallback: require("@/assets/Render_Aviator.jpg")
        },
        {
          src: require("@/assets/render_black.webp"),
          alt: "black frame glasses",
          id: "black-glasses",
          fallback: require("@/assets/render_black.jpg")
        },
        {
          src: require("@/assets/Bottle_Render.webp"),
          alt: "glass bottle with label",
          id: "glass-bottle",
          fallback: require("@/assets/Bottle_Render.jpg")
        }
      ]
    ]
  }),
  methods: {
    toggleModal(image) {
      var modal = document.getElementById("imgModal");

      // Get the image and insert it inside the modal - use its "alt" text as a caption
      var img = document.getElementById(image.id);
      var modalImg = document.getElementById("img01");
      var captionText = document.getElementById("caption");
      modal.style.display = "block";
      if (this.imgError) {
        modalImg.src = image.fallback
      } else {
        modalImg.src = image.src;
      }
      captionText.innerHTML = image.alt;

      modal.onclick = function() {
        modal.style.display = "none";
      }
    },
    onImageError(image) {
      this.imgError = true;
      this.$refs.img.src = image.fallback;
    }
  }
};
</script>
<style scoped>
#gallery {
  margin-top: 300px;
  display:flex;
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
.container {
  border-radius: 1em;
  max-width:49%;
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
  background-color: #B2B2B2;
  border-radius: 1em;
}
.column img:hover {
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
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
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}

/* Modal Content (Image) */
.modal-content {
  margin: auto;
  display: block;
  max-width: 700px;
  max-height: 90%;
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
.modal-content, #caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {transform:scale(0)}
  to {transform:scale(1)}
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px){
  .modal-content {
    width: 100%;
  }
}
</style>
