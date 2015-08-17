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
.controller('MapController', function($scope, $ionicLoading, $compile) {
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

			google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
			});


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

			var drawingManager = new google.maps.drawing.DrawingManager();
			var service = new google.maps.places.PlacesService(map);
			console.log("success");
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
    }
    //google.maps.event.addDomListener(window, 'load', $scope.initialize);

  
})


.controller('ItemController', ['$ionicFilterBar', ItemController])


function ItemController($ionicFilterBar) {
	var vm = this,
		items = [],
		filterBarInstance;

	for (var i = 1; i <= 1000; i++) {
		var itemDate = moment().add(i, 'days');

		var item = {
			description: 'Description for item ' + i,
			date: itemDate.toDate()
		};
		items.push(item);
	}

	vm.items = items;

	vm.showFilterBar = function () {
		filterBarInstance = $ionicFilterBar.show({
			items: vm.items,
			update: function (filteredItems) {
				vm.items = filteredItems;
			},
			filterProperties: 'description'
		});
	};

	return vm;
}

