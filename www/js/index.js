
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {


    map = L.map('map')
      

    tiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/bobbysud.map-tyt3admo/{z}/{x}/{y}.png', {
        zoomControl: false,
        detectRetina: true,
        maxZoom: 17,
    })
        .addTo(map);

    function onLocationFoundStart(e) {
        
        }

    function onLocationErrorStart(e) {
            map.setView(new L.LatLng(37.76718664006672, -122.42511749267578), 13);
            navigator.notification.alert("Please make sure your location services area enabled.");
        }

    map.on('locationfound', onLocationFoundStart);
    map.on('locationerror', onLocationErrorStart);

        map.locate({
            setView: true,
            maxZoom: 15,
            enableHighAccuracy: true,
        });


    function onMapClick(e) {

        lat = e.latlng.lat.toFixed(5);
        lng = e.latlng.lng.toFixed(5);
        latlng = +lat + ',' + lng;

        url = " http://maps.apple.com/maps?q="+latlng + "&ll=" + latlng+"&z=18";
        message = $(url).html();

        L.marker(e.latlng, {draggable: true})
            .addTo(map)
            .bindPopup("<a href='#one'input onclick='ComposeSMS();'/><h3 id='sent' style='color:black;text-decoration:none;'>Text This Location ►</h3></a>")
            .openPopup()
            elem = document.getElementById('sentbox').innerHTML = "<h3 style='text-align:center;font-color:#00CC33;'></h3>";
    };

    map.on('click', onMapClick);

//Geolocate    
    var geolocate = document.getElementById('geolocate');

    geolocate.onclick = function () {

        function onLocationFound(e) {

        lat = e.latlng.lat.toFixed(5);
        lng = e.latlng.lng.toFixed(5);
        latlng = +lat + ',' + lng;
        url = " http://maps.apple.com/maps?q="+latlng + "&ll=" + latlng+"&z=18";
        message = $(url).html();
            L.marker(e.latlng, {draggable: true})
            .addTo(map).bindPopup("<a href='#one' input onclick='ComposeSMSme();'/><h3 id='sent' style='color:black;text-decoration:none;'>Text Your Location ►</h3></a>")
            .openPopup()
        }

        function onLocationError(e) {
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({
            setView: true,
            maxZoom: 17,
            enableHighAccuracy: true,
        });
    }

     var bingGeocoder = new L.Control.BingGeocoder('AmFJ03ozVugKu0Y_uijzwvFEKfKY5VCesm1eiBqGhchxQ3uKFUQMYsKJLNdfHsIR');
        map.addControl(bingGeocoder);

}; //Device on onDeviceReady


//SMS for onclick event
var ComposeSMS = function () {
    messageTwo = "Lets meet here.\n\n"+url;
    window.plugins.smsComposer.showSMSComposerWithCB(myCallback,'', messageTwo);
    console.log(messageTwo);
}

//SMS for your location
var ComposeSMSme = function () {
    messageTwo = "I'm right here.\n\n" + url;
    window.plugins.smsComposer.showSMSComposerWithCB(myCallback,'', messageTwo);
    console.log(messageTwo);
}

var myCallback = function(result){

    if(result == 0)
        console.log("cancelled");

    else if(result == 1)
        elem = document.getElementById('sent').innerHTML = "<a href='#one'/><h3 id='sent' style='color:black;text-decoration:none;text-align:center;margin:5px'>Location Sent!</h3></a>";
    
    
};


