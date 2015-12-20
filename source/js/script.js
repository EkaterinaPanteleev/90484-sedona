(function(){

  /*ajax*/

  if (!("FormData" in window)) {
    return;
  }

  var form = document.querySelector(".review");

  if (form)
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var data = new FormData(form);
    request(data, function(response) {
      console.log(response);
    });
  });

  function request(data, fn) {

    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });

    xhr.send(data);
  }


  /*+/- field*/

  var numeric = document.querySelectorAll(".input-numeric");

  for (var i = 0; i < numeric.length; i++) {
    initNumberField(numeric[i]);
  }

  function initNumberField(parent) {

    var input = parent.querySelector("input");
    var minus = parent.querySelector(".input-numeric__minus-btn");
    var plus = parent.querySelector(".input-numeric__plus-btn");

    minus.addEventListener("tap", function() {changeNumber(false);});
    plus.addEventListener("tap", function() {changeNumber(true);});

    function changeNumber(operation) {
      var value = Number(input.value);

      if (isNaN(value)) {
        value = 0;
      }

      if (operation) {
      input.value = value + 1;
      } else {
      input.value = value - 1;
      }
    }
  }
  /*menu*/

  var openMenu = document.querySelector(".page-header__open-nav");
  var nav = document.querySelector(".main-nav");
  var closeMenu = document.querySelector(".main-nav__close");

  openMenu.addEventListener("tap", function() {
    nav.classList.toggle("main-nav--show");
  })

  closeMenu.addEventListener("tap", function() {
    nav.classList.remove("main-nav--show");
  })

/*map*/

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
  if (typeof google !== 'undefined') {
    google.maps.event.addDomListener(window, "load", initialize);
  }


})();

