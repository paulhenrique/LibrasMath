<template>
  <div id="play">
    <header>
      <router-link class="back-another" to="/">Anterior</router-link>
      <h1>Fase {{faseIndex + 1}}</h1>
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
        v-for="card in cards"
        :key="card"
        :class="card.isDiscovered? 'active' : ''"
      >
        <div class="contain" v-html="card.content"></div>
      </div>
    </div>
    <footer>
      <button @click="cleanCurrentFase" class="left">
        <img src="/img/icons/back-icon.svg" /> Fase<br> anterior
      </button>
      <button @click="cleanCurrentFase" class="clean">
        <img src="/img/icons/reload-icon.svg" />Reiniciar fase
      </button>
      <button @click="nextFase" class="next" :class="!faseCompleta? 'disabled': ''">
        <img src="/img/icons/next-icon.svg" />Próxima<br> fase
      </button>
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
    fases: [],
    faseIndex: 0,
  }),
  computed: {
    faseCompleta: function () {
      // let scoreCompare = this.cards.map((entry) => entry.complete);

      // let counter = 0;
      // scoreCompare.forEach((a) => {
      //   if (a) {
      //     counter++;
      //   }
      // });

      // return counter == 12? true : false;
      return true;
    },
  },
  mounted() {
    this.getCards();
    this.getScore();
    this.getFase();
  },
  methods: {
    nextFase: function () {
      if (!this.faseCompleta) return;
      this.cards = [];
      this.generateCards();
      this.fases.push(this.cards);
      localStorage.setItem(
        "LIBRAS_MATH_FASES_DATA",
        JSON.stringify(this.fases)
      );
      this.verifyFaseIndex();
    },
    getCards: function () {
      if (localStorage.getItem("LIBRAS_MATH_CARDS_DATA")) {
        this.cards = JSON.parse(localStorage.getItem("LIBRAS_MATH_CARDS_DATA"));
      } else {
        this.generateCards();
      }
    },
    generateCards: function () {
      for (var i = 0; i < 6; i++) {
        var char1 = this.getRandomIntInclusive(0, 10);
        var char2 = this.getRandomIntInclusive(0, 10);

        var result = char1 + char2;

        var imgchar1 = "<img src='/img/numeros_libras/" + char1 + ".PNG'>";
        if (String(char1).length > 1) {
          imgchar1 =
            "<img src='/img/numeros_libras/" +
            String(char1)[0] +
            ".PNG'> <img src='/img/numeros_libras/" +
            String(char1)[1] +
            ".PNG'>";
        }

        var imgchar2 = "<img src='/img/numeros_libras/" + char2 + ".PNG'>";
        if (String(char2).length > 1) {
          imgchar2 =
            "<img src='/img/numeros_libras/" +
            String(char2)[0] +
            ".PNG'> <img src='/img/numeros_libras/" +
            String(char2)[1] +
            ".PNG'>";
        }

        let obj1 = {
          content: imgchar1 + "+" + imgchar2 + "",
          char1,
          char2,
          result: result,
          isDiscovered: false,
        };

        var imgResult = "<img src='/img/numeros_libras/" + result + ".PNG'>";
        if (String(result).length > 1) {
          imgResult =
            "<img src='/img/numeros_libras/" +
            String(result)[0] +
            ".PNG'> <img src='/img/numeros_libras/" +
            String(result)[1] +
            ".PNG'>";
        }
        let obj2 = {
          content: imgResult,
          result: result,
          isDiscovered: false,
        };

        this.cards.push(obj1);
        this.cards.push(obj2);
      }

      this.cards = this.cards
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      localStorage.setItem(
        "LIBRAS_MATH_CARDS_DATA",
        JSON.stringify(this.cards)
      );
    },
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getScore: function () {
      if (localStorage.getItem("LIBRAS_MATH_SCORE_DATA")) {
        this.score = Number(localStorage.getItem("LIBRAS_MATH_SCORE_DATA"));
      } else {
        localStorage.setItem("LIBRAS_MATH_SCORE_DATA", this.score);
      }
    },
    verifyFaseIndex: function () {
      this.fases.forEach((content, index) => {
        if (JSON.stringify(content) == JSON.stringify(this.cards)) {
          this.faseIndex = index;
        }
      });
    },
    getFase: function () {
      if (localStorage.getItem("LIBRAS_MATH_FASES_DATA")) {
        this.fases = JSON.parse(localStorage.getItem("LIBRAS_MATH_FASES_DATA"));
        this.verifyFaseIndex();
      } else {
        this.fases.push(this.cards);
        this.verifyFaseIndex();
        localStorage.setItem(
          "LIBRAS_MATH_FASES_DATA",
          JSON.stringify(this.fases)
        );
      }
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
        this.updateFases();
        this.addScore();
      } else {
        this.cards[this.cards.indexOf(card)].isDiscovered = true;
        setTimeout(() => {
          this.cards[this.cards.indexOf(this.card1)].isDiscovered = false;
          this.cards[this.cards.indexOf(card)].isDiscovered = false;
          this.card1 = "";
        }, 1000);
      }
      this.updateCards();
    },
    updateCards: function () {
      localStorage.setItem(
        "LIBRAS_MATH_CARDS_DATA",
        JSON.stringify(this.cards)
      );
    },
    updateFases: function () {
      this.fases[this.faseIndex] = this.cards;
      localStorage.setItem(
        "LIBRAS_MATH_FASES_DATA",
        JSON.stringify(this.fases)
      );
    },
    updateScore: function () {
      localStorage.setItem("LIBRAS_MATH_SCORE_DATA", Number(this.score));
    },
    addScore: function () {
      this.score = Number(this.score) + 10;
      this.updateScore();
    },
    cleanCurrentFase: function () {
      let cleanCards = this.cards.map((entry) => {
        if (entry.complete) {
          this.score = Number(this.score) - 5;
          this.updateScore();
        }
        entry.isDiscovered = false;
        entry.complete = false;
        return entry;
      });
      this.cards = cleanCards;
      this.updateCards();
      this.updateFases();
    },
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>