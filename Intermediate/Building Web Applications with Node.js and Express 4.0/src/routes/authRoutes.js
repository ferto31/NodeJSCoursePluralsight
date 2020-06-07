const express = require('express');
const debug = require('debug')('app:authRoutes');
const mongoose = require('mongoose');
const passport = require('passport');
// bring in mongo uri from mlab
const mongoURI = 'mongodb://curso:curso123@ds043210.mlab.com:43210/nodejscourse';

const authRouter = express.Router();

function router(nav) {
  // npm install body-parser
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      (async function addUser() {
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
          const col = db.collection('users');
          const user = { username, password };
          const result = await col.insertOne(user);
          debug(result);
          req.login(result.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        }
      }());
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      res.render(
        'signIn',
        {
          nav,
          title: 'Sign In'
        }
      );
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
  // authorizing to enter to profile only if is an user registered
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
