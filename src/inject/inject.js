function betterFD() {
  console.log("Better Flowdock!");

  (function() {
    var keepFocus = function() {
      var ae = $(document.activeElement);
      var currSelection = document.getSelection().toString();

      var isEditing = (ae.is('textarea') || ae.is('input') || ae.is('select') || (typeof ae.attr("contenteditable") !== "undefined") || (currSelection.length > 0));

      if (!isEditing) {
        $('.message-form .message-input').focus();
      }
    };
    window.setInterval(function(){
      keepFocus();
    }, 500);
  })();

  (function() {
    var ctrlDown = false;
    var ctrlKey = 17, spaceKey = 32;

    $(document).keydown(function(e) {
      if (e.keyCode == ctrlKey) {
        ctrlDown = true;
      } else if (e.keyCode == spaceKey){
        if (ctrlDown) {
          // This needs to be a native event: http://stackoverflow.com/questions/17819344/triggering-a-click-event-from-content-script-chrome-extension
          $("a.search-tab")[0].click();
        }
      } else {
        ctrlDown = false;
      }
    }).keyup(function(e) {
      if (e.keyCode == ctrlKey){
        ctrlDown = false;
      }
    });
  })();
}

chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
    betterFD();
  }
  }, 10);
});