chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
      url = request.url;
      message = request.message;
      
      console.log(message);
      
      if(request.type === "INQUIRYANSWER") {
          chrome.tabs.create({ url: url }, function (tab) //create the tab with the url
          {
              tabID = tab.id;
              console.log(tabID);
              code = '';
              code += 'function insertion () {';
                code += 'quote = $(\'textarea[name="conversation-send-quote-input"]:eq(0)\');';
                code += 'if (quote.val() == null) {'; //check if is quote or single message
                    code += 'ta = $(\'textarea[name="message"]:eq(0)\');';
                    code += 'ta.val("'+message+'");';
                    code += 'ta.trigger(\'keyPress\');';
                    code += '$(".btn-primary.js-conversation-discussion-submit").click();';
                code += '} else {'
                    code += 'quote.val("'+message+'");';
                    code += 'quote.trigger(\'keyPress\');';//simulate a click
                    code += '$(".btn-primary.js-conversation-send-quote-submit").click();';
                code += '}';
              code += '}';
              code += 'window.addEventListener("load", insertion);';
             
              
              chrome.tabs.executeScript(tabID, {
                  code: code
                }, function () { 
                    setTimeout(function () {
                        chrome.tabs.remove(tabID);
                    },5000);//Close the tab after 5 secondes.
                }
              );   
          });  
      } else if (request.type === "ACCEPTBOOK") {
          chrome.tabs.create({ url: url }, function (tab) 
          {
              tabID = tab.id;
              console.log(tabID);
              code = '';
              code += 'function insertion () {';
               // Code to accept booking
              code += '}';
              code += 'window.addEventListener("load", insertion);';
             
              chrome.tabs.executeScript(tabID, {
                  code: code
              }, function () { 
                    setTimeout(function () {
                        chrome.tabs.remove(tabID);
                    },5000);
                }
            );     
          });  
      } else if (request.type === "REFUSEBOOK") {
          chrome.tabs.create({ url: url }, function (tab) 
          {
              tabID = tab.id;
              console.log(tabID);
              code = '';
              code += 'function insertion () {';
               // Code to refuse booking
              code += '}';
              code += 'window.addEventListener("load", insertion);';

              chrome.tabs.executeScript(tabID, {
                  code: code
              });     
          }, function () { 
                    setTimeout(function () {
                        chrome.tabs.remove(tabID);
                    },5000);
                }
        );  
      }
      sendResponse({'response' : true});//sending response to back office web page
  });

