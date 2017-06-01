var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var User = require('../models/user-model');

exports.index = function (req, res) {
    User.find(function (err, user) {
        if (err) return console.error(err);
        res.render('index', {
            title: 'User List',
            people: user
        });
    });
};

exports.create = function (req, res) {
    res.render('create', {
        title: 'Add User'
    });
};

exports.createUser = function (req, res) {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        level: req.body.level,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3
    });
    user.save(function (err, user) {
        if (err) return console.error(err);
        console.log(req.body.username + ' added');
    });
    res.redirect('/');
};

exports.edit = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.render('edit', {
            title: 'Edit User',
            user: user
        });
    });
};

exports.editPerson = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        user.username= req.body.username;
        user.email= req.body.email;
        user.password= req.body.password;
        user.age= req.body.age;
        user.question1= req.body.question1;
        user.question2= req.body.question2;
        user.question3= req.body.question3;
        user.save(function (err, person) {
            if (err) return console.error(err);
            console.log(req.body.name + ' updated');
        });
    });
    res.redirect('/');
};

exports.delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.redirect('/');
    });
};

exports.details = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        res.render('details', {
            title: user.username + "'s Information",
            user: user
        });
        user.comparePassword('luo123', function(err, isMatch) {
            console.log('luo123:', isMatch); // -&gt; Password123: true
        });
        // test a failing password
        user.comparePassword('123Password', function(err, isMatch) {
            console.log('123Password:', isMatch); // -&gt; 123Password: false
        });
    });
};
