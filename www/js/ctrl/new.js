/**
 * Created by andypan on 19/8/15.
 */
angular.module('starter.ctrl', [])
    .controller('DCtrl', function($scope) {
        console.log("inside new folder");
        $scope.init = function(){
            console.log('just init something');
        }
    });