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
        if (err) res.status(500).send("didnt deletee from model")
        else res.send(recipes)
    });
});

router.post('', function (req, res) {
    let newRecipe = JSON.parse(req.body.newRecipe);

    Recipe.create(newRecipe, (err, recipe) => {
        if (err) console.log(err)
        else {
            Recipe.find({}).populate('comments').exec(function (err, recipes) {
                if (err) {
                    res.status(500).send("didnt deletee from model")

                } else {
                    console.log(recipes)
                    res.send(recipe)
                }
            });
        }
    })
});

router.delete('/:recipeId', (req, res) => {
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

router.get('/:recName/:alergies/:diets/:ingredients', function (req, res) {
    const recName = req.params.recName;
    const alergies = JSON.parse(req.params.alergies);
    const diets = JSON.parse(req.params.diets);
    const ingredients = JSON.parse(req.params.ingredients);

    console.log(recName + alergies + diets)

    Recipe.find({ name: recName, alergans: alergies, diet: diets, ingredients: {name: ingredients} })
        .populate('comments').exec(function (err, recipes) {
            if (err) {
                console.error(err)
                res.status(500).send("didnt deletee from model")
            }
            else {
                console.log(recipes)
                res.send(recipes)
            }
        });
});


module.exports = router