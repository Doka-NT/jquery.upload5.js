#Usage#
```javascript
$('button').on('click',function(){
  //setting up callbacks
  var onSuccess = function(response, status){};
  var onProgress = function(percent, bytesUploaded, bytesTotal, progressEvent){};
  var onBeforeSend = function(formData){ return formData; };
  //start upload
  $.upload('/example/path', this, onSuccess, onProgress, onBeforeSend);
});
```
