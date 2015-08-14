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
	navigator.geolocation.getCurrentPosition(function(position) {
	    initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	    map.setCenter(initialLocation);
	    console.log(position.coords.latitude);
	    console.log(position.coords.longitude);

	}, function() {
	    handleNoGeolocation(browserSupportFlag);
	});
	
	
	var mapOptions = {
	    center: initialLocation,
	    zoom: 16,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"),
				      mapOptions);


	var marker = new google.maps.Marker({
	    position: initialLocation,
	    map: map,
	    title: 'NUS'
	});

	google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map,marker);
	});


	$scope.map = map;
    }
    //google.maps.event.addDomListener(window, 'load', $scope.initialize);

  
});

