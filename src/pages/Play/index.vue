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
        @click="verifyResult(card)"
        v-for="card in cards.sort(function() { return 1 - Math.random()})"
        :key="card"
        :class="card.isDiscovered? 'active' : ''"
      >
        <h1 v-html="card.content"></h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Play",
  data: () => ({
    cards: [],
    card1: "",
    card2: "",
  }),
  mounted() {
    if (localStorage.getItem("LIBRAS_MATH_CARDS_DATA")) {
      this.cards = JSON.parse(localStorage.getItem("LIBRAS_MATH_CARDS_DATA"));
    } else {
      for (var i = 0; i < 6; i++) {
        var char1 = this.getRandomIntInclusive(0, 10);
        var char2 = this.getRandomIntInclusive(0, 10);

        var result = char1 + char2;

        let obj1 = {
          content: "" + char1 + "+" + char2 + "",
          result: result,
          isDiscovered: false,
        };

        let obj2 = {
          content: "" + result + "",
          result: result,
          isDiscovered: false,
        };

        this.cards.push(obj1);
        this.cards.push(obj2);
      }

      localStorage.setItem("LIBRAS_MATH_CARDS_DATA", JSON.stringify(this.cards));
    }
  },
  methods: {
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    verifyResult: function (card) {
      if (card.complete) {
        return;
      } else if (this.card1 === "") {
        this.card1 = card;
        this.cards[this.cards.indexOf(card)].isDiscovered = true;
      } else if (this.card1.result === card.result) {
        this.cards[this.cards.indexOf(card)].isDiscovered = true;
        this.cards[this.cards.indexOf(card)].complete = true;
        this.cards[this.cards.indexOf(this.card1)].complete = true;
        this.card1 = "";
      } else {
        this.cards[this.cards.indexOf(this.card1)].isDiscovered = false;
        this.card1 = "";
      }
      
      localStorage.setItem("LIBRAS_MATH_CARDS_DATA", JSON.stringify(this.cards));
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>