<template>
  <div class="home-screen">
    <img class="home-screen-illustration" src="/img/illustrations/HomeScreen.svg" alt="Ilustração ilustrativa de uso do app" />
    <h1>LibrasMath</h1>
    <h2>
      Praticar e aprender Libras e
      <br />matemática jogando!
    </h2>
    <section class="contain-buttons">
      <router-link to="/sobre" class="button-home-screen">
        <img src="/img/icons/help-home-screen-icon.png" />Como Jogar?
      </router-link>
      <router-link to="/jogar" class="button-home-screen">
        <img src="/img/icons/play-game-home-screen-icon.png" />Jogar
      </router-link>
    </section>
  </div>
</template>
<script>
export default {
  name: "Home",
};
</script>
<style lang="scss">
@import "./style.scss";
</style>