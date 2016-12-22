var map;
var markers = [];
document.addEventListener("intel.xdk.device.orientation.change",function(){
    document.getElementById("div_map").style.height = screen.height + "px";
    console.log('orientation');
},false);

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    $('#buttons').slideUp();
    $('#images').css('height', $('body').height() - 64);
    if($('#mainpage').css('display') == 'none' && $('#modal-nearby').css('display') == 'none'){
        $('#mainpage').css('display','block');
        $('#housepage').css('display','none');
        google.maps.event.trigger(map, "resize");
    }
}

function updateSlider(x) {
	$('#range').val( x + "Km");
}

$(document).ready(function(){
    $('#search').click(function(){
        findClosestN(GeoMarker.getPosition(), 5);
        updateSlider(0);
        $('#slide').val(0);
        $('#modal-nearby').modal('show');
    });

    $('.mini-box').click(function(){
        $('#modal-img').modal('show');
    })

    $('#route').click(function(){
        $('#destino').css('display','block');
    })

    $('#camera').click(function(){
        $('#modal-camera').modal('show');
    })

	$('#div_map').css('height',($('#mainpage').height()-64))
	
    $('#back').click(function(){
        onBackKeyDown();
    });

    if ($('#buttons').css('display') == 'none'){
        $('#images').css('height', $('body').height() - 64);
    }else{
        $('#images').css('height', $('body').height() - 129);
    }

    $('#config2').click(function(){
        if ($('#buttons').css('display') == 'none'){
            $('#buttons').slideDown();
            $('#images').css('height', $('body').height() - 129);
        }else{
            $('#buttons').slideUp();
            $('#images').css('height', $('body').height() - 64);
        }
    })

});

function initialize() {
    //buttons
   // document.getElementById("div_map").style.height = screen.height + "px";        
    var main_color = '#2f01ff',
        saturation_value= -20,
        brightness_value= 5;
    var style= [ 
        {
            //set saturation for the labels on the map
            elementType: "labels",
            stylers: [
                {saturation: saturation_value}
            ]
        },  
        {   //poi stands for point of interest - don't show these lables on the map 
            featureType: "poi",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        },
        {
            //don't show highways lables on the map
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [
                {visibility: "off"}
            ]
        }, 
        {   
            //don't show local road lables on the map
            featureType: "road.local", 
            elementType: "labels.icon", 
            stylers: [
                {visibility: "off"} 
            ] 
        },
        { 
            //don't show arterial road lables on the map
            featureType: "road.arterial", 
            elementType: "labels.icon", 
            stylers: [
                {visibility: "off"}
            ] 
        },
        {
            //don't show road lables on the map
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
                {visibility: "off"}
            ]
        }, 
        //style different elements on the map
        { 
            featureType: "transit", 
            elementType: "geometry.fill", 
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        }, 
        {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.sport_complex",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "poi.business",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "landscape",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
            
        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        }, 
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                { hue: main_color },
                { visibility: "on" }, 
                { lightness: brightness_value }, 
                { saturation: saturation_value }
            ]
        }
    ];
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(-34.397, 150.644),
        mapTypeId: google.maps.MapTypeId.ROAD,
        disableDefaultUI: true,
        styles: style
    };

    map = new google.maps.Map(document.getElementById('div_map'),
    mapOptions);

    $(window).resize(function() {
        google.maps.event.trigger(map, "resize");
		$('#div_map').css('height',($('#mainpage').height()-64))
        /*if($('#images').height() > ($('body').height()*0.92)){
            $('#end').css('height',($('footer').css('height')));
        }else{
            $('#end').css('height',0);
        }*/
        if ($('#buttons').css('display') == 'none'){
            $('#images').css('height', $('body').height() - 64);
        }else{
            $('#images').css('height', $('body').height() - 129);
        }
     });
    
    var zoomLevel =  map.getZoom();
    if (zoomLevel>=5 && zoomLevel<=10) { 
         // call the setMarker function for the marker1
    }
    var image = 'images/Marker3.png';
    var marker = new google.maps.Marker({
            position: new google.maps.LatLng(-29.68, -51.13),
            icon: image
    });
    marker.addListener('click', function(){
        /*$('#mainpage').slideUp(500, function(){
            $('#housepage').slideDown(0);
            if ($('#housepage').css('height') > $('body').css('height')){
                $('#housepage').css('background','inherit');
            }
            getGeison();
        });*/
        $('#housepage').css('display','block');
        $('#mainpage').css('display','none');
        /*if($('#images').height() > ($('body').height()*0.92)){
            $('#end').css('height',($('footer').css('height')));
        }*/
    });
    
    marker.setMap(map);
    markers.push(marker);
    
    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({fillColor: '#6495ED'});

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
    $.getJSON('http://192.168.43.232:8081/getContent/id=5&nome=seila', function(json){
                $('#housepage h1').text(json.a);
                console.log(json);                
            });
}
function sortByDist(a, b) {
    return (a.distance - b.distance)
}

function takepicture()
{
    intel.xdk.camera.takePicture(80, true, "jpg");
} 

google.maps.event.addDomListener(window, "load", initialize);

