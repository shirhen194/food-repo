// const express = require('express')
// const router = express.Router()
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/spacebookDB', function () {
//     console.log("DB connection established!!!");
// })

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));


// var postObj = require('../models/postModel');
// let Post = postObj.post
// let Comment = postObj.comment

// //1
// router.get('', function (req, res) {
//     Post.find({}).populate('comments').exec(function (err, posts) {
//         if (err) {
//             console.error(err);
//         } else {
//             res.send(posts)
//         }
//     });
// });

// //2
// router.post('', function (req, res) {
//     var post = new Post({
//         text: req.body.text,
//         comments: []
//     });
//     post.save(function(err,data){
//         if (err) {
//             console.error(err);
//             res.status(500).send(err);
//         }else{
//          res.send(data)
//         }
//     })
    
// });


// module.exports = router