
//event handler for button
$( "#sendButton" ).click(function() {

var text = document.getElementById("message").value;
var to = $( "#userSelect option:selected" ).text();
console.log(text);
document.getElementById("message").value = ' ';


var messageObj = {message:text,to:to,from:userName};

        $.post("/sendMessage",
        {
          message: messageObj
        },
        function(data,status){ if(data == 'new'){
            alert('new user created');
            loadPage('/messagePage',"#MainField");

          }
          else{console.log(data);}
           loadPage('/messagePage',"#MainField");
        });

console.log(messageObj);

});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SNIPPET FRO NET

        function CreateMSXMLDocumentObject () {
            if (typeof (ActiveXObject) != "undefined") {
                var progIDs = [
                                "Msxml2.DOMDocument.6.0", 
                                "Msxml2.DOMDocument.5.0", 
                                "Msxml2.DOMDocument.4.0", 
                                "Msxml2.DOMDocument.3.0", 
                                "MSXML2.DOMDocument", 
                                "MSXML.DOMDocument"
                              ];
                for (var i = 0; i < progIDs.length; i++) {
                    try { 
                        return new ActiveXObject(progIDs[i]); 
                    } catch(e) {};
                }
            }
            return null;
        }

        function BuildXMLFromString (text) {
            var xmlDoc;
            var message = "";
            if (window.DOMParser) { // all browsers, except IE before version 9
                var parser = new DOMParser();
                try {
                    xmlDoc = parser.parseFromString (text, "text/xml");
                } catch (e) {
                        // if text is not well-formed, 
                        // it raises an exception in IE from version 9
                    alert ("XML parsing error.");
                    return false;
                };
            }
            else {  // Internet Explorer before version 9
                xmlDoc = CreateMSXMLDocumentObject ();
                if (!xmlDoc) {
                    alert ("Cannot create XMLDocument object");
                    return false;
                }

                xmlDoc.loadXML (text);
            }

            var errorMsg = null;
            if (xmlDoc.parseError && xmlDoc.parseError.errorCode != 0) {
                errorMsg = "XML Parsing Error: " + xmlDoc.parseError.reason
                          + " at line " + xmlDoc.parseError.line
                          + " at position " + xmlDoc.parseError.linepos;
            }
            else {
                if (xmlDoc.documentElement) {
                    if (xmlDoc.documentElement.nodeName == "parsererror") {
                        errorMsg = xmlDoc.documentElement.childNodes[0].nodeValue;
                    }
                }
                else {
                    errorMsg = "XML Parsing Error!";
                }
            }

            if (errorMsg) {
                alert (errorMsg);
                return false;
            }

           // alert ("Parsing was successful!");
            return xmlDoc;
        }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function addMessages(){

 var xmlDoc = BuildXMLFromString (xml);

var xmlnode = xmlDoc.getElementsByTagName("message");

console.log(xmlnode);

if(xmlnode.length===0)alert('Recieved box is empty');
for (i = 0; i <xmlnode.length; i++) {
    console.log(xmlnode[i]);
    console.log(i);

    var text = xmlnode[i].childNodes[1].childNodes[0].nodeValue;
    var user = 'usere';
    console.log(text);
    console.log(user);

     console.log('From User:'+user+' Message: '+text);
     var messageObject = {user:user,message:text};
     addMessageWorker(messageObject,'recieved');

   console.log(xmlDoc.getElementsByTagName("message")[0].childNodes[0].nodeValue);

    //var textNode = text.nodeValue;
    //console.log(textNode);

  }

}

//###################PopulatingUserBox
function userList() {


//Getting User List

 $.ajax({url: '/xmlusers', success: function(result){
        console.log(result);
        var xmlUsers = BuildXMLFromString (result);
        var xmlnode = xmlUsers.getElementsByTagName("user");


for (i = 0; i <xmlnode.length; i++) {
    var node = xmlnode[i].childNodes[0].nodeValue;
    console.log(node);
    var select = document.getElementById("userSelect");
    var option = document.createElement("option");
    option.text = node;
    select.add(option);

}


        
    }});

}

var state;
var addMessageWorker = function(messageObject,where){

    //var elementt = document.getElementById("chat_small");

    var div = document.createElement("div");

    var user = document.createElement("h6");
    var message = document.createElement("h6");

    var userText = document.createTextNode(messageObject.user + ':');
    var messageText = document.createTextNode(messageObject.message);


    user.appendChild(userText);
    message.appendChild(messageText);

    user.className = 'userName';
    message.className = 'chatMessage';

    div.appendChild(user);
    div.appendChild(message);

    if(state){
    div.className = 'chatMessage1';
    state = false;
    }
    else{
    div.className = 'chatMessage2';
    state = true;
    }


    $("#"+where).prepend(div);
    //elementt.prependChild(div);
};





var xml;

function populateMessages(){
console.log('logged in');

 $.ajax({url: '/xml', success: function(result){
        xml = result;
        addMessages();
    }});

//\\\\\\\\\\\\\\\POPULATE USERS



};
