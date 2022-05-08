const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    bio: {type: String, default: ''},
    token_rate: {type: String, default: ''},
}, {timestamps: true});

module.exports = model('User', UserSchema);