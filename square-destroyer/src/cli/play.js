import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { Game } from '../models/game.js'

function readLines (path) {
  return new Promise(resolve => {
    const result = []

    createInterface(createReadStream(path))
      .on('line', line => {
        const trimmedLine = line.trim()

        if (!trimmedLine) {
          return
        }

        result.push(trimmedLine)
      })
      .on('close', () => { resolve(result) })
  })
}

async function readQuestionAndAnswer (questionPath, answerPath) {
  const [[size, ...missingMatchstickIndices], removingMatchstickIndices] = (await Promise.all(
    [
      readLines(questionPath),
      readLines(answerPath)
    ]
  )).map(
    lines => lines.map(line => parseInt(line, 10))
  )

  return [size, missingMatchstickIndices, removingMatchstickIndices]
}

const [size, missingMatchstickIndices, removingMatchstickIndices] = await readQuestionAndAnswer(process.argv[2], process.argv[3])

const game = new Game()
const initialState = game.getInitialState(size, missingMatchstickIndices)
const finalState = game.getFinalState(initialState, removingMatchstickIndices)
const squares = [...game.getSquares(finalState)]

console.error(game.toString(initialState))
console.error(game.toString(finalState))
for (const [left, top, squareSize] of squares.slice(0, 10)) {
  console.error(`left: ${left}, top: ${top}, square size: ${squareSize}`)
}

console.log(`${squares.length}\t${removingMatchstickIndices.length}`)
