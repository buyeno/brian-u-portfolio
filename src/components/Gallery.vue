<template>
  <div id="gallery">
    <div class="container">
      <h2>Vector Illustration</h2>
      <div class="row">
        <div class="column">
          <img src="../assets/Melon_Bike.webp" style="width:100%" alt="vector drawn bicylce" />
          <img src="../assets/DummSite.webp" style="width:100%" alt="responsive site example" />
          <img src="../assets/Wine_Bottle_2d.webp" style="width:100%" alt="vector drawn wine bottle" />
          <img src="../assets/Letter.webp" style="width:100%" alt="wax sealed letter" />

        </div>

        <div class="column">
          <img src="../assets/Messy_Desk.webp" style="width:100%" alt="unorganized desk"/>
          <img src="../assets/Clean_Desk.webp" style="width:100%" alt="organized desk"/>
          <img src="../assets/ClimbAssist_Logo_Full.webp" style="width:100%" alt="logo for climb assist" />
          <img src="../assets/AtlasLogo.webp" style="width:100%" alt="logo for atlas" />
        </div>
        <!-- <div class="column">

        </div>

        <div class="column">

        </div> -->
      </div>
    </div>
    <div class="container">
      <h2>Renders</h2>
      <div class="row">
        <div class="column">
          <img src="../assets/Carabiner.webp" style="width:100%" alt="render of carabiner"/>
          <img src="../assets/Thick_Lines.webp" style="width:100%" alt="twist glass with thick lines render"/>
          <img src="../assets/Thin_Lines.webp" style="width:100%" alt="twist glass with thin lines render"/>
        </div>

        <div class="column">
          <img src="../assets/render_textured.webp" style="width:100%" alt="textured glasses render"/>
          <img src="../assets/Render_Aviator.webp" style="width:100%" alt="aviator glasses render"/>
          <img src="../assets/render_black.webp" style="width:100%" alt="black frame glasses"/>
          <img src="../assets/Bottle_Render.webp" style="width:100%" alt="glass bottle with label"/>

          <!-- <video style="width:100%" controls>
          <source src="../assets/Route_Lines.mp4" type="video/mp4">
        </video> -->
        </div>
<!--
        <div class="column">

        </div>

        <div class="column">

        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "gallery",
  data: () => ({}),
  methods: {}
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
  /* background-color: #3C2F43; */
  max-width:49%;
  padding-top: 1em;
  margin-top: 2em;
  /* #3C2F43 */
}

/* Create four equal columns that sits next to each other */
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
</style>
