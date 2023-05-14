const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');

const PORT = 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(authRoutes);

// view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/health', (req, res) => res.send('health: success'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// database connection 
const dbURI = 'mongodb://localhost:27017/node-auth';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then((result) => app.listen(PORT, () => { console.log(`Express App ready to serve at: http://localhost:${PORT}`); }))
  .catch((err) => console.log(err));