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
  bodyParser = require('body-parser');



var app = express();


app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
});



app.get('/', route.index);

app.get('/create', route.create);

//app.get('/details/:id', route.details);
app.post('/create', urlencodedParser, route.createUser);
//app.post('/edit/:id', urlencodedParser, route.editUser);
app.get('/delete/:id', route.delete);
app.listen(3000);
