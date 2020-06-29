<template>
    <form
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div id="form-container">
        <div class="form-submission">
          <label>Email: <input type="text" name="email" placeholder="name@example.com"></label>

          <label>Message: <textarea name="message"></textarea></label>

          <button type="submit" class="button">Send</button>
        </div>
      </div>
      <div class="social-links">
        <a href="https://github.com/buyeno" target="_blank">
        <img class="github" src="../assets/github-brands.svg" alt="github profile">
        </a>
        <a href="https://linkedin.com/in/brian-uyeno-17424150" target="_blank">
        <img class="linkedin" src="../assets/linkedin-brands.svg" alt="linkedin profile">
        </a>
      </div>
    </form>
</template>

<script>
export default {
  name: "contact",
  data: () => ({}),
  methods: {}
};
</script>

<style scoped>
/* form */
#form-container {
  width: 100%;
  display: flex;
  justify-content: center;
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
  box-shadow: 0 4px 10px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
}

</style>
