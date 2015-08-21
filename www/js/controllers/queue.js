/**
 * Created by andypan on 21/8/15.
 */
angular.module('starter.queue', [])

    .controller('QueueCtrl', function($scope,$ionicHistory) {
        console.log("just to test all these stuff");
        console.log(device.name);
        $scope.create = function() {
            /* $location.path('/tab/newpost'); */   /* this variant doesnt work */
            $state.go("/tab/queue");

        };
        $scope.backToMap = function() {
            $ionicHistory.goBack();
        };

    })
