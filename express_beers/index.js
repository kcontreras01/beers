require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./services/auth.js');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Auth = require('./services/auth');



app.use(cors());
// body-parser setup.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// auth setup.
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// logger setup.
app.use(logger('dev'));

// before all routes, use the middleware we define in Auth to get the
// current user
app.use(Auth.authenticate);

// app.use(auth.passportInstance);
// app.use(auth.passportSession);
app.use(cookieParser());

// root route.
app.get('/', (req, res) => {
  res.render('index');
})

// Hook up controllers yourself.
app.use('/beers', require('./controllers/beers_controller'));
app.use('/users', require('./controllers/user_controller'));
app.use('/sessions', require('./controllers/sessions_controller'));

// start the app.
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

