
var apiKey = "AIzaSyBwA0f-yciWz419RzX1769_SGuZrzJ4Fe8";
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY
var re = "https://maps.googleapis.com/maps/api/geocode/json?address=National+University+of+Singapore&key=";

angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope) {
	
    })

    /// for add tab 
    .controller('AddCtrl', function($scope) {
	$scope.doSomething = function() {
	    console.log("here here");
	    var initialLocation;

	    /*
	    document.addEventListener("deviceready", function() {
		// retrieve the DOM element that had the ng-app attribute
		var domElement = document.getElementById("testbutton");
		angular.bootstrap(domElement, ["starter"]);
	    }, false);
	    */


	    // this part is only for testing and the test is over
	    navigator.geolocation.getCurrentPosition(function(position) {
		document.getElementById("disp").innerHTML= "here";
		initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		document.getElementById("disp").innerHTML=String(position.coords.latitude);
		console.log(position.coords.latitude);
		console.log(position.coords.longitude);
		
	    }, function() {
		handleNoGeolocation(browserSupportFlag);
	    });


	    
	};
    })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
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
			mapTypeId: google.maps.MapTypeId.ROADMAP
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
			var styles = [
				{
					stylers: [
						{ hue: "#00ffe6" },
						{ saturation: -20 }
					]
				},{
					featureType: "road",
					elementType: "geometry",
					stylers: [
						{ lightness: 100 },
						{ visibility: "simplified" }
					]
				},{
					featureType: "road",
					elementType: "labels",
					stylers: [
						{ visibility: "off" }
					]
				}
			];
			map.set('styles', styles);
			/// end of styles

			$scope.map = map;

			// these are all for the route finding
			var directionsDisplay = new google.maps.DirectionsRenderer();
			directionsDisplay.setMap(map);

			// this one is for the route
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
			/////// end of route

			/// purely to test HTTP request

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



