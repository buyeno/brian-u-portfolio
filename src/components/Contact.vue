<template>
  <div>
    <div id="text-container">
      <h2>Hello!</h2>
      <p>
        I'm a visual designer that will provide you with everything you need for
        well-designed products and visualizations. I will work with you through
        all of your visual design needs whether that is modeling, renders,
        mockups, or web customizations. I am committed to helping you create and
        show your product to customers in the best fashion.
      </p>
      <div id="help-list">
        <ul id="help-list">
          <li>3D Modeling</li>
          <li>Photorealistic Renders</li>
          <li>Texturing</li>
          <li>Vector mockups</li>
          <li>Custom 3D Viewer</li>
          <li>Front End Web Development</li>
        </ul>
      </div>
    </div>
    <form
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div id="form-container">
        <div class="form-submission">
          <label
            >Email:
            <input type="text" name="email" placeholder="youremail@example.com"
          /></label>

          <label>Message: <textarea name="message"></textarea></label>

          <button type="submit" class="button">Send</button>
        </div>
      </div>
      <div class="social-links">
        <a href="https://github.com/buyeno" target="_blank">
          <img
            class="github"
            src="../assets/github-brands.svg"
            alt="github profile"
          />
        </a>
        <a href="https://linkedin.com/in/brian-uyeno-17424150" target="_blank">
          <img
            class="linkedin"
            src="../assets/linkedin-brands.svg"
            alt="linkedin profile"
          />
        </a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'contact',
  data: () => ({}),
  methods: {},
};
</script>

<style scoped>
/* form */
#form-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
#text-container {
  width: 100%;
  display: inline-block;
  justify-content: center;
  max-width: 800px;
  font-size: 1.3em;
}
#help-list {
  justify-content: center;
  display: inline-flex;
  flex-direction: column;
  text-align: justify;
}
.form-submission {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
}
.form-submission button {
}
input {
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  border-width: 0;
  outline: none;
  padding: 5px;
}
textarea {
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  border-width: 0;
  height: 200px;
  padding: 5px;
  outline: none;
  resize: none;
}
label {
  margin: 20px;
}
/* social buttons */
.social-links {
}
.social-links img {
  margin: 15px;
  width: 50px;
  vertical-align: middle;
}
.github {
  border-radius: 25px;
}
.linkedin {
  border-radius: 5px;
}
.social-links img:hover {
  box-shadow: 0 4px 10px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(255, 255, 255, 0.19);
}
</style>
