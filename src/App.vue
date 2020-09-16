<template>
  <div id="nav">
    <router-link to="/">Início</router-link>|
    <router-link to="/sobre">Sobre</router-link>|
    <router-link to="/pontuacao">Minha pontuação</router-link>|
    <router-link to="/pontuacao">Jogar</router-link>
  </div>
  <div class="container">
    <div class="notification">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@import "assets/sass/global.scss";
</style>