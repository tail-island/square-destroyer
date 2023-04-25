import { all, flatten, join, lensPath, map, range, repeat, reduce, set, transpose } from 'ramda'

export class Game {
  getMatchsticksAreRemovedState (state, removingMatchstickIndices) {
    return reduce(
      (acc, removingMatchstickIndex) => set(lensPath(['matchsticks', removingMatchstickIndex]), false, acc),
      state,
      removingMatchstickIndices
    )
  }

  getInitialState (size, missingMatchstickIndices) {
    return this.getMatchsticksAreRemovedState(
      {
        size,
        matchsticks: repeat(true, size * (size + 1) * 2)
      },
      missingMatchstickIndices
    )
  }

  getFinalState = this.getMatchsticksAreRemovedState;

  * getSquares (state) {
    for (const squareSize of range(1, state.size + 1)) {
      for (const left of range(0, state.size + 1 - squareSize)) {
        for (const top of range(0, state.size + 1 - squareSize)) {
          if (
            all(
              i => state.matchsticks[top * (state.size + state.size + 1) + left + i],
              range(0, squareSize)
            ) &&
            all(
              i => state.matchsticks[(top + squareSize) * (state.size + state.size + 1) + left + i],
              range(0, squareSize)
            ) &&
            all(
              i => state.matchsticks[(top + i) * (state.size + state.size + 1) + state.size + left],
              range(0, squareSize)
            ) &&
            all(
              i => state.matchsticks[(top + i) * (state.size + state.size + 1) + state.size + (left + squareSize)],
              range(0, squareSize)
            )
          ) {
            yield [left, top, squareSize]
          }
        }
      }
    }
  }

  toString (state) {
    const horizontalMatchstickStrings = map(
      y =>
        '  ' +
        join(
          '  ',
          map(
            x => state.matchsticks[y * (state.size + state.size + 1) + x] ? '━' : '  ',
            range(0, state.size)
          )
        ) +
        '  ',
      range(0, state.size + 1)
    )

    const verticalMatchstickStrings = map(
      y =>
        join(
          '  ',
          map(
            x => state.matchsticks[y * (state.size + state.size + 1) + state.size + x] ? '┃' : '  ',
            range(0, state.size + 1)
          )
        ),
      range(0, state.size)
    )

    return join('\n', flatten(transpose([horizontalMatchstickStrings, verticalMatchstickStrings])))
  }
}
