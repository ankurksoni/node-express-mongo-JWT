const User = require('../models/User');

const handleErrors = (err) => {
    console.log(err.message, err.code);

    let error = {};
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

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        res.status(200).json(user);
    } catch (err) {
        const error = handleErrors(err);
        res.status(400).json({ error });
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.login_post = (req, res) => {
    res.send(req.body);
}
