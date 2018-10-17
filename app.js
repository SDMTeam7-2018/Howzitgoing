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
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b505cdf8124120',
    password: '78e8f8b7',
    database: 'heroku_bef5e389669d034',
    reconnect: true,
    wait_timeout: 0
    //pool: { maxConnections: 50, maxIdleTime: 3000000}
});

var pool  = mysql.createPool({
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b505cdf8124120',
    password : '78e8f8b7',
    database : 'heroku_bef5e389669d034',
    port : process.env.PORT || port
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
      }
  }

  //if (connection) connection.release()
  global.connection = connection;
  
  return
})


// connect to database
db.connect((err) => {
  if (err) {
    throw err;
    db.release();
  }
  console.log('Connected to database');
}); 
global.db = db;


// configure middleware
app.set('port', process.env.PORT || port); // set express to use this port
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
