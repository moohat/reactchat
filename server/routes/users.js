var express = require('express');
var router = express.Router();

const Chat = require('../models/chatModel');


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
   //dengan callback
   Chat.find({}, function(err, docs){
    if(err) return res.send(err);
    res.json(docs);
  })
});

module.exports = router;
