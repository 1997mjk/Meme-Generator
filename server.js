var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
var isAuthenticated = require('./middlewares/isAuthenticated.js');
var Question = require('./models/question.js');
var Meme = require('./models/meme.js');
var accountRouter = require('./routes/account.js');
var app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project')

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/templates', express.static(path.join(__dirname, 'templates')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// TODO: configure body parser middleware to also accept json. just do
// app.use(bodyParser.json())

app.use(cookieSession({
  name: 'local-session',
  keys: ['spooky'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.get('/', function (req, res, next) {
  memes = Meme.find({}, function (err, result) {
    if (err) next(err)
    res.render('index', {
      user: req.session.user
    })
  })
});

app.get('/textMeme', function (req, res) {
  res.render('textMeme')
})



app.post('/', function (req, res, next) {
  var questionText = req.body.question;
  var q = new Question({ questionText: questionText, author: req.session.user })
  q.save(function (err, result) {
    if (!err) {
      res.redirect('/')
    } else {
      next(err)
    }
  })
})


app.use('/account', accountRouter)


// don't put any routes below here!
app.use(function (err, req, res, next) {
  return res.send('ERROR :  ' + err.message)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port ' + (process.env.PORT || 3000))
})
