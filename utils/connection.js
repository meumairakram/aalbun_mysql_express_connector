var mysql      = require('mysql');
var {DB_URL, DB_USERNAME, DB_PASSWORD,DB_NAME} = require('./config');

var connection = mysql.createConnection({
  host     : DB_URL,
  user     : DB_USERNAME,
  password : DB_PASSWORD,
  database : DB_NAME
});
 
connection.connect(function(err) {

    if(err) {console.log('THERE is an error connecting to MYsql',err); }

});

 
module.exports = connection;
