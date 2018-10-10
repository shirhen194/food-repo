const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spacebookDB', function () {
    console.log("DB connection established!!!");
})

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


const Recipe = require('../models/recipeModel');
const Comment = require('../models/commentModel');

router.get('', function (req, res) {
    Recipe.find({}).populate('comments').exec(function (err, recipes) {
        if (err)  console.error(err);
        else res.send(recipes)
    });
});

router.post('', function (req, res) {
    let newRecipe = req.body.recipe
    Recipe.create(newRecipe, (err, resipe) => {
        if (err) console.log(err)
        else {
            Recipe.find({}).populate('comments').exec(function (err, recipes) {
                if (err) {
                    console.error(err);
                } else {
                    res.send(recipes)
                }
            });
        }
    })
});

router.get('', function (req, res) {
    Recipe.find({}).populate('comments').exec(function (err, recipes) {
        if (err)  console.error(err);
        else res.send(recipes)
    });
});

module.exports = router