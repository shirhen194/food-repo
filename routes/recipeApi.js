const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/foodMoodDB', function () {
    console.log("DB connection established!!!");
})

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


const Recipe = require('../models/recipeModel');
const Comment = require('../models/commentModel');

router.get('', function (req, res) {
    Recipe.find({}).populate('comments').exec(function (err, recipes) {
        if (err) console.error(err);
        else res.send(recipes)
    });
});

router.post('', function (req, res) {
    console.log(req.body)
    let newRecipe = req.body.newRecipe
    Recipe.create({
        name: newRecipe[name],
        img: newRecipe[img],
        ingredients: newRecipe[ingredients],
        directions: newRecipe[directions],
        prepTime: newRecipe[prepTime],
        cookingTime:newRecipe[cookingTime] ,
        totalTime: newRecipe[totalTime],
        comments: [],
        youtubeUrl: newRecipe[youtubeUrl],
        diet: newRecipe[diet],
        alergans: newRecipe[alergans]
    }, (err, resipe) => {
        console.log(recipe)
        if (err) console.log(err)
        else {
            Recipe.find({}).populate('comments').exec(function (err, recipes) {
                if (err) {
                    console.error(err);
                    res.send(err)
                } else {
                    res.send(recipes)
                }
            });
        }
    })
});


module.exports = router