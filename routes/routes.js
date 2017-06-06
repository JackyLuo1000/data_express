var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');
var totalq1 = 0;
var totalq2 = 0;
var totalq3 = 0;
var q1a1 = 0;
var q1a2 = 0;
var q1a3 = 0;
var q1a4 = 0;
var q2a1 = 0;
var q2a2 = 0;
var q2a3 = 0;
var q2a4 = 0;
var q3a1 = 0;
var q3a2 = 0;
var q3a3 = 0;
var q3a4 = 0;

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var User = require('../models/user-model');
var error = '';

exports.index = function (req, res) {
    var oldDate = new Date();
    oldDate = req.app.get('oldDate')
    console.log("Routes: " + oldDate)
    User.find(function (err, user) {
        if (err) return console.error(err);
        res.render('index', {
            title: 'User List',
            people: user,
            q1a1: q1a1,
            q1a2: q1a2,
            q1a3: q1a3,
            q1a4: q1a4,
            q2a1: q2a1,
            q2a2: q2a2,
            q2a3: q2a3,
            q2a4: q2a4,
            q3a1: q3a1,
            q3a2: q3a2,
            q3a3: q3a3,
            q3a4: q3a4,
            totalq1: totalq1,
            totalq2: totalq2,
            totalq3: totalq3,
            date: 'Last Visted on ' + req.app.get('oldDate') + '.'
        });
    });
};

exports.index2 = function (req, res) {
  var oldDate = new Date();
    oldDate = req.app.get('oldDate')
    console.log("Routes: " + oldDate)
  User.find(function (err, user) {
    if (err) return console.error(err);
    res.render('index2', {
      title: 'User List',
      people: user,
      q1a1: q1a1,
      q1a2: q1a2,
      q1a3: q1a3,
      q1a4: q1a4,
      q2a1: q2a1,
      q2a2: q2a2,
      q2a3: q2a3,
      q2a4: q2a4,
      q3a1: q3a1,
      q3a2: q3a2,
      q3a3: q3a3,
      q3a4: q3a4,
      totalq1: totalq1,
      totalq2: totalq2,
      totalq3: totalq3,
      date: 'Last Visted on ' + req.app.get('oldDate') + '.'
    });
  });
};

exports.login = function (req, res) {
    console.log(req.body.username);
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (user) {

            req.session.regenerate(function () {

                req.session.user = { isAuthenticated: true, username: req.body.username};
                if(user.level === 'User'){
                    console.log('User')
                }
                if(user.level === 'Admin'){
                    console.log('Admin')
                }
                if(user.level == "User"){
                  res.redirect('/index2');
                }else if(user.level == "Admin"){
                  res.redirect('/index');
                }else{
                  console.log("failed");
                }
            });
        } else {
            req.session.error = 'Authentication failed, please check your ' + ' username and password.';
            res.render('login', {
                error: error
            });
        }
    });
}

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
    if(user.question1 == "Mufasa"){
    q1a1++;
    totalq1++;
  }else if(user.question1 == "Simba"){
    q1a2++;
    totalq1++;
  }else if(user.question1 == "Scar"){
    totalq1++;
    q1a3++;
  }else if(user.question1 == "Nala"){
    totalq1++;
    q1a4++;
  }
  if(user.question2 == "Leonardo Da Vinci"){
    q2a1++;
    totalq2++;
  }else if(user.question2 == "Van Gogh"){
    q2a2++;
    totalq2++;
  }else if(user.question2 == "Frida Kahlo"){
    q2a3++;
    totalq2++;
  }else if(user.question2 == "Claude Monet"){
    q2a4++;
    totalq2++;
  }
  if(user.question3 == "Luigi"){
    q3a1++;
    totalq3++;
  }else if(user.question3 == "Wario"){
    q3a2++;
    totalq3++;
  }else if(user.question3 == "Jumpman"){
    q3a3++;
    totalq3++;
  }else if(user.question3 == "Hiro"){
    q3a4++;
    totalq3++;
  }
    user.save(function (err, user) {
        if (err) return console.error(err);
        console.log(req.body.username + ' added');
    });
    if(user.level == "User"){
        res.redirect('/index2');
    }else if(user.level == "Admin"){
        res.redirect('/index');
    }else{
        console.log("failed");
    }
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

