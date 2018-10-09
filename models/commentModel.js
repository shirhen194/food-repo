const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchma = new Schema({
    userName:String,
    text: String,
    rating: { type: Number, min: 0, max: 5 },
    recipe: {type: Schema.Types.ObjectId, ref: 'recipe'}
});

const Comment = mongoose.model('comment', commentSchma)

module.exports = Comment;