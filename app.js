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

var {connection} = require('./config/db');

//const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
var db = mysql.createConnection ({
    multipleStatements: true,
    // **** PLEASE ENTER YOUR CREDENTIALS IN YOUR LOCAL DATABASE ****
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b505cdf8124120',
    password: '78e8f8b7',
    database: 'heroku_bef5e389669d034'
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }

  console.log('Connected to database');
}); 


// configure middleware
//app.set('port', process.env.PORT || port); // set express to use this port
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
/*app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});*/
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
