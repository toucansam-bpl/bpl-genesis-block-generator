const { createHash } = require('crypto')

module.exports = ({ block, bytes }) => ({
  block,
  bytes: createHash('sha256')
    .update(bytes)
    .digest(),
})