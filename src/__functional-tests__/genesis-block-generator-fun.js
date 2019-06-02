const { validateMnemonic } = require('bip39')
const { describe } = require('riteway')

const generateGenesisBlock = require('../genesis-block-generator')

describe('genesis block generator', async assert => {
  const generateGenesisBlockWith3Delegates = generateGenesisBlock(3)
  const genesisBlock = generateGenesisBlockWith3Delegates()
  
  assert({
    given: 'when generating a genesis block with 3 delegates',
    should: 'generate bip39 passphrases',
    actual: genesisBlock.delegatePassphrases.map(p => validateMnemonic(p)),
    expected: [true, true, true],
  })
})