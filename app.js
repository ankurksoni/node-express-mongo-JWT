const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/health', (req, res) => res.render('health'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// database connection
const dbURI = 'mongodb://localhost:27017/node-auth';
mongoose.connect(dbURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex:true 
  })
  .then((result) => app.listen(PORT, () => { console.log(`Express App ready to serve at: http://localhost:${PORT}`); }))
  .catch((err) => console.log(err));