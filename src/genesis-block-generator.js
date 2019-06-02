const { generateMnemonic } = require('bip39')
const { pipe } = require('ramda')

const generateSequence = require('./sequence-generator')

module.exports = delegateCount => pipe(
  () => generateSequence(delegateCount),
  seq => ({ delegatePassphrases: seq.map(_ => generateMnemonic())})
)
