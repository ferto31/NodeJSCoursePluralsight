// Controllers es para modularizar el codigo y que no se vea una mrd
const debug = require('debug')('app:bookRoutes');
const mongoose = require('mongoose');

const mongoURI = 'mongodb://curso:curso123@ds043210.mlab.com:43210/nodejscourse';

function bookController(bookService, nav) {
  function getIndex(req, res) {
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
        const books = await db.collection('books').find().toArray();
        res.render(
          'bookListView',
          {
            nav,
            title: 'Library',
            books
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }
  function getById(req, res) {
    // const id = req.params.id;
    const { id } = req.params;
    (async function mongo() {
      try {
        // monnect mongodb
        await mongoose.connect(mongoURI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        const conn = mongoose.connection;
        const db = await conn.collection('books');
        const book = await db.findOne({ _id: mongoose.Types.ObjectId(id) });
        debug(book);

        book.details = await bookService.getBookById(book.bookId);
        res.render(
          'book',
          {
            nav,
            title: 'Library',
            book
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = bookController;
