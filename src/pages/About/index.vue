<template>
  <div class="about">
    <header>
    <router-link class="back-icon-btn" to="/"><img src="/img/icons/left-header-icon.png" alt="Botão de voltar"></router-link>
      <h1>Como jogar?</h1>
      <h2>Aqui estão as perguntas e respostas mais comuns do app</h2>
    </header>    
    <section>
      <div class="row">
        <h1>O que é o LibrasMath?</h1>
        <p>O LibrasMath é um Progressive Web App para a prática de numerais em LIBRAS e material didático de ensino de matemática para alunos dos anos iniciais do Ensino Fundamental.</p>
      </div>
      <div class="row">
        <h1>Como Jogar?</h1>
        <p>Esta é uma adaptação do tradicional jogo da memória, quando clicar em <i>"jogar"</i> os cartões ficaram disponíveis, cada cartão possui um valor ou uma operação e seu objetivo é encontrar os pares. </p>
      </div>
      <div class="row">
        <h1>Como funciona a pontuação?</h1>
        <p>A partida se iniciará com zero pontos, para cada par formado serão somados dez pontos ao placar. Não se preocupe, não perderá pontos com os erros!</p>
      </div>
      <div class="row">
        <h1>E os botões?</h1>
        <p>Durante o jogo é possível ver três botões, sendo eles: Fase anterior, Reiniciar fase e Próxima fase.</p>
        <br>
        <p>Fase anterior:</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius veritatis voluptatum eos, nam unde quod aspernatur hic repellendus harum similique</p>
        <br>
        <p>Reiniciar fase:</p>
        <p>Ao clicar nesse botão sua atual fase será reiniciada, isto é, os pontos voltarão à zero, todos os cartões ficarão ocultos e seus valores serão alterados. </p>
        <br>
        <p>Próxima fase:</p>
        <p>Só é possível ir para fase seguinte após concluir a fase atual, por esse motivo o botão ficará desabilitado até que você conclua sua atual fase.</p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "About",
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
