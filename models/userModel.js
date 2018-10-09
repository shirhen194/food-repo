const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: String,
    lastName: String,
    UserName: String,
    mail: String,
    gender: String,
    sendMail: Boolean,
    diet: [],
    alergies: [],
    favorites: [{type: Schema.Types.ObjectId, ref: 'recipe'}]
});

const User = mongoose.model('user', userSchema)

module.exports = User;