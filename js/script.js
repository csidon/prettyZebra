console.log('js'); //viewed in console of the browser
console.log(key)
var script ='<script src="https://maps.googleapis.com/maps/api/js?key='+ key +'&callback=initMap&libraries=places&v=weekly" async></script>'

console.log(script)
//Javascript functionality to be triggered after the page elements (html and CSS) have fully loaded
$(document).ready(function(){
  $('body').append(script); //appending script var to body of index.html for a safe use of the key
  $("#register").hide();
  $("#book").hide();
  $("#contact").hide();

  $("#home-link").click(function(){
    $("#home").show();
    $("#register", "#book", "#contact").hide();
  });

  $("#register-link").click(function(){
    $("#register").show();
    $("#home", "#book", "#contact").hide();
  });
  $("#book-link").click(function(){
    $("#book").show();
    $("#register", "#home", "#contact").hide();
  });
  $("#contact-link").click(function(){
    $("#contact").show();
    $("#register", "#book", "#home").hide();
  });
});

// js objects written in key:value pair
//similar to c++ array of structure
var login = [{
    username: 'beulasamuel',
    password: 'beula'
  },
  {
    username: 'priscillaphilips',
    password: 'priscilla'
  },
  {
    username: 'lazarusgamaliel',
    password: 'lazarus'
  }
];

document.getElementById('login-form').style.display = 'none';
// document.getElementById('taxi-nav-container').style.display='none';

var loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', function() {
  document.getElementById('login-form').style.display = 'block';
});


// var homeIcon = document.getElementById('home-icon');
//
//
//
// homeIcon.addEventListener('click', function() {
//   nav();
//
// });

function nav() {
  if (homeIcon.style.display == 'none') {
    document.getElementById('taxi-nav-container').style.display = 'block';
  } else {
    document.getElementById('taxi-nav-container').style.display = 'none';
  };
}
// var closeBtn = document.getElementById('close-btn');
// closeBtn.addEventListener('click', function() {
//   console.log('close btn clicked');
//   document.getElementById('taxi-nav-container').style.display = 'none';
// });


var submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', function() {
  document.getElementById('login-form').style.display = 'none';
  // alert('Login button is clicked');
  var userName = document.getElementById('username').value;
  var passWord = document.getElementById('password').value;
  // console.log(userName,passWord );

  if ((userName !== '') && (password !== '')) {
    var i, flag = 0;
    for (i = 0; i < login.length; i++) {
      if ((userName == login[i].username) && (passWord == login[i].password)) {
        flag = 1;
        break;
      }
    }

    if (flag == 1) {
      //alert()//is a function to show a pop up message
      alert('Login successful');
    } else {
      alert('Login not successful. Please try again');
    }
  } else {
    alert('username and password must be provided');
  }
});


// lat: -41.267360, lng: 174.849697
// This allows users to specify a source and destination locations and
// uses DirectionsService to calculate the route, and DirectionsRenderer to display the route
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center: {
      lat: -41.267360,
      lng: 174.849697
    },
    zoom: 11,
  });

  new AutocompleteDirectionsHandler(map);
}

class AutocompleteDirectionsHandler {
  map;
  originPlaceId;
  destinationPlaceId;
  travelMode;
  directionsService;
  directionsRenderer;
  // distanceService;
  // geocoder;
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    //================================================
    // initialize services for distance calculation

    // this.geocoder = new google.maps.Geocoder();
    // var service = new google.maps.DistanceMatrixService();
    const originInput = document.getElementById("origin-input");
    const destinationInput = document.getElementById("destination-input");
    // const modeSelector = document.getElementById("mode-selector");
    const originAutocomplete = new google.maps.places.Autocomplete(originInput);

