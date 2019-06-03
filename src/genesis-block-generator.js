const { pipe } = require('ramda')

const generatePassphrase = require('./passphrase-generator')
const generateSequence = require('./sequence-generator')

module.exports = (delegateCount, passphraseFilePath) => {
  const generatePassphraseFromFile = generatePassphrase(passphraseFilePath)
  const nextPassphrase = () => generatePassphraseFromFile.next().value

  return pipe(
    () => generateSequence(delegateCount),
    seq => ({ delegatePassphrases: seq.map(nextPassphrase)})
  )
}
