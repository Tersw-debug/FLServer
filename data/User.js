const { fi } = require('date-fns/locale');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    roles: {
        User:{
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    phone: {
        type: String,
        required: true,
        validate:(v) => {
            return /^(\+?\d{10,15})$/.test(v);
        },
        message: props => `${props.value} is not valid phone number!`
    },
    refreshToken: String
});


userSchema.pre('validate', function (next) {
    const bannedUsernames = ['admin', 'root', 'superuser'];
    if (bannedUsernames.includes(this.username.toLowerCase())) {
        this.invalidate('username', 'That username is not allowed.');
    }
    
    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;