<template>
  <div id="nav">
    <Navbar></Navbar>
    <div class="container">
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
@import "assets/sass/global.scss";
</style>