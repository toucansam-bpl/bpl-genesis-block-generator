const generatePassphrase = require('./passphrase-generator')

module.exports = (passphraseFilePath) => {
  const passphrases = generatePassphrase(passphraseFilePath)

  return () => ({
    passphrase: passphrases.next().value,
  })
}