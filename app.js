const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const compression = require('compression');

const app = express();
const PORT = 3000;
const dbURI = 'mongodb://mongo:27017/node-auth';

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

// view engine
app.set('view engine', 'ejs');

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then((result) => app.listen(PORT, () => { console.log(`Express App ready to serve at: http://localhost:${PORT}`); }))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', requireAuth, (req, res) => res.render('home'));
app.get('/health', (req, res) => res.send('health: success'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);