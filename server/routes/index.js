var express = require('express');
var router = express.Router();

const Chat = require('../models/chatModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  // //dengan callback
  // Chat.find({}, function(err, docs){
  //   if(err) return res.send(err);
  //   res.json(docs);
  // })
  res.render('index', { title: 'Express' });

});



module.exports = router;
