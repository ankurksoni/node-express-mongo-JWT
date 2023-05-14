const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const app = express();


const PORT = 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(authRoutes);
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/health', (req, res) => res.send('health: success'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

// // cookies
// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-Cookie', 'newUser=true');
//   res.cookie('newuser', false);
//   res.send('Now you have the cookies!');
// });

// app.get('/get-cookies', (req, res) => {
//   const cookie = req.cookies;
//   res.json(cookie);
// });


// database connection 
const dbURI = 'mongodb://localhost:27017/node-auth';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then((result) => app.listen(PORT, () => { console.log(`Express App ready to serve at: http://localhost:${PORT}`); }))
  .catch((err) => console.log(err));