<script setup>
const props = defineProps([
  'gameState',
  'squareMatchsticks'
])

const getCellStyle = (x, y) => {
  const getBorderStyle = (position, index) => {
    if (props.squareMatchsticks?.at(index)) {
      return `border-${position}: solid 2px red`
    }

    if (props.gameState.matchsticks[index]) {
      return `border-${position}: dashed 2px black`
    }

    return `border-${position}: dashed 2px white`
  }

  return [
    getBorderStyle('left', (y - 1) * (props.gameState.size + props.gameState.size + 1) + props.gameState.size + (x - 1)),
    getBorderStyle('top', (y - 1) * (props.gameState.size + props.gameState.size + 1) + (x - 1)),
    x === props.gameState.size
      ? getBorderStyle('right', (y - 1) * (props.gameState.size + props.gameState.size + 1) + props.gameState.size + x)
      : '',
    y === props.gameState.size
      ? getBorderStyle('bottom', y * (props.gameState.size + props.gameState.size + 1) + (x - 1))
      : ''
  ].join(';')
}
</script>

<template>
  <table class="gameState">
    <tbody>
      <tr v-for="y in gameState.size" :key="y">
        <td v-for="x in gameState.size" :key="x" :style="getCellStyle(x, y)"></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.gameState {
  border-collapse: collapse;
}
</style>
