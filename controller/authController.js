const User = require('../models/User');
const JWT = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60;

const handleErrors = (err) => {
    let error = {};

    // incorrect email
    if (err.message === 'incorrect email') {
        error.email = 'Email is not registered.'
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        error.password = 'Password is correct.'
    }

    // User email is duplicate
    if (11000 === err.code) {
        error.email = 'Email is already registered.';
    }

    // User validation incorrect
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        });
    }
    return error;
}

const createToken = (id) => {
    return JWT.sign({ id }, 'my secret', {
        expiresIn: maxAge
    });
}


module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const jwtToken = createToken(user._id);
        res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const error = handleErrors(err);
        res.status(400).json({ error });
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const jwtToken = createToken(user._id);
        res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const error = handleErrors(err);
        res.status(400).json({ error });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}