// All data is stored in MongoDB (use mongoose)
// Nothing should break if there is no data in thdatabase
// You may only use the packages discussed in class demos or in this document
// Users can create an account that stores username, password, user-level (regular user or admin), email, age, and the answers to three multiple choice questions that you come up with.
// Passwords must be salted and hashed (use bcrypt-nodejs)
// On the home page, show bar charts for each of the multiple choice questions that shows the percentage of people that selected each answer.
// The charts should be able to handle a number between 0-100% for each answer
// Create an admin account (user:admin, password:pass) along with several regular user accounts so I can see the data.
// Have a page that only the admin can see that shows a table listing all of the people and their data and give the ability to delete user accounts.
// When someone is logged in, a session should be used to maintain that login status (use express-sessions)
// If user is logged in, give them the ability to edit/update their information
// Should have a logout button that destroys the session and removes the ability to modify records
// Store a cookie containing the last time you visited the page and display that information on the page (us
// ser)e-parser)

var express = require('express'),
    pug = require('pug'),
    path = require('path'),
    route = require('./routes/routes.js'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    User = require('./models/user-model');

var app = express();

var checkAuth = function (req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
};

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

app.use(cookieParser());
app.use(expressSession({secret: '5ecretP455c0de', saveUninitialized: true, resave: true}));

app.get('/', function (req, res) {
    res.render('login');
});

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// checks to see if user and password are correct
app.post('/', urlencodedParser, route.login);


app.get('/index', function(req, res, next){
    app.set('oldDate', req.cookies.lastVisited);
    var datetime = new Date();
//    datetime = datetime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var dateString;
    var yyyy = datetime.getFullYear().toString();
  var mm = (datetime.getMonth()+1).toString();
  var dd  = datetime.getDate().toString();
    dateString = yyyy + '-' + mm + '-' + dd
    console.log(dateString)
    if(req.cookies.lastvisited === datetime) {
        res.cookie('lastVisited', dateString)
    } else {
        res.cookie('lastVisited', dateString)
    }
    next();
}, route.index);

app.get('/create', route.create);

app.get('/details/:id', route.details);
app.post('/create', urlencodedParser, userExist, route.createUser);
app.post('/signup', urlencodedParser, route.create);
app.get('/edit/:id', route.edit);
app.post('/edit/:id', urlencodedParser, route.editUser);
app.get('/delete/:id', route.delete);
app.get('/logout', route.logout);
app.listen(3000);

function userExist(req, res, next) {
    User.count({
        username: req.body.username
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            req.session.error = "User Exist"
            res.render("login", {
                error: 'Username in use'
            });
        }
    });
}
