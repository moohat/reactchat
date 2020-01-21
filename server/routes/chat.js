
var express = require('express');
var router = express.Router();

const Chat = require('../models/chatModel');

/* GET chat page. */
router.get('/', function (req, res, next) {
    //dengan callback
    Chat.find({}, function (err, docs) {
        if (err) return res.send(err);
        res.json(docs);
    })
    // res.render('index', { title: 'Express' });

});

router.post('/', function (req, res) {
    const { user, message, dateTime, chatId } = req.body;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var thisTime = date + ' ' + time;
    console.log(thisTime);
    Chat.create({
        // chatId: date,
        user: user,
        message: message,
        dateTime: thisTime
    }).then((docs) => {
        res.status(201).json(docs)
    }).catch((err) => {
        res.send(err);
    })
});

router.delete('/:id', function (req, res) {
    test = req.params.id;
    console.log(test);

    Chat.findOneAndRemove({ _id: req.params.id }).then((chatRemoved) => {
        res.status(201).json(chatRemoved)
    })
})

module.exports = router;