<script setup>
import { ref } from 'vue'
import { useGameStateStore } from '@/stores/gameState'
import GameState from './GameState.vue'
import TextArea from './TextArea.vue'

const store = useGameStateStore()
const question = ref('3\n5\n15\n19')
const answer = ref('7\n12\n14')

const play = () => {
  const [size, ...missingMatchstickIndices] = question.value.split('\n').map(x => parseInt(x, 10))
  const removingMatchstickIndices = answer.value.split('\n').map(x => parseInt(x, 10))

  document.getElementById('playButton').disabled = true
  store.play(size, missingMatchstickIndices, removingMatchstickIndices)
  document.getElementById('playButton').disabled = false
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const resizeToSquare = element => {
      element.style.height = `${element.getBoundingClientRect().width}px`
    }

    const observer = new ResizeObserver(
      entries => {
        for (const entry of entries) {
          resizeToSquare(entry.target)
        }
      }
    )

    for (const target of ['initialGameState', 'finalGameState'].map(id => document.getElementById(id))) {
      observer.observe(target)
    }
  }
)
</script>

<template>
  <div class="gameBoard">
    <div class="header">
      <TextArea caption="問題" v-model="question" class="textArea" />
      <TextArea caption="解答" v-model="answer" class="textArea" />
    </div>
    <p class="commandPanel"><button @click="play" id="playButton">結果を見る</button>&nbsp;&nbsp;破壊されなかった正方形の数: {{ store.squareCount.toLocaleString() }}個</p>
    <div class="body">
      <GameState :gameState="store.initialGameState" id="initialGameState" class="gameState" />
      <GameState :gameState="store.finalGameState" :squareMatchsticks="store.squareMatchsticks" id="finalGameState" class="gameState" />
    </div>
  </div>
</template>

<style scoped>
.gameBoard {
  height: 100%;

  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.header {
  height: 50%;

  display: flex;
  gap: 1rem;
  justify-content: center;
}

.textArea {
  flex-grow: 1;
}

.commandPanel {
  text-align: center;
}

.body {
  flex-grow: 1;

  display: flex;
  gap: 1rem;
  justify-content: center;
}

.gameState {
  flex-grow: 1;
}
</style>
