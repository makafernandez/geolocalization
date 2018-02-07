// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4s0RPNXAWFPDJxqHes_Wpm3jawngZL1U",
    authDomain: "mapa-awesome.firebaseapp.com",
    databaseURL: "https://mapa-awesome.firebaseio.com",
    projectId: "mapa-awesome",
    storageBucket: "",
    messagingSenderId: "943367378784"
  };
  firebase.initializeApp(config);

// INICIALIZA MAPA:
function initMap() {
  var santiagoCL = {lat: -33.4718999, lng: -70.9100231};
  var map = new google.maps.Map(document.getElementById('map'), 
  {
    zoom: 4,
    center: santiagoCL
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation:
  var findMe = document.getElementById('findMe');
  findMe.onclick = function buscar() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Te encontré!');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  }

  // Autocomplete:
  var start = document.getElementById('start');
  var finish = document.getElementById('finish');

  new google.maps.places.Autocomplete(start);
  new google.maps.places.Autocomplete(finish);

  // Trazar ruta:
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: start.value,
      destination: finish.value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('No encontramos una ruta.');
      }
    });
  }
  directionsDisplay.setMap(map);

  var traceRoute = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  document.getElementById('traceRoute').addEventListener('click', traceRoute);
}