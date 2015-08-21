/**
 * Created by andypan on 21/8/15.
 */
angular.module('starter.queue', [])

    .controller('QueueCtrl', function($scope,$ionicHistory) {
        console.log("just to test all these stuff");
        //console.log(device.uuid);     //// this can be used to get device uuid
        $scope.create = function() {
            /* $location.path('/tab/newpost'); */   /* this variant doesn't work */
            $state.go("/tab/queue");

        };
        $scope.backToMap = function() {
            $ionicHistory.goBack();
        };

    })
