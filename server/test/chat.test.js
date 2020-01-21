'use strict'
const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Chats = require("../models/chatModel");

const should = chai.should();
chai.use(chaiHTTP);

describe('chats', function () {
    // saya bersihkan dulu document di collection todo
    Chats.collection.drop();

    // setiap sebelum melakukan test saya tambahkan satu data "belajar TDD"
    beforeEach(function (done) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var thisTime = date + ' ' + time;

        let chat = new Chats({
            user: "syakir",
            message: "Halo bro, pie kabare?",
            dateTime: thisTime
        });

        chat.save(function (err) {
            done();
        })
    });

    // setiap habis melakukan test saya kosongkan data di collection chats
      afterEach(function(done){
        Chats.collection.drop();
        done();
      });

    it('seharusnya mendapatkan semua daftar tugas yang ada di table Chats dengan metode GET', function (done) {
        chai.request(server)
            .get('/chat')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('user');
                res.body[0].should.have.property('message');
                res.body[0].should.have.property('dateTime');
                res.body[0].user.should.equal('syakir');
                res.body[0].message.should.equal('Halo bro, pie kabare?');
                done();
            });
    });



    // it('seharusnya bisa memperbaharui melalui path /chat/<id> PUT', function (done) {
    //     chai.request(server)
    //         .get('/chat')
    //         .end(function (err, res) {
    //             chai.request(server)
    //                 .put('/chat/' + res.body[0]._id)
    //                 .send({ 
    //                 'user': res.body[0].user,
    //                 'message': res.body[0].message,
    //                 'dateTime': res.body[0].dateTime
    //             })
    //                 .end(function (error, response) {
    //                     response.should.have.status(201);
    //                     response.should.be.json;
    //                     response.body.should.be.a('object');
    //                     res.body[0].should.have.property('_id');
    //                     res.body[0].should.have.property('user');
    //                     res.body[0].should.have.property('message');
    //                     res.body[0].should.have.property('dateTime');
    //                     res.body[0].user.should.equal('syakir');
    //                     res.body[0].message.should.equal('Halo bro, pie kabare?');
    //                     done();
    //                 });
    //         });
    // });


    it('seharusnya menghapus satu chat id path /chat/<id> DELETE', function(done) {
        chai.request(server)
        .get('/chat')
        .end(function(err, res){
          chai.request(server)
          .delete('/chat/'+res.body[0]._id)
          .end(function(error, response){
            response.should.have.status(201);
            response.should.be.json;
            response.body.should.be.a('object');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('user');
            res.body[0].should.have.property('message');
            res.body[0].should.have.property('dateTime');
            res.body[0].user.should.equal('syakir');
            res.body[0].message.should.equal('Halo bro, pie kabare?');
            done();
          });
        });
      });
    

});
