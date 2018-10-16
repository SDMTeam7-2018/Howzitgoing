var mysql = require('mysql');

var db_config = {
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b505cdf8124120',
    password : '78e8f8b7',
    database : 'heroku_bef5e389669d034'
}
var connection;


function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 4000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {
     console.log('error is err:', err);                                      // connnection idle timeout (the wait_timeout
     // throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
//module.exports = connection;

