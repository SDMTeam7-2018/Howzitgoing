var express = require('express');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var mysql_npm = require('mysql');
const notifier = require('node-notifier');
var path = require('path');
var opn = require('opn');
var app = express();

var {recordScorePage, recordScore} = require('./routes/teammember');

const port = 5000;

var db_config = {
    // **** PLEASE ENTER YOUR CREDENTIALS IN YOUR LOCAL DATABASE ****
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b505cdf8124120',
    password: '78e8f8b7',
    database: 'heroku_bef5e389669d034'
}

var db = mysql_npm.createPool(db_config);

// connect to database
db.getConnection((err) => {
  if (err) {
    throw err;
    console.log("\n\t *** Cannot establish a connection with the database. ***");

        db = handleDisconnect(db);
    }else {
        console.log("\n\t *** New connection established with the database. ***")
    }
  });

global.db = db;

//Handling ClearDB reconnectivity
function handleDisconnect(db){
    console.log("\n New connection tentative...");
    
        //- Create a new one
        var db = mysql_npm.createPool(db_config);
    
        //- Try to reconnect
        db.connect(function(err){
            if(err) {
                //- Try to connect every 2 seconds.
                setTimeout(handleDisconnect(db), 2000);
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
//app.get('/', getHomePage);

app.get('/', recordScorePage);
app.post('/', recordScore);


app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
