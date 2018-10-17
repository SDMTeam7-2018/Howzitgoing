var express = require('express');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var mysql_npm = require('mysql');
const notifier = require('node-notifier');
var path = require('path');
var opn = require('opn');
var app = express();

var {getHomePage} = require('./routes/index');
var {recordScorePage, recordScore} = require('./routes/teammember');

const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
/* var db = mysql.createConnection ({
    multipleStatements: true,
    // **** PLEASE ENTER YOUR CREDENTIALS IN YOUR LOCAL DATABASE ****
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b505cdf8124120',
    password: '78e8f8b7',
    database: 'heroku_bef5e389669d034',
    reconnect: true,
    wait_timeout: 0
    //pool: { maxConnections: 50, maxIdleTime: 3000000}
}); */

/*var pool  = mysql.createPool({
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
}) */

var db_config = {
    // **** PLEASE ENTER YOUR CREDENTIALS IN YOUR LOCAL DATABASE ****
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b505cdf8124120',
    password: '78e8f8b7',
    database: 'heroku_bef5e389669d034'
}

var db = mysql_npm.createConnection(db_config);

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
    console.log("\n\t *** Cannot establish a connection with the database. ***");

        db = handleDisconnect(db);
    }else {
        console.log("\n\t *** New connection established with the database. ***")
    }
  }
); 
global.db = db;

function handleDisconnect(db){
    console.log("\n New connection tentative...");
    
        //- Destroy the current connection variable
        if(db) db.destroy();
    
        //- Create a new one
        var db = mysql_npm.createConnection(db_config);
    
        //- Try to reconnect
        db.connect(function(err){
            if(err) {
                //- Try to connect every 2 seconds.
                setTimeout(reconnect, 2000);
            }else {
                console.log("\n\t *** New connection established with the database. ***")
                return db;
            }
        });
    }
    
    //- Error listener
    db.on('error', function(err) {
    
        //- The server close the connection.
        if(err.code === "PROTOCOL_CONNECTION_LOST"){    
            console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
            db = handleDisconnect(db);
        }
    
        //- Connection in closing
        else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
            console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
            db = handleDisconnect(db);
        }
    
        //- Fatal error : connection variable must be recreated
        else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
            console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
            db = handleDisconnect(db);
        }
    
        //- Error because a connection is already being established
        else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
            console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
            db = handleDisconnect(db);
        }
    
        //- Anything else
        else{
            console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
            db = handleDisconnect(db);
        }
    
    });


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
