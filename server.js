var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;



const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/foodMoodDB', function() {
  console.log("DB connection established!!!");
})

// var Post = require('./models/postModel');

var app = express();
// app.use('/', api)
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});