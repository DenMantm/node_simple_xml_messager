module.exports = function(app){


  //username here
var myUserName;


this.app = app;

var fs = require('fs');
var xml;
var select = require('xpath')
, dom = require('xmldom').DOMParser;
var fs      = require('fs');
var dom     = require('xmldom').DOMParser;



               //STARTING DIFFERENT APPROACH JUST WITH WITH XML DOM
function writeUser(user){


    var xmldom = require('xmldom').DOMParser,
    fs = require('fs');



fs.readFile('./storage/users.xml', 'utf-8', function (err, data) {
  if (err) {
    throw err;
  }
  var genreno,
      thisgenreobject,
      thisgenre,
      doc,
      genres;
  doc = new xmldom().parseFromString(data, 'application/xml');


var createUser = function(name){

  var textEl = doc.createElement("user");
  var textTxt = doc.createTextNode(name);
  textEl.appendChild(textTxt);
  
  genres = doc.documentElement.appendChild(textEl);

}
  createUser(user);

 var XMLSerializer = require('xmldom').XMLSerializer;
var serializer = new XMLSerializer();
var writetofile = serializer.serializeToString(doc);

          //writing file to the disk
          fs.writeFile('./storage/users.xml', doc, function(err) {
          if(err) {
                return console.log(err);
              }
          console.log("The file was saved!");
})

});

}
function tryxml(what,paths,user,message){


    var xmldom = require('xmldom').DOMParser,
    fs = require('fs');


fs.readFile(paths, 'utf-8', function (err, data) {
  if (err) {
    throw err;
  }
  var genreno,
      thisgenreobject,
      thisgenre,
      doc,
      genres;
  doc = new xmldom().parseFromString(data, 'application/xml');

var createMessage = function(text,user,what){
  var element = doc.createElement(what);

  var textEl = doc.createElement("text");
  var textTxt = doc.createTextNode(text);
  textEl.appendChild(textTxt);
  element.appendChild(textEl);


  var fromEl = doc.createElement("from");
  var fromTxt = doc.createTextNode(user);
  fromEl.appendChild(fromTxt);
  element.appendChild(fromEl);



 // var dateEl = doc.createElement("date");
 // var dateTxt = doc.createTextNode('000');
  //dateEl.appendChild(dateTxt);
 // element.appendChild(dateEl);


  genres = doc.documentElement.appendChild(element);

}


createMessage(message,user,what);


 var XMLSerializer = require('xmldom').XMLSerializer;
var serializer = new XMLSerializer();
var writetofile = serializer.serializeToString(doc);

          //writing file to the disk
          fs.writeFile(paths, doc, function(err) {
          if(err) {
                return console.log(err);
              }
          console.log("The file was saved!");
})

});
}

    //HANDLING POST REQUESTS 
    app.post('/sendMessage', function(req, res) {

    var message = req.body.message;
    var paths_sender = './storage/'+message.from+'.xml';
    var paths_reciever = './storage/'+message.to+'.xml';

    tryxml('sent',paths_sender,message.to,message.message);
    tryxml('message',paths_reciever,message.from,message.message);
    
    console.log(myUserName);

  });


    app.post('/ifexists', function(req, res) {

    var name = req.body.name;
    myUserName = name;
    console.log(name);
    var paths = './storage/'+name+'.xml';
    var newFile = '<?xml version="1.0" encoding="UTF-8"?><messages></messages>';

    fs.exists(paths, function(exists){
        if (exists) {
            xml = fs.readFileSync(paths, { encoding : 'UTF-8' });

            res.send('');

         }
          else{
            writeUser(name);

          fs.writeFile(paths, newFile, function(err){






          if(err) {
                return console.log(err);
              }
          res.send("new");



}); 
        
    }
});
    // ...
});
               //URL GET HAndling

   app.get('/', function(req, res) {
	res.render('main.ejs');
	});


      app.get('/xml', function(req, res) {
  res.send(xml);
  console.log(xml);
  });


      app.get('/xmlusers', function(req, res) {
var xmlUsers = fs.readFileSync('./storage/users.xml', { encoding : 'UTF-8' });

  res.send(xmlUsers);
  console.log(xmlUsers);
  });


     app.get('/messagePage',function(req, res) {
  res.render('messagePage.ejs');
  }); 



      app.get('/login', function(req, res) {
  res.render('login.ejs');
  });

      app.get('/exists',function(req, res){
		fs.exists(path, function(exists) {
    		if (exists) {
        		xml = fs.readFileSync('./xml.xml', { encoding : 'UTF-8' });
   			 }
    			else{
					fs.writeFile(path, newFile, function(err) {
    			if(err) {
        				return console.log(err);
    					}
    			res.end("The file was saved!");

}); 
    		
    }
});

	});	
}