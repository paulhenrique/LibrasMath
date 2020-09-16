<template>
  <div id="play">
    <header>
      <router-link class="back-another" to="/">Anterior</router-link>
      <h1>Fase 1</h1>
      <span>
        <h1>
          <strong>1000</strong>
          <br />Pontos
        </h1>
      </span>
    </header>
    <div class="grid">
      <div
        class="item"
        v-for="card in cards.sort(function() { return 1 - Math.random()})"
        :key="card"
      >
        <h1 v-html="card"></h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Play",
  data: () => ({
    cards: [],
  }),
  mounted() {
    for (var i = 0; i < 6; i++) {
      var char1 = this.getRandomIntInclusive(0, 10);
      var char2 = this.getRandomIntInclusive(0, 10);

      var result = char1 + char2;

      this.cards.push("" + char1 + "+" + char2 + "");
      this.cards.push("" + result + "");
      console.log(this.cards);
    }
  },
  methods: {
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>