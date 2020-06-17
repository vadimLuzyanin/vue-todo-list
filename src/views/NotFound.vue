<template>
  <div class="not-found">
    Page with path of <br>'{{this.$route.path}}'<br> is not found
    <br />
    <router-link to="/">Want to go to the home page?</router-link>
  </div>
</template>

<script>
  export default {
    name: "NotFound",
  }; 
</script>

<style>
  .not-found {
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>