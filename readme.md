```js
// To add on the back office side.

// The ID of the extension we want to talk to. (to be update)
editorExtensionId = "clhchbhojampnmjpdichlnmaebjnjfbh";

//Gat URL from email parse :
url = "https://rentals.tripadvisor.com/conversation/175445021";

//Get message from serveur side :

message = "";

//Send Response to Enquiry
chrome.runtime.sendMessage(editorExtensionId, {'message': message, 'type': 'INQUIRYANSWER', 'url' : url},
    function(response) {
        if(response) {
            console.log('done');
        }
        
});

//Send Accept
chrome.runtime.sendMessage(editorExtensionId, {'message': NULL, 'type': 'ACCEPTBOOK', 'url' : url},
    function(response) {
        if(response) {
            console.log('done');
        }
        
});

//Send Refuse
chrome.runtime.sendMessage(editorExtensionId, {'message': NULL, 'type': 'REFUSEBOOK', 'url' : url},
    function(response) {
        if(response) {
            console.log('done');
        }
        
});

```