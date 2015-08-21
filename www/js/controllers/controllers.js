
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY

var serverurl = "http://172.23.194.216:5000/"

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

.controller('QueueCtrl', function($scope,$ionicHistory) {
	console.log("just to test all these stuff");
	$scope.create = function() {
		/* $location.path('/tab/newpost'); */   /* this variant doesnt work */
		$state.go("/tab/queue");
	};
	$scope.backToMap = function() {
		$ionicHistory.goBack();
	};
})



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})



////  mapcontroller mapcontroller
.controller('MapController', function($scope,$state, $http,$ionicLoading, $compile) {
	$scope.message = "andy";
    $scope.initialize = function() {
		console.log("Andy's code running");
		var initialLocation;
		var mapOptions = {
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl : false
		};


		$scope.markers = [];
		var map = new google.maps.Map(document.getElementById("map"),
						  mapOptions);

		navigator.geolocation.getCurrentPosition(function(position) {
			initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			map.setCenter(initialLocation);



			var marker = new google.maps.Marker({
				position: initialLocation,
				map: map,
				title: 'NUS'
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
			// 1.305635, 103.773031

			initialLocation = new google.maps.LatLng(1.305635, 103.773031);
			marker = new google.maps.Marker({
				position: initialLocation,
				map: map,
				title: 'NUS'
			});

			//// for marker adding infowindow and button
			//// http://stackoverflow.com/questions/2946165/google-map-api-v3-simply-close-an-infowindow
			//// link above have information that you are gonna need to try

			var constring = "";
			constring = '<button ng-click="testfun()">TestFun</button>';
			var compiled = $compile(constring)($scope);
			var infowindow = new google.maps.InfoWindow({
				content: compiled[0]
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, this);
			});

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
			/*
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
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});

			var input = document.getElementById('pac-input');
			var searchBox = new google.maps.places.SearchBox(input);
			map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
			map.addListener('bounds_changed', function() {
				searchBox.setBounds(map.getBounds());
			});

			searchBox.addListener('places_changed', function() {
				var places = searchBox.getPlaces();

				if (places.length == 0) {
					return;
				}

				// Clear out the old markers.
				markers.forEach(function (marker) {
					marker.setMap(null);
				});
				markers = [];

				// For each place, get the icon, name and location.
				var bounds = new google.maps.LatLngBounds();
				places.forEach(function (place) {
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

			/// styles
			map.set('styles', styles);
			/// end of styles

			$scope.map = map;

			// these are all for the route finding
			var directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.setMap(map);
			var haight = new google.maps.LatLng(1.305635, 103.773031);
			var oceanBeach = new google.maps.LatLng(1.319153, 103.774423);
			var directionsService = new google.maps.DirectionsService();
			var request = {
				origin: haight,
				destination: oceanBeach,
				// Note that Javascript allows us to access the constant
				// using square brackets and a string value as its
				// "property."
				travelMode: google.maps.TravelMode["DRIVING"]
			};
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
			var geocoder = new google.maps.Geocoder();

			geocodeAddress(geocoder, map);  /// this one seems to be simply to get geodata from address
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

			/// end of testing
			console.log("success");
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
    };
    //google.maps.event.addDomListener(window, 'load', $scope.initialize);
	$scope.testfun=function(){
		//localStorage.setItem("firstname", "Andy");
		//console.log(localStorage.getItem("firstname"));
		$state.go("tab.queue");
	};

});


// here is an example of using address to get geodata.
function geocodeAddress(geocoder, resultsMap) {
	var address = "national university of singapore"
	//var address = "BLK 501 BISHAN STREET 11 #01-376";
	geocoder.geocode({'address': address}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			resultsMap.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: resultsMap,
				position: results[0].geometry.location
			});
		} else {
			// if there is no result the code will go to this function.
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}