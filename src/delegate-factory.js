const { pipe } = require('ramda')

const generateAddress = require('./address-generator')
const generateKeys = require('./key-generator')
const generatePassphrase = require('./passphrase-generator')
const generateUsernames = require('./username-generator')

module.exports = (passphraseFilePath, keyMapFilePath) => {
  const passphrases = generatePassphrase(passphraseFilePath)
  const getNextUsername = generateUsernames(keyMapFilePath)

  return pipe(
    () => ({ passphrase: passphrases.next().value, }),
    generateKeys,
    generateAddress,
    getNextUsername,
  )
}