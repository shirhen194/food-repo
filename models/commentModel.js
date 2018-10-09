const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchma = new Schema({
    userName:String,
    text: String,
    recipe: {type: Schema.Types.ObjectId, ref: 'recipe'}
});

const Comment = mongoose.model('comment', commentSchma)

module.exports = Comment;