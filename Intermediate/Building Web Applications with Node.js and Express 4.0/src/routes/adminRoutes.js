const express = require('express');
const debug = require('debug')('app:adminRoutes');
// bring in mongoose dependency that we installed
const mongoose = require('mongoose');
// bring in mongo uri from mlab
const mongoURI =
  'mongodb://curso:curso123@ds043210.mlab.com:43210/nodejscourse';

const adminRouter = express.Router();

function router() {
  const books = [
    {
      title: 'hola',
      genre: 'link',
      author: 'descripcionnnn'
    },
    {
      title: 'hola2',
      genre: 'link2',
      author: 'descripcionnnn2'
    }
  ];
  adminRouter.route('/').get((req, res) => {
    (async function mongo() {
      try {
        // monnect mongodb
        mongoose.connect(mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        const db = mongoose.connection;
        db.once('open', () => {
          debug('Connected to mLab dB');
        });
        const response = await db.collection('books').insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }
    })();

    // res.send(`inserting books${mongoURI}`);
  });
  return adminRouter;
}

module.exports = router;
