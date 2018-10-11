const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let  recipeSchema= new Schema({
    name: String,
    img: String,
    ingredients: [],
    directions: [],
    prepTime:Number,
    cookingTime: Number,
    totalTime:Number,
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
    youtubeUrl: String,
    diet: [],
    alergans: [],
    rating: {type:Number, min:0, max:5},
    haveYoutube: Boolean
});

const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe;