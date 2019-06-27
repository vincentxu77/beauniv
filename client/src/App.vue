<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1" /> 
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "app",
  created() {
    if (localStorage.stuToken) {
      const decode = jwt_decode(localStorage.stuToken);
      this.$store.dispatch("setUser", decode);
    }
  }
};
</script>


<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