    // Specify just the place data fields that you need.
    originAutocomplete.setFields(["place_id"]);

    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput
    );

    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(["place_id"]);

    // Set initial restrict to the greater list of countries.
    originAutocomplete.setComponentRestrictions({'country': ['nz']});
    destinationAutocomplete.setComponentRestrictions({'country': ['nz']});

    // this.setupClickListener(
    //   "changemode-walking",
    //   google.maps.TravelMode.WALKING
    // );
    // this.setupClickListener(
    //   "changemode-transit",
    //   google.maps.TravelMode.TRANSIT
    // );
    // this.setupClickListener(
    //   "changemode-driving",
    //   google.maps.TravelMode.DRIVING
    // );
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition].push(originInput);
    this.map.controls[google.maps.ControlPosition].push(destinationInput);
    //   this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  // setupClickListener(id, mode) {
  //   const radioButton = document.getElementById(id);
  //
  //   radioButton.addEventListener("click", () => {
  //     this.travelMode = mode;
  //     this.route();
  //   });
  // }
  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }

  route()
  {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: {placeId: this.originPlaceId},
        destination: {placeId: this.destinationPlaceId},
        travelMode: this.travelMode,
      },
      (response, status) =>
      {
        if (status === "OK")
        {
          me.directionsRenderer.setDirections(response);
          console.log(response.routes[0]);
          console.log(response.routes[0].legs[0].start_address, response.routes[0].legs[0].end_address);
          console.log(response.routes[0].legs[0].duration, response.routes[0].legs[0].duration_in_traffic, response.routes[0].legs[0].distance);
          var result = document.getElementById('result');
          result.innerHTML = '<p style="background-color:Tomato;"><h4 class="my-3">You are booking your ride from:<br></h4><b>Pickup:</b><br>'+ response.routes[0].legs[0].start_address+'<br><br>'+
                              '<b>Dropoff: </b><br>' +response.routes[0].legs[0].end_address+'<br><br>'+
                              '<b>Distance:</b><br>'+response.routes[0].legs[0].distance.text+'<br><br>'+
                              '<b>Estimated duration: </b><br>'+response.routes[0].legs[0].duration.text+'<br><br>'+
                              '<b>Trip Cost:</b><br>$' + parseFloat(response.routes[0].legs[0].distance.text) * 2.50 +'<br><br>'+
                              '<button class="btn btn-warning display-4 col-12 py-3" type="button" name="button">Book now for NZ$'+
                              parseFloat(response.routes[0].legs[0].distance.text) * 2.50 +'</button></p>';
        }
        else
        {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}


//================================================
// initialize services for distance calculation
// const geocoder = new google.maps.Geocoder();
// var service = new google.maps.DistanceMatrixService();
// // Build request for dist calcultation
// service.getDistanceMatrix({
//   origins: [origin1, origin2],
//   destinations: [destinationA, destinationB],
//   travelMode: 'DRIVING',
//   transitOptions: TransitOptions,
//   drivingOptions: DrivingOptions,
//   unitSystem: UnitSystem,
//   avoidHighways: Boolean,
//   avoidTolls: Boolean,
// }, callback);
//
// function callback(response, status) {
//   // See Parsing the Results for
//   // the basics of a callback function.
// }
//================================================

// // Initialize and add the map
// function initMap() {
//   // The location of Middle of north island, NZ
//   const kapitiCoastDistrict = { lat: -40.839046, lng: 175.279067 };
//   // The location of Wellington, NZ
//   const wellington = { lat: -41.2924, lng: 174.7787 };
//   // The location of KapitiEOC, NZ
//   const kapitiEOC = { lat: -40.900008, lng: 175.015388 };
//   // The location of Palmerston North, NZ
//   const palmerston = { lat: -40.358217, lng: 175.614785 };
//
//   // The map, centered at Wellington
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 8,
//     center: kapitiCoastDistrict,
//   });
//   // The marker, positioned at Wellington
//   const marker = new google.maps.Marker({
//     position: wellington,
//     map: map,
//   });
//   const marker2 = new google.maps.Marker({
//     position: palmerston,
//     map: map,
//   });
//   const marker3 = new google.maps.Marker({
//     position: kapitiEOC,
//     map: map,
//   });
// }
