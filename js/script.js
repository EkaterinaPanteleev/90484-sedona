function initialize() {
  var Center = {lat: 35.0349013, lng: -111.679886};

    var mapOptions = {
        zoom: 7,
        center: Center,
        scrollwheel: false,
    disableDefaultUI: true
  }
    var map = new  google.maps.Map(
        document.querySelector(".map"),
        mapOptions
    );
    var myLatLng = {lat: 34.8544438, lng: -111.8301581};
    var image = "img/map-marker.svg";

    var myMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}
google.maps.event.addDomListener(window, "load", initialize);
