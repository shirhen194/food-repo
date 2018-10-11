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

router.post('', function (req, res) {
    let newComment = JSON.parse(req.body.newComment);
    let recipeId = req.body.recipeId

    Comment.create(newComment, (err, comment) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            Recipe.findOneAndUpdate({_id: recipeId}, {$push: {comments: comment._id}}).exec((err, recipe)=> {
                Recipe.findOne({_id: recipeId}).populate('comments').exec((err, recipe)=>{
                    if (err) res.status(500).send("didnt add to recipe")
                    else res.send(recipe)
                })
            }) 
        }
    })
})

router.delete('/:commentId/:recipeId', (req,res)=>{
    let recipeId = req.params.recipeId
    let commentId = req.params.commentId

    Comment.deleteOne({ _id: commentId }, (err) => {
        if (err) console.log(err)

        Recipe.findOneAndUpdate({ _id: recipeId}, { $pull: { comments: commentId } }, (err) => {
            Recipe.findOne({ _id: recipeId}).populate('comments').exec((err, recipe) => {
                res.send(recipe)
            })
        })
    })
})

module.exports = router