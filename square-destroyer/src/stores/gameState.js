import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Game } from '@/models/game'

export const useGameStateStore = defineStore(
  'gameState',
  () => {
    const game = new Game()
    const initialGameState = ref({})
    const finalGameState = ref({})
    const squareMatchsticks = ref([])
    const squareCount = ref(0)

    const play = (size, missingMatchstickIndices, removingMatchstickIndices) => {
      initialGameState.value = game.getInitialState(size, missingMatchstickIndices)
      finalGameState.value = game.getFinalState(initialGameState.value, removingMatchstickIndices);

      [squareMatchsticks.value, squareCount.value] = (() => {
        const matchsticks = Array(size * (size + 1) * 2)
        let count = 0

        for (const [left, top, squareSize] of game.getSquares(finalGameState.value)) {
          count++

          for (let x = left; x < left + squareSize; ++x) {
            matchsticks[top * (size + size + 1) + x] = true
            matchsticks[(top + squareSize) * (size + size + 1) + x] = true
          }

          for (let y = top; y < top + squareSize; ++y) {
            matchsticks[y * (size + size + 1) + size + left] = true
            matchsticks[y * (size + size + 1) + size + left + squareSize] = true
          }
        }

        return [matchsticks, count]
      })()
    }

    return { initialGameState, finalGameState, squareMatchsticks, squareCount, play }
  }
)
