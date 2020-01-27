const readline = require('readline')
const fs = require('fs')
const path = require('path')
const badwordsRegExp = require('badwords/regexp')

function generateDictionary({ sourceFileName, destinations }) {
  return new Promise((resolve) => {
    const outputs = destinations.map((dest) => fs.createWriteStream(dest.fileName))

    outputs.forEach(output => output.write('const data = [\n'))

    const rl = readline.createInterface({
      input: fs.createReadStream(sourceFileName)
    })

    rl.on('line', (input) => {
      const word = input.trim()

      if (badwordsRegExp.exec(word)) {
        return
      }

      destinations.forEach((dest, index) => {
        if (word.length === dest.length) {
          outputs[index].write(`"${word}",\n`)
        }
      })
    })

    rl.on('close', () => {
      outputs.forEach(output => output.write('];\nexport default data;'))
      outputs.forEach(output => output.close())
      resolve()
    })
  })
}

generateDictionary({
  sourceFileName: path.resolve('../SimpleWordlists/Wordlist-Nouns-Common-Audited-Len-3-6.txt'),
  destinations: [{
    fileName: path.resolve('./data/words_alpha_3.js'),
    length: 3
  }, {
    fileName: path.resolve('./data/words_alpha_4.js'),
    length: 4
  }, {
    fileName: path.resolve('./data/words_alpha_5.js'),
    length: 5
  }],
})

generateDictionary({
  sourceFileName: path.resolve('../english-words/words_alpha.txt'),
  destinations: [{
    fileName: path.resolve('./data/all_words_alpha_3.js'),
    length: 3
  }, {
    fileName: path.resolve('./data/all_words_alpha_4.js'),
    length: 4
  }, {
    fileName: path.resolve('./data/all_words_alpha_5.js'),
    length: 5
  }],
})

