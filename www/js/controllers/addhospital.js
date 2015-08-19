/**
 * Created by andypan on 19/8/15.
 */
// here is the controller simply for add hospital stuff
var paramlist = ["id","name","aviva_code","zone",
    "estate", "address1","address2",
    "postal","telephone","fax","weekday",
    "saturday","sunday","public_holiday","remarks"];
angular.module('starter.addclinics', [])
/// for add tab
.controller('AddCtrl', function($scope,$http) {
    $scope.name="andyafter";
    $scope.paramlist = paramlist;
});