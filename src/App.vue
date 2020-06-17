<template>
  <div id="app">
    <div class="wrapper">
      <transition name="route" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  html,
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fafafa;
  }

  .wrapper {
    max-width: 960px;
    height: 100vh;
    margin: 0 auto;
    text-align: center;
    padding: 0.5rem;
    background-color: #fafafa;
    overflow: hidden;
  }

  .route-enter-active,
  .route-leave-active {
    transition: all 0.3s ease;
  }
  .route-enter, .route-leave-to /* .list-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }

  a {
    color: green;
    text-decoration: none;
  }

  .card {
    margin-bottom: 1rem;
    padding: 0.5rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    transition: box-shadow ease 0.3s;
    width: 90%;
    display: flex;
    justify-content: space-between;
  }
  .card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  .button {
    display: inline-block;
    max-height: 2.25rem;
    border: none;
    background-color: #fff;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
  }
  .button-red {
    color: red;
    border: 1px solid red;
    transition: 0.3s;
  }
  .button-red:hover, .button-red:active {
    background-color: red;
    color: white;
  }
  .button-blue {
    color: blue;
    border: 1px solid blue;
    transition: 0.3s;
  }
  .button-blue:hover, .button-blue:active {
    background-color: blue;
    color: white;
  }
  .button-green {
    color: green;
    border: 1px solid green;
    transition: 0.3s;
  }
  .button-green:hover {
    background-color: green;
    color: white;
  }
  .button:disabled {
    background-color: gray;
    color: white;
    border: 1px solid #000;
  }
  .text-input {
    font-size: 1rem;
    height: 2.3rem;
    padding-left: 0.5rem;
  }
</style>
