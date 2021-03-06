var map;
var markers = [];
document.addEventListener("deviceready",function(){
    document.getElementById("div_map").style.height = Number(screen.height-50) + "px";
    console.log('orientation');
},false);

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    if($('#mainpage').css('display') == 'none' && $('#modal-nearby').css('display') == 'none'){
        $('#housepage').slideUp(500, function(){
            $('#mainpage').slideDown(500);
        });
    }
}

$(document).ready(function(){
    $('#btn-nearby').click(function(){
        findClosestN(GeoMarker.getPosition(), 5);
        $('#modal-nearby').modal('show');
    });
});

function initialize() {
    //buttons
    document.getElementById("div_map").style.height = screen.height + "px";        
            
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROAD,
        disableDefaultUI: true,
        styles: [
                    {
                      "featureType": "all",
                      "elementType": "labels",
                      "stylers": [
                        { "visibility": "off" }
                      ]
                    }
                  ]
    };
    
    map = new google.maps.Map(document.getElementById('div_map'),
    mapOptions);
    
    var zoomLevel =  map.getZoom();
    if (zoomLevel>=5 && zoomLevel<=10) { 
         // call the setMarker function for the marker1
    }
    var marker = new google.maps.Marker({
            position: new google.maps.LatLng(-29.68, -51.13),
        animation: google.maps.Animation.BOUNCE,
        title:"Feevale"
    });
    marker.addListener('click', function(){
        $('#mainpage').slideUp(500, function(){
            $('#housepage').slideDown(500);
            getGeison();
        });
    });
    
    marker.setMap(map);
    markers.push(marker);
    
    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({fillColor: '#ff751a'});

    google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {        
        map.setCenter(this.getPosition());
        map.fitBounds(this.getBounds());        
        findClosestN(this.getPosition(), 5);
    });        
    
    google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
        alert('There was an error obtaining your position. Message: ' + e.message);
    });

    GeoMarker.setMap(map);
}

function setMyPosition(){
     map.setCenter(GeoMarker.getPosition());
     map.setZoom(17);
}

function goToMarker(pos){
    map.setCenter(pos);    
    $('#modal-nearby').modal('hide');
}
function getHouses(lat, lng){
    $.getJSON('http://192.168.1.170:8082/getHouses?lat='+lat+'&lng='+lng, function(json){
        console.log(json);
    });
}
function findClosestN(pt, numberOfResults) {
    var closest = [];
    for (var i = 0; i < markers.length; i++) {
        markers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt, markers[i].getPosition());
        //markers[i].setMap(null);
        closest.push(markers[i]);
    }
    closest.sort(sortByDist);
    //alert(closest[0].title);    
    $('#list-nearby').html('<a onclick="goToMarker({lat:'+closest[0].getPosition().lat()+',lng:'+closest[0].getPosition().lng()+'});" class="list-group-item allow-badge widget uib_w_4" data-uib="twitter%20bootstrap/list_item" data-ver="1">'+
                                            '<h4 class="list-group-item-heading">'+closest[0].title+'</h4>'+
                                            '<p class="list-group-item-text">List item</p>'+
                                        '</a>');
    //return closest.splice(0,numberOfResults);
}
function getGeison(){
    $.getJSON('http://10.42.0.59:8081/getContent/id=5&nome=seila', function(json){
                $('#housepage h1').text(json.a);
                console.log(json);                
            });
}
function sortByDist(a, b) {
    return (a.distance - b.distance)
}

function takepicture()
{
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true });

}

function takepictureold()
{
    intel.xdk.camera.takePicture(80, true, "jpg");
} 

google.maps.event.addDomListener(window, "load", initialize);

