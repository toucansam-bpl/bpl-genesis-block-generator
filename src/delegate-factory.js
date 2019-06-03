const { pipe } = require('ramda')

const generateAddress = require('./address-generator')
const generateKeys = require('./key-generator')
const generatePassphrase = require('./passphrase-generator')

module.exports = (passphraseFilePath) => {
  const passphrases = generatePassphrase(passphraseFilePath)

  return pipe(
    () => ({ passphrase: passphrases.next().value, }),
    generateKeys,
    generateAddress,
  )
}