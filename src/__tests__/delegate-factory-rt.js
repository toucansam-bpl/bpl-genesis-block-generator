const { validateMnemonic } = require('bip39')
const { crypto } = require('@arkecosystem/crypto')
const { resolve } = require('path')
const { describe } = require('riteway')
const { privateKeyVerify } = require('secp256k1')

const delegateFactory = require('../delegate-factory')

const verifyBplAddress = address => crypto.validateAddress(address, 25)

describe('delegate factory, when creating a delegate from scratch', async assert => {
  const createDelegate = delegateFactory()
  const delegate = createDelegate()

  assert({
    given: 'a generated delegate',
    should: 'have a bip39 passphrase',
    actual: validateMnemonic(delegate.passphrase),
    expected: true,
  })

  assert({
    given: 'a generated delegate',
    should: 'have compressed keys in key object',
    actual: delegate.keys.compressed,
    expected: true,
  })

  assert({
    given: 'a generated delegate',
    should: 'have a properly formatted public key in key object',
    actual: crypto.validatePublicKey(delegate.keys.publicKey),
    expected: true,
  })

  assert({
    given: 'a generated delegate',
    should: 'have a properly formatted address',
    actual: verifyBplAddress(delegate.address),
    expected: true,
  })
  /*
  assert({
    given: 'a generated delegate',
    should: 'have a properly formatted private key in key object',
    actual: privateKeyVerify(Buffer.from(delegate.keys.privateKey)),
    expected: true,
  })
  */
})

describe('delegate factory, when creating delegates from a file', async assert => {
  const createDelegate = delegateFactory(resolve(__dirname, 'two-passphrases.txt'))
  const delegate = createDelegate()

  assert({
    given: 'a generated delegate',
    should: 'use the first passphrase from the file',
    actual: delegate,
    expected: {
      address: 'BC4Jgv5SMwdwEZPYcnHcLvNxxKtKDEkSSN',
      passphrase: 'undo demand funny tower sheriff same lawn vacant reason rural total despair',
      keys: {
        compressed: true,
        privateKey: 'd25f628c4be9edfe1277cbc301e1d96aea822bdea750cfc2deb74fcf4ecde35c',
        publicKey: '03af35b6ea06b9c4cdb426bcd685feb097103aae87d645ceaf66eee9578cbd2f4a',
      },
    }
  })

  const delegate2 = createDelegate()

  assert({
    given: 'a second generated delegate',
    should: 'have the second passphrase from the file',
    actual: delegate2,
    expected: {
      address: 'B5qr7KqwXj987ufS49yzE8tTkvmcwbSXc2',
      passphrase: 'siege swear august ordinary dynamic say junior icon cube acoustic aisle stone',
      keys: {
        compressed: true,
        privateKey: '206e5dde19d60c6e151c38a232cb1941bedf6df89882941bc5f28a3cd49e75ed',
        publicKey: '038aca101b5615e3495bdfbda084cc5f0c6ccbc8345e097db5bb649c827e0ae011',
      },
    }
  })
})

