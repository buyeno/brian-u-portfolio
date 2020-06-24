<template>
  <form
    name="contact"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <div id="form-container">
      <div class="form-submission">
        <label>Email: <input type="text" name="email"/></label>

        <label>Message: <textarea name="message"></textarea></label>

        <button type="submit" class="button">Send</button>
      </div>
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
input {
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  border-width: 0;
  padding: 5px;
  outline: none;
}
textarea {
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  border-width: 0;
  padding: 5px;
  height: 200px;
  outline: none;
  resize: none;
}
label {
  margin: 20px;
}
</style>
