var express  = require('express'),
 app      = express(),
 path     = require('path'),
 port     = process.env.PORT || 3000;
 root = require('./root.js');

//settings
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));



     //FOR POST REQUESTS BODY PARSER


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



				//using separate root script

				
root(app);

var server = app.listen(port);


console.log('Express server listening on port ' + port);