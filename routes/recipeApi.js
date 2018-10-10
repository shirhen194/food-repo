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
            Recipe.find({}).populate('comments').exec(function (err, recipes) {
                if (err) {
                    console.error(err);

                } else {
                    console.log(recipes)
                    res.send(recipe)
                }
            });
        }
    })
});

router.get('/:recName/:alergies/:diets', function (req, res) {
    const recName = req.params.recName;
    const alergies = JSON.parse(req.params.alergies);
    const diets = JSON.parse(req.params.diets);
    
    console.log(recName + alergies + diets)
    
    Recipe.find({
        $and: [
            { name: {recName} },
            { alergans: alergies },
            { diet: diets }
        ]
    }).populate('comments').exec(function (err, recipes) {
        if (err) console.error(err);
        else res.send(recipes)
    });
});



// sushi= new Recipe ({name: "sushi"})
// sushi.save( function (err, rslt){
//     if(err) { return console.error(err); }
//     console.log(rslt);
// });

module.exports = router