
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY

var serverurl = "";

var mapCenter = {};

var styles = [{"featureType":"landscape",
	"stylers":[{"hue":"#FFBB00"},
	{"saturation":43.400000000000006},
	{"lightness":37.599999999999994},
	{"gamma":1}]},{"featureType":"road.highway",
	"stylers":[{"hue":"#FFC200"},{"saturation":-61.8},
		{"lightness":45.599999999999994},{"gamma":1}]},
	{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},
		{"saturation":-100},{"lightness":51.19999999999999},
		{"gamma":1}]},{"featureType":"road.local",
		"stylers":[{"hue":"#FF0300"},{"saturation":-100},
			{"lightness":52},{"gamma":1}]},
	{"featureType":"water","stylers":[{"hue":"#0078FF"},
		{"saturation":-13.200000000000003},
		{"lightness":2.4000000000000057},{"gamma":1}]},
	{"featureType":"poi","stylers":[{"hue":"#00FF6A"},
		{"saturation":-1.0989010989011234},
		{"lightness":11.200000000000017},{"gamma":1}]}];


angular.module('starter.controllers', [])
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

////  mapcontroller mapcontroller
.controller('MapController', function($scope,$state, $http, $ionicLoading, $compile, AllClinicsService, ClinicNameService, URLService, LocationService) {
	$scope.message = "andy";

	$scope.display = {};

	$scope.map = {};

	$scope.testFun = function(id){
		console.log(id);
	}

	$scope.initMarkers = function(map){
		data = LocationService.getLocations();
    AllClinicsService.clinics = data;
    var m = {};
    var loc = {};
		var infowindow = new google.maps.InfoWindow({
				//content: compiled[0]
			});
		var constring = "";
		var compiled;
    for(i in data){
      loc = new google.maps.LatLng(parseFloat(data[i].latitude), parseFloat(data[i].longtitude));
      m = new google.maps.Marker({
				position: loc,
				map: map,
				title: data[i].name
			});
			constring = "";
			//constring += '<p>Ridgewood Medical Clinic</p>';

			constring += '<button class="button button-small button-outline button-positive" ng-click="goToQueue('+data[i].id.toString() + ')">'+data[i].name+'</button>';
			compiled = $compile(constring)($scope);
			m.html=compiled;
			
			google.maps.event.addListener(m, 'click', function() {
				infowindow.setContent(this.html[0]);
				infowindow.open(map, this);
				var pos = new google.maps.LatLng(this.position.H, this.position.L);
				findRoute(mapCenter, pos, $scope.display);
			});
			$scope.allClinicMarkers.push(m);
    }
	}


	$scope.allClinicMarkers = [];


  $scope.initialize = function(){
		serverurl = URLService.getURL();
		var initialLocation;
		var mapOptions = {
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl : false
		};

		var map = new google.maps.Map(document.getElementById("map"),
						  mapOptions);
		/// styles
		map.set('styles', styles);
		/// end of styles

		navigator.geolocation.getCurrentPosition(function(position) {
			initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			map.setCenter(initialLocation);
			mapCenter = initialLocation;
			console.log(mapCenter);

			var marker = new google.maps.Marker({
				position: initialLocation,
				map: map,
				title: 'NUS'
			});

			mapCenter = marker.position; 

			/*
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
			*/

			// 1.305635, 103.773031

			//// for marker adding infowindow and button
			//// http://stackoverflow.com/questions/2946165/google-map-api-v3-simply-close-an-infowindow
			//// link above have information that you are gonna need to try

			/*
			var constring = "";
			constring = '<button class="button button-small button-outline button-positive" ng-click="testfun()">Queue for this clinic</button>';
			var compiled = $compile(constring)($scope);
			var infowindow = new google.maps.InfoWindow({
				content: compiled[0]
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, this);
			});
			*/


			/*
			$http.get(serverurl+'hostest').
				then(function(response) {
					// this callback will be called asynchronously
					// when the response is available

					// things in the alert is the right way to do all these
					//alert(response.data.id);
				}, function(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log("error");
				});

			$http.get(serverurl+"hostest").
				then(function(response) {
					// this callback will be called asynchronously
					// when the response is available
					constring = "<p>" + response.data.address1+ "</p>" + '<button ng-click="testfun()">TestFun</button>';
					compiled = $compile(constring)($scope);
					infowindow = new google.maps.InfoWindow({
						content: compiled[0]
					});
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map, this);
					});
					alert(response.data);

				}, function(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log("error");
				});
			*/

			//// end of marker adding infowindow and button
			// for searchBox change
			// Create the search box and link it to the UI element.
		  var input = document.getElementById('pac-input');
		  var searchBox = new google.maps.places.SearchBox(input);
		  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

		  // Bias the SearchBox results towards current map's viewport.
		  map.addListener('bounds_changed', function() {
		    searchBox.setBounds(map.getBounds());
		  });

		  var markers = [];
		  // Listen for the event fired when the user selects a prediction and retrieve
		  // more details for that place.
		  searchBox.addListener('places_changed', function() {
		    var places = searchBox.getPlaces();

		    if (places.length == 0) {
		      return;
		    }

		    // Clear out the old markers.
		    markers.forEach(function(marker) {
		      marker.setMap(null);
		    });
		    markers = [];

		    // For each place, get the icon, name and location.
		    var bounds = new google.maps.LatLngBounds();
		    places.forEach(function(place) {
		      var icon = {
		        url: place.icon,
		        size: new google.maps.Size(71, 71),
		        origin: new google.maps.Point(0, 0),
		        anchor: new google.maps.Point(17, 34),
		        scaledSize: new google.maps.Size(25, 25)
		      };

		      // Create a marker for each place.
		      markers.push(new google.maps.Marker({
		        map: map,
		        icon: icon,
		        title: place.name,
		        position: place.geometry.location
		      }));
		      mapCenter = place.geometry.location;

		      if (place.geometry.viewport) {
		        // Only geocodes have viewport.
		        bounds.union(place.geometry.viewport);
		      } else {
		        bounds.extend(place.geometry.location);
		      }
		    });
		    map.fitBounds(bounds);
		  });
			///// end of search Box
			var currentPlace = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			var ridgewood = new google.maps.LatLng(1.316644, 103.778973);
			var directionsService = new google.maps.DirectionsService();
			// marker with button in the infowindow(only for the hospital)
			marker = new google.maps.Marker({
				position: ridgewood,
				map: map,
				title: 'NUS'
			});
			// end of info-window

			var directionsDisplay = new google.maps.DirectionsRenderer({
				suppressMarkers: true
			});
			directionsDisplay.setMap(map);
			$scope.display = directionsDisplay
			findRoute(currentPlace, ridgewood, directionsDisplay);
			var geocoder = new google.maps.Geocoder();
			//var address = "BLK 501 BISHAN STREET 11 #01-376";
			//geocodeAddress(geocoder, map, address);  /// this one seems to be simply to get geodata from address
			/////// end of route

			/// purely to test HTTP request
			/// this can be used later
			/*
			$http.get(re+apiKey).
				then(function(response) {
					// this callback will be called asynchronously
					// when the response is available
					console.log(response.data);

				}, function(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log("error");
				});
			*/
			$scope.map = map;
			console.log("success");
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
		// last step to init all the markers;
		$scope.initMarkers(map);

   };
    //google.maps.event.addDomListener(window, 'load', $scope.initialize);
	$scope.goToQueue=function(id){
		//localStorage.setItem("firstname", "Andy");
		//console.log(localStorage.getItem("firstname"));
		ClinicNameService.clinicId = parseInt(id);
		clinics = AllClinicsService.clinics;
		for(i in clinics){
			if(clinics[i].id.toString() == id){
				console.log(clinics[i]);
				ClinicNameService.clinicName = clinics[i].name;
				break;
			}
		}

		$state.go("tab.queue");
	};

});

function findRoute(original, destination, directionsDisplay){
	var directionsService = new google.maps.DirectionsService();
	var request = {
		origin: original,
		destination: destination,
		travelMode: google.maps.TravelMode["DRIVING"]
	};

	// these are all for the route finding
	
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	})
}


// here is an example of using address to get geodata.
function geocodeAddress(geocoder, resultsMap, address) {
	//var address = "RIDGEWOOD MEDICAL CLINIC"
	//var address = "BLK 501 BISHAN STREET 11 #01-376";
	//alert("ran");
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			resultsMap.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location
			});
			console.log(resultsMap.position);
		} else {
			// if there is no result the code will go to this function.
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}