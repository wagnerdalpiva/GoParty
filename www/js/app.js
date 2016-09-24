var latitude;
var longitude;

    var onSuccess = function(position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude

    };
 
    // onError Callback receives a PositionError object 
    // 
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
 //   var bot = document.getElementById("get_pos");
 function teste(){
 	alert("aeho");
 }
//    navigator.geolocation.getCurrentPosition(onSuccess, onError);