exports.editUser = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return console.error(err);
        
        if(user.question1 == "Mufasa"){
            q1a1--;
            totalq1--;
        }else if(user.question1 == "Simba"){
            q1a2--;
            totalq1--;
        }else if(user.question1 == "Scar"){
            totalq1--;
            q1a3--;
        }else if(user.question1 == "Nala"){
            totalq1--;
            q1a4--;
        }
        if(user.question2 == "Leonardo Da Vinci"){
            q2a1--;
            totalq2--;
        }else if(user.question2 == "Van Gogh"){
            q2a2--;
            totalq2--;
        }else if(user.question2 == "Frida Kahlo"){
            q2a3--;
            totalq2--;
        }else if(user.question2 == "Claude Monet"){
            q2a4--;
            totalq2--;
        }
        if(user.question3 == "Luigi"){
            q3a1--;
            totalq3--;
        }else if(user.question3 == "Wario"){
            q3a2--;
            totalq3--;
        }else if(user.question3 == "Jumpman"){
            q3a3--;
            totalq3--;
        }else if(user.question3 == "Hiro"){
            q3a4--;
            totalq3--;
        }
        if(totalq1 < 0 || totalq2 < 0 || totalq3 < 0){
            totalq1 = 0;
            totalq2 = 0;
            totalq3 = 0;
        }
        
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.age = req.body.age;
        user.question1 = req.body.question1;
        user.question2 = req.body.question2;
        user.question3 = req.body.question3;
        
        if(user.question1 == "Mufasa"){
            q1a1++;
            totalq1++;
        }else if(user.question1 == "Simba"){
            q1a2++;
            totalq1++;
        }else if(user.question1 == "Scar"){
            totalq1++;
            q1a3++;
        }else if(user.question1 == "Nala"){
            totalq1++;
            q1a4++;
        }
        if(user.question2 == "Leonardo Da Vinci"){
            q2a1++;
            totalq2++;
        }else if(user.question2 == "Van Gogh"){
            q2a2++;
            totalq2++;
        }else if(user.question2 == "Frida Kahlo"){
            q2a3++;
            totalq2++;
        }else if(user.question2 == "Claude Monet"){
            q2a4++;
            totalq2++;
        }
        if(user.question3 == "Luigi"){
            q3a1++;
            totalq3++;
        }else if(user.question3 == "Wario"){
            q3a2++;
            totalq3++;
        }else if(user.question3 == "Jumpman"){
            q3a3++;
            totalq3++;
        }else if(user.question3 == "Hiro"){
            q3a4++;
            totalq3++;
        }
        
        user.save(function (err, person) {
            if (err) return console.error(err);
            console.log(req.body.name + ' updated');
        });
    });
    res.redirect('/index2');
};

exports.delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if(user.question1 == "Mufasa"){
            q1a1--;
            totalq1--;
        }else if(user.question1 == "Simba"){
            q1a2--;
            totalq1--;
        }else if(user.question1 == "Scar"){
            totalq1--;
            q1a3--;
        }else if(user.question1 == "Nala"){
            totalq1--;
            q1a4--;
        }
        if(user.question2 == "Leonardo Da Vinci"){
            q2a1--;
            totalq2--;
        }else if(user.question2 == "Van Gogh"){
            q2a2--;
            totalq2--;
        }else if(user.question2 == "Frida Kahlo"){
            q2a3--;
            totalq2--;
        }else if(user.question2 == "Claude Monet"){
            q2a4--;
            totalq2--;
        }
        if(user.question3 == "Luigi"){
            q3a1--;
            totalq3--;
        }else if(user.question3 == "Wario"){
            q3a2--;
            totalq3--;
        }else if(user.question3 == "Jumpman"){
            q3a3--;
            totalq3--;
        }else if(user.question3 == "Hiro"){
            q3a4--;
            totalq3--;
        }
        if(totalq1 < 0 || totalq2 < 0 || totalq3 < 0){
            totalq1 = 0;
            totalq2 = 0;
            totalq3 = 0;
        }
        if (err) return console.error(err);
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

exports.logout = function (req, res) {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        else
        {
            res.redirect('/');
        }
    });
}

function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    User.findOne({
        username: name
    },
                 function (err, user) {
        if (user) {
            console.log('Here')
            if (err) return fn(new Error('cannot find user'));
            user.comparePassword(pass, function(err, isMatch){
                if(isMatch){
                    error = "";
                    return fn(null, user)
                }else{
                    error = 'Invalid Password';
                    return fn(new Error('Invalid Password'));
                }
            })
        } else {
            error = 'No username'
            return fn(new Error('cannot find user'));
        }
    });
}

function dateFormat (date, fstr, utc) {
  utc = utc ? 'getUTC' : 'get';
  return fstr.replace (/%[YmdHMS]/g, function (m) {
    switch (m) {
    case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
    case '%m': m = 1 + date[utc + 'Month'] (); break;
    case '%d': m = date[utc + 'Date'] (); break;
    case '%H': m = date[utc + 'Hours'] (); break;
    case '%M': m = date[utc + 'Minutes'] (); break;
    case '%S': m = date[utc + 'Seconds'] (); break;
    default: return m.slice (1); // unknown code, remove %
    }
    // add leading zero if required
    return ('0' + m).slice (-2);
  });
}
