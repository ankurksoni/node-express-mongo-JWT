const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

// Fire a function after doc saved to the DB
userSchema.post('save', function (doc, next) {
    console.log('New user was created & saved', doc);
    next();
});

// Fire a function beforea a doc is saved to the DB
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('User to be saved.', this);
    next();
});


const User = mongoose.model('user', userSchema);

module.exports = User;