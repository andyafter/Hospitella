/**
 * Created by andypan on 21/8/15.
 */
angular.module('starter.queue', [])

    .controller('QueueCtrl', function($scope,$ionicHistory,$cordovaDevice) {
        console.log("just to test all these stuff");
        $scope.create = function() {
            /* $location.path('/tab/newpost'); */   /* this variant doesnt work */
            $state.go("/tab/queue");
            console.log($cordovaDevice.getUUID());
        };
        $scope.backToMap = function() {
            $ionicHistory.goBack();
        };

    })
