<template>
  <form name="contact" method="POST" netlify-honeypot="bot-field" data-netlify="true">
    <p>
      <label>Email: <input type="text" name="email" /></label>
    </p>
    <p>
      <label>Message: <textarea name="message"></textarea></label>
    </p>
    <p>
      <button type="submit">Send</button>
    </p>
  </form>
</template>

<script>
export default {
  name: "contact",
  data: () => ({

  }),
  methods: {
  }
};
</script>

<style scoped>
</style>
