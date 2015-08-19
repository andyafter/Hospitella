
var apiKey = "AIzaSyBwA0f-yciWz419RzX1769_SGuZrzJ4Fe8";
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY
var re = "https://maps.googleapis.com/maps/api/geocode/json?address=National+University+of+Singapore&key=";

var styles = [{"featureType":"landscape",
	"stylers":[{"saturation":-100},
		{"lightness":65},
		{"visibility":"on"}]},
	{"featureType":"poi",
		"stylers":[{"saturation":-100},
			{"lightness":51},
			{"visibility":"simplified"}]},
	{"featureType":"road.highway",
		"stylers":[{"saturation":-100},
			{"visibility":"simplified"}]},
	{"featureType":"road.arterial",
		"stylers":[{"saturation":-100},
			{"lightness":30},
			{"visibility":"on"}]},
	{"featureType":"road.local",
		"stylers":[{"saturation":-100},
			{"lightness":40},
			{"visibility":"on"}]},
	{"featureType":"transit",
		"stylers":[{"saturation":-100},
			{"visibility":"simplified"}]},
	{"featureType":"administrative.province",
		"stylers":[{"visibility":"off"}]},
	{"featureType":"water",
		"elementType":"labels",
		"stylers":[{"visibility":"on"},
			{"lightness":-25},
			{"saturation":-100}]},
	{"featureType":"water",
		"elementType":"geometry",
		"stylers":[{"hue":"#ffff00"},
			{"lightness":-25},
			{"saturation":-97}]}];

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})



////  mapcontroller mapcontroller
.controller('MapController', function($scope, $http,$ionicLoading, $compile) {
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
			geocodeAddress(geocoder, map);
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
    }
    //google.maps.event.addDomListener(window, 'load', $scope.initialize);

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