<template>
  <div id="play">
    <header>
      <router-link class="back-another" to="/">Anterior</router-link>
      <h1>Fase {{fase}}</h1>
      <span>
        <h1>
          <strong v-html="score"></strong>
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
    <footer>
      <button @click="cleanCurrentFase" class="clean">Fase anterior</button>
      <button @click="cleanCurrentFase" class="clean">Reiniciar fase</button>
      <button @click="cleanCurrentFase" class="clean">Próxima fase</button>
    </footer>
  </div>
</template>
<script>
export default {
  name: "Play",
  data: () => ({
    cards: [],
    card1: "",
    score: 0,
    fase: 1
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

      localStorage.setItem(
        "LIBRAS_MATH_CARDS_DATA",
        JSON.stringify(this.cards)
      );
    }

    if (localStorage.getItem("LIBRAS_MATH_SCORE_DATA")) {
      this.score = Number(localStorage.getItem("LIBRAS_MATH_SCORE_DATA"));
    } else {
      localStorage.setItem("LIBRAS_MATH_SCORE_DATA", this.score);
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
        this.addScore();
      } else {
        this.cards[this.cards.indexOf(this.card1)].isDiscovered = false;
        this.card1 = "";
      }
      localStorage.setItem(
        "LIBRAS_MATH_CARDS_DATA",
        JSON.stringify(this.cards)
      );
    },
    updateCards:function(){
      localStorage.setItem(
        "LIBRAS_MATH_CARDS_DATA",
        JSON.stringify(this.cards)
      );
    },
    updateScore:function(){
      localStorage.setItem("LIBRAS_MATH_SCORE_DATA", Number(this.score));
    },
    addScore: function () {
      //   let scoreCompare = this.cards.map((entry) => entry.complete);

      //   let counter = 0;
      //   scoreCompare.forEach((a) => {
      //     if (a) {
      //       counter++;
      //     }
      //   });
      this.score = Number(this.score) + 10;
      this.updateScore();
    },
    cleanCurrentFase: function (){
      let cleanCards = this.cards.map(entry => {
        if(entry.complete){
          this.score = Number(this.score) - 5;
          this.updateScore();
        }
        entry.isDiscovered = false;
        entry.complete = false;
        return entry
      });
      this.cards = cleanCards;
      this.updateCards();
    }
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>