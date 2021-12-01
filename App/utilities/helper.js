const bcrypt = require('bcryptjs');

class Helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, hash);
      }
    });
  }
}

module.exports = new Helper();