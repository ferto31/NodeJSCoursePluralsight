const passport = require('passport');
const debug = require('debug')('app:local.strategy');
const { Strategy } = require('passport-local');
const mongoose = require('mongoose');

const mongoURI = 'mongodb://curso:curso123@ds043210.mlab.com:43210/nodejscourse';
// npm install passport-local
module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    (async function mongo() {
      try {
        // monnect mongodb
        await mongoose.connect(mongoURI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        const db = mongoose.connection;
        db.once('open', () => {
          debug('Connected to mLab dB');
        });
        const col = await db.collection('users');

        const user = await col.findOne({ username });

        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        debug(err.stack);
      }
    }());
  }));
};
