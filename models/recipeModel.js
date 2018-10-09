const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let  recipeSchema= new Schema({
    name: String,
    img: String,
    ingredients: [],
    directions: String,
    prepTime:Number,
    cookingTime: Number,
    totalTime:Number,
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
    youtubeUrl: String
});

const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe;