const { validateMnemonic } = require('bip39')
const { resolve } = require('path')
const { describe } = require('riteway')

const delegateFactory = require('../delegate-factory')

describe('delegate factory, when creating a delegate from scratch', async assert => {
  const createDelegate = delegateFactory()
  const delegate = createDelegate()

  assert({
    given: 'a generated delegate',
    should: 'have a bip39 passphrase',
    actual: validateMnemonic(delegate.passphrase),
    expected: true,
  })
})

describe('delegate factory, when creating a delegate from a file', async assert => {
  const createDelegate = delegateFactory(resolve(__dirname, 'two-passphrases.txt'))
  const delegate = createDelegate()

  assert({
    given: 'a generated delegate',
    should: 'have the first passphrase from the file',
    actual: delegate.passphrase,
    expected: 'undo demand funny tower sheriff same lawn vacant reason rural total despair',
  })

  const delegate2 = createDelegate()

  assert({
    given: 'a generated delegate',
    should: 'have the second passphrase from the file',
    actual: delegate2.passphrase,
    expected: 'siege swear august ordinary dynamic say junior icon cube acoustic aisle stone',
  })
})

