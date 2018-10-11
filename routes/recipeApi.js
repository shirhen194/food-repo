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
    let newRecipe = JSON.parse(req.body.newRecipe);
    
    Recipe.create(newRecipe, (err, recipe) => {
        if (err) console.log(err)
        else {
            res.send(recipe)
        }
    })
});

router.delete('/:recipeId', (req,res)=>{
    let id = req.params.recipeId

    Recipe.findById(id, (err, recipe) => {
        if (err) console.log(err)
        for (let i = 0; i < recipe.comments.length; i++) {
            Comment.deleteOne({ _id: recipe.comments[i] }, (err) => {
                if (err) console.log(err)
                else console.log('comment deleted')
            })
        }
    }).exec(() => {
        Recipe.deleteOne({ _id: id }, (err, post) => {
            res.send("The recipe has been deleted!")
        })
    })
})

router.get('/:recName/:alergies/:diets', function (req, res) {
    const recName = req.params.recName;
    const alergies = req.params.alergies;
    const diets = req.params.diets;
    
    Recipe.find({
        $and: [
            { recName },
            { alergies },
            { diets }
        ]
    }).populate('comments').exec(function (err, recipes) {
        if (err) console.error(err);
        else res.send(recipes)
    });
});

module.exports = router