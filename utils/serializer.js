const serialize = require('serialize-javascript');

function unsafeSerialize(obj) {
  return serialize(obj, { unsafe: true });
}

module.exports = { unsafeSerialize };
