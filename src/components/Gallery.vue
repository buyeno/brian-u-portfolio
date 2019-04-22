<template>
  <div id="gallery">
    <div class="container">
      <h2>Vector Illustration</h2>
      <div class="row">
        <div class="column">
          <img src="../assets/Melon_Bike.png" style="width:100%" />
          <img src="../assets/DummSite.png" style="width:100%" />
          <img src="../assets/Wine_Bottle_2d.png" style="width:100%" />
          <img src="../assets/Letter.png" style="width:100%" />

        </div>

        <div class="column">
          <img src="../assets/Messy_Desk.png" style="width:100%" />
          <img src="../assets/Clean_Desk.png" style="width:100%" />
          <img src="../assets/ClimbAssist_Logo_Full.png" style="width:100%" />
          <img src="../assets/AtlasLogo.png" style="width:100%" />
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
          <img src="../assets/Carabiner.png" style="width:100%" />
          <img src="../assets/Thick_Lines.png" style="width:100%" />
          <img src="../assets/Thin_Lines.png" style="width:100%" />
        </div>

        <div class="column">
          <img src="../assets/render_textured.png" style="width:100%" />
          <img src="../assets/Render_Aviator.png" style="width:100%" />
          <img src="../assets/render_black.png" style="width:100%" />
          <img src="../assets/Bottle_Render.png" style="width:100%" />

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
