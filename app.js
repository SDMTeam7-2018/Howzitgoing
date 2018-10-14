var express = require('express');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const notifier = require('node-notifier');
var path = require('path');
var opn = require('opn');
var app = express();

var {getHomePage} = require('./routes/index');
var {recordScorePage, recordScore} = require('./routes/teammember');

const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
var db = mysql.createConnection ({
    multipleStatements: true,
    // **** PLEASE ENTER YOUR CREDENTIALS IN YOUR LOCAL DATABASE ****
    host: 'localhost',
    user: 'root',
    password: 'Kashmiri@25',
    database: 'howisit'
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }

  console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
app.get('/', getHomePage);

app.get('/add', recordScorePage);
app.post('/add', recordScore);


// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